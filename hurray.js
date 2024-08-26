document.querySelector(".play-again").addEventListener("click", () => {
  localStorage.removeItem("userScore");
  localStorage.removeItem("computerScore");

  window.location.href = "index.html";
});
