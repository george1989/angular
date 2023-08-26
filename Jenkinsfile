
pipeline {
  agent any
  stages {   
    stage('SonarQube analysis') {
      withSonarQubeEnv(credentialsId: 'b0ea30fa9955cc795681e861e90dec3c77a67009 ', installationName: 'george1989') { // You can override the credential to be used
        sh 'mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.7.0.1746:sonar'
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