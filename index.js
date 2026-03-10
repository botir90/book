require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authorRouter = require('./router/author.routes');
const bookRouter = require('./router/book.routes');
const errorMiddleware = require('./middleware/error.middleware');
const authRouter = require('./router/auth.routes');
const audioRouter = require('./router/audio.routes');
const quoteRouter = require('./router/quote.routes');
const CookieParser = require('cookie-parser');
const ebookRouter = require('./router/ebook.routes');
const YAML = require("yamljs")
const swaggerui = require("swagger-ui-express")

const PORT = process.env.PORT || 5000;
const app = express();
const swaggerDocument = YAML.load('./docs/documantation.yml');

app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument))
connectDB();
app.use(express.json());
app.use(cors());
app.use(CookieParser());

// Routers
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api', audioRouter);
app.use('/api', quoteRouter);

app.use('/api', ebookRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portida ishga tushdi`);
});




