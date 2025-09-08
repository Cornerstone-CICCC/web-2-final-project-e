let isSetup = false;
export function setupMobileMenu(): void {
  if (isSetup) return;
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement | null;
  const mobileMenu = document.getElementById(
    "mobileMenu",
  ) as HTMLDivElement | null;

  if (!toggleButton || !mobileMenu) return;

  isSetup = true;

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest(".mobile-nav-link") as HTMLAnchorElement | null;
    if (link) {
      closeMobileMenu();
    }
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

    if (e.key === "Tab" && mobileMenu.classList.contains("active")) {
      const focusable = mobileMenu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
  ) as HTMLButtonElement | null;
  const mobileMenu = document.getElementById(
    "mobileMenu",
  ) as HTMLDivElement | null;

  if (!toggleButton || !mobileMenu) return;

  mobileMenu.classList.add("active");
  toggleButton.classList.add("active");
  toggleButton.setAttribute("aria-expanded", "true");

  document.body.style.overflow = "hidden";

  const firstLink = mobileMenu.querySelector<HTMLElement>(
    ".mobile-nav-link, a, button",
  );
  firstLink?.focus();
}

function closeMobileMenu(): void {
  const toggleButton = document.getElementById(
    "mobileMenuToggle",
  ) as HTMLButtonElement | null;
  const mobileMenu = document.getElementById(
    "mobileMenu",
  ) as HTMLDivElement | null;

  if (!toggleButton || !mobileMenu) return;

  mobileMenu.classList.remove("active");
  toggleButton.classList.remove("active");
  toggleButton.setAttribute("aria-expanded", "false");

  document.body.style.overflow = "";

  toggleButton.focus();
}

setupMobileMenu();
