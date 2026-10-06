import { Section, Steps } from '../components/ui.jsx'

export default function Intro() {
  return (
    <Section
      id="roadmap"
      step="Start here"
      title="The roadmap: from words to Generative AI"
      intro="Computers only understand numbers. The whole story of NLP is the story of finding better and better ways to turn language into numbers, until the numbers became good enough that a model can write language back."
    >
      <Steps
        items={[
          { title: '1. One-hot encoding', text: 'Each word becomes a vector with a single 1. Simple, but it carries no meaning.' },
          { title: '2. Bag of words & TF-IDF', text: 'Count words in a document and down-weight the common ones.' },
          { title: '3. Word embeddings', text: 'Each word becomes a vector of features, so similar words sit close together.' },
          { title: '4. Word2Vec', text: 'The first model that learns those vectors by itself from text.' },
          { title: '5. Generative AI', text: 'Transformers and LLMs (see the separate Transformer guide) can write new text.' },
          { title: '6. LangChain', text: 'Build real apps by connecting an LLM to prompts and memory.' },
        ]}
      />
    </Section>
  )
}
