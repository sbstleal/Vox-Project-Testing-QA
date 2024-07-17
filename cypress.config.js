const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kgaiv7', // ID do projeto Cypress (opcional)
  pluginsFile: './cypress/plugins/index.js', // Arquivo de plugins do Cypress
  supportFile: './cypress/support/index.js', // Arquivo de suporte do Cypress
  videosFolder: './cypress/videos', // Pasta onde os vídeos de testes serão armazenados
  screenshotsFolder: './cypress/screenshots', // Pasta onde as capturas de tela serão armazenadas
  integrationFolder: './cypress/e2e/3-sauce-demo', // Pasta onde estão localizados os testes de integração
  fixturesFolder: './cypress/fixtures', // Pasta onde os arquivos de fixtures são armazenados
  videos: true, // Habilita a gravação de vídeos dos testes
  screenshots: true, // Habilita a captura de screenshots durante os testes
  baseUrl: 'https://www.saucedemo.com/v1/', // URL base do site a ser testado
  chromeWebSecurity: false, // Desabilita a segurança web do Chrome para testes que precisam de CORS desabilitado
  viewportWidth: 1440, // Largura da janela do navegador para os testes
  viewportHeight: 900, // Altura da janela do navegador para os testes
  env: {
    // Variáveis de ambiente para os testes (opcional)
    apiUrl: 'https://api.example.com',
    timeout: 15000,
  },
  testFiles: '**/*.spec.js', // Padrão de arquivos de testes
  execTimeout: 60000, // Tempo limite de execução dos testes
  retries: {
    runMode: 2, // Número de retentativas no modo de execução
  },
  reporter: 'mochawesome', // Relatório de testes utilizando o mochawesome
  reporterOptions: {
    // Opções do relatório mochawesome (opcional)
    reportDir: './cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
  // Outras configurações podem ser adicionadas conforme necessário
});
