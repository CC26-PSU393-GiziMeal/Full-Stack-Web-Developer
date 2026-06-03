/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Autentikasi dan manajemen user
 *   - name: Calculate
 *     description: Kalkulasi kebutuhan gizi
 *   - name: Predict
 *     description: Prediksi makanan via gambar
 *   - name: Chatbot
 *     description: Chatbot tanya jawab gizi
 */

// ============================================================
// USERS
// ============================================================

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Budi
 *               lastName:
 *                 type: string
 *                 example: Santoso
 *               email:
 *                 type: string
 *                 example: budi@gmail.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Data tidak valid
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: budisantoso@gmail.com
 *               password:
 *                 type: string
 *                 example: rahasia1234
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Email atau password salah
 */

/**
 * @swagger
 * /users/kalkulator:
 *   post:
 *     summary: Simpan hasil kalkulasi user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: f0b9da91-5158-47e0-b71a-c78780630b06
 *               result:
 *                 type: object
 *     responses:
 *       201:
 *         description: Data kalkulator berhasil disimpan
 */

/**
 * @swagger
 * /users/kalkulator/{userId}:
 *   get:
 *     summary: Ambil data biometrik user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: f0b9da91-5158-47e0-b71a-c78780630b06
 *     responses:
 *       200:
 *         description: Data kalkulator berhasil diambil
 *       404:
 *         description: Data tidak ditemukan
 */

/**
 * @swagger
 * /users/profile/{userId}:
 *   get:
 *     summary: Ambil data profil user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: f0b9da91-5158-47e0-b71a-c78780630b06
 *     responses:
 *       200:
 *         description: Data profil berhasil diambil
 *       404:
 *         description: User tidak ditemukan
 */

/**
 * @swagger
 * /users/changePassword:
 *   post:
 *     summary: Ganti password user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - passwordBaru
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: f0b9da91-5158-47e0-b71a-c78780630b06
 *               passwordBaru:
 *                 type: string
 *                 minLength: 8
 *                 example: rahasiabaru123
 *     responses:
 *       200:
 *         description: Password berhasil diperbarui
 *       400:
 *         description: Password baru minimal 8 karakter
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/biometrik/{userId}:
 *   put:
 *     summary: Update data biometrik user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: f0b9da91-5158-47e0-b71a-c78780630b06
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 65
 *               height:
 *                 type: number
 *                 example: 170
 *               age:
 *                 type: number
 *                 example: 25
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *     responses:
 *       200:
 *         description: Data biometrik berhasil diupdate
 */

// ============================================================
// CALCULATE
// ============================================================

/**
 * @swagger
 * /calculate:
 *   post:
 *     summary: Kalkulasi kebutuhan gizi
 *     tags: [Calculate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gender
 *               - usia
 *               - berat
 *               - tinggi
 *               - aktivitas
 *               - tujuan
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: f0b9da91-5158-47e0-b71a-c78780630b06
 *               gender:
 *                 type: string
 *                 enum: [pria, wanita]
 *               usia:
 *                 type: number
 *                 example: 25
 *               berat:
 *                 type: number
 *                 example: 65
 *               tinggi:
 *                 type: number
 *                 example: 170
 *               aktivitas:
 *                 type: string
 *                 enum: [sedentary, light, moderate, active, very_active]
 *               tujuan:
 *                 type: string
 *                 enum: [turunkan, pertahankan, naikkan]
 *     responses:
 *       200:
 *         description: Hasil kalkulasi gizi
 *       400:
 *         description: Semua field wajib diisi
 */

// ============================================================
// PREDICT
// ============================================================

/**
 * @swagger
 * /predict:
 *   post:
 *     summary: Prediksi makanan dari gambar
 *     tags: [Predict]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Maksimal 15 gambar, masing-masing maks 1MB
 *     responses:
 *       200:
 *         description: Hasil prediksi makanan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: File terlalu besar atau format salah
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Ambil daftar bahan makanan yang bisa diprediksi
 *     tags: [Predict]
 *     responses:
 *       200:
 *         description: List bahan makanan
 *       500:
 *         description: Gagal ambil data dari model
 */

/**
 * @swagger
 * /pexels/image:
 *   get:
 *     summary: Ambil gambar resep dari Pexels
 *     tags: [Predict]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: butternaan
 *     responses:
 *       200:
 *         description: URL gambar dari Pexels
 *       500:
 *         description: Gagal ambil gambar
 */

/**
 * @swagger
 * /recipe-details:
 *   get:
 *     summary: Ambil detail resep makanan
 *     tags: [Predict]
 *     parameters:
 *       - in: query
 *         name: menu_name
 *         required: true
 *         schema:
 *           type: string
 *         example: butternaan
 *     responses:
 *       200:
 *         description: Detail resep berhasil diambil
 *       404:
 *         description: Resep tidak ditemukan
 */

/**
 * @swagger
 * /recipe-history:
 *   post:
 *     summary: Simpan riwayat resep ke profil user 
 *     tags: [Predict]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - menuName
 *             properties:
 *               userId:
 *                 type: string
 *                 example: f0b9da91-5158-47e0-b71a-c78780630b06
 *               menuName:
 *                 type: string
 *                 example: butternaan
 *               recipeData:
 *                 type: object
 *     responses:
 *       201:
 *         description: Riwayat resep berhasil disimpan
 *       400:
 *         description: userId dan menuName wajib diisi
 */

/**
 * @swagger
 * /recipe-history/{userId}:
 *   get:
 *     summary: Ambil riwayat resep user
 *     tags: [Predict]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: f0b9da91-5158-47e0-b71a-c78780630b06
 *     responses:
 *       200:
 *         description: Riwayat resep berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Gagal mengambil data
 */

// ============================================================
// CHATBOT
// ============================================================

/**
 * @swagger
 * /chatbot/ask:
 *   post:
 *     summary: Kirim pertanyaan ke chatbot gizi
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: Berapa kalori butternaan?
 *     responses:
 *       200:
 *         description: Jawaban dari chatbot
 *       400:
 *         description: Pertanyaan tidak boleh kosong
 */