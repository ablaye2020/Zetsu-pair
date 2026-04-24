import makeWASocket from '@whiskeysockets/baileys';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: 'Numéro requis' });
  }

  try {
    const sock = makeWASocket({
      printQRInTerminal: false,
      auth: { state: { creds: {}, keys: {} } }
    });
    const code = await sock.requestPairingCode(number);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
