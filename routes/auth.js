import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import ws from 'ws';
const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    realtime: {
      transport: ws 
    }
  }
);

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { firstName, lastName },
    email_confirm: true
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Registrasi berhasil', user: data.user });
});

export default router;