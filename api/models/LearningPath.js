/**
 * Learning Path Model
 * Represents a structured sequence of educational content
 */

class LearningPath {
  constructor(id, title, description, modules = [], estimatedDuration = 0, difficultyLevel = 'beginner') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.modules = modules; // Array of module IDs
    this.estimatedDuration = estimatedDuration; // Total estimated time in minutes
    this.difficultyLevel = difficultyLevel; // 'beginner', 'intermediate', 'advanced'
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validate the learning path
  validate() {
    const errors = [];

    if (!this.id) errors.push('ID is required');
    if (!this.title) errors.push('Title is required');
    if (!this.description) errors.push('Description is required');
    if (!Array.isArray(this.modules) || this.modules.length === 0) errors.push('At least one module is required');
    if (this.estimatedDuration < 0) errors.push('Estimated duration must be a positive number');
    if (!['beginner', 'intermediate', 'advanced'].includes(this.difficultyLevel)) {
      errors.push('Difficulty level must be beginner, intermediate, or advanced');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Add a module to the learning path
  addModule(moduleId) {
    if (!this.modules.includes(moduleId)) {
      this.modules.push(moduleId);
      this.updatedAt = new Date().toISOString();
    }
  }

  // Remove a module from the learning path
  removeModule(moduleId) {
    this.modules = this.modules.filter(id => id !== moduleId);
    this.updatedAt = new Date().toISOString();
  }

  // Update learning path
  update(updates) {
    const updatableFields = ['title', 'description', 'modules', 'estimatedDuration', 'difficultyLevel'];

    for (const field in updates) {
      if (updatableFields.includes(field)) {
        this[field] = updates[field];
      }
    }

    this.updatedAt = new Date().toISOString();
  }

  // Get learning path summary
  getSummary() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      moduleCount: this.modules.length,
      estimatedDuration: this.estimatedDuration,
      difficultyLevel: this.difficultyLevel,
      createdAt: this.createdAt
    };
  }
}

module.exports = LearningPath;