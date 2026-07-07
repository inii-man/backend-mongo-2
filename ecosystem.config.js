module.exports = {
  apps: [{
    // Nama aplikasi yang akan muncul di daftar proses PM2
    name: 'bulletin-board-playground',
    // Script utama yang akan dijalankan
    script: './app.js',
    // Fitur 'watch' akan otomatis merestart server jika ada perubahan file (berguna untuk development)
    watch: '.',
    // Abaikan perubahan di folder 'views' dan 'node_modules' agar tidak bolak-balik restart
    ignore_watch: ['views', 'node_modules'],
  }],
};
