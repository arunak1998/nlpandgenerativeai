import { useEffect, useState } from 'react'
import { NAV } from './nav.js'
import { QUESTIONS } from './interviewData.js'
import Intro from './sections/Intro.jsx'
import Evolution from './sections/Evolution.jsx'
import OneHot from './sections/OneHot.jsx'
import TfIdf from './sections/TfIdf.jsx'
import Embeddings from './sections/Embeddings.jsx'
import Word2Vec from './sections/Word2Vec.jsx'
import GenAI from './sections/GenAI.jsx'
import Frameworks from './sections/Frameworks.jsx'
import Setup from './sections/Setup.jsx'
import Tasks from './sections/Tasks.jsx'
import MiniProject from './sections/MiniProject.jsx'
import Interview from './sections/Interview.jsx'

function useActiveSection() {
  const [active, setActive] = useState(NAV[0][0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' },
    )
    NAV.forEach(([id]) => observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])
  return active
}

export default function App() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const index = NAV.findIndex(([id]) => id === active)
  const pct = Math.round(((index + 1) / NAV.length) * 100)

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${pct / 100})` }} />

      <nav className="rail" aria-label="Chapters">
        <div className="rail-head"><span className="rail-head-label">Chapter</span><b>✦</b><span className="rail-head-pct">{pct}%</span></div>
        {NAV.map(([id, label], i) => (
          <a key={id} href={`#${id}`} className={`rail-node ${i < index ? 'done' : ''} ${i === index ? 'active' : ''}`}>
            <span className="rail-label">{label}</span>
            <span className="rail-num">{i < index ? '✓' : String(i).padStart(2, '0')}</span>
          </a>
        ))}
      </nav>

      <div className="chip-nav">
        {open && (
          <div className="chip-sheet">
            {NAV.map(([id, label], i) => (
              <a key={id} href={`#${id}`} className={`chip-row ${i === index ? 'active' : ''}`} onClick={() => setOpen(false)}>
                <span className="chip-row-num">{String(i).padStart(2, '0')}</span>{label}
              </a>
            ))}
          </div>
        )}
        <button className="chip-pill" onClick={() => setOpen(!open)}>
          <span className="chip-label">{NAV[index][1]}</span>
          <span className="chip-pct">{pct}%</span>
          <span className="chip-caret">{open ? '▾' : '▴'}</span>
        </button>
      </div>

      <header className="hero" id="top">
        <div className="aurora" aria-hidden="true"><span className="orb o1" /><span className="orb o2" /><span className="orb o3" /></div>
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-main">
          <div className="badge">✦ From one-hot encoding to your first chatbot</div>
          <h1>From words to <span className="grad">Generative AI</span></h1>
          <p className="hero-sub">Follow the whole story step by step: one-hot encoding, TF-IDF, word embeddings and Word2Vec, then Generative AI, LangChain, and a memory chatbot you build yourself. Every NLP step has a live demo.</p>
          <div className="hero-cta">
            <a className="btn big" href="#roadmap">Start the journey →</a>
            <a className="btn ghost big" href="#project">Jump to the chatbot</a>
          </div>
          <div className="hero-stats">
            <div><b>{NAV.length - 1}</b><span>chapters</span></div>
            <div><b>7</b><span>live demos</span></div>
            <div><b>{QUESTIONS.length}</b><span>interview questions</span></div>
          </div>
        </div>
        <div className="chapters">
          {NAV.slice(1).map(([id, label], i) => (
            <a key={id} href={`#${id}`}><span>{String(i + 1).padStart(2, '0')}</span>{label}</a>
          ))}
        </div>
      </header>

      <main>
        <Intro />
        <Evolution />
        <OneHot />
        <TfIdf />
        <Embeddings />
        <Word2Vec />
        <GenAI />
        <Frameworks />
        <Setup />
        <Tasks />
        <MiniProject />
        <Interview />
      </main>
      <footer>
        <p>Built by <span className="grad author">Arunkumar Ravichandran</span></p>
        <p className="muted">From NLP basics to Generative AI</p>
      </footer>
    </>
  )
}
