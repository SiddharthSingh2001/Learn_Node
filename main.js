const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const HomeFunc = require('./Routes/homeFunc')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Public'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
require('./Global');
const port = 3000;

app.use('/Home', HomeFunc);

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});