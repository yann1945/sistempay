import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: '',
    message: '',
    couponCode: '',
    totalPrice: 100000,
  });

  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (form.couponCode === 'DISKON20') {
      setDiscount(20000);
      alert('Kupon berhasil digunakan!');
    } else {
      alert('Kode kupon tidak valid.');
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.paymentMethod) {
      alert('Harap isi semua bidang wajib.');
      return;
    }

    // Simpan data di localStorage atau kirim ke server
    localStorage.setItem('paymentData', JSON.stringify(form));

    // Arahkan ke halaman pembayaran
    window.location.href = '/payment';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Formulir Pembayaran</h1>
      <form>
        <div>
          <label>Nama Pembeli:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Nomor Telepon:</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Metode Pembayaran:</label>
          <select
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            required
          >
            <option value="">Pilih Metode</option>
            <option value="ovo">OVO</option>
            <option value="gopay">GoPay</option>
            <option value="dana">Dana</option>
            <option value="qris">QRIS</option>
          </select>
        </div>
        <div>
          <label>Pesan (Opsional):</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label>Kode Kupon:</label>
          <input
            type="text"
            value={form.couponCode}
            onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
          />
          <button type="button" onClick={applyCoupon}>
            Pakai Kupon
          </button>
        </div>
        <div>
          <p>Total Harga: Rp {(form.totalPrice - discount).toLocaleString()}</p>
        </div>
        <button type="button" onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Lanjut
        </button>
      </form>
    </div>
  );
}
