const { Router } = require('express');
const { Post } = require('../models');

const router = Router();

// Middleware asyncHandler: Membungkus request handler asynchronous 
// sehingga jika terjadi error, otomatis diteruskan ke 'next' tanpa harus try-catch di mana-mana
const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      next(err); // Meneruskan error ke error handler Express
    }
  };
};

// =========================================================================
// CREATE: Menampilkan halaman form untuk menambah postingan ATAU menyimpan
// =========================================================================

// GET /posts?write=true -> Tampilkan form tambah post
// GET /posts -> Tampilkan daftar post (lihat bagian READ di bawah)
router.get('/', asyncHandler(async (req, res, next) => {
  // Jika query ?write=true ada di URL, arahkan ke halaman form 'edit' (digunakan untuk create & edit)
  if (req.query.write) {
    res.render('posts/edit');
    return;
  }
  
  // Jika tidak ada ?write, lanjutkan ke handler daftar post (di bawah middleware ini)
  next();
}));

// POST /posts -> Menyimpan data postingan baru ke database
router.post('/', asyncHandler(async (req, res, next) => {
  const { title, content, author } = req.body;
  
  // Membuat data baru di MongoDB
  await Post.create({
    title,
    content,
    author: author || 'Anonim', // Jika author kosong, set ke 'Anonim'
  });
  
  // Setelah berhasil disimpan, kembalikan user ke halaman utama (daftar post)
  res.redirect('/posts');
}));

// =========================================================================
// READ: Menampilkan daftar postingan (dengan Paginasi)
// =========================================================================

router.get('/', asyncHandler(async (req, res, next) => {
  // Paginasi: Ambil parameter halaman dari URL (contoh: ?page=2), default ke halaman 1
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10); // Menampilkan 10 item per halaman

  // Menghitung total seluruh postingan di database
  const total = await Post.countDocuments({});
  
  // Mengambil postingan dari database
  const posts = await Post.find({})
    .sort({ createdAt: -1 }) // Mengurutkan dari yang terbaru (descending)
    .skip(perPage * (page - 1)) // Melewati data di halaman sebelumnya
    .limit(perPage); // Membatasi jumlah data sesuai perPage

  // Menghitung total halaman yang tersedia
  const totalPage = Math.ceil(total / perPage);

  // Mengirim data 'posts', 'page', 'perPage', dan 'totalPage' ke template Pug 'list'
  res.render('posts/list', { posts, page, perPage, totalPage });
}));

// =========================================================================
// READ (DETAIL) & UPDATE (FORM): Menampilkan detail / form edit spesifik
// =========================================================================

// GET /posts/:shortId -> Menampilkan detail ATAU form edit
router.get('/:shortId', asyncHandler(async (req, res, next) => {
  const { shortId } = req.params;
  
  // Cari postingan berdasarkan shortId
  const post = await Post.findOne({ shortId });
  
  // Jika tidak ketemu, lempar error "Not Found"
  if (!post) {
    throw new Error('Post NotFound');
  }

  // Jika URL memiliki ?edit=true, tampilkan form edit
  if (req.query.edit) {
    res.render('posts/edit', { post });
    return;
  }
  
  // Jika tidak ada ?edit, tampilkan halaman detail
  res.render('posts/view', { post });
}));

// =========================================================================
// UPDATE: Menyimpan perubahan data postingan
// =========================================================================

// POST /posts/:shortId -> HTML form tidak mendukung PUT, jadi kita pakai POST untuk update
router.post('/:shortId', asyncHandler(async (req, res, next) => {
  const { shortId } = req.params;
  const { title, content, author } = req.body;
  
  // Mengupdate postingan berdasarkan shortId
  const post = await Post.findOneAndUpdate(
    { shortId },
    { title, content, author }
  );
  
  if (!post) {
    throw new Error('Post NotFound');
  }

  // Setelah berhasil, arahkan kembali ke halaman detail postingan tersebut
  res.redirect(`/posts/${shortId}`);
}));

// =========================================================================
// DELETE: Menghapus postingan
// =========================================================================

// DELETE /posts/:shortId -> Menghapus data
// Karena form HTML tidak mendukung DELETE, rute ini akan dipanggil menggunakan fetch() di Javascript (Client-side)
router.delete('/:shortId', asyncHandler(async (req, res, next) => {
  const { shortId } = req.params;
  
  // Menghapus data berdasarkan shortId
  await Post.deleteOne({ shortId });
  
  // Merespon ke fetch() bahwa penghapusan berhasil (OK)
  res.send('OK');
}));

module.exports = router;
