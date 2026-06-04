import 'dotenv/config';
import server from '../server/server.js';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di port ${PORT}`);
});