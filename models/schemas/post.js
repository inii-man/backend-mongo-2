const { Schema } = require('mongoose');
const shortId = require('../types/short-id'); // Mengambil custom type shortId

// Mendefinisikan struktur data untuk Postingan (Bulletin Board)
const PostSchema = new Schema({
  // Gunakan tipe data shortId yang kita buat agar ID-nya bersih dan rapi di URL
  shortId: shortId,
  // Judul postingan wajib berformat string
  title: String,
  // Isi postingan wajib berformat string
  content: String,
  // Nama penulis postingan
  author: String,
}, {
  // Opsi timestamps: true akan otomatis menambahkan `createdAt` dan `updatedAt` ke data
  timestamps: true,
});

// Mengekspor schema agar bisa diubah menjadi model di index.js
module.exports = PostSchema;
