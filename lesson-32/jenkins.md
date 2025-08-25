Jenkins prallel no-image run for PW test

```
pipeline {
  agent any

  tools {
    nodejs 'node22'  // Ensure this is configured in Jenkins global tools
  }

  environment {
    PLAYWRIGHT_ARTIFACTS_DIR = 'lesson-30/playwright-report'
  }

      stages {
        stage('Checkout') {
          steps {
            git branch: 'main', url: 'https://github.com/apolonskiy/hillel-js-for-qa-07.25.git'
          }
        }

    stage('Install Dependencies') {
      steps {
        sh '''
          cd lesson-30
          npm i
          npx -y playwright@1.54.0 install --with-deps
        '''
      }
    }

    stage('Run Tests in Parallel') {
      parallel {
        stage('Chromium Non setup') {
          steps {
            sh '''
              cd lesson-30
              npm run pw:test:ci:chromium:all-non-setup
            '''
          }
        }

        stage('Chromium setup') {
          steps {
            sh '''
              cd lesson-30
              npm run pw:test:ci:chromium:setup
            '''
          }
        }
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: "${PLAYWRIGHT_ARTIFACTS_DIR}/**/*,lesson-30/test-results/**", fingerprint: true
      }
    }
  }
}
```




