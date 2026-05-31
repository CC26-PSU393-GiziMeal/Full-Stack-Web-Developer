import 'dotenv/config';
import server from '../server/server.js';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
server.listen(port, () => {
    console.log(`Server berjalan di http://${host}:${port}`)
})