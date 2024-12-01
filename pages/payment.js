import { useEffect, useState } from 'react';

export default function Payment() {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('paymentData');
    setPaymentData(JSON.parse(data));
  }, []);

  if (!paymentData) {
    return <p>Memuat data...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pembayaran</h1>
      <p>Metode: {paymentData.paymentMethod}</p>
      <p>Total Bayar: Rp {(paymentData.totalPrice - 20000).toLocaleString()}</p>
      <p>Transfer ke:</p>
      <ul>
        {paymentData.paymentMethod === 'ovo' && <li>OVO: 0812-XXX-XXXX</li>}
        {paymentData.paymentMethod === 'gopay' && <li>GoPay: 0812-XXX-XXXX</li>}
        {paymentData.paymentMethod === 'dana' && <li>Dana: 0812-XXX-XXXX</li>}
        {paymentData.paymentMethod === 'qris' && <li><img src="/qris.png" alt="QRIS" /></li>}
      </ul>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Selesai
      </button>
    </div>
  );
}
