export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, phone, email, paymentMethod, message, imageUrl } = req.body;

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const telegramMessage = `
    Formulir Pembelian:
    Nama: ${name}
    Nomor: ${phone}
    Email: ${email}
    Metode: ${paymentMethod}
    Pesan: ${message}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
    });

    if (imageUrl) {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, photo: imageUrl }),
      });
    }

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message or image' });
  }
}
