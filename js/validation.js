/* Get the elements needed for validation*/
const form = document.getElementById("reg-form");
const avatarInput = document.getElementById("avatar");
const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");
const dropzoneText = document.getElementById("dropzone-text");

/*Variable for largest photo*/
const maxSize = 500 * 1024;


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const githubPattern = /^@[A-Za-z0-9-]+$/;

//  Check functions
function checkName(value) {
  if (value.trim() === "") {
    return "Please enter your full name.";
  }
  return "";
}

function checkEmail(value) {
  if (emailPattern.test(value.trim()) === false) {
    return "Please enter a valid email address.";
  }
  return "";
}

function checkGithub(value) {
  if (githubPattern.test(value.trim()) === false) {
    return "Enter your GitHub username starting with @, like @yourusername.";
  }
  return "";
}

function checkAvatar(file) {
  // if no file is chosen as yet
  if (file === undefined) {
    return "Please upload a JPG or PNG photo.";
  }
  // Only JPG and PNG are allowed
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    return "Wrong file type. Please upload a JPG or PNG photo.";
  }
  // The file must be smaller than 500KB
  if (file.size > maxSize) {
    return "File too large. Please upload a photo under 500KB.";
  }
  return "";
}


function showError(input, message) {
  const errorBox = document.getElementById(input.id + "-error");
  errorBox.textContent = message;

  // This tells the user the field is invalid
  if (message === "") {
    input.removeAttribute("aria-invalid");
  } else {
    input.setAttribute("aria-invalid", "true");
  }
}

// To make a ticket serial number
function makeSerial() {
  const number = Math.floor(Math.random() * 99999) + 1;
  return "#" + String(number).padStart(5, "0");
}

// Check each text field when the user clicks out of it
nameInput.addEventListener("blur", function () {
  showError(nameInput, checkName(nameInput.value));
});

emailInput.addEventListener("blur", function () {
  showError(emailInput, checkEmail(emailInput.value));
});

githubInput.addEventListener("blur", function () {
  showError(githubInput, checkGithub(githubInput.value));
});


avatarInput.addEventListener("change", function () {
  const file = avatarInput.files[0];
  if (file === undefined) {
    dropzoneText.textContent = "Drag and drop or click to upload";
  } else {
    dropzoneText.textContent = file.name;
  }
  showError(avatarInput, checkAvatar(file));
});


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const file = avatarInput.files[0];


  const avatarMessage = checkAvatar(file);
  const nameMessage = checkName(nameInput.value);
  const emailMessage = checkEmail(emailInput.value);
  const githubMessage = checkGithub(githubInput.value);


  showError(avatarInput, avatarMessage);
  showError(nameInput, nameMessage);
  showError(emailInput, emailMessage);
  showError(githubInput, githubMessage);


  if (avatarMessage !== "") {
    avatarInput.focus();
    return;
  }
  if (nameMessage !== "") {
    nameInput.focus();
    return;
  }
  if (emailMessage !== "") {
    emailInput.focus();
    return;
  }
  if (githubMessage !== "") {
    githubInput.focus();
    return;
  }


  const reader = new FileReader();

  reader.onload = function () {
    const ticket = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      github: githubInput.value.trim(),
      avatar: reader.result,
      serial: makeSerial()
    };


    try {
      localStorage.setItem("codingConfTicket", JSON.stringify(ticket));
      window.location.href = "ticket.html";
    } catch (error) {
      showError(avatarInput, "Could not save your photo. Try a smaller image.");
    }
  };

  reader.readAsDataURL(file);
});
