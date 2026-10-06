# From NLP to Generative AI

An interactive, step-by-step guide that follows how NLP evolved, from one-hot encoding to Generative AI, and ends with a small LangChain chatbot you build yourself.

Related guide: [How Transformers Work](https://transformer-navy.vercel.app/)

## What is inside

| # | Chapter | Live demo |
|---|---------|-----------|
| 00 | Roadmap | |
| 01 | NLP evolution | |
| 02 | One-hot encoding and Bag of Words | One-hot encoder |
| 03 | TF-IDF | TF-IDF calculator |
| 04 | Word embeddings | Feature vectors, closest words |
| 05 | Word2Vec | Training pairs, word math |
| 06 | What is Generative AI | |
| 07 | Frameworks and why LangChain | |
| 08 | First model call (Gemini) | |
| 09 | Prompts and chains | |
| 10 | Mini project: Q&A chatbot with memory | Memory demo |
| 11 | Interview prep (27 questions) | Search and filters |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
```

The build pre-renders the page into `dist/index.html`, so the full text is in the HTML. This lets tools such as NotebookLM and search engines read the content.

## Deploy

Deploy to Vercel with these settings:

- Build command: `npm run build`
- Output directory: `dist`

## Python examples

The chatbot code in the site uses Google Gemini through LangChain.

```bash
pip install langchain langchain-google-genai python-dotenv
```

Put your key in a `.env` file and never commit it:

```
GOOGLE_API_KEY=your-key-here
```

## Tech

React and Vite.

## Author

Built by Arunkumar Ravichandran.
