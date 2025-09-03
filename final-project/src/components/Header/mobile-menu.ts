export function setupMobileMenu(): void {
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobileMenu") as HTMLDivElement;

  if (!toggleButton || !mobileMenu) return;

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  const navLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const isInsideMenu = mobileMenu.contains(target);
    const isToggleButton = toggleButton.contains(target);

    if (
      !isInsideMenu &&
      !isToggleButton &&
      mobileMenu.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu(): void {
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobileMenu") as HTMLDivElement;

  if (!toggleButton || !mobileMenu) return;

  const isActive = mobileMenu.classList.contains("active");

  if (isActive) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu(): void {
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobileMenu") as HTMLDivElement;

  if (!toggleButton || !mobileMenu) return;

  mobileMenu.classList.add("active");
  toggleButton.classList.add("active");
  toggleButton.setAttribute("aria-expanded", "true");

  document.body.style.overflow = "hidden";
}

function closeMobileMenu(): void {
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobileMenu") as HTMLDivElement;

  if (!toggleButton || !mobileMenu) return;

  mobileMenu.classList.remove("active");
  toggleButton.classList.remove("active");
  toggleButton.setAttribute("aria-expanded", "false");

  document.body.style.overflow = "";
}
