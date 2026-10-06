// Small, readable NLP helpers used by the live demos.


export function words(text) {
  return text.toLowerCase().match(/[a-z']+/g) ?? []
}

export function vocabulary(sentences) {
  return [...new Set(sentences.flatMap(words))].sort()
}

// One-hot: a vector with a single 1 at the word's index in the vocabulary.
export function oneHot(word, vocab) {
  return vocab.map((v) => (v === word ? 1 : 0))
}

// Bag of words: count of each vocabulary word in a sentence.
export function bagOfWords(sentence, vocab) {
  const ws = words(sentence)
  return vocab.map((v) => ws.filter((w) => w === v).length)
}

// TF-IDF with smoothed idf: idf = ln((1 + N) / (1 + df)) + 1
export function tfidf(docs) {
  const vocab = vocabulary(docs)
  const tokenized = docs.map(words)
  const n = docs.length
  const idf = vocab.map((v) => {
    const df = tokenized.filter((d) => d.includes(v)).length
    return Math.log((1 + n) / (1 + df)) + 1
  })
  const rows = tokenized.map((d) =>
    vocab.map((v, i) => {
      const tf = d.filter((w) => w === v).length / (d.length || 1)
      return tf * idf[i]
    }),
  )
  return { vocab, idf, rows }
}

// --- Embeddings ---------------------------------------------------------

// Each word is described by named features (0 = not at all, 1 = very much).
// Real embeddings learn their features automatically and they have no names.
export const FEATURES = ['Royal', 'Male', 'Human', 'Animal', 'Food', 'Vehicle']

export const EMBEDDINGS = {
  king:   [0.95, 0.9, 0.9, 0, 0, 0],
  queen:  [0.95, 0.1, 0.9, 0, 0, 0],
  prince: [0.8, 0.9, 0.9, 0, 0, 0],
  man:    [0.1, 0.9, 0.9, 0, 0, 0],
  woman:  [0.1, 0.1, 0.9, 0, 0, 0],
  cat:    [0, 0, 0, 0.95, 0, 0],
  dog:    [0, 0, 0, 0.9, 0, 0],
  puppy:  [0, 0, 0, 0.85, 0, 0],
  apple:  [0, 0, 0, 0, 0.95, 0],
  banana: [0, 0, 0, 0, 0.9, 0],
  mango:  [0, 0, 0, 0, 0.92, 0],
  car:    [0, 0, 0, 0, 0, 0.95],
  bus:    [0, 0, 0, 0, 0, 0.9],
  bike:   [0, 0, 0, 0, 0, 0.8],
}

export const WORDS = Object.keys(EMBEDDINGS)

export function cosine(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  return dot / (Math.hypot(...a) * Math.hypot(...b))
}

export function distance(a, b) {
  return Math.hypot(...a.map((v, i) => v - b[i]))
}

// Closest words to any vector, most similar first.
export function closestTo(vector, exclude = [], k = 4) {
  return WORDS.filter((w) => !exclude.includes(w))
    .map((w) => ({ word: w, score: cosine(vector, EMBEDDINGS[w]), dist: distance(vector, EMBEDDINGS[w]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}

// The feature where both words are strongest, e.g. "Animal" for cat and dog.
export function sharedFeature(a, b) {
  const va = EMBEDDINGS[a]
  const vb = EMBEDDINGS[b]
  const best = FEATURES.map((_, i) => Math.min(va[i], vb[i]))
  return FEATURES[best.indexOf(Math.max(...best))]
}

// Word math: A - B + C
export function wordMath(a, b, c) {
  return EMBEDDINGS[a].map((v, i) => v - EMBEDDINGS[b][i] + EMBEDDINGS[c][i])
}

// --- Word2Vec training pairs ---------------------------------------------

// Skip-gram: for every word, pair it with the words within `window` positions.
export function skipGramPairs(sentence, window = 2) {
  const ws = words(sentence)
  return ws.flatMap((center, i) =>
    ws
      .slice(Math.max(0, i - window), i + window + 1)
      .filter((_, k) => k + Math.max(0, i - window) !== i)
      .map((context) => [center, context]),
  )
}
