const express = require('express');
const mongoose = require('mongoose');
const { router: authRoutes, auth } = require('./routes/auth');
const employeeRoutes = require('./routes/employee'); // Assume you have employee routes defined
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // For legacy browser support
  };
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hrm', { useNewUrlParser: true, useUnifiedTopology: true });


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', auth, employeeRoutes); // Protect employee routes with auth middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;

