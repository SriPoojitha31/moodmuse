export function login({ email, password }) {
  // Simulate login
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user = { name: 'Demo User', email };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
}

export function signup({ name, email, password }) {
  // Simulate signup
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password) {
        const user = { name, email };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('All fields required'));
      }
    }, 1000);
  });
}

export function logout() {
  localStorage.removeItem('user');
}

export function checkAuth() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
