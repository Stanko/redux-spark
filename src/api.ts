const fake = () => new Promise(resolve => {
  // Fake errors
  if (Math.random() > 0.75) {
    throw { message: 'error!' };
  } else {
    setTimeout(() => {
      resolve({ users: [] });
    }, 500);
  }
})
.then((data) => {
  return data;
});

// Fake API
const api = {
  getSettings: fake,
  getUsers: fake,
};

export default api;