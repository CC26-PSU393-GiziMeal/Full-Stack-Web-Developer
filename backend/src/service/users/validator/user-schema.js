export function validateRegister({ email, password, firstName, lastName }) {
  const errors = [];

  if (!firstName?.trim()) errors.push('firstName wajib diisi');
  if (!email?.trim()) errors.push('email wajib diisi');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('format email tidak valid');
  if (!password || password.length < 8) errors.push('password minimal 8 karakter');

  return errors;
}