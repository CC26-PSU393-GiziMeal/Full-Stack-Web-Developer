import { validateRegister } from '../validator/user-schema.js';
import UserRepo from '../repo/user-repo.js';

export async function register(req, res) {
  const { email, password, firstName, lastName } = req.body;

  const errors = validateRegister({ email, password, firstName, lastName });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await UserRepo.createUser({ email, password, firstName, lastName });
    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  try {
    const data = await UserRepo.loginUser({ email, password });
    res.status(200).json({ message: 'Login berhasil', 
      session: data.session, 
      user: data.user });
  } catch (err) {
    const message = err.message === 'Invalid login credentials'
      ? 'Email atau password salah'
      : err.message;
    res.status(401).json({ error: message });
  }
}

export async function simpanKalkulator(req, res) {
  const { userId, gender, usia, berat, tinggi, bmr, tdee, target, karbo, protein, lemak, goalLabel } = req.body;
  
  if (!userId) return res.status(400).json({ error: 'userId wajib disertakan' });

  try {
    await Promise.all([
      UserRepo.saveKalkulatorResult(userId, { bmr, tdee, target, karbo, protein, lemak, goal_label: goalLabel }),
      UserRepo.saveBiometrik(userId, { gender, usia, berat, tinggi })
    ]);

    res.status(200).json({ message: 'Berhasil disimpan ke profil dan data nutrisi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getKalkulator(req, res) {
  const { userId } = req.params;
  try {
    const data = await UserRepo.getKalkulatorResult(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProfileData(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID wajib disertakan' });
  }

  try {
    const [calcData, biometrikData, scanHistory] = await Promise.all([
      UserRepo.getKalkulatorResult(userId),
      UserRepo.getBiometrik(userId),
      UserRepo.getScanHistory(userId)
    ]);

    const formattedScanHistory = (scanHistory || [])
      .filter(item => item && item.bahan)
      .map(item => {
        let waktuFormat = "Baru saja";
        if (item.created_at) {
          const tanggalObj = new Date(item.created_at);
          if (!isNaN(tanggalObj.getTime())) {
            waktuFormat = tanggalObj.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          }
        }

        return {
          id: item.id,
          bahan: item.bahan,
          waktu: waktuFormat,
          skor: isNaN(parseInt(item.skor)) ? 0 : parseInt(item.skor)
        };
      });

    res.status(200).json({
      calcData: calcData ? {
        goalLabel: calcData.goal_label,
        target: calcData.target,
        tdee: calcData.tdee,
        bmr: calcData.bmr,
        karbo: calcData.karbo,
        protein: calcData.protein,
        lemak: calcData.lemak
      } : null,
      
      biometrikData: biometrikData ? {
        gender: biometrikData.gender,
        usia: biometrikData.usia,
        berat: biometrikData.berat_badan,
        tinggi: biometrikData.tinggi_badan
      } : null,

      scanHistory: formattedScanHistory
    });
  } catch (err) {
    console.error("❌ ERROR DI GET_PROFILE_DATA:", err.message);
    res.status(500).json({ error: "Gagal memuat data profil", rincian: err.message });
  }
}

export async function changePassword(req, res) {
  const { userId, passwordBaru } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID wajib disertakan' });
  }

  if (!passwordBaru || passwordBaru.length < 8) {
    return res.status(400).json({ error: 'Password baru minimal harus 8 karakter' });
  }

  try {
    await UserRepo.updatePassword(userId, passwordBaru);
    res.status(200).json({ message: 'Password berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateAccount(req, res) {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID wajib disertakan' });
  try {
    const user = await UserRepo.updateAccountInfo(userId, { firstName, lastName });
    res.status(200).json({ message: 'Informasi akun berhasil diperbarui', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateBiometrikData(req, res) {
  const { userId } = req.params;
  const { gender, usia, berat, tinggi } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID wajib disertakan' });
  try {
    await UserRepo.saveBiometrik(userId, { gender, usia, berat, tinggi });
    res.status(200).json({ message: 'Informasi biometrik berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}