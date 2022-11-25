const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 'primary-color': '#1DA57A',
            'text-color': '#111',
            'border-color': '#eee',
            'nice-blue': '#f0f'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
