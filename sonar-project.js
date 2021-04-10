const sonarqubeScanner = require('sonarqube-scanner');
     sonarqubeScanner({
       serverUrl: 'http://localhost:9000',
       options : {
       'sonar.sources': '.',
       'sonar.inclusions' : '/**' // Entry point of your code
       ,
       'sonar.login' : '291829363e9d77c9df6d6c0fbb714fb4ae326cc7'
       }
     }, () => {});