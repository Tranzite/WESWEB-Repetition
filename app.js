//Inkludera Express.js
const express = require('express')

//Inkludera dbModule.js
const dbModule = require('./dBModule')

//Inkludera MessageModel för att kunna spara meddelanden i databasen 
const MessageModel = require('./MessageModel')

//Gör en instans klassen express
const app = express()

//Ange porten som servern kommer att lyssna på.
const port = 3000

//Sökväg till sökväg till en mapp för alla statiska sidor och sätt den som default sökväg.
const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

//Sätt upp servern så att den kan tyda json och urlencoded
app.use(express.json())
app.use(express.urlencoded())

//Ställ in EJS som vymotor för servern. 
app.set('view engine' , 'ejs')

//Lyssnar på GET requests på addressen <domain>/
app.get('/', (req, res) => {
    //rendera sidan index.ejs
  res.render('index.ejs')
})

app.get('/produkter', (req, res) => {
  //rendera sidan index.ejs
res.render('produkter.ejs')
})

app.get('/services', (req, res) => {
  //rendera sidan index.ejs
res.render('services.ejs')
})

//Lyssnar på POST requests på addressen <domain>/
app.post('/', function (req, res) {
    const message = MessageModel.createMessage(req.body.email, req.body.message)
    
    dbModule.storeElement(message)

    let text =  " " + req.body.message

    res.render('pages/index.ejs', { text })
})

//Sätt igång servern så att den kan ta emot requests på vald port.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))