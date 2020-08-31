const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config');
const routes = require('./routes');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

mongoose.connect(
    'mongodb+srv://web:web@cluster0.dmdbg.mongodb.net/<web_db>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use('/web/assets/css', express.static(path.join(__dirname, '../../web/assets/css')));
app.use('/web/assets/js', express.static(path.join(__dirname, '../../web/assets/js')));
app.use('/web/assets/img', express.static(path.join(__dirname, '../../web/assets/img')));
app.use('/web/assets/fonts', express.static(path.join(__dirname, '../../web/assets/fonts')));
app.use('/web/public', express.static(path.join(__dirname, '../../web/public')));

app.get('/', (req, res) => {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        if (!token) {
            return res.sendFile('login.html', { root: path.join(__dirname, '../../web/public/') });
        } else {
            jwt.verify(token, config.getJwtSecret(), (err, decoded) => { // eslint-disable-line no-unused-vars
                if (err) {
                    return res.sendFile('login.html', { root: path.join(__dirname, '../../web/public/') });
                } else {
                    return res.sendFile('index.html', { root: path.join(__dirname, '../../web/public/') });
                }
            });
        }
    } else {
        return res.sendFile('login.html', { root: path.join(__dirname, '../../web/public/') });
    }
});

// HANDLER PARA TODAS AS ROTAS NÃO TRATADAS --> deve ser última rota a  ser tratada
app.all('*', (req,res) => {
 
   // return res.sendFile('not_found.html', { root: path.join(__dirname, '../../web/public/') });
   res.status(404);
   return res.redirect('/web/public/not_found.html');
});


app.listen(config.getAPIPort(), config.getAPIAddress());
