import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'

const cases = [
  {
    title: 'Customer Registration for Dynamics NAV',
    description: 'An iPad application that simplified registering new customers and made everyday customer onboarding more convenient.',
  },
  {
    title: 'Collection Orders for Business Central',
    description: 'A mobile application providing a clear overview of collection orders, so relevant information could be accessed while working away from a desk.',
  },
  {
    title: 'Functional Test for Business Central',
    description: 'An iPad application for checking returned rental equipment and recording issues discovered during functional testing.',
  },
]

export default function PowerAppsModal({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  const containFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )).filter(control => !control.hasAttribute('disabled') && control.getClientRects().length)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (controls.length === 1 || (event.shiftKey && document.activeElement === first) ||
      (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault()
      const target = event.shiftKey ? last : first
      target?.focus()
    }
  }

  useEffect(() => {
    const element = dialog.current!
    const trigger = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = overflow
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog ref={dialog} className="power-modal" aria-labelledby="power-modal-title"
      aria-describedby="power-modal-intro" onKeyDown={containFocus}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="modal-panel">
        <header className="modal-header">
          <div className="modal-heading">
            <p className="eyebrow">MICROSOFT POWER PLATFORM</p>
            <h2 id="power-modal-title">Projects built with Power Apps</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal" autoFocus>×</button>
        </header>
        <p id="power-modal-intro">During my time working with Dynamics NAV and Business Central, I developed practical apps that connected existing ERP workflows to more usable mobile interfaces.</p>
        {cases.map((project, index) => <article className="modal-case" key={project.title}>
          <p className="eyebrow">0{index + 1} / POWER APPS</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </article>)}
      </div>
    </dialog>, document.body,
  )
}
