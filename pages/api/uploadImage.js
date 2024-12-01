export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { image } = req.body; // Base64 encoded image

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, type: 'base64' }),
    });

    const result = await response.json();
    if (result.success) {
      return res.status(200).json({ link: result.data.link });
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
