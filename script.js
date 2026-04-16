const passwordInput = document.getElementById("passwordInput");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const suggestions = document.getElementById("suggestions");

passwordInput.addEventListener("input", checkStrength);

function checkStrength() {
  let password = passwordInput.value;
  let score = 0;
  let feedback = [];

  if (password.length >= 8) score++;
  else feedback.push("Use at least 8 characters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("Add uppercase letters");

  if (/[a-z]/.test(password)) score++;
  else feedback.push("Add lowercase letters");

  if (/[0-9]/.test(password)) score++;
  else feedback.push("Include numbers");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push("Add special characters");

  let entropy = password.length * Math.log2(94);
  score += entropy > 50 ? 1 : 0;

  let width = (score / 6) * 100;
  strengthBar.style.width = width + "%";

  if (score <= 2) {
    strengthBar.style.background = "red";
    strengthText.innerText = "Weak";
  } else if (score <= 4) {
    strengthBar.style.background = "orange";
    strengthText.innerText = "Medium";
  } else {
    strengthBar.style.background = "green";
    strengthText.innerText = "Strong";
  }

  suggestions.innerHTML = feedback.map(f => `<li>${f}</li>`).join("");
}


// PASSWORD GENERATOR
function generatePassword() {
  const length = document.getElementById("length").value;
  const upper = document.getElementById("upper").checked;
  const lower = document.getElementById("lower").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let chars = "";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+";

  let password = "";
  let array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  document.getElementById("generatedPassword").value = password;
}

// COPY
function copyPassword() {
  let pass = document.getElementById("generatedPassword");
  pass.select();
  document.execCommand("copy");
  alert("Copied!");
}

// LENGTH DISPLAY
document.getElementById("length").addEventListener("input", function() {
  document.getElementById("lengthValue").innerText = this.value;
});