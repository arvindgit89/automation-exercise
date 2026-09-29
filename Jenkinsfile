pipeline {
    agent any

    environment {
        CI = 'true'
        ENVIRONMENT = "${params.ENVIRONMENT}"
        TEST_TAG = "${params.TEST_TAG}"
    }

    parameters {
        choice(
            name: 'TEST_TAG',
            choices: ['@smoke', '@regression'],
            description: 'Select test tag'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'uat'],
            description: 'Select environment'
        )
        choice(
            name: 'WORKERS',
            choices: ['1', '2', '4'],
            description: 'Number of parallel workers'
        )
    }
    triggers {
        cron('H 2 * * *')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: ''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat "set ENVIRONMENT=%ENVIRONMENT% && npx playwright test --grep \"%TEST_TAG%\" --workers=%WORKERS% --shard=1/4"
                }
        }
    }

    post {
        always {
             // Playwright HTML Report
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
               // Allure Report
            allure([
            results: [[path: 'allure-results']]
            ])
        }

        success {
            echo 'Tests passed.'
        }

        failure {
            echo 'Tests failed.'
        }
    }
}
