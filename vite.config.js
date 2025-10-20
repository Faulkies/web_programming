export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // your backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
}