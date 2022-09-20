const app = require('./index')

// server listening on 3003, or process.env.PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
