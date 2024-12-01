import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async () => {
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await fetch('/api/uploadImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image }),
        });

        const result = await response.json();
        if (response.ok) {
          setImageUrl(result.link);
          alert('Gambar berhasil diunggah!');
        } else {
          alert('Gagal mengunggah gambar.');
        }
      } catch (error) {
        alert('Terjadi kesalahan.');
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="button" onClick={handleImageUpload}>Unggah Gambar</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}
    </div>
  );
}
