// models/Student.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  email: String,
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  previousMentors: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }]
});

module.exports = mongoose.model('Student', StudentSchema);
