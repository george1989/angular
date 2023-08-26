
pipeline {
  agent any
  stages {   
    stage('Sonarqube analysis') {
    steps {
        script {
            scannerHome = tool 'SonarScanner';
        }
        withSonarQubeEnv('SonarQube') {
            bat "${scannerHome}/bin/sonar-scanner.bat" 
        }
    }
  }
    stage('Install') {
      steps { 
          bat 'npm install' 
      }
    }
    stage('Buil') {
      steps { 
          bat 'npm run build -- --configuration=production' 
      }
    }
    stage('docker') {
      steps {
          bat 'docker login -u "junior1989" -p "dckr_pat_9tvcieYumIoZ-ZfAplkJsSLVA4g" docker.io'
          bat 'docker build . -t junior1989/angularprueba:1001 -f Dockerfile' 
          bat 'docker push junior1989/angularprueba:1001'
      }
    }
    stage('Deploy') {
      steps { 
          bat 'docker login -u "junior1989" -p "dckr_pat_9tvcieYumIoZ-ZfAplkJsSLVA4g" docker.io'
          bat 'docker run -p 9191:80 -d junior1989/angularprueba:1001' 
      }
    }
  }
}