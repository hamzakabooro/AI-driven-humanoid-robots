# API Contracts: ROS 2 Robotics Education Module

## Content Management API

### Get Module Content
- **Endpoint**: `GET /api/modules/{moduleId}`
- **Purpose**: Retrieve content for a specific module
- **Request Parameters**:
  - moduleId (path): ID of the module to retrieve
- **Response**:
  - 200: Module content with chapters and metadata
  - 404: Module not found
- **From Requirements**: FR-001, FR-004 (educational content in Markdown format)

### Get Chapter Content
- **Endpoint**: `GET /api/chapters/{chapterId}`
- **Purpose**: Retrieve content for a specific chapter
- **Request Parameters**:
  - chapterId (path): ID of the chapter to retrieve
- **Response**:
  - 200: Chapter content and learning objectives
  - 404: Chapter not found
- **From Requirements**: FR-005 (concept-first approach with minimal code)

### Update Student Progress
- **Endpoint**: `POST /api/students/{studentId}/progress`
- **Purpose**: Record student progress through content
- **Request Body**:
  - contentId (string): ID of the content being completed
  - status (string): Progress status (not_started, in_progress, completed)
- **Response**:
  - 200: Progress updated successfully
  - 400: Invalid request data
- **From Requirements**: Supports user stories for tracking learning progress

### Get Student Progress
- **Endpoint**: `GET /api/students/{studentId}/progress`
- **Purpose**: Retrieve student's progress across all content
- **Request Parameters**:
  - studentId (path): ID of the student
- **Response**:
  - 200: Student progress data
  - 404: Student not found
- **From Requirements**: Supports tracking of student learning outcomes

## Assessment API

### Submit Assessment
- **Endpoint**: `POST /api/assessments/{assessmentId}/submit`
- **Purpose**: Submit answers for an assessment
- **Request Body**:
  - studentId (string): ID of the submitting student
  - answers (object): Student answers to assessment questions
- **Response**:
  - 200: Assessment submitted and scored
  - 400: Invalid answers format
- **From Requirements**: SC-006 (knowledge assessments with 75% target)

### Get Assessment Results
- **Endpoint**: `GET /api/assessments/{assessmentId}/results`
- **Purpose**: Retrieve results for a completed assessment
- **Request Parameters**:
  - assessmentId (path): ID of the assessment
  - studentId (query): ID of the student (optional for admin access)
- **Response**:
  - 200: Assessment results with score and feedback
  - 404: Assessment or results not found
- **From Requirements**: SC-001-SC-008 (measurable outcomes)