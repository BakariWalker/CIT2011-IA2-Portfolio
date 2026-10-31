// Gets the saved data 
let ticket = null;

try {
  ticket = JSON.parse(localStorage.getItem("codingConfTicket"));
} catch (error) {
  // The saved text was damaged
  ticket = null;
}

// Checks if nothing is saved, or if the saved data is missing a name. If so, send the visitor back to the home page.
if (ticket === null || !ticket.name) {
  window.location.replace("index.html");
} else {
  // else statement that fills the ticket with the saved details. The avatar was saved as a data URL, which can be used directly as an image source.
  document.getElementById("out-name-heading").textContent = ticket.name;
  document.getElementById("out-name").textContent = ticket.name;
  document.getElementById("out-email").textContent = ticket.email;
  document.getElementById("out-github-text").textContent = ticket.github;
  document.getElementById("out-serial").textContent = ticket.serial;

  // The GitHub link by taking the username
  document.getElementById("out-github").href = "https://github.com/" + ticket.github.slice(1);

  
  const avatar = document.getElementById("out-avatar");
  avatar.src = ticket.avatar;
  avatar.alt = "Profile photo of " + ticket.name;

  // The page starts hidden (see ticket.html), so reveal it now
  document.getElementById("main").hidden = false;
}
