module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ios: '8',
          android: '4',
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    '@babel/transform-runtime',
  ],
};
