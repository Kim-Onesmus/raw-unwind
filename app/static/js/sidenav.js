document.addEventListener("DOMContentLoaded", function () {
  const sideMenuToggle = document.getElementById("side-menu-toggle");
  const sideMenuClose = document.getElementById("side-menu-close");
  const sideMenu = document.getElementById("side-menu");
  const menuOverlay = document.getElementById("menu-overlay");

  function openSideMenu() {
    sideMenu.style.transform = "translateX(0)";
    menuOverlay.style.opacity = "0.5";
    menuOverlay.style.pointerEvents = "auto";
  }

  function closeSideMenu() {
    sideMenu.style.transform = "translateX(-100%)";
    menuOverlay.style.opacity = "0";
    menuOverlay.style.pointerEvents = "none";
  }

  sideMenuToggle.addEventListener("click", openSideMenu);
  sideMenuClose.addEventListener("click", closeSideMenu);
  menuOverlay.addEventListener("click", closeSideMenu);

  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", closeSideMenu);
    link.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(26, 77, 46, 0.08)";
    });
    link.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent";
    });
  });
});
