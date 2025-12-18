// Basic Node.js/Express server for API endpoints
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for development (in production, use a real database)
let studentProgress = {};
let assessments = {};

// Educational content data (in a real implementation, this would come from a database or file system)
const modules = {
  "module-1": {
    id: "module-1",
    title: "ROS 2 Fundamentals",
    description: "Learn the fundamentals of ROS 2 architecture, including nodes, topics, and services",
    chapters: [
      {
        id: "chapter-1-ros2-fundamentals",
        title: "Chapter 1 - ROS 2 Fundamentals",
        contentPath: "../docs/module-1/chapter-1-ros2-fundamentals.md"
      },
      {
        id: "chapter-2-python-agents-rclpy",
        title: "Chapter 2 - Python Agents with rclpy",
        contentPath: "../docs/module-1/chapter-2-python-agents-rclpy.md"
      },
      {
        id: "chapter-3-urdf-humanoid-description",
        title: "Chapter 3 - Humanoid Description with URDF",
        contentPath: "../docs/module-1/chapter-3-urdf-humanoid-description.md"
      }
    ],
    learningObjectives: [
      "Explain ROS 2 architecture and communication",
      "Use Python (rclpy) to interface AI logic with robots",
      "Understand humanoid structure via URDF"
    ]
  }
};

