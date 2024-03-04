# Dubai Landmarks 🕌🏙️

Welcome to the Dubai Landmarks project! This Angular-based web application showcases the beautiful and iconic landmarks of Dubai.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 20.11.1 or later
- **npm**: Version 10.4.0 or later
- **Angular CLI**: Version 17.2.1 or later

## Getting Started

To get a local copy up and running follow these simple steps:

1. **Clone the repository**
git clone `https://github.com/molarity69/dubai-landmarks.git`
2. **Navigate to the project directory**
cd dubai-landmarks
3. **Install NPM packages**
npm install
4. **Environment Setup**
Place your `environment.ts` file under the `src/environments` folder.
5. **Start the Development Server**

npm start

Access the application at [http://localhost:4200](http://localhost:4200).

## Project Structure

The project follows a structured directory layout for efficient management and scalability:

dubai-landmarks/
├── src/
│ ├── app/
│ │ ├── components/ # UI Components
│ │ │ ├── shared/ # Shared components across features
│ │ │ │ ├── landmark-card/
│ │ │ │ └── ...
│ │ │ ├── global/ # Components always on screen
│ │ │ │ ├── navbar/
│ │ │ │ ├── toast/
│ │ │ │ └── ...
│ │ │ └── features/ # Feature-specific components
│ │ │ ├── home/
│ │ │ └── ...
│ │ ├── models/ # Data models and interfaces
│ │ │ ├── landmark.model.ts
│ │ │ └── ...
│ │ ├── services/ # Services for business logic
| | | ├── shared/ # Shared services across features
| │ │ │ ├── auth.service.ts
| │ │ │ ├── landmark.service.ts
| │ │ │ └── ...
│ │ ├── pipes/ # Custom pipes for data transformation
│ │ │ └── ...
│ │ ├── directives/ # Directives for extending HTML behavior
│ │ │ └── ...
│ │ ├── interceptors/ # HTTP interceptors
│ │ │ └── ...
│ │ └── core/ # Core module for singleton services and core functionality
│ │ ├── core.module.ts
| | ├── core-root.component.ts
│ │ └── ...
│ ├── assets/ # Static assets like images and global styles
│ └── environments/ # Environment-specific configuration files
| │ └── environment.ts
│ └── styles/ # Global styles
│ | └── _mixins.scss
│ | └── _variables.scss
| └── types/ # Custom type definitions
| └── ...
├── angular.json # Angular CLI configuration
├── package.json # NPM package configuration
└── ...
