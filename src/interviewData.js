export const QUESTIONS = [
  // NLP
  { topic: 'NLP', q: 'What is NLP?', a: 'Natural Language Processing is teaching computers to read, understand and write human language. Examples: translation, spam filters, chatbots, search.' },
  { topic: 'NLP', q: 'Why must text be converted to numbers?', a: 'Computers can only do maths on numbers. Every NLP method (one-hot, TF-IDF, embeddings) is a way to turn words into numbers.' },
  { topic: 'NLP', q: 'What is one-hot encoding?', a: 'Each word gets a vector of zeros with a single 1 at its position in the vocabulary. It is simple, but it carries no meaning.' },
  { topic: 'NLP', q: 'What are the problems with one-hot encoding?', a: 'The vectors are huge (one slot per vocabulary word), mostly zeros, and every word is equally far from every other, so "cat" is no closer to "dog" than to "car".' },
  { topic: 'NLP', q: 'What is Bag of Words?', a: 'It represents a sentence by how many times each word appears. It ignores word order, so "dog bites man" and "man bites dog" look the same.' },
  { topic: 'NLP', q: 'What is TF-IDF?', a: 'A score for how important a word is in a document. TF is how often the word appears there. IDF lowers the score of words that appear in many documents. So "the" scores low and a rare, specific word scores high.' },
  { topic: 'NLP', q: 'What is a word embedding?', a: 'A short list of numbers that describes a word\'s meaning. Words with similar meaning get similar numbers, so "king" ends up close to "queen".' },
  { topic: 'NLP', q: 'How do we find which words are similar?', a: 'Compare their vectors. Either measure the distance (smaller = closer) or the cosine similarity (higher = more alike).' },
  { topic: 'NLP', q: 'What is cosine similarity?', a: 'It measures whether two vectors point in the same direction. 1 means identical direction (very similar), 0 means unrelated.' },
  { topic: 'NLP', q: 'What is Word2Vec?', a: 'The first popular model that learns word embeddings from text by itself. It learns that words appearing near the same neighbours have similar meaning.' },
  { topic: 'NLP', q: 'What are Skip-gram and CBOW?', a: 'The two Word2Vec training styles. Skip-gram predicts the neighbours from a word. CBOW predicts a word from its neighbours.' },
  { topic: 'NLP', q: 'What can you do with word vectors?', a: 'Find similar words, search by meaning, and do word maths such as king − man + woman ≈ queen.' },
  { topic: 'NLP', q: 'What is the limitation of Word2Vec?', a: 'One vector per word, whatever the context. "bank" (river) and "bank" (money) get the same vector. Newer models make the vector depend on the sentence.' },

  // GenAI
  { topic: 'GenAI', q: 'What is Generative AI?', a: 'AI that creates new content such as text, images, code or audio, instead of only labelling or predicting. ChatGPT, Gemini and Claude are examples.' },
  { topic: 'GenAI', q: 'How is Generative AI different from traditional AI?', a: 'Traditional AI predicts a label or number for one task (spam or not). Generative AI produces new content, and one model can do many tasks from plain-language instructions.' },
  { topic: 'GenAI', q: 'What is an LLM?', a: 'A Large Language Model. It is trained on huge amounts of text and writes by predicting the next word, over and over.' },
  { topic: 'GenAI', q: 'What is a prompt?', a: 'The instruction and input you send to the model. A clear prompt gives a better answer.' },
  { topic: 'GenAI', q: 'What is temperature?', a: 'A setting for randomness. Low (0) gives safe, repeatable answers. High gives more creative and varied answers.' },
  { topic: 'GenAI', q: 'What is hallucination?', a: 'When the model gives an answer that sounds confident but is wrong. Reduce it with clear prompts, low temperature, and by giving the facts in the prompt.' },
  { topic: 'GenAI', q: 'Prompting vs fine-tuning?', a: 'Prompting changes the input and is cheap, so try it first. Fine-tuning changes the model itself using your own examples and costs more.' },
  { topic: 'GenAI', q: 'What does "stateless" mean for an LLM?', a: 'The model remembers nothing between API calls. To give it memory, you send the earlier messages again with each new question.' },

  // LangChain
  { topic: 'LangChain', q: 'What is a framework and why use LangChain?', a: 'A framework gives ready-made building blocks so you do not write everything yourself. LangChain provides models, prompts, parsers and memory in one consistent style, and works with many providers.' },
  { topic: 'LangChain', q: 'What does invoke() do?', a: 'It sends one input to the model or chain and returns the full answer. The text is in response.content.' },
  { topic: 'LangChain', q: 'What is a prompt template?', a: 'A reusable prompt with variables, like "Summarize {text}". You fill the variables each time instead of rewriting the prompt.' },
  { topic: 'LangChain', q: 'What does the | (pipe) do in a chain?', a: 'It connects steps in order. prompt | llm | parser means: build the prompt, send it to the model, then clean the output.' },
  { topic: 'LangChain', q: 'How does chatbot memory work?', a: 'The chat history is saved per session and added to the prompt on every turn. The model sees the earlier messages, so it can answer "What is my name?".' },
  { topic: 'LangChain', q: 'How do you keep an API key safe?', a: 'Store it in a .env file or environment variable, add .env to .gitignore, and never put it in code you share.' },
]

export const TOPICS = ['All', 'NLP', 'GenAI', 'LangChain']
