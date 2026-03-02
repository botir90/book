require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authorRouter = require('./router/author.routes');
const bookRouter = require('./router/book.routes');
const errorMiddleware = require('./middleware/error.middleware');
const authRouter = require('./router/auth.routes');

const CookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use(CookieParser());

const quoteRouter = require('./router/quote.routes');

app.use('/api', quoteRouter)
// Routers
app.use(authorRouter);
app.use(bookRouter);
app.use(authRouter)

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portida ishga tushdi`);
});




