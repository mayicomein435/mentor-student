// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mentorStudentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));



app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
