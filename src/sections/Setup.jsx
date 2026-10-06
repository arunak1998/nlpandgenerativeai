import { Section, CodeBlock, Callout, Steps } from '../components/ui.jsx'

export default function Setup() {
  return (
    <Section
      id="setup"
      step="Part 5 · Hands-on"
      title="Connect your first model with LangChain"
      intro="We use Google Gemini because it has a free tier. The same pattern works for any provider."
    >
      <Steps
        items={[
          { title: 'Get an API key', text: 'Open Google AI Studio (aistudio.google.com), sign in and choose "Get API key".' },
          { title: 'Create a project folder', text: 'Make a virtual environment so packages stay isolated.' },
          { title: 'Install packages', text: 'langchain-google-genai (the Gemini integration) and python-dotenv (to load the key).' },
          { title: 'Store the key in .env', text: 'Never hard-code keys in your source or commit them to git.' },
          { title: 'Make the first call', text: 'Send a basic question and print the answer.' },
        ]}
      />

      <h3>1. Setup</h3>
      <CodeBlock lang="bash" title="terminal" code={`mkdir langchain-chatbot && cd langchain-chatbot
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install langchain langchain-google-genai python-dotenv`} />

      <CodeBlock lang="bash" title=".env" code={`GOOGLE_API_KEY=your-key-here`} />
      <Callout kind="warn" title="Keep it secret">
        Add <code>.env</code> to <code>.gitignore</code>. Anyone with your key can spend your quota.
      </Callout>

      <h3>2. First call</h3>
      <CodeBlock title="first_call.py" code={`from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()  # reads GOOGLE_API_KEY from .env

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)

response = llm.invoke("What is the capital of France?")
print(response.content)`} />
      <p>Run it with <code>python first_call.py</code>. You should see "The capital of France is Paris."</p>
      <Callout kind="note" title="What just happened?">
        <code>invoke</code> sent your text to Gemini and returned an <code>AIMessage</code> object. The text is in <code>.content</code>; token usage and metadata are on the same object. Model names change over time, so check the Gemini docs if yours is not found.
      </Callout>

      <h3>3. Useful variations</h3>
      <CodeBlock title="variations.py" code={`# Stream tokens as they arrive
for chunk in llm.stream("Explain NLP in two lines"):
    print(chunk.content, end="", flush=True)

# Send a system + user message pair
from langchain_core.messages import SystemMessage, HumanMessage
msgs = [
    SystemMessage(content="You are a patient teacher."),
    HumanMessage(content="What is NLP?"),
]
print(llm.invoke(msgs).content)`} />
    </Section>
  )
}
