import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/** Keep one accessible DOM order, with the original alternating columns on desktop. */
export default function Masonry({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const grid = ref.current!
    const items = Array.from(grid.children) as HTMLElement[]
    let frame = 0
    let disposed = false
    const measure = () => {
      if (disposed) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const mobile = window.matchMedia('(max-width: 809.98px)').matches
        const nextRows = [1, 1]
        items.forEach((item, index) => {
          if (mobile) {
            item.style.removeProperty('grid-row')
            item.style.removeProperty('grid-column')
            return
          }
          const column = index % 2
          const height = item.firstElementChild!.getBoundingClientRect().height
          const span = Math.ceil(height + (index < items.length - 2 ? 20 : 0))
          item.style.gridColumn = String(column + 1)
          item.style.gridRow = `${nextRows[column]} / span ${span}`
          nextRows[column] += span
        })
        grid.dataset.ready = 'true'
      })
    }
    const observer = new ResizeObserver(measure)
    items.forEach(item => observer.observe(item.firstElementChild!))
    window.addEventListener('resize', measure)
    document.fonts.ready.then(measure)
    measure()
    return () => {
      disposed = true
      observer.disconnect()
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="masonry" ref={ref}>
    {children.map((child, index) => <div className="masonry-item" key={index}>{child}</div>)}
  </div>
}
