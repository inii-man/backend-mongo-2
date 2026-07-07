# Bulletin Board Playground (Express & MongoDB)

Aplikasi ini adalah contoh sederhana dari Bulletin Board (Papan Pengumuman) menggunakan Node.js, Express, dan MongoDB. Aplikasi ini dibuat khusus untuk pemula, dengan komentar lengkap di setiap baris kode untuk menjelaskan bagaimana alurnya bekerja.

Materi yang diterapkan dalam aplikasi ini meliputi:
1. **Express.js & MongoDB**: Menggunakan Express sebagai web server dan Mongoose untuk komunikasi dengan database.
2. **Template Engine (Pug)**: Menggunakan Pug untuk me-render HTML (Server-Side Rendering).
3. **CRUD Operations**: Membuat (Create), Membaca (Read), Mengubah (Update), dan Menghapus (Delete) postingan.
4. **Async Request Handler**: Menangkap error pada rute asynchronous tanpa menggunakan try-catch berulang kali.
5. **Pagination (Paginasi)**: Membatasi jumlah postingan per halaman dan membuat navigasi halaman.
6. **PM2 Process Manager**: Menjalankan aplikasi secara daemon di background.

---

## 🛠️ Persyaratan Sistem (Prerequisites)

Sebelum mulai, pastikan kamu sudah menginstal:
1. **Node.js** (https://nodejs.org)
2. **MongoDB** (https://www.mongodb.com/try/download/community). Pastikan MongoDB sudah berjalan di lokal (biasanya di `mongodb://127.0.0.1:27017`).

---

## 🚀 Cara Instalasi & Penggunaan

### 1. Instalasi Dependensi
Jalankan perintah ini di terminal (di dalam folder proyek):
```bash
npm install
```

*(Catatan: PM2 bisa juga diinstal secara global dengan `npm install -g pm2` jika belum ada di sistem kamu).*

### 2. Menjalankan Aplikasi
Ada dua cara untuk menjalankan aplikasi ini:

**Cara A: Menggunakan Node biasa (Untuk Testing)**
```bash
node app.js
```

**Cara B: Menggunakan PM2 (Untuk Production/Development)**
Kita sudah menyiapkan `ecosystem.config.js`. Jalankan perintah berikut:
```bash
npx pm2 start ecosystem.config.js
```
*Dengan PM2, aplikasi akan berjalan di background dan otomatis merestart dirinya sendiri jika ada perubahan pada file (kecuali folder `views`).*

### 3. Membuka Aplikasi
Buka browser kamu dan akses:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📂 Penjelasan Struktur Folder & File

- `app.js`: Entry point (file utama) dari aplikasi Express.
- `models/`: Tempat menyimpan konfigurasi dan Schema database.
  - `index.js`: Koneksi MongoDB dan Model `Post`.
  - `schemas/post.js`: Struktur tabel/dokumen untuk Postingan.
  - `types/short-id.js`: Custom Tipe Data ID (agar URL terlihat lebih pendek dan bersih).
- `routes/posts.js`: Mengatur semua alur routing (CRUD, Paginasi).
- `views/`: Kumpulan file tampilan (Template Engine Pug).
  - `layout.pug`: Kerangka dasar HTML dan styling CSS.
  - `posts/list.pug`: Halaman daftar postingan.
  - `posts/view.pug`: Halaman detail postingan.
  - `posts/edit.pug`: Form HTML untuk tambah dan edit postingan.
- `ecosystem.config.js`: File konfigurasi PM2.

## ⚙️ Perintah PM2 Tambahan (Berguna untuk dipelajari)
Jika kamu menjalankan dengan PM2, ini adalah beberapa perintah yang sering digunakan:
- `npx pm2 list` -> Melihat daftar aplikasi yang berjalan.
- `npx pm2 monit` -> Memantau penggunaan memori dan CPU aplikasi.
- `npx pm2 logs` -> Melihat log (console.log atau error).
- `npx pm2 stop bulletin-board-playground` -> Menghentikan aplikasi.
- `npx pm2 delete bulletin-board-playground` -> Menghapus aplikasi dari list PM2.

---

Selamat belajar! Jangan ragu untuk membaca file-file di dalam folder proyek karena sudah ditambahkan penjelasan di setiap baris kodenya.
