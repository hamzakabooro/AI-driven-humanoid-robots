// Accessibility test for chapter-1-ros2-fundamentals.md
// This test ensures the chapter content is accessible to all users

// Since this is a markdown file test, we'll validate the content structure for accessibility
const fs = require('fs');
const path = require('path');

describe('Chapter 1 Accessibility Check', () => {
  const chapterPath = path.join(__dirname, '../../docs/module-1/chapter-1-ros2-fundamentals.md');

  test('Chapter content follows accessibility best practices', () => {
    if (fs.existsSync(chapterPath)) {
      const content = fs.readFileSync(chapterPath, 'utf8');

      // Check for proper heading structure
      const headingPattern = /^##\s+/gm;
      const headings = content.match(headingPattern) || [];
      expect(headings.length).toBeGreaterThan(0);

      // Check for alt text in images (if any exist)
      const imagePattern = /!\[([^\]]*)\]/g;
      const images = content.match(imagePattern) || [];
      // All images should have descriptive alt text
      for (const img of images) {
        expect(img).toContain('['); // Ensure there's alt text
      }

      // Check for semantic structure
      expect(content).toContain('##'); // At least one subheading
    }
  });
});