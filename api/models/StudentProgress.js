/**
 * Student Progress Model
 * Tracks student progress through educational content
 */

class StudentProgress {
  constructor(studentId, contentId, status = 'not_started', score = null) {
    this.studentId = studentId;
    this.contentId = contentId;
    this.status = status; // 'not_started', 'in_progress', 'completed'
    this.score = score; // 0-100 for assessments, null otherwise
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.completionDate = status === 'completed' ? new Date().toISOString() : null;
  }

  // Validate the progress record
  validate() {
    const errors = [];

    if (!this.studentId) errors.push('Student ID is required');
    if (!this.contentId) errors.push('Content ID is required');
    if (!['not_started', 'in_progress', 'completed'].includes(this.status)) {
      errors.push('Status must be not_started, in_progress, or completed');
    }
    if (this.score !== null && (this.score < 0 || this.score > 100)) {
      errors.push('Score must be between 0 and 100');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Update progress status
  updateStatus(newStatus, newScore = null) {
    if (!['not_started', 'in_progress', 'completed'].includes(newStatus)) {
      throw new Error('Invalid status value');
    }

    this.status = newStatus;
    this.updatedAt = new Date().toISOString();

    if (newScore !== null) {
      if (newScore < 0 || newScore > 100) {
        throw new Error('Score must be between 0 and 100');
      }
      this.score = newScore;
    }

    if (newStatus === 'completed' && !this.completionDate) {
      this.completionDate = new Date().toISOString();
    } else if (newStatus !== 'completed') {
      this.completionDate = null;
    }
  }

  // Get progress summary
  getSummary() {
    return {
      studentId: this.studentId,
      contentId: this.contentId,
      status: this.status,
      score: this.score,
      completionDate: this.completionDate,
      lastUpdated: this.updatedAt
    };
  }
}

module.exports = StudentProgress;