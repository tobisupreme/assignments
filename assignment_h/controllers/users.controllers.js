const login = async (req, res) => {
  res.json({ message: 'You are at login endpoint' })
}

const createUser = async (req, res) => {
  res.json({ message: 'You are at createUser endpoint' })
}

const getAllUsers = async (req, res) => {
  res.json({ message: 'You are at getAllUsers endpoint' })
}

module.exports = { createUser, login, getAllUsers }
