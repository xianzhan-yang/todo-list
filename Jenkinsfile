pipeline {
  agent any

  tools {
    nodejs 'nodejs' 
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
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    // 可选：部署到服务器或发布静态站点
    // stage('Deploy') {
    //   steps {
    //     sh './deploy.sh'
    //   }
    // }
  }

  post {
    always {
      junit 'coverage/junit.xml'
    }
    success {
      echo 'Pipeline succeeded!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
