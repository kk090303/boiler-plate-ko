const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kimhyundo:840606khd%21@boilerplate.16rla.mongodb.net/boilerplate?retryWrites=true&w=majority',{
	useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})