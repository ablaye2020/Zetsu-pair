import express from 'express';
import makeWASocket from '@whiskeysockets/baileys';

const app = express();
app.use(express.json());
app.use(express.static('.'));

app.post('/api/pair', async (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: 'Number required' });
    
    try {
        const sock = makeWASocket({
            auth: { state: { creds: {}, keys: {} } },
            printQRInTerminal: false
        });
        const code = await sock.requestPairingCode(number);
        res.json({ code });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
