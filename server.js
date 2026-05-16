const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // opsional, untuk frontend

// ========== ENDPOINT SOSIAL MEDIA OSINT ==========
app.post('/api/osint/social', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username diperlukan' });
    
    // SIMULASI DATA (ganti dengan logika nyata nanti)
    const mockData = {
        username: username,
        platforms: {
            instagram: `https://instagram.com/${username}`,
            twitter: `https://twitter.com/${username}`,
            github: `https://github.com/${username}`
        },
        status: 'found',
        message: `Pencarian OSINT untuk ${username} (simulasi)`
    };
    res.json(mockData);
});

// ========== ENDPOINT BREACH DATABASE ==========
app.post('/api/osint/breach', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email diperlukan' });
    
    // Panggil API Have I Been Pwned (HIBP) secara real
    const axios = require('axios');
    try {
        const response = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
            headers: { 'hibp-api-key': process.env.HIBP_API_KEY || 'demo' }
        });
        res.json({ email, breaches: response.data, count: response.data.length });
    } catch (error) {
        res.json({ email, breaches: [], count: 0, message: 'Tidak ditemukan breach publik' });
    }
});

// ========== ENDPOINT NOMOR TELEPON ==========
app.post('/api/osint/phone', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Nomor telepon diperlukan' });
    
    // Simulasi data + integrasi dengan numverify (gratis)
    const mockPhone = {
        number: phone,
        country: 'Indonesia',
        carrier: 'Telkomsel',
        line_type: 'mobile',
        location: 'Jakarta',
        whatsapp: `https://wa.me/${phone}`
    };
    res.json(mockPhone);
});

// ========== ENDPOINT DARK WEB CRAWLER ==========
app.post('/api/darkweb/search', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query diperlukan' });
    
    // Simulasi hasil dari dark web (gunakan Ahmia.fi API atau mock)
    res.json({
        query,
        results: [
            { title: `Forum leak: ${query}`, link: 'http://darkfailxxxx.onion', relevance: 'high' },
            { title: `Pastebin dump for ${query}`, link: 'http://pastelink.onion', relevance: 'medium' }
        ],
        note: 'Hasil simulasi. Untuk hasil nyata, integrasikan dengan Ahmia API.'
    });
});

// ========== ENDPOINT REVERSE IMAGE ==========
app.post('/api/osint/image', async (req, res) => {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'URL gambar diperlukan' });
    
    // Bisa integrasi dengan Google Reverse Image API atau TinEye
    res.json({
        image_url: imageUrl,
        possible_matches: [
            { source: 'facebook.com', confidence: '78%' },
            { source: 'twitter.com', confidence: '62%' }
        ],
        message: 'Hasil pencarian reverse image (simulasi)'
    });
});

// ========== ENDPOINT SPAM DESTROYER ==========
app.post('/api/spam/email', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email diperlukan' });
    
    // Daftar ke 50 newsletter secara simulasi
    res.json({
        target: email,
        status: 'spamming',
        services_triggered: 47,
        message: 'Proses spam newsletter dimulai (simulasi etis)'
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(` Lucifer API running on port ${PORT}`);
});