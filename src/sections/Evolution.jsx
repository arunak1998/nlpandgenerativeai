import { Section, Table } from '../components/ui.jsx'

export default function Evolution() {
  return (
    <Section
      id="evolution"
      step="Part 1 · History"
      title="How NLP evolved"
      intro="Natural Language Processing (NLP) is teaching machines to read, understand and produce human language. Each era fixed the biggest weakness of the one before."
    >
      <Table
        head={['Era', 'Approach', 'Big idea', 'Weakness']}
        rows={[
          ['1950s–80s', 'Rule-based', 'Hand-written grammar rules and dictionaries', 'Brittle, cannot cover all language'],
          ['1990s–2000s', 'Statistical', 'Count words (n-grams, Naive Bayes, TF-IDF)', 'No meaning, huge sparse vectors'],
          ['2013–2016', 'Word embeddings', 'Word2Vec / GloVe: meaning as vectors', 'One vector per word, ignores context'],
          ['2014–2017', 'RNN / LSTM', 'Read text in sequence with memory', 'Slow, forgets long context'],
          ['2017', 'Transformer', '"Attention Is All You Need": look at all words at once', 'Expensive to train'],
          ['2018–2022', 'Pre-trained LMs', 'BERT and GPT: pre-train once, fine-tune for tasks', 'Needed task-specific tuning'],
          ['2022–now', 'Generative AI / LLMs', 'Huge models follow instructions in plain language', 'Hallucination, cost, safety'],
        ]}
      />
    </Section>
  )
}
