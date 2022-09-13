const express = require('express')
const app = express()

// server listening on 3003, or process.env.PORT
const PORT = process.env.PORT || 3003
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
