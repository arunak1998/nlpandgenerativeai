import { Section, Table, Callout } from '../components/ui.jsx'

export default function GenAI() {
  return (
    <Section
      id="genai"
      step="Part 3"
      title="What is Generative AI?"
      intro="Traditional AI mostly predicts or classifies (spam or not spam, price tomorrow). Generative AI creates new content: text, code, images, audio. Under the hood, a large language model (LLM) predicts the next word, over and over, until it has written a full answer."
    >
      <Table
        head={['', 'Traditional ML', 'Generative AI']}
        rows={[
          ['Output', 'A label or number', 'New text, image, code, audio'],
          ['Training', 'One model per task', 'One huge model, many tasks'],
          ['Interface', 'Features and code', 'Plain-language prompts'],
          ['Example', 'Spam filter', 'ChatGPT, Gemini, Claude'],
        ]}
      />

      <Callout kind="note" title="How does the model work inside?">
        That is the Transformer. It is covered step by step in the separate guide: <a href="https://transformer-navy.vercel.app/" target="_blank" rel="noreferrer">How Transformers Work</a>.
      </Callout>

      <h3>Key terms</h3>
      <ul>
        <li><b>Prompt:</b> the instructions and input you send to the model.</li>
                <li><b>Temperature:</b> randomness. 0 is focused and repeatable, 1 and above is creative.</li>
        <li><b>Hallucination:</b> a confident but wrong answer. Lower temperature and clear instructions reduce it.</li>
        <li><b>Fine-tuning vs prompting:</b> prompting changes the input, fine-tuning changes the model weights.</li>
      </ul>

      <Callout kind="note" title="Remember">
        An LLM has no memory between API calls. Every request is independent, so any "memory" is just you sending the earlier messages again. We build exactly that in the mini project.
      </Callout>
    </Section>
  )
}
