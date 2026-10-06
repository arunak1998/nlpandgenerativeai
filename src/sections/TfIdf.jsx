import { useState } from 'react'
import { Section, Demo, Table, Callout } from '../components/ui.jsx'
import { tfidf } from '../nlp.js'

const DEFAULT_DOCS = ['the cat sat on the mat', 'the dog sat on the log', 'cats and dogs are pets']

export default function TfIdf() {
  const [docs, setDocs] = useState(DEFAULT_DOCS)
  const { vocab, idf, rows } = tfidf(docs)
  const update = (i, v) => setDocs(docs.map((d, k) => (k === i ? v : d)))

  const maxPerDoc = rows.map((r) => Math.max(...r))

  return (
    <Section
      id="tfidf"
      step="Part 2 · Step 2"
      title="TF-IDF: which words matter?"
      intro="Common words like 'the' appear everywhere and tell us little. TF-IDF boosts words that are frequent in one document but rare across all documents."
    >
      <Callout title="The formula">
        <b>TF</b> = (times word appears in doc) ÷ (words in doc)<br />
        <b>IDF</b> = ln((1 + N) ÷ (1 + docs containing word)) + 1<br />
        <b>TF-IDF</b> = TF × IDF
      </Callout>

      <Demo title="TF-IDF calculator (edit the documents)">
        {docs.map((d, i) => (
          <div key={i}>
            <label>Document {i + 1}</label>
            <input value={d} onChange={(e) => update(i, e.target.value)} />
          </div>
        ))}
        <Table
          head={['', ...vocab]}
          rows={[
            ['IDF', ...idf.map((v) => v.toFixed(2))],
            ...rows.map((r, i) => [`Doc ${i + 1}`, ...r.map((v) => v.toFixed(2))]),
          ]}
          highlight={(c, i, j) => i > 0 && j > 0 && Number(c) === Number(maxPerDoc[i - 1].toFixed(2)) && Number(c) > 0}
        />
        <p className="muted">Highlighted = the most important word in that document. Notice "the" scores low because it appears in several documents.</p>
      </Demo>

      <h3>Where it is still used</h3>
      <p>Search engines, keyword extraction and simple document similarity. It is still a strong baseline, but it still cannot understand that "car" and "automobile" mean the same thing.</p>
    </Section>
  )
}
