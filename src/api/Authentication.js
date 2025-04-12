const API_URL = "http://localhost:5000/users";

export const signUp = async (username, password) => {
  const response = await fetch(API_URL);
  const users = await response.json();

  if (users.some((user) => user.username === username)) {
    throw new Error("This username is already taken!");
  }
  const newUser = { username, password };
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return newUser;
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}?username=${username}`);
  const users = await response.json();
  if (users.length === 0 || users[0].password!==password) {
    throw new Error("Incorrect username or password!");
  }

  return users[0];
};
