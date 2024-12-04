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
