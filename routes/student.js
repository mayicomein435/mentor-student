// routes/student.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create a student
router.post('/create', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign or change mentor for a particular student
router.post('/:studentId/assignMentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = mentorId;
    await student.save();

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).send({ error: 'Mentor not found' });
    }

    if (!mentor.students.includes(studentId)) {
      mentor.students.push(studentId);
      await mentor.save();
    }

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get previously assigned mentors for a particular student
router.get('/:studentId/previousMentors', async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate('previousMentors');
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    res.send(student.previousMentors);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get list of students without a mentor
router.get('/withoutMentor', async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
