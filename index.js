//Définition des modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;

require('dotenv').config()

//On définit notre objet express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Définition du routeur
const appRoutes = express.Router();
app.use('/', appRoutes);

const contact = require('./controllers/contact');
appRoutes.route('/contact').post(contact.contact)

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});