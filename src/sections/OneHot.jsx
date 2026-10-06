import { useState } from 'react'
import { Section, Demo, Table, Callout } from '../components/ui.jsx'
import { vocabulary, oneHot, bagOfWords } from '../nlp.js'

export default function OneHot() {
  const [text, setText] = useState('the cat sat on the mat')
  const sentences = [text]
  const vocab = vocabulary(sentences)

  return (
    <Section
      id="onehot"
      step="Part 2 · Step 1"
      title="One-hot encoding & Bag of Words"
      intro="Step one: give every unique word a position. The vocabulary is the list of unique words. A word becomes a vector of zeros with a single 1 at its position."
    >
      <Callout title="Example">
        Vocabulary = [cat, mat, on, sat, the]. So <b>cat</b> = [1,0,0,0,0] and <b>sat</b> = [0,0,0,1,0].
      </Callout>

      <Demo title="One-hot encoder">
        <label>Type a sentence</label>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <Table
          head={['Word', ...vocab]}
          rows={vocab.map((w) => [w, ...oneHot(w, vocab)])}
          highlight={(c, i, j) => j > 0 && c === 1}
        />
        <p className="muted">Bag of Words for the sentence (counts per word): [{bagOfWords(text, vocab).join(', ')}]</p>
      </Demo>

      <h3>Problems with one-hot</h3>
      <ul>
        <li><b>Huge vectors:</b> a 50,000 word vocabulary means 50,000 numbers per word.</li>
        <li><b>No meaning:</b> "cat" and "dog" are exactly as far apart as "cat" and "car".</li>
        <li><b>No order:</b> bag of words treats "dog bites man" and "man bites dog" the same.</li>
      </ul>
    </Section>
  )
}
