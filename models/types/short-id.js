const { nanoid } = require('nanoid');

// Membuat tipe data custom Mongoose untuk ID unik pendek (menggantikan ObjectId standar)
// nanoid akan men-generate string unik dan tidak duplikat
const shortId = {
  type: String, // Tipe datanya adalah string
  default: () => {
    // Secara otomatis menjalankan nanoid() setiap kali data baru dibuat (tanpa ID)
    return nanoid();
  },
  require: true, // shortId wajib ada
  index: true,   // Dijadikan index agar pencarian (query) berdasarkan shortId lebih cepat
};

module.exports = shortId;
