const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kgaiv7',
  e2e: {
    baseUrl: "https://www.saucedemo.com/v1/", // Configuração do baseUrl para os testes de ponta a ponta
    setupNodeEvents(on, config) {
      // Implemente eventos de nó aqui, se necessário
    },
  },
  //pageLoadTimeout: 60000, // Aumenta o tempo limite de carregamento da página para 60 segundos
});