// GET /api/modules/{moduleId} endpoint
app.get('/api/modules/:moduleId', async (req, res) => {
  try {
    const { moduleId } = req.params;

    if (!modules[moduleId]) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // In a real implementation, we would read the actual content files
    // For now, we return the module structure
    const moduleData = { ...modules[moduleId] };

    // Read content for each chapter if requested
    if (req.query.includeContent === 'true') {
      for (const chapter of moduleData.chapters) {
        try {
          // In a real implementation, we would read the actual content file
          chapter.content = `Content for ${chapter.title} would be loaded from ${chapter.contentPath}`;
        } catch (error) {
          console.error(`Error reading content for chapter ${chapter.id}:`, error);
          chapter.content = `Error loading content for ${chapter.title}`;
        }
      }
    }

    res.json(moduleData);
  } catch (error) {
    console.error('Error retrieving module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/chapters/{chapterId} endpoint
app.get('/api/chapters/:chapterId', async (req, res) => {
  try {
    // Find the chapter across all modules
    let targetChapter = null;
    let parentModule = null;

    for (const moduleId in modules) {
      const module = modules[moduleId];
      const chapter = module.chapters.find(ch => ch.id === req.params.chapterId);
      if (chapter) {
        targetChapter = { ...chapter };
        parentModule = module;
        break;
      }
    }

    if (!targetChapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    // In a real implementation, we would read the actual content file
    try {
      // For now, we'll return a placeholder with the chapter info
      targetChapter.content = `Full content for ${targetChapter.title} would be loaded from ${targetChapter.contentPath}`;
      targetChapter.module = parentModule.id;
      targetChapter.moduleTitle = parentModule.title;
    } catch (error) {
      console.error(`Error reading content for chapter ${targetChapter.id}:`, error);
      targetChapter.content = `Error loading content for ${targetChapter.title}`;
    }

    // Add learning objectives from the parent module
    targetChapter.learningObjectives = parentModule.learningObjectives;

    res.json(targetChapter);
  } catch (error) {
    console.error('Error retrieving chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/students/{studentId}/progress for tracking progress
app.post('/api/students/:studentId/progress', (req, res) => {
  try {
    const { studentId } = req.params;
    const { contentId, status } = req.body;

    // Validate input
    if (!contentId || !status) {
      return res.status(400).json({ error: 'contentId and status are required' });
    }

    // Validate status value
    const validStatuses = ['not_started', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Initialize student progress if not exists
    if (!studentProgress[studentId]) {
      studentProgress[studentId] = {};
    }

    // Update progress
    const timestamp = new Date().toISOString();
    studentProgress[studentId][contentId] = {
      status,
      lastUpdated: timestamp,
      ...(status === 'completed' && { completedAt: timestamp }) // Add completion time if status is completed
    };

    res.json({
      message: 'Progress updated successfully',
      studentId,
      contentId,
      status,
      lastUpdated: timestamp
    });
  } catch (error) {
    console.error('Error updating student progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/students/{studentId}/progress for retrieving progress
app.get('/api/students/:studentId/progress', (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if student exists in progress tracking
    if (!studentProgress[studentId]) {
      return res.status(404).json({
        message: 'No progress data found for this student',
        progress: {}
      });
    }

    res.json({
      studentId,
      progress: studentProgress[studentId],
      summary: {
        totalContent: Object.keys(studentProgress[studentId]).length,
        completed: Object.values(studentProgress[studentId]).filter(item => item.status === 'completed').length,
        inProgress: Object.values(studentProgress[studentId]).filter(item => item.status === 'in_progress').length,
        notStarted: Object.values(studentProgress[studentId]).filter(item => item.status === 'not_started').length
      }
    });
  } catch (error) {
    console.error('Error retrieving student progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/assessments/{assessmentId}/submit for assessment submission
app.post('/api/assessments/:assessmentId/submit', (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { studentId, answers } = req.body;

    // Validate input
    if (!studentId || !answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'studentId and answers are required' });
    }

    // Initialize assessments for this assessmentId if needed
    if (!assessments[assessmentId]) {
      assessments[assessmentId] = {};
    }

    // Initialize student assessments if needed
    if (!assessments[assessmentId][studentId]) {
      assessments[assessmentId][studentId] = [];
    }

    // Calculate score (in a real implementation, this would check answers against correct answers)
    // For now, we'll just store the answers and give a dummy score
    const submission = {
      id: `sub_${Date.now()}`, // Simple ID generation
      studentId,
      answers,
      submittedAt: new Date().toISOString(),
      score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100 for demo
      maxScore: 100
    };

    // Add to student's assessment history
    assessments[assessmentId][studentId].push(submission);

    // Update student progress to mark assessment as completed
    if (!studentProgress[studentId]) {
      studentProgress[studentId] = {};
    }
    studentProgress[studentId][`assessment_${assessmentId}`] = {
      status: 'completed',
      lastUpdated: submission.submittedAt,
      completedAt: submission.submittedAt
    };

    res.json({
      message: 'Assessment submitted successfully',
      submissionId: submission.id,
      score: submission.score,
      maxScore: submission.maxScore,
      percentage: Math.round((submission.score / submission.maxScore) * 100)
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/assessments/{assessmentId}/results for results retrieval
app.get('/api/assessments/:assessmentId/results', (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { studentId } = req.query; // studentId is optional - if not provided, return all results for this assessment

    // Check if assessment exists
    if (!assessments[assessmentId]) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    if (studentId) {
      // Return results for specific student
      if (!assessments[assessmentId][studentId] || assessments[assessmentId][studentId].length === 0) {
        return res.status(404).json({
          message: 'No assessment results found for this student',
          results: []
        });
      }

      res.json({
        assessmentId,
        studentId,
        results: assessments[assessmentId][studentId],
        summary: {
          totalSubmissions: assessments[assessmentId][studentId].length,
          latestScore: assessments[assessmentId][studentId][0].score, // Most recent submission
          averageScore: assessments[assessmentId][studentId].reduce((sum, sub) => sum + sub.score, 0) / assessments[assessmentId][studentId].length
        }
      });
    } else {
      // Return results for all students (admin view)
      const allResults = {};
      let totalSubmissions = 0;
      let totalScore = 0;
      let submissionCount = 0;

      for (const sid in assessments[assessmentId]) {
        allResults[sid] = assessments[assessmentId][sid];
        for (const submission of assessments[assessmentId][sid]) {
          totalSubmissions++;
          totalScore += submission.score;
          submissionCount++;
        }
      }

      res.json({
        assessmentId,
        results: allResults,
        summary: {
          totalSubmissions,
          averageScore: submissionCount > 0 ? totalScore / submissionCount : 0,
          studentCount: Object.keys(allResults).length
        }
      });
    }
  } catch (error) {
    console.error('Error retrieving assessment results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'ROS 2 Robotics Education API Server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;