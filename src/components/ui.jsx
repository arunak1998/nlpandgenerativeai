import { useState } from 'react'
import { numberOf } from '../nav.js'

export function Section({ id, step, title, intro, children }) {
  return (
    <section id={id} className="section">
      <header className="section-head">
        <div className="section-num">{numberOf(id)}</div>
        <div>
          <div className="kicker">{step}</div>
          <h2>{title}</h2>
        </div>
      </header>
      {intro && <p className="lead">{intro}</p>}
      {children}
    </section>
  )
}

export function Callout({ kind = 'tip', title, children }) {
  return (
    <div className={`callout ${kind}`}>
      {title && <strong>{title}</strong>}
      <div>{children}</div>
    </div>
  )
}

export function CodeBlock({ code, lang = 'python', title }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="code">
      <div className="code-head">
        <span>{title ?? lang}</span>
        <button onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

export function Demo({ title, children }) {
  return (
    <div className="demo">
      <div className="demo-title">⚡ Live demo · {title}</div>
      {children}
    </div>
  )
}

export function Table({ head, rows, highlight }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={highlight?.(c, i, j) ? 'hit' : ''}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Steps({ items }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={i}>
          <b>{s.title}</b>
          <span>{s.text}</span>
        </li>
      ))}
    </ol>
  )
}
