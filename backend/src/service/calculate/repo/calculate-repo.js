const API_URL = 'https://cc26-psu393-gizimeal-api.hf.space';

const ACTIVITY_MAP = {
    '1.2': 'sedentary',
    '1.375': 'light',
    '1.55': 'moderate',
    '1.725': 'active',
    '1.9': 'very_active',
};

const GOAL_DELTA = {
    turun: -500,
    tahan: 0,
    naik: 500,
};

const GOAL_LABEL = {
    turun: 'Turunkan BB',
    tahan: 'Pertahankan BB',
    naik: 'Naikkan BB',
};

class CalculateRepo {

    async hitungKalkulator({ gender, usia, berat, tinggi, aktivitas, tujuan }) {
        const res = await fetch(`${API_URL}/calculator/bmr`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: parseInt(usia),
                weight: parseFloat(berat),
                height: parseFloat(tinggi),
                gender: gender === 'pria' ? 'male' : 'female',
                activity_level: ACTIVITY_MAP[aktivitas] || 'moderate',
            })
        });

        if (!res.ok) throw new Error('Gagal menghubungi API kalkulator');
        const data = await res.json();

        const bmr = data.results.bmr_kcal;
        const tdee = data.results.tdee_kcal;
        const delta = GOAL_DELTA[tujuan] ?? 0;
        const target = tdee + delta;

        const karbo = Math.round((target * 0.5) / 4);
        const protein = Math.round((target * 0.2) / 4);
        const lemak = Math.round((target * 0.3) / 9);

        return { bmr, tdee, target, karbo, protein, lemak, goalLabel: GOAL_LABEL[tujuan] };
    }
}

export default new CalculateRepo();