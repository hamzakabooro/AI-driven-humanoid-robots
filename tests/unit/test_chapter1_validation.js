// Test for content validation of chapter-1-ros2-fundamentals.md
// This test ensures the chapter content follows the required structure and contains essential elements

const fs = require('fs');
const path = require('path');

// Test to validate the ROS 2 fundamentals chapter content
describe('Chapter 1 Content Validation', () => {
  const chapterPath = path.join(__dirname, '../../docs/module-1/chapter-1-ros2-fundamentals.md');

  test('Chapter file exists', () => {
    expect(fs.existsSync(chapterPath)).toBe(true);
  });

  test('Chapter contains essential ROS 2 concepts', () => {
    if (fs.existsSync(chapterPath)) {
      const content = fs.readFileSync(chapterPath, 'utf8');

      // Check for essential concepts mentioned in the requirements
      expect(content.toLowerCase()).toContain('nodes');
      expect(content.toLowerCase()).toContain('topics');
      expect(content.toLowerCase()).toContain('services');
      expect(content.toLowerCase()).toContain('ros 2');
      expect(content.toLowerCase()).toContain('middleware');
    }
  });
});