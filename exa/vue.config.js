module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/disco/' : '/',
  configureWebpack: {

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  },
}
