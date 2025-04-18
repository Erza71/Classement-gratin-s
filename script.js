const utilisateurs = {
  "valentine": "4861",
  "alek": "1652",
  "antonin": "0497",
  "edwin": "7580",
  "joaquim": "8204",
  "emilien": "2365",
  "marina": "7932",
  "abdullah": "9723",
  "leo": "4081",
  "maxime": "8710",
  "nathan": "5139",
  "adel": "1468",
  "enzo": "6593",
  "lucie": "3094",
  "mathilde": "1247",
  "noemy": "9042",
  "simon": "2458",
  "mateo": "7146"
};

const form = document.getElementById("login-form");
const error = document.getElementById("login-error");

function normaliserPrenom(prenom) {
  return prenom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const prenomInput = document.getElementById("prenom").value.trim();
  const mdpInput = document.getElementById("mdp").value.trim();

  const prenomNorm = normaliserPrenom(prenomInput);
  
  if (utilisateurs[prenomNorm] && utilisateurs[prenomNorm] === mdpInput) {
    window.location.href = "vote.html?prenom=" + prenomNorm;
  } else {
    error.textContent = "Prénom ou mot de passe incorrect.";
  }
});
