import calculateRepo from '../repo/calculate-repo.js';
import UserRepo from '../../users/repo/user-repo.js'; 

export async function calculate(req, res) {
  const { userId, gender, usia, berat, tinggi, aktivitas, tujuan } = req.body;

  if (!gender || !usia || !berat || !tinggi || !aktivitas || !tujuan) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  try {
    const hasil = await calculateRepo.hitungKalkulator({ gender, usia, berat, tinggi, aktivitas, tujuan });
    
    if (userId) {
      await Promise.all([
        UserRepo.saveKalkulatorResult(userId, { 
          bmr: hasil.bmr, 
          tdee: hasil.tdee, 
          target: hasil.target, 
          karbo: hasil.karbo, 
          protein: hasil.protein, 
          lemak: hasil.lemak, 
          goal_label: hasil.goalLabel 
        }),
        UserRepo.saveBiometrik(userId, { gender, usia, berat, tinggi })
      ]);
    }

    res.status(200).json(hasil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}