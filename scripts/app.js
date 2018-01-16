requirejs.config({
  paths: {
    app: './app',
    lib: './lib',
    templates: '../templates',
    text: './lib/text'
  }
});

require(['app/main']);