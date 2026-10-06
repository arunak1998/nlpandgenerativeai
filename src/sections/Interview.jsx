import { useState } from 'react'
import { Section } from '../components/ui.jsx'
import { QUESTIONS, TOPICS } from '../interviewData.js'

export default function Interview() {
  const [topic, setTopic] = useState('All')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const shown = QUESTIONS.filter(
    (x) => (topic === 'All' || x.topic === topic) && (!q || (x.q + x.a).toLowerCase().includes(q)),
  )

  return (
    <Section
      id="interview"
      step="Part 8"
      title="Interview questions"
      intro="Click a question to reveal a detailed answer. Try answering out loud first."
    >
      <div className="row">
        <input value={query} placeholder="Search questions..." onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="tabs">
        {TOPICS.map((t) => (
          <button key={t} className={t === topic ? 'active' : ''} onClick={() => setTopic(t)}>{t}</button>
        ))}
      </div>
      <p className="muted">{shown.length} question(s)</p>
      {shown.map((x) => (
        <details key={x.q} className="qa">
          <summary><span className="tag">{x.topic}</span>{x.q}</summary>
          <p>{x.a}</p>
        </details>
      ))}
    </Section>
  )
}
