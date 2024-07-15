// routes/mentor.js
const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a mentor
router.post('/create', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign multiple students to a mentor
router.post('/:mentorId/addStudents', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).send({ error: 'Mentor not found' });
    }

    const students = await Student.find({ _id: { $in: studentIds }, mentor: null });
    if (!students.length) {
      return res.status(400).send({ error: 'No students available to assign' });
    }

    students.forEach(student => {
      student.mentor = mentorId;
      mentor.students.push(student._id);
    });

    await Promise.all(students.map(student => student.save()));
    await mentor.save();

    res.send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) {
      return res.status(404).send({ error: 'Mentor not found' });
    }

    res.send(mentor.students);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
