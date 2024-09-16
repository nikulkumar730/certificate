
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const certificateRoutes = require('./routes/certificateRoutes');
const app = express();

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173', // Your Vite frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

// Middleware for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling file uploads and static files
app.use('/api/certificates', certificateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Server creation
app.listen(process.env.PORT || 8300, (err) => {
  if (err) {
    console.error(`Error occurred while starting the server: ${err.message}`);
    process.exit(1);
  } else {
    console.log(`Server is running on port: ${process.env.PORT || 8300}`);
  }
});
