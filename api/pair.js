import makeWASocket from '@whiskeysockets/baileys';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { number } = req.body;
    if (!number) {
        return res.status(400).json({ error: 'Number required' });
    }
    
    try {
        const sock = makeWASocket({
            auth: { state: { creds: {}, keys: {} } },
            printQRInTerminal: false
        });
        
        const code = await sock.requestPairingCode(number);
        res.json({ code: code });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
