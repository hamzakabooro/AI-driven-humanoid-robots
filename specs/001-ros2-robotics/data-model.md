# Data Model: ROS 2 Robotics Education Module

## Entities

### Educational Content
- **Name**: Module/Chapter/Section
- **Fields**:
  - id (string): Unique identifier for the content piece
  - title (string): Display title of the content
  - content (string): Markdown content
  - order (integer): Sequential order in the learning path
  - prerequisites (array of strings): IDs of required content pieces
  - learningObjectives (array of strings): What the student should learn
  - duration (integer): Estimated time to complete in minutes
- **Relationships**: Parent-child relationship for module/chapter/section hierarchy
- **Validation**: Title and content are required, order must be positive

### Student Progress
- **Name**: StudentProgress
- **Fields**:
  - studentId (string): Unique identifier for the student
  - contentId (string): ID of the content piece
  - status (enum): ["not_started", "in_progress", "completed"]
  - completionDate (date): When the content was completed
  - score (number): Assessment score if applicable (0-100)
- **Relationships**: Links to Educational Content and Student entities
- **Validation**: Status must be one of the defined enum values, score must be 0-100 if provided

### Assessment Question
- **Name**: AssessmentQuestion
- **Fields**:
  - id (string): Unique identifier for the question
  - contentId (string): ID of the associated content piece
  - questionText (string): The text of the question
  - questionType (enum): ["multiple_choice", "true_false", "short_answer"]
  - options (array of strings): For multiple choice questions
  - correctAnswer (string): The correct answer
  - explanation (string): Explanation of the correct answer
- **Relationships**: Associated with specific Educational Content
- **Validation**: Question text is required, options required for multiple choice

### Learning Path
- **Name**: LearningPath
- **Fields**:
  - id (string): Unique identifier for the learning path
  - title (string): Title of the learning path
  - description (string): Overview of the learning path
  - modules (array of strings): IDs of modules in the path
  - estimatedDuration (integer): Total estimated time in minutes
  - difficultyLevel (enum): ["beginner", "intermediate", "advanced"]
- **Relationships**: Contains multiple Educational Content entities
- **Validation**: Title and description required, difficulty level must be valid

## State Transitions

### Student Progress Transitions
- "not_started" → "in_progress" when student begins content
- "in_progress" → "completed" when student completes content and passes assessment
- "completed" → "in_progress" if student needs to review content

## Validation Rules from Requirements

1. Content must be accessible to AI students with basic Python knowledge
2. Chapters must follow progressive difficulty order
3. Each chapter must include key takeaways
4. Content must be in Markdown format compatible with Docusaurus
5. Concepts should be prioritized over code examples