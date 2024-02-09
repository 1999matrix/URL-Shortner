// server.js
const express = require('express');
const mongoose = require('mongoose');
const shortUrlController = require('./controllers/shortUrlController');
const userController = require('./controllers/userController');
// const authMiddleware = require('./middleware/authMiddleware');

const app = express();
try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
} catch (error) { 
    console.log(error);
}


app.use(express.json());

// app.post('/api/shorturl/generate', authMiddleware, shortUrlController.generate);
app.post('/api/shorturl/generate',  shortUrlController.generate);
app.get('/api/shorturl/:shortUrl', shortUrlController.redirect);
app.post('/api/user/register', userController.register);
app.post('/api/user/login', userController.login);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});