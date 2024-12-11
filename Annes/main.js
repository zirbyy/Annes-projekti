document
  .getElementById("yhteistiedot-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

document
  .getElementById("kartta-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const targetElement = document.getElementById("kartta-target");
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  document
  .getElementById("palvelusta-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const targetElement = document.getElementById("palvelusta");
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  document.getElementById("maksu").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from reloading the page
  
    // Check if the first radio button is selected
    const option1 = document.getElementById("option1");
    if (option1.checked) {
      // Open the desired URL in a new tab
      window.open("https://maps.app.goo.gl/BoiTRXyciYegh3hZ8", "_blank");
  
      // Reset (reload) the current page
      window.location.reload();
    } else {
      window.location.reload();
    }
  });

  document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const menu = document.querySelector('.nav-links');
  const menuButton = document.querySelector('.menu-toggle');
  
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.classList.remove('active');
  }
});

let currentIndex = 0;
const bubbles = document.querySelectorAll('.bubble');

// Näytä ensimmäinen referenssi heti sivun latautuessa
function initializeBubbles() {
    if (bubbles.length > 0) {
        // Piilota kaikki ensin
        bubbles.forEach(bubble => bubble.classList.remove('active'));
        // Näytä ensimmäinen
        bubbles[0].classList.add('active');
    }
}

// Vaihda seuraavaan referenssiin
function showNextBubble() {
    // Piilota nykyinen
    bubbles[currentIndex].classList.remove('active');
    
    // Siirry seuraavaan (tai takaisin alkuun jos ollaan viimeisessä)
    currentIndex = (currentIndex + 1) % bubbles.length;
    
    // Näytä seuraava
    bubbles[currentIndex].classList.add('active');
}

// Alusta referenssit sivun latautuessa
initializeBubbles();

// Vaihda referenssiä 10 sekunnin välein
setInterval(showNextBubble, 10000);