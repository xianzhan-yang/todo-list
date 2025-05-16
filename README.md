# Todo List App

A simple and modern Todo List application built with **React + Vite**.  
This project includes unit tests with **Vitest**, Docker support via `Dockerfile`, and CI/CD automation using `Jenkinsfile`.

---

## Features

- Frontend: React + Vite
- Testing: Vitest + @testing-library/react
- Containerized with Docker (Nginx)
- CI/CD: Jenkins integration with pipeline stages
- Ready for local development or production deployment

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```
Visit: http://localhost:5173

### Running Tests

```bash
npm run test
```
Test results are output to the coverage/ folder. Integration with Jenkins JUnit is also supported.

### Build for Production

```bash
npm run build
```
Build output is placed in the dist/ folder and can be deployed to a web server or container.

## Docker Deployment

### Build Docker Image

```bash
docker build -t todo-list .
```

### Run the Container

```bash
docker run -d -p 8081:80 todo-list
```
Visit the app at: http://localhost:8081
The container uses Nginx to serve the production build (dist/).

## CI/CD with Jenkins

This project includes a Jenkinsfile with the following stages:

1. Checkout – Clone the repository
2. Install Dependencies – Run npm install
3. Run Tests – Execute unit tests via Vitest
4. Build – Generate the production build
5. Deploy – Build and run Docker container

Sample Jenkinsfile
```goovy
pipeline {
  agent any

  tools {
    nodejs 'nodejs'
    dockerTool 'docker'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'git@your-git-server:your-group/todo-list.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
      post {
        always {
          junit 'coverage/junit.xml'
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker build -t todo-list .'
        sh 'docker run -d -p 8081:80 todo-list'
      }
    }
  }

  post {
    success {
      echo 'Pipeline succeeded!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
```
Note: Ensure Jenkins has permission to run Docker (e.g., add the jenkins user to the docker group).

## Project Structure

```bash
.
├── public/               # Static assets
├── src/                  # React source code
│   ├── App.jsx
│   ├── App.test.jsx
│   └── main.jsx
├── Dockerfile            # Container definition
├── Jenkinsfile           # CI/CD pipeline
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```
