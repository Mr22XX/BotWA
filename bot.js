const wa = require('@open-wa/wa-automate');
const axios = require('axios');
const fs = require('fs');

// Fungsi bantu: ambil gambar dari URL dan simpan sementara
async function downloadImage(url, path) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(path, response.data);
  } catch (error) {
    console.error('Gagal mengunduh gambar:', error);
  }
}

wa.create().then(client => {
  client.onMessage(async message => {
    const text = message.body.toLowerCase();

    // Cek apakah pesan yang diterima adalah permintaan gambar buaya
    if (text === 'gambar buaya') {
      const imageLinks = [
        'https://drive.google.com/uc?export=download&id=1P-onkZci9-SYXME0tz65SwQsUSq_c9e0' // Ganti dengan URL gambar yang valid
      ];

      for (let i = 0; i < imageLinks.length; i++) {
        const filePath = `./buaya${i + 1}.jpg`; // Menyimpan gambar dengan nama unik
        await downloadImage(imageLinks[i], filePath); // Unduh gambar
        await client.sendImage(message.from, filePath, `buaya${i + 1}.jpg`, `Gambar buaya ${i + 1}`); // Kirim gambar
        fs.unlinkSync(filePath); // Hapus gambar setelah terkirim
      }

    // Cek apakah pesan yang diterima adalah permintaan gambar anjing
    } else if (text === 'gambar anjing') {
      const imageLinks = [
        'https://drive.google.com/uc?export=download&id=1Rn94_JsvaBoi0D3DtU69mVMSAE1GQoXT' // Ganti dengan URL gambar yang valid
      ];

      for (let i = 0; i < imageLinks.length; i++) {
        const filePath = `./anjing${i + 1}.jpg`; // Menyimpan gambar dengan nama unik
        await downloadImage(imageLinks[i], filePath); // Unduh gambar
        await client.sendImage(message.from, filePath, `anjing${i + 1}.jpg`, `Gambar anjing ${i + 1}`); // Kirim gambar
        fs.unlinkSync(filePath); // Hapus gambar setelah terkirim
      }

    // Tampilkan menu jika pengguna mengetik 'menu'
    } else if (text === 'menu') {
      await client.sendText(message.from, 'Ketik:\n- gambar buaya\n- gambar anjing');
    }
  });
});
