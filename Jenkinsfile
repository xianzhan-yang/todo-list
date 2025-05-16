pipeline {
  agent any

  tools {
    nodejs 'nodejs' 
    dockerTool 'docker'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'git@192.168.122.51:root/todo-list.git'
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
