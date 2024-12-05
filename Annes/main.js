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