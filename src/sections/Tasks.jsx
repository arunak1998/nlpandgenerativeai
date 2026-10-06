import { Section, CodeBlock, Callout } from '../components/ui.jsx'

export default function Tasks() {
  return (
    <Section
      id="tasks"
      step="Part 6"
      title="Give the LLM some tasks: prompts and chains"
      intro="Hard-coding strings gets messy fast. A prompt template keeps the instruction fixed and lets you plug in changing input. Then the pipe operator chains template, model and parser together."
    >
      <h3>Task 1: summarize text</h3>
      <CodeBlock title="task_summarize.py" code={`from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)

prompt = ChatPromptTemplate.from_template(
    "Summarize the text below in {n} bullet points.\\n\\nText: {text}"
)

chain = prompt | llm | StrOutputParser()   # prompt -> model -> plain string

print(chain.invoke({"n": 3, "text": "LangChain is a framework that ..."}))`} />

      <h3>Task 2: translate</h3>
      <CodeBlock title="task_translate.py" code={`prompt = ChatPromptTemplate.from_messages([
    ("system", "You translate {src} into {dst}. Reply with the translation only."),
    ("human", "{text}"),
])
chain = prompt | llm | StrOutputParser()
print(chain.invoke({"src": "English", "dst": "Hindi", "text": "Good morning"}))`} />

      <h3>Task 3: structured output</h3>
      <CodeBlock title="task_structured.py" code={`from pydantic import BaseModel

class Sentiment(BaseModel):
    label: str        # positive / negative / neutral
    reason: str

structured_llm = llm.with_structured_output(Sentiment)
result = structured_llm.invoke("Review: The battery dies in an hour. Classify the sentiment.")
print(result.label, "-", result.reason)`} />

      <Callout title="Why this matters">
        The model returns a real Python object instead of free text, so your code can use it directly (save to a database, branch on the label, and so on).
      </Callout>
    </Section>
  )
}
