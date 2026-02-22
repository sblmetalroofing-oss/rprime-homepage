import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static build output
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback — serve index.html for all unmatched routes
app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Homepage server running on port ${PORT}`);
});
