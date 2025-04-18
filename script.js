function login() {
  const prenomInput = document.getElementById("prenom").value.toLowerCase().trim();
  const mdp = document.getElementById("mdp").value.trim();
  const erreur = document.getElementById("erreur");

  const match = Object.keys(users).find(name => levenshtein(name, prenomInput) <= 2);

  if (match && users[match] === mdp) {
    localStorage.setItem("user", match);
    window.location.href = "classement.html";
  } else {
    erreur.textContent = "Prénom ou mot de passe incorrect";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Classement page
if (window.location.pathname.includes("classement.html")) {
  const user = localStorage.getItem("user");
  if (!user) window.location.href = "login.html";

  const table = document.getElementById("classementTable");
  const participants = Object.keys(users);
  table.innerHTML = `<tr><th>Nom</th><th>Note</th></tr>`;
  participants.forEach(p => {
    const note = Math.floor(Math.random() * 6) + 5; // notes aléatoires pour démo
    table.innerHTML += `<tr><td>${capitalize(p)}</td><td>${note}</td></tr>`;
  });
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
    }
  }
  return matrix[a.length][b.length];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
