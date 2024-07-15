// models/Mentor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorSchema = new Schema({
  name: String,
  email: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Mentor', MentorSchema);
