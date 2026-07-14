import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowRight, Link, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RainbowButton } from "@/components/ui/rainbow-button"

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [autoRotate, setAutoRotate]       = useState(true)
  const [pulseEffect, setPulseEffect]     = useState({})
  const [activeNodeId, setActiveNodeId]   = useState(null)
  const [radius, setRadius]               = useState(200)
  const [nodeSize, setNodeSize]           = useState(40)
  const [cardWidth, setCardWidth]         = useState(256)

  const containerRef    = useRef(null)
  const orbitRef        = useRef(null)
  const nodeRefs        = useRef({})

  // ── FIX 1: Store rotation in a ref, not state ─────────────────────────────
  // setState every 50ms causes 20 React re-renders/sec which trashes every
  // child element. A ref + direct transform write costs zero renders.
  const angleRef        = useRef(0)
  const rafRef          = useRef(null)
  const nodeElRefs      = useRef({})   // direct DOM refs for transform writes
  const liveOpacity     = useRef({})   // per-node lerped opacity values
  const isTransitioning = useRef(false)  // true during click-snap animation

  // ── FIX 2: Resize observer with stable callback ───────────────────────────
  useEffect(() => {
    const updateSize = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth
      if      (w < 400) { setRadius(110); setNodeSize(30); setCardWidth(180) }
      else if (w < 640) { setRadius(140); setNodeSize(34); setCardWidth(200) }
      else if (w < 900) { setRadius(170); setNodeSize(38); setCardWidth(180) }
      else               { setRadius(200); setNodeSize(40); setCardWidth(256) }
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── FIX 3: rAF loop writes transforms directly — zero React involvement ───
  useEffect(() => {
    const total = timelineData.length

    const tick = () => {
      if (autoRotate) {
        angleRef.current = (angleRef.current + 0.06) % 360
      }

      const angle = angleRef.current
      const r     = radius

      timelineData.forEach((item, index) => {
        const el = nodeElRefs.current[item.id]
        if (!el) return

        const deg    = ((index / total) * 360 + angle) % 360
        const rad    = (deg * Math.PI) / 180
        const x      = r * Math.cos(rad)
        const y      = r * Math.sin(rad)
        const zIndex = Math.round(100 + 50 * Math.cos(rad))

        // Target opacity: expanded = 1, otherwise position-based
        const targetOpacity = expandedItems[item.id]
          ? 1
          : Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)))

        // Lerp toward target — creates smooth fade in/out on node switch
        if (liveOpacity.current[item.id] === undefined) {
          liveOpacity.current[item.id] = targetOpacity
        }
        liveOpacity.current[item.id] +=
          (targetOpacity - liveOpacity.current[item.id]) * 0.08

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        el.style.zIndex    = expandedItems[item.id] ? "200" : String(zIndex)
        el.style.opacity   = String(liveOpacity.current[item.id])
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)

  // Re-run when radius changes (resize) or expandedItems changes (opacity update)
  }, [autoRotate, radius, timelineData, expandedItems])

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      // Smooth return-to-orbit transition
      isTransitioning.current = true
      Object.values(nodeElRefs.current).forEach(el => {
        if (el) el.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease"
      })
      setTimeout(() => {
        Object.values(nodeElRefs.current).forEach(el => {
          if (el) el.style.transition = ""
        })
        isTransitioning.current = false
      }, 650)
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const getRelatedItems = useCallback((itemId) => {
    const item = timelineData.find(i => i.id === itemId)
    return item ? item.relatedIds : []
  }, [timelineData])

  const centerViewOnNode = useCallback((nodeId) => {
    const nodeIndex   = timelineData.findIndex(item => item.id === nodeId)
    const totalNodes  = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360
    const newAngle    = (270 - targetAngle + 360) % 360

    // Apply CSS transition on all node wrappers for the snap-to animation
    isTransitioning.current = true
    Object.values(nodeElRefs.current).forEach(el => {
      if (el) el.style.transition = "transform 0.7s cubic-bezier(0.4,0,0.2,1)"
    })

    angleRef.current = newAngle

    // After transition completes, remove it so rAF resumes smooth control
    setTimeout(() => {
      Object.values(nodeElRefs.current).forEach(el => {
        if (el) el.style.transition = ""
      })
      isTransitioning.current = false
    }, 720)
  }, [timelineData])

  const toggleItem = useCallback((id) => {
    setExpandedItems(prev => {
      const newState = {}
      Object.keys(prev).forEach(key => { newState[parseInt(key)] = false })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const related = getRelatedItems(id)
        const pulse   = {}
        related.forEach(relId => { pulse[relId] = true })
        setPulseEffect(pulse)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }, [getRelatedItems, centerViewOnNode])

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "core":     return "text-white bg-black border-white"
      case "growth":   return "text-black bg-white border-black"
      case "emerging": return "text-white bg-black/40 border-white/50"
      default:         return "text-white bg-black/40 border-white/50"
    }
  }

  const orbitDiameter = radius * 2

  return (
    <div
    data-navbar="light"
      className="w-full h-[130vh] flex flex-col items-center justify-center bg-[#050508] overflow-hidden pt-10"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
        @keyframes nodePopIn {
          0%   { transform: scale(0.6); opacity: 0; }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
      <div>
        <h1 className="text-[50px] md:text-[60px]  font-regular  pt-[50px] leading-[1.05] tracking-tight text-white">
          Our Services
        </h1>
      </div>

      <div className="relative w-full h-[60%] md:h-[80%] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center orb */}
          <div
            className="absolute rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10"
            style={{ width: nodeSize * 1.6, height: nodeSize * 1.6 }}
          >
            <div
              className="absolute rounded-full border border-white/20 animate-ping opacity-70"
              style={{ width: nodeSize * 2, height: nodeSize * 2 }}
            />
            <div
              className="absolute rounded-full border border-white/10 animate-ping opacity-50"
              style={{ width: nodeSize * 2.4, height: nodeSize * 2.4, animationDelay: "0.5s" }}
            />
            <div
              className="rounded-full bg-white/80 backdrop-blur-md"
              style={{ width: nodeSize * 0.8, height: nodeSize * 0.8 }}
            />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: orbitDiameter, height: orbitDiameter }}
          />

          {/* Nodes — FIX 5: no transition-all on the outer wrapper ──────────
              transition-all re-composites every CSS property every frame.
              Only the node circle inside gets a transition, and only on
              specific properties. The outer wrapper is moved by rAF only.      */}
          {timelineData.map((item, index) => {
            const isExpanded = expandedItems[item.id]
            const isRelated  = isRelatedToActive(item.id)
            const isPulsing  = pulseEffect[item.id]
            const Icon       = item.icon
            const iconSize   = Math.max(12, nodeSize * 0.4)
            const glowSize   = item.energy * 0.5 + nodeSize

            return (
              <div
                key={item.id}
                ref={el => { nodeElRefs.current[item.id] = el }}
                className="absolute cursor-pointer"
                style={{
                  // FIX 6: tell the browser this element will be composited
                  willChange: "transform, opacity",
                  // Start at centre; rAF will immediately reposition
                  transform:  "translate3d(0,0,0)",
                }}
                onClick={e => { e.stopPropagation(); toggleItem(item.id) }}
              >
                {/* Glow */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width:  glowSize,
                    height: glowSize,
                    left:   -(glowSize - nodeSize) / 2,
                    top:    -(glowSize - nodeSize) / 2,
                  }}
                />

                {/* Node circle — FIX 7: only transition the properties that
                    actually change on click (background, border, transform).
                    Removed "transition-all" which paints everything. */}
                <div
                  style={{
                    width:      nodeSize,
                    height:     nodeSize,
                    transform:  isExpanded ? "scale(1.5)" : "scale(1)",
                    transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                  className={`
                    rounded-full flex items-center justify-center border-2
                    ${isExpanded
                      ? "bg-white text-black border-white shadow-lg"
                      : isRelated
                        ? "bg-white/50 text-black border-white animate-pulse"
                        : "bg-black text-white border-white/40"
                    }
                  `}
                >
                  <Icon size={iconSize} />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute whitespace-nowrap font-light tracking-wider text-center
                    ${isExpanded ? "text-white" : "text-white/70"}
                  `}
                  style={{
                    top:       nodeSize + 8,
                    left:      "50%",
                    transform: "translateX(-50%)",
                    fontSize:  Math.max(9, nodeSize * 0.28),
                    transition:"color 0.3s ease",
                  }}
                >
                  {item.title}
                </div>


                  {/* Expanded card — fade + slide in via CSS keyframe */}
                {isExpanded && (
                  <Card
                    className="absolute bg-black/90 backdrop-blur-lg border-white/30 shadow-xl overflow-visible"
                    style={{
                      top:       nodeSize + 28,
                      left:      "50%",
                      transform: "translateX(-50%)",
                      width:     cardWidth,
                      animation: "cardFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                    <CardHeader className="pb-2 px-3 pt-3">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status?.toUpperCase() ?? "CORE"}
                        </Badge>
                        <span className="text-xs  text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80 px-3 pb-3">
                      <p>{item.content}</p>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" /> Expertise Level
                          </span>
                          <span className="">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds?.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map(relatedId => {
                              const rel = timelineData.find(i => i.id === relatedId)
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                                  onClick={e => { e.stopPropagation(); toggleItem(relatedId) }}
                                >
                                  {rel?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-center text-black pb-10 pt-10">
        <a href="/services">
        <RainbowButton>View all our Services</RainbowButton>
        </a>
      </div>
    </div>
  )
}