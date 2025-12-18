/**
 * Assessment Question Model
 * Represents questions in educational assessments
 */

class AssessmentQuestion {
  constructor(id, contentId, questionText, questionType = 'multiple_choice', options = [], correctAnswer, explanation = '') {
    this.id = id;
    this.contentId = contentId;
    this.questionText = questionText;
    this.questionType = questionType; // 'multiple_choice', 'true_false', 'short_answer'
    this.options = options; // For multiple choice questions
    this.correctAnswer = correctAnswer;
    this.explanation = explanation; // Explanation of the correct answer
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validate the assessment question
  validate() {
    const errors = [];

    if (!this.id) errors.push('ID is required');
    if (!this.contentId) errors.push('Content ID is required');
    if (!this.questionText) errors.push('Question text is required');
    if (!['multiple_choice', 'true_false', 'short_answer'].includes(this.questionType)) {
      errors.push('Question type must be multiple_choice, true_false, or short_answer');
    }
    if (!this.correctAnswer) errors.push('Correct answer is required');

    if (this.questionType === 'multiple_choice' && (!this.options || this.options.length === 0)) {
      errors.push('Options are required for multiple choice questions');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Update question
  update(updates) {
    const updatableFields = ['questionText', 'questionType', 'options', 'correctAnswer', 'explanation'];

    for (const field in updates) {
      if (updatableFields.includes(field)) {
        this[field] = updates[field];
      }
    }

    this.updatedAt = new Date().toISOString();
  }

  // Check if an answer is correct
  checkAnswer(answer) {
    // For multiple choice and true/false, we can do exact match
    // For short answer, this would require more sophisticated checking in a real implementation
    return this.correctAnswer.toString().toLowerCase() === answer.toString().toLowerCase();
  }

  // Get question for presentation (hide correct answer)
  getForPresentation() {
    return {
      id: this.id,
      contentId: this.contentId,
      questionText: this.questionText,
      questionType: this.questionType,
      options: this.questionType === 'multiple_choice' ? this.options : undefined,
      createdAt: this.createdAt
    };
  }
}

module.exports = AssessmentQuestion;