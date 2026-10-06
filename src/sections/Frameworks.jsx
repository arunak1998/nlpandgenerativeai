import { Section, Table, Callout } from '../components/ui.jsx'

export default function Frameworks() {
  return (
    <Section
      id="frameworks"
      step="Part 4"
      title="What is a framework, and why LangChain?"
      intro="You can call an LLM API with plain HTTP. But a real app also needs prompt templates, chat history, output parsing, tools and retries. A framework gives you tested building blocks for all of that, so you don't rewrite them for every project."
    >
      <Table
        head={['Framework', 'Best for']}
        rows={[
          ['LangChain', 'Composable chains, many model providers, huge integration list'],
          ['LangGraph', 'Stateful, multi-step agents built as graphs (from the LangChain team)'],
          ['Raw provider SDK', 'Simple apps with one model and no extra moving parts'],
        ]}
      />

      <h3>LangChain building blocks</h3>
      <ul>
        <li><b>Chat models:</b> one interface for Gemini, OpenAI, Claude and more. Swap providers by changing one line.</li>
        <li><b>Prompt templates:</b> reusable prompts with variables like <code>{'{text}'}</code>.</li>
        <li><b>Output parsers:</b> turn the model response into a string, JSON or an object.</li>
        <li><b>Runnables and LCEL:</b> chain steps with the <code>|</code> pipe: <code>prompt | model | parser</code>.</li>
        <li><b>Memory / message history:</b> store the conversation and resend it each turn.</li>
        <li><b>Tools and agents:</b> let the model call your own functions.</li>
      </ul>

      <Callout title="Mental model">
        Think of LangChain as plumbing. Each piece takes an input and gives an output, and the pipe operator connects them.
      </Callout>
    </Section>
  )
}
