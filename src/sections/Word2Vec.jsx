import { useState } from 'react'
import { Section, Demo, Callout, Table } from '../components/ui.jsx'
import { WORDS, EMBEDDINGS, FEATURES, wordMath, closestTo, skipGramPairs } from '../nlp.js'

function TrainingPairs() {
  const [text, setText] = useState('the king rules the kingdom')
  const pairs = skipGramPairs(text, 2)

  return (
    <Demo title="How Word2Vec gets its training data">
      <label>Type a sentence</label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p className="muted">Window = 2. Every word is paired with the words within 2 places of it.</p>
      <div className="chips">
        {pairs.map(([a, b], i) => (
          <span key={i} className="pair">{a} → {b}</span>
        ))}
      </div>
      <p className="muted">{pairs.length} training pairs. The model learns to predict the right-hand word from the left-hand word.</p>
    </Demo>
  )
}

function WordMath() {
  const [a, setA] = useState('king')
  const [b, setB] = useState('man')
  const [c, setC] = useState('woman')
  const result = wordMath(a, b, c)
  const answer = closestTo(result, [a, b, c], 1)[0]

  const Pick = ({ value, onChange }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {WORDS.map((w) => <option key={w}>{w}</option>)}
    </select>
  )

  return (
    <Demo title="Word math">
      <div className="math">
        <Pick value={a} onChange={setA} /> <span>−</span> <Pick value={b} onChange={setB} /> <span>+</span> <Pick value={c} onChange={setC} />
        <span>=</span> <b className="answer">{answer.word}</b>
      </div>
      <Table
        head={['', ...FEATURES]}
        rows={[
          [a, ...EMBEDDINGS[a].map((v) => v.toFixed(2))],
          [`− ${b}`, ...EMBEDDINGS[b].map((v) => v.toFixed(2))],
          [`+ ${c}`, ...EMBEDDINGS[c].map((v) => v.toFixed(2))],
          ['result', ...result.map((v) => v.toFixed(2))],
        ]}
      />
      <p className="muted">Take the vector for {a}, remove what makes it "{b}", add what makes it "{c}", then look for the closest word. The answer is "{answer.word}" ({Math.round(answer.score * 100)}% match).</p>
    </Demo>
  )
}

export default function Word2Vec() {
  return (
    <Section
      id="word2vec"
      step="Part 2 · Step 4"
      title="Word2Vec: the first trained embedding model"
      intro="In the demo above we wrote the features by hand. Word2Vec (Google, 2013) learns them by itself by reading millions of sentences. It is a word-embedding model, and the idea that started the modern NLP era."
    >
      <h3>The idea: you know a word by its neighbours</h3>
      <p>"king" and "queen" appear next to the same words (throne, rules, crown), so the model gives them similar vectors. It never needs a human to say what the words mean.</p>

      <h3>How it is trained</h3>
      <ol className="flow">
        <li>Slide a small window over every sentence.</li>
        <li>Make pairs of (word, neighbour). This is called <b>Skip-gram</b>.</li>
        <li>Train a tiny neural network to predict the neighbour from the word.</li>
        <li>Keep the network's learned weights. Those weights are the word vectors.</li>
      </ol>
      <TrainingPairs />

      <h3>What the vectors can do</h3>
      <p>Because meaning becomes numbers, you can do maths with words.</p>
      <WordMath />

      <Callout title="Limitation, and what came next">
        Word2Vec gives <b>one vector per word</b>. "bank" (river) and "bank" (money) get the same vector. Later models fixed this by making the vector change with the sentence. That leads to Transformers and Generative AI, the next part.
      </Callout>
    </Section>
  )
}
