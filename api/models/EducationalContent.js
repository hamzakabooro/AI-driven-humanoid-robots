/**
 * Educational Content Model
 * Represents modules, chapters, and sections in the educational system
 */

class EducationalContent {
  constructor(id, title, content, type = 'chapter', order = 0, prerequisites = [], learningObjectives = [], duration = 0) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.type = type; // 'module', 'chapter', 'section'
    this.order = order;
    this.prerequisites = prerequisites;
    this.learningObjectives = learningObjectives;
    this.duration = duration; // Estimated time to complete in minutes
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Validate the educational content
  validate() {
    const errors = [];

    if (!this.id) errors.push('ID is required');
    if (!this.title) errors.push('Title is required');
    if (!this.content) errors.push('Content is required');
    if (!['module', 'chapter', 'section'].includes(this.type)) errors.push('Type must be module, chapter, or section');
    if (this.order < 0) errors.push('Order must be a positive number');
    if (this.duration < 0) errors.push('Duration must be a positive number');

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Update content
  update(updates) {
    const updatableFields = ['title', 'content', 'order', 'prerequisites', 'learningObjectives', 'duration'];

    for (const field in updates) {
      if (updatableFields.includes(field)) {
        this[field] = updates[field];
      }
    }

    this.updatedAt = new Date().toISOString();
  }

  // Get content summary
  getSummary() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      order: this.order,
      duration: this.duration,
      learningObjectives: this.learningObjectives,
      createdAt: this.createdAt
    };
  }
}

module.exports = EducationalContent;