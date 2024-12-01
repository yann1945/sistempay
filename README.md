my-payment-app/
├── public/               # Untuk file statis
│   └── halaman_pembayaran.html
├── pages/                # Untuk halaman serverless (API dan halaman utama)
│   ├── index.js
│   ├── api/
│   │   ├── sendForm.js   # Endpoint untuk kirim data ke bot Telegram
│   │   └── uploadImage.js# Endpoint untuk upload gambar ke Imgur
├── styles/               # CSS khusus
├── package.json          # File konfigurasi NPM
├── vercel.json           # Konfigurasi Vercel
