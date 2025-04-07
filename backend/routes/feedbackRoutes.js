const express = require('express');
const router = express.Router();
const {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
} = require('../controlers/feedbackController');

// Get all feedback & Create new feedback
router
  .route('/')
  .get(getAllFeedback)
  .post(createFeedback);

// Get, update and delete feedback by ID
router
  .route('/:id')
  .get(getFeedbackById)
  .put(updateFeedback)
  .delete(deleteFeedback);

module.exports = router;