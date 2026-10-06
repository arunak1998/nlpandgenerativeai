export const NAV = [
  ['roadmap', 'Roadmap'],
  ['evolution', 'NLP evolution'],
  ['onehot', 'One-hot'],
  ['tfidf', 'TF-IDF'],
  ['embeddings', 'Embeddings'],
  ['word2vec', 'Word2Vec'],
  ['genai', 'What is GenAI'],
  ['frameworks', 'Frameworks'],
  ['setup', 'First call'],
  ['tasks', 'Chains'],
  ['project', 'Mini project'],
  ['interview', 'Interview prep'],
]

export const numberOf = (id) => String(NAV.findIndex(([k]) => k === id)).padStart(2, '0')
