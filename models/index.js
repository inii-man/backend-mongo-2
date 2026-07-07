const mongoose = require('mongoose');
const PostSchema = require('./schemas/post');

// Koneksi ke MongoDB lokal
// 'mongodb://127.0.0.1:27017/bulletin-board' adalah URL default MongoDB lokal
// 'bulletin-board' adalah nama database yang akan dibuat/digunakan otomatis
mongoose.connect('mongodb://127.0.0.1:27017/bulletin-board')
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mengubah Schema menjadi Model Mongoose yang bisa berinteraksi dengan database (CRUD)
// 'Post' akan menjadi nama collection di database (mongoose akan mengubahnya menjadi jamak: 'posts')
exports.Post = mongoose.model('Post', PostSchema);
