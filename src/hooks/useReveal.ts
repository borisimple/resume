import { useLayoutEffect } from 'react'

/** Animate each block once without changing the masonry measurements. */
export default function useReveal() {
  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || !('IntersectionObserver' in window)) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      '.intro > *, section > .eyebrow, section > h2, .section-intro, .masonry-item, .experience-row, .highlight-card, .certification, .about-lead, .about-copy, .social-card, .wide-inner > *',
    ))
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const started = performance.now()
    const reveal = (element: HTMLElement) => {
      const remaining = element.closest('.intro') ? 0 : Math.max(0, 300 - (performance.now() - started))
      if (!remaining) {
        element.classList.add('is-visible')
        return
      }
      const timer = setTimeout(() => {
        element.classList.add('is-visible')
        timers.delete(timer)
      }, remaining)
      timers.add(timer)
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        reveal(entry.target as HTMLElement)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
    elements.forEach(element => {
      // Prepare before paint so the initial sequence has no visible flash.
      element.classList.add('reveal')
      observer.observe(element)
    })
    const revealAll = () => {
      if (media.matches) {
        observer.disconnect()
        elements.forEach(element => element.classList.add('is-visible'))
      }
    }
    media.addEventListener('change', revealAll)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
      media.removeEventListener('change', revealAll)
      elements.forEach(element => element.classList.remove('reveal', 'is-visible'))
    }
  }, [])
}
