# Quickstart Guide: ROS 2 Robotics Education Module

## Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Git
- Basic command line knowledge

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
```bash
cd website
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm start
# or
yarn start
```

This will start a local development server at `http://localhost:3000` with hot reloading.

### 4. Build for Production
```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build/` directory.

## Project Structure

```
website/                    # Docusaurus project root
├── docusaurus.config.js    # Main configuration
├── package.json           # Dependencies and scripts
├── docs/                  # Documentation content
│   └── module-1/          # Module 1 content
│       ├── chapter-1-ros2-fundamentals.md
│       ├── chapter-2-python-agents-rclpy.md
│       └── chapter-3-urdf-humanoid-description.md
└── src/                   # Custom components/pages
```

## Adding New Content

To add a new chapter to Module 1:

1. Create a new Markdown file in `docs/module-1/`
2. Follow the naming convention: `chapter-X-topic-description.md`
3. Include frontmatter with metadata:
   ```markdown
   ---
   title: Chapter Title
   sidebar_position: X
   description: Brief description of the chapter
   ---
   ```

## Running Tests

### Content Validation
```bash
npm run lint:docs  # Check for broken links and content issues
```

### End-to-End Tests
```bash
npm run test:e2e   # Run end-to-end tests
```

## Deployment

The site is configured for GitHub Pages deployment:

1. Build the site: `npm run build`
2. The `build/` directory contains the static site ready for deployment
3. Configure GitHub Pages to serve from the `build/` directory or use GitHub Actions for automated deployment

## Customization

### Site Configuration
Edit `docusaurus.config.js` to modify:
- Site title and description
- Navigation structure
- Theme settings
- Plugin configurations

### Styling
- Global styles in `src/css/custom.css`
- Component-specific styles using CSS modules