export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export function validateRequired(value) {
  return value && value.trim().length > 0;
}
