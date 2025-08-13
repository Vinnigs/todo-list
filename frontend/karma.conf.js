// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution order
        // random: false
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/todo-list-frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-web-security',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-first-run',
          '--no-default-browser-check',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-device-discovery-notifications',
          '--remote-debugging-port=9222',
          '--disable-background-networking'
        ]
      }
    },
    restartOnFileChange: true,
    singleRun: false,
    
    // Configurações para ambientes CI/CD
    processKillTimeout: 2000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 30000,
    captureTimeout: 60000
  });

  // Configurar Chrome baseado no ambiente
  if (process.env.CI || process.env.HEADLESS) {
    config.browsers = ['ChromeHeadlessCI'];
    config.singleRun = true;
    config.autoWatch = false;
  }

  // Configurar binário do Chrome automaticamente
  if (!process.env.CHROME_BIN) {
    const os = require('os');
    const platform = os.platform();
    
    if (platform === 'linux') {
      // Possíveis localizações do Chrome no Linux
      const possiblePaths = [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/snap/bin/chromium',
        '/opt/google/chrome/chrome'
      ];
      
      const fs = require('fs');
      for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
          process.env.CHROME_BIN = path;
          console.log(`Karma: Using Chrome binary at ${path}`);
          break;
        }
      }
    }
  } else {
    console.log(`Karma: Using Chrome binary at ${process.env.CHROME_BIN}`);
  }
};
