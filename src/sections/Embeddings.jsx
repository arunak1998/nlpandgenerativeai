import { useState } from 'react'
import { Section, Demo, Callout, Table } from '../components/ui.jsx'
import { FEATURES, EMBEDDINGS, WORDS, closestTo, sharedFeature } from '../nlp.js'

function VectorTable() {
  return (
    <div className="table-wrap">
      <table className="vec-table">
        <thead>
          <tr><th>Word</th>{FEATURES.map((f) => <th key={f}>{f}</th>)}</tr>
        </thead>
        <tbody>
          {WORDS.map((w) => (
            <tr key={w}>
              <td><b>{w}</b></td>
              {EMBEDDINGS[w].map((v, i) => (
                <td key={i} style={{ background: `rgba(94, 224, 255, ${v * 0.55})` }}>{v.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ClosestWords() {
  const [word, setWord] = useState('king')
  const results = closestTo(EMBEDDINGS[word], [word], 4)

  return (
    <Demo title="Find the closest words">
      <div className="tabs">
        {WORDS.map((w) => (
          <button key={w} className={w === word ? 'active' : ''} onClick={() => setWord(w)}>{w}</button>
        ))}
      </div>
      <p>Words closest to <b>{word}</b>:</p>
      <Table
        head={['Rank', 'Word', 'Similarity', 'Distance', 'Why they match']}
        rows={results.map((r, i) => [
          i + 1,
          r.word,
          `${Math.round(r.score * 100)}%`,
          r.dist.toFixed(2),
          `both strong on "${sharedFeature(word, r.word)}"`,
        ])}
      />
      <p className="muted">Higher similarity and smaller distance mean closer in meaning.</p>
    </Demo>
  )
}

export default function Embeddings() {
  return (
    <Section
      id="embeddings"
      step="Part 2 · Step 3"
      title="Word embeddings"
      intro="One-hot and TF-IDF treat every word as a separate box. A word embedding describes each word with numbers that capture its meaning, so similar words get similar numbers."
    >
      <h3>1. A word is a list of feature scores</h3>
      <p>Imagine describing every word with a few features. "king" scores high on Royal, Male and Human. "cat" scores high on Animal. That list of scores is the word's <b>vector</b>.</p>
      <VectorTable />
      <Callout kind="note" title="Real vs this demo">
        Here the features have names so you can read them. In a real embedding there are 100 to 300 or more features, learned automatically from text, and they have no names.
      </Callout>

      <h3>2. Matching = finding the closest vector</h3>
      <p>To find similar words, compare their vectors. Two ways to measure it:</p>
      <ul>
        <li><b>Distance:</b> how far apart the two vectors are. Smaller is closer.</li>
        <li><b>Cosine similarity:</b> how much the two vectors point the same way. 100% means the same direction.</li>
      </ul>
      <ClosestWords />
    </Section>
  )
}
