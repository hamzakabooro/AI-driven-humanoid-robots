// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 Fundamentals',
      items: [
        'module-1/chapter-1-ros2-fundamentals',
        'module-1/chapter-2-python-agents-rclpy',
        'module-1/chapter-3-urdf-humanoid-description'
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin Simulation',
      items: [
        'module-2/chapter-1-digital-twins-robotics',
        'module-2/chapter-2-physics-simulation-gazebo',
        'module-2/chapter-3-sensor-simulation'
      ],
    },
    {
      type: 'category',
      label: 'Module 3: AI-Robot Brain',
      items: [
        'module-3/chapter-1-nvidia-isaac-ai-brain',
        'module-3/chapter-2-perception-isaac-sim-ros',
        'module-3/chapter-3-navigation-nav2-humanoids'
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4/chapter-1-vla-foundations',
        'module-4/chapter-2-voice-to-action',
        'module-4/chapter-3-cognitive-planning'
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'advanced/ros2-architecture',
        'advanced/ros2-communication-patterns',
        'advanced/robot-control-theory'
      ],
    },
  ],
};

export default sidebars;
