import { useState } from 'react'
import { Section, CodeBlock, Callout, Demo, Steps } from '../components/ui.jsx'

function MemoryDemo() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')

  const send = () => {
    const text = input.trim()
    if (!text) return
    const reply = `(model reply #${history.length / 2 + 1}, it has seen ${history.length + 1} message(s))`
    setHistory([...history, { role: 'human', text }, { role: 'ai', text: reply }])
    setInput('')
  }

  return (
    <Demo title="Why memory = resending history">
      <div className="chat">
        {history.length === 0 && <p className="muted">Send a message to see the payload grow.</p>}
        {history.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}><b>{m.role === 'human' ? 'You' : 'AI'}:</b> {m.text}</div>
        ))}
      </div>
      <div className="row">
        <input value={input} placeholder="Type a message" onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
        <button className="btn" onClick={send}>Send</button>
        <button className="btn ghost" onClick={() => setHistory([])}>Reset</button>
      </div>
      <p className="muted">On every turn, LangChain sends this whole list to the model, not just your latest message:</p>
      <pre className="payload">{JSON.stringify(history.map((m) => ({ role: m.role, content: m.text })), null, 2)}</pre>
    </Demo>
  )
}

export default function MiniProject() {
  return (
    <Section
      id="project"
      step="Part 7 · Mini project"
      title="Build a Q&A chatbot with memory"
      intro="Goal: a terminal chatbot that answers questions and remembers what you said earlier (for example your name). We build it in four small steps."
    >
      <Steps
        items={[
          { title: 'Step 1: Model', text: 'Create the Gemini chat model.' },
          { title: 'Step 2: Prompt', text: 'A system message plus a placeholder where the history goes.' },
          { title: 'Step 3: Chain + memory', text: 'Pipe prompt into model, then wrap it with message history per session.' },
          { title: 'Step 4: Chat loop', text: 'Read input in a loop and print the reply.' },
        ]}
      />

      <MemoryDemo />

      <h3>Full code</h3>
      <CodeBlock title="chatbot.py" code={`from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()

# Step 1: model
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)

# Step 2: prompt with a slot for the earlier messages
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly assistant. Keep answers short and clear."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{question}"),
])

# Step 3: chain + memory
chain = prompt | llm | StrOutputParser()

sessions = {}  # session_id -> chat history

def get_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in sessions:
        sessions[session_id] = InMemoryChatMessageHistory()
    return sessions[session_id]

chatbot = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="question",
    history_messages_key="history",
)

# Step 4: chat loop
def main():
    config = {"configurable": {"session_id": "user-1"}}
    print("Chatbot ready. Type 'quit' to exit.")
    while True:
        question = input("You: ").strip()
        if question.lower() in {"quit", "exit"}:
            break
        answer = chatbot.invoke({"question": question}, config=config)
        print("AI:", answer)

if __name__ == "__main__":
    main()`} />

      <h3>Try it</h3>
      <CodeBlock lang="text" title="sample session" code={`You: Hi, my name is Arun.
AI: Nice to meet you, Arun! How can I help?
You: What is my name?
AI: Your name is Arun.`} />

      <Callout kind="note" title="How the memory works">
        <code>RunnableWithMessageHistory</code> loads the saved messages for the session, fills <code>{'{history}'}</code>, calls the model, then saves the new question and answer. Different <code>session_id</code> values give different users separate conversations.
      </Callout>

      <h3>Ideas to extend it</h3>
      <ul>
        <li>Save history to a file or database instead of memory so it survives restarts.</li>
        <li>Trim old messages to stay inside the context window (<code>trim_messages</code>).</li>
        <li>Stream the answer with <code>chatbot.stream(...)</code>.</li>
        <li>Wrap it in a simple web UI with Streamlit.</li>
      </ul>
    </Section>
  )
}
