const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use(require('./src/routes'));

//auth routes
const authRoutes = require('./src/routes/auth');

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () =>
  console.log(` Backend running on http://localhost:${process.env.PORT}`)
);