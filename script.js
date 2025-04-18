// Connexion
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const prenom = document.getElementById("prenom").value.trim().toLowerCase();
      const code = document.getElementById("code").value.trim();
      let valid = false;

      for (let name in users) {
        if (name.toLowerCase() === prenom && users[name] === code) {
          localStorage.setItem("currentUser", name);
          valid = true;
          break;
        }
      }

      if (valid) {
        window.location.href = "classement.html";
      } else {
        document.getElementById("loginError").textContent = "Identifiants incorrects.";
      }
    });
  }

  const currentUser = localStorage.getItem("currentUser");
  const classementTable = document.getElementById("classementTable");
  const voteSection = document.getElementById("voteSection");

  if (classementTable && voteSection) {
    const notes = JSON.parse(localStorage.getItem("votes") || "{}");

    // Génère les champs de vote si l’utilisateur est connecté
    if (currentUser) {
      voteSection.innerHTML = "<h2>Vote</h2>";
      for (let name in users) {
        if (name !== currentUser) {
          const input = document.createElement("input");
          input.type = "number";
          input.min = 0;
          input.max = 10;
          input.placeholder = `Note pour ${name}`;
          input.value = notes[currentUser]?.[name] ?? "";
          input.onchange = () => {
            if (!notes[currentUser]) notes[currentUser] = {};
            notes[currentUser][name] = Number(input.value);
            localStorage.setItem("votes", JSON.stringify(notes));
            afficherClassement(notes);
          };
          voteSection.appendChild(input);
          voteSection.appendChild(document.createElement("br"));
        }
      }
    }

    // Affiche le tableau
    afficherClassement(notes);
  }
});

function afficherClassement(votes) {
  const table = document.getElementById("classementTable");
  const notesTotales = {};
  const nbVotes = {};

  for (let votant in votes) {
    for (let votePour in votes[votant]) {
      if (!notesTotales[votePour]) {
        notesTotales[votePour] = 0;
        nbVotes[votePour] = 0;
      }
      notesTotales[votePour] += votes[votant][votePour];
      nbVotes[votePour]++;
    }
  }

  const moyennes = [];
  for (let name in users) {
    const moyenne = nbVotes[name] ? (notesTotales[name] / nbVotes[name]).toFixed(1) : "-";
    moyennes.push({ name, moyenne });
  }

  moyennes.sort((a, b) => (b.moyenne === "-" ? -1 : parseFloat(b.moyenne)) - (a.moyenne === "-" ? -1 : parseFloat(a.moyenne)));

  table.innerHTML = "";
  for (let { name, moyenne } of moyennes) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${moyenne}</td>`;
    table.appendChild(row);
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
