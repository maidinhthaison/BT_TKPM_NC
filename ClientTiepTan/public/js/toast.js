window.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  if (toast && toast.textContent.trim() !== "") {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});
