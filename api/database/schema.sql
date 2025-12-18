-- Database schema for ROS 2 Robotics Education Module

-- Educational Content table
CREATE TABLE educational_content (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    type ENUM('module', 'chapter', 'section') DEFAULT 'chapter',
    order_num INT DEFAULT 0,
    prerequisites JSON, -- Array of content IDs
    learning_objectives JSON, -- Array of learning objectives
    duration INT DEFAULT 0, -- Estimated time to complete in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student Progress table
CREATE TABLE student_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    content_id VARCHAR(255) NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    score DECIMAL(5,2), -- 0-100 for assessments
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,

    UNIQUE KEY unique_student_content (student_id, content_id),
    INDEX idx_student_id (student_id),
    INDEX idx_content_id (content_id)
);

-- Assessment Questions table
CREATE TABLE assessment_questions (
    id VARCHAR(255) PRIMARY KEY,
    content_id VARCHAR(255) NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'short_answer') DEFAULT 'multiple_choice',
    options JSON, -- Array of options for multiple choice
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_content_id (content_id)
);

-- Assessment Submissions table
CREATE TABLE assessment_submissions (
    id VARCHAR(255) PRIMARY KEY,
    assessment_id VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    answers JSON NOT NULL, -- Submitted answers
    score DECIMAL(5,2), -- Score received
    max_score DECIMAL(5,2) DEFAULT 100.00,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_assessment_id (assessment_id),
    INDEX idx_student_id (student_id),
    INDEX idx_submitted_at (submitted_at)
);

-- Learning Paths table
CREATE TABLE learning_paths (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    modules JSON, -- Array of module IDs
    estimated_duration INT DEFAULT 0, -- Total estimated time in minutes
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX idx_student_progress_status ON student_progress(status);
CREATE INDEX idx_student_progress_updated ON student_progress(updated_at);
CREATE INDEX idx_assessment_questions_type ON assessment_questions(question_type);