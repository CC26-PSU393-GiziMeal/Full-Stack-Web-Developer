import supabase from '../../../config/supabase.js';

class UserRepo {

  async createUser({ email, password, firstName, lastName }) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { firstName, lastName },
      email_confirm: true
    });
    
    if (error) throw new Error(error.message);
    return data.user;
  }

  async loginUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async saveKalkulatorResult(userId, { bmr, tdee, target, karbo, protein, lemak, goal_label }) {
    const { error } = await supabase
      .from('kalkulator_results')
      .upsert({
        user_id: userId,
        bmr: parseFloat(bmr),
        tdee: parseFloat(tdee),
        target: parseFloat(target),
        karbo: parseInt(karbo),
        protein: parseInt(protein),
        lemak: parseInt(lemak),
        goal_label,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) throw new Error(`Gagal update target nutrisi: ${error.message}`);
  }

  async getKalkulatorResult(userId) {
    const { data, error } = await supabase
      .from('kalkulator_results')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async saveBiometrik(userId, { gender, usia, berat, tinggi }) {
  const genderDb = gender === 'wanita' ? 'perempuan' : gender;

  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      gender: genderDb,
      usia: parseInt(usia),
      berat_badan: parseFloat(berat),
      tinggi_badan: parseFloat(tinggi),
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

  if (error) throw new Error(`Gagal update biometrik: ${error.message}`);
}

  async getBiometrik(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async saveScanHistory(userId, { bahan, skor }) {
    const { data, error } = await supabase
      .from('scan_history')
      .insert({
        user_id: userId,
        bahan: bahan,
        skor: parseInt(skor),
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error("Gagal menyimpan data scan_history ke database:", error.message);
    }
    return data;
  }
  
  async getScanHistory(userId) {
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Peringatan Scan History:", error.message);
      return [];
    }
    return data || [];
  }

async saveRecipeHistory(userId, menuName, recipeData) {
  const { data, error } = await supabase
    .from('recipe_history')
    .insert([
      { 
        user_id: userId, 
        menu_name: menuName, 
        recipe_data: recipeData // Mengamankan objek nutrisi utuh
      }
    ]);

  if (error) {
    throw new Error(`Supabase Insert Error: ${error.message}`);
  }
  return data;
}

async getRecipeHistory(userId) {
  const { data, error } = await supabase
    .from('recipe_history')
    .select('id, menu_name, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase Select Error: ${error.message}`);
  }
  return data;
}

  async updatePassword(userId, passwordBaru) {
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      { password: passwordBaru }
    );

    if (error) throw new Error(error.message);
    return data;
  }
}

export default new UserRepo();