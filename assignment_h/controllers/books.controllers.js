const createBook = async (req, res) => {
  res.json({ message: 'You are at createBook endpoint' })
}

const deleteBook = async (req, res) => {
  res.json({ message: 'You are at deleteBook endpoint' })
}

const loanOutBook = async (req, res) => {
  res.json({ message: 'You are at loanOutBook endpoint' })
}

const returnBook = async (req, res) => {
  res.json({ message: 'You are at returnBook endpoint' })
}

const updateBook = async (req, res) => {
  res.json({ message: 'You are at updateBook endpoint' })
}

module.exports = { createBook, deleteBook, loanOutBook, returnBook, updateBook }
