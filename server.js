import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/API', (req, res) => {
 res.json(data)
})

app.get('/Category/:Category', (req, res) => {
  const Category = req.params.Category;
  const hasKey = req.query.hasKey;
  const hasHttps = req.query.hasHttps;
  let APIbyCategory = data.entries.filter(item => item.Category === Category)
  if(hasKey){
    APIbyCategory = APIbyCategory.filter(item => item.Auth === "apiKey")
  } 
  if(hasHttps){
    APIbyCategory = APIbyCategory.filter(item => item.HTTPS === true)
  }
  res.json(APIbyCategory)
 })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
