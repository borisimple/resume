import { useCallback, useState } from 'react'
import portfolio from './data/portfolio.json'
import Masonry from './components/Masonry'
import PowerAppsModal from './components/PowerAppsModal'
import ProjectCard, { asset } from './components/ProjectCard'

export default function App() {
  const [showPowerApps, setShowPowerApps] = useState(false)
  const closeModal = useCallback(() => setShowPowerApps(false), [])

  return <>
    <a className="skip-link" href="#work">Skip to selected work</a>
    <main>
      <header className="intro container">
        <p className="eyebrow">BORIS KRSTIĆ / OSLO, NORWAY</p>
        <h1>I make complex things feel simple.</h1>
        <p className="intro-description">{portfolio.intro}</p>
      </header>

      <section className="work container" id="work" aria-labelledby="work-title">
        <p className="eyebrow">01 / SELECTED WORK</p>
        <h2 id="work-title">A few things I’ve built.</h2>
        <p className="section-intro">{portfolio.workIntro}</p>
        <Masonry>{portfolio.projects.map(project => <ProjectCard key={project.id} project={project} onExplore={() => setShowPowerApps(true)} />)}</Masonry>
      </section>

      <section className="experience container" id="experience" aria-labelledby="experience-title">
        <p className="eyebrow">02 / EXPERIENCE</p>
        <h2 id="experience-title">Where I’ve been.</h2>
        {portfolio.experience.map(job => <article className="experience-row" key={job.company}>
          <p className="eyebrow">{job.period}</p>
          <h3>{job.company}</h3>
          <p className="experience-role">{job.role}</p>
          <p className="experience-description">{job.description}</p>
        </article>)}
      </section>

      <section className="highlights container" id="highlights" aria-labelledby="highlights-title">
        <p className="eyebrow">03 / ENGINEERING HIGHLIGHTS</p>
        <h2 id="highlights-title">More than just shipping features.</h2>
        <p className="section-intro">{portfolio.highlightsIntro}</p>
        <div className="highlights-grid">{portfolio.highlights.map(highlight => <article className="highlight-card" key={highlight.title}>
          <p className="eyebrow">{highlight.label}</p>
          <h3>{highlight.title}</h3>
          <p>{highlight.description}</p>
        </article>)}</div>
        <div className="certifications">
          <p className="eyebrow">CERTIFICATIONS &amp; LEARNING</p>
          <div className="certifications-grid">{portfolio.certifications.map(certification => <article className="certification" key={certification.tag}>
            <p className="eyebrow">{certification.tag}</p>
            <h3>{certification.name}</h3>
            <p>{certification.source}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="about container" id="about" aria-labelledby="about-title">
        <p className="eyebrow">04 / ABOUT</p>
        <h2 id="about-title">Beyond the code.</h2>
        <p className="about-lead">{portfolio.about[2]}</p>
        <p className="about-copy">{portfolio.about[3]}</p>
        <div className="elsewhere">
          <p className="eyebrow">FIND ME ELSEWHERE</p>
          <div className="social-grid">{portfolio.socials.map(social => <a className={`social-card ${social.id}`} href={social.url} target="_blank" rel="noopener noreferrer" key={social.id}>
            <span className="social-logo"><img src={asset(`assets/logos/${social.id}.svg`)} width="34" height="34" alt="" /></span>
            <span className="social-label">{social.label}</span>
            <h3>{social.name} ↗</h3>
            <p>{social.description}</p>
          </a>)}</div>
        </div>
      </section>

      <section className="toolbox" aria-labelledby="toolbox-title">
        <div className="wide-inner">
          <p className="eyebrow">05 / TOOLBOX</p>
          <h2 id="toolbox-title">Frontend to infrastructure.</h2>
          <p>{portfolio.toolbox[2]}</p>
        </div>
      </section>

      <footer className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wide-inner">
          <p className="eyebrow">06 / SAY HELLO</p>
          <h2 id="contact-title">Have something in mind? Let’s talk.</h2>
          <p className="contact-copy">Open to interesting ideas, collaborations, and thoughtful conversations.</p>
          <a className="email-link" href="mailto:borisimple@gmail.com">borisimple@gmail.com ↗</a>
          <nav className="footer-socials" aria-label="Social profiles">{portfolio.socials.map(social => <a href={social.url} target="_blank" rel="noopener noreferrer" key={social.id}>{social.name} ↗</a>)}</nav>
          <p className="copyright">© 2026 BORIS KRSTIĆ · OSLO, NORWAY</p>
        </div>
      </footer>
    </main>
    {showPowerApps && <PowerAppsModal onClose={closeModal} />}
  </>
}
