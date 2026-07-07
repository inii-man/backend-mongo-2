const express = require('express');
const path = require('path');
const dayjs = require('dayjs'); // Library untuk format tanggal
const postsRouter = require('./routes/posts');

// Inisialisasi koneksi MongoDB (ini akan menjalankan file index.js di dalam folder models)
require('./models'); 

const app = express();

// =========================================================================
// KONFIGURASI TEMPLATE ENGINE (PUG)
// =========================================================================

// Memberitahu Express bahwa kita menggunakan template engine Pug
app.set('view engine', 'pug');
// Memberitahu lokasi folder view kita ada di ./views
app.set('views', path.join(__dirname, 'views'));

// =========================================================================
// MIDDLEWARE
// =========================================================================

// Middleware untuk membaca data yang dikirim dari HTML form (POST/PUT request)
app.use(express.urlencoded({ extended: true }));
// Middleware untuk membaca data JSON
app.use(express.json());

// =========================================================================
// APP LOCALS (VARIABEL GLOBAL UNTUK TEMPLATE)
// =========================================================================

// Fungsi formatDate ditambahkan ke app.locals agar bisa diakses langsung 
// di dalam file Pug mana pun (seperti list.pug atau view.pug)
app.locals.formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// =========================================================================
// ROUTES (RUTE APLIKASI)
// =========================================================================

// Mengarahkan halaman utama ('/') langsung ke halaman daftar post ('/posts')
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Menghubungkan routing dari file routes/posts.js ke path '/posts'
app.use('/posts', postsRouter);

// =========================================================================
// ERROR HANDLER (PENANGANAN ERROR GLOBAL)
// =========================================================================

// Jika terjadi error di mana saja di dalam aplikasi (misalnya "Post NotFound"),
// Express akan melemparnya ke fungsi ini.
app.use((err, req, res, next) => {
  console.error(err.stack); // Menampilkan error di console server
  
  // Mengirim pesan error ke user (bisa dibuatkan template khusus error.pug jika mau)
  res.status(500).send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: red;">❌ Terjadi Kesalahan!</h1>
      <p>${err.message}</p>
      <a href="/" style="display: inline-block; padding: 10px 15px; background: #3498db; color: white; text-decoration: none; border-radius: 4px;">Kembali ke Beranda</a>
    </div>
  `);
});

// =========================================================================
// MENJALANKAN SERVER
// =========================================================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
