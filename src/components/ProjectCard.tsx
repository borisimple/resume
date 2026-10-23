import type { KeyboardEvent } from 'react'

export interface Project {
  id: string
  title: string
  description: string
  kind: string
  image?: string
  link: string | null
  period?: string
  relatedLabel?: string
  relatedDescription?: string
}

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function ProjectArtwork({ project }: { project: Project }) {
  if (project.kind === 'nortura') return <div className="project-art nortura-art">
    <p className="art-kicker">POWER APPS / LIVESTOCK INTAKE</p>
    <p className="art-title">Nortura SA</p>
    <div className="art-tags">{['Power Apps', 'Arrival registration', 'Animal welfare', 'Issue reporting'].map(tag => <span key={tag}>{tag}</span>)}</div>
  </div>
  if (project.kind === 'power-apps') return <div className="project-art power-art">
    <div className="power-brand"><span className="microsoft-logo"><img src={asset('assets/logos/microsoft.svg')} width="22" height="22" alt="" /></span><p className="art-kicker">MICROSOFT POWER PLATFORM</p></div>
    <p className="art-title">Power Apps</p>
    <p className="art-caption">3 applications · NAV &amp; Business Central</p>
  </div>
  if (project.kind === 'armada') return <div className="project-art armada-art">
    <p className="art-kicker">ARMADA DYNAMICS / PARTNER PLATFORM</p>
    <p className="art-title">Partner Portal</p>
    <div className="art-tags">{['Downloads', 'Price lists', 'Admin'].map(tag => <span key={tag}>{tag}</span>)}</div>
  </div>
  return <div className={`project-art screenshot-art ${project.id}-art`}>
    <img src={asset(project.image!)} alt={`${project.title} website preview`} loading={project.id === 'dnb' ? 'eager' : 'lazy'} decoding="async" />
    {project.id === 'dnb' && <span className="dnb-badge">DNB</span>}
  </div>
}

export default function ProjectCard({ project, onExplore }: { project: Project; onExplore: () => void }) {
  const interactive = project.id === 'power-apps'
  const keyboardOpen = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onExplore() }
  }
  return <article className={`project-card ${project.id}-card`}
    role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}
    aria-label={interactive ? 'Explore three Power Apps projects' : undefined}
    aria-haspopup={interactive ? 'dialog' : undefined}
    onClick={interactive ? onExplore : undefined} onKeyDown={interactive ? keyboardOpen : undefined}>
    <ProjectArtwork project={project} />
    <h3>{project.title}</h3>
    <p className="project-description">{project.description}</p>
    {project.id === 'nortura' ? <>
      <p className="project-meta">{project.period}</p>
      <aside className="related-story">
        <p className="related-label">{project.relatedLabel}</p>
        <p>{project.relatedDescription}</p>
        <a className="project-link" href={project.link!} target="_blank" rel="noopener noreferrer">READ CAPGEMINI CASE STUDY ↗</a>
      </aside>
    </> : project.link ? <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">VIEW PROJECT ↗</a>
      : interactive ? <span className="project-link">EXPLORE 3 PROJECTS ↗</span>
      : <p className="project-meta">WEB APPLICATION · FIREBASE / GOOGLE CLOUD</p>}
  </article>
}
