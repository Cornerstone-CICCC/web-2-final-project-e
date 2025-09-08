document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById(
    "services-list",
  ) as HTMLUListElement | null;
  const button = document.getElementById(
    "services-view-btn",
  ) as HTMLButtonElement | null;
  if (!list || !button) return;

  const items = Array.from(list.querySelectorAll("li"));
  let visibleCount = 3;
  let expanded = false;

  const updateVisibility = () => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      items.forEach((item) => (item.style.display = "flex"));

      return;
    }

    if (expanded) {
      items.forEach((item) => (item.style.display = "flex"));
      button.textContent = "View less";
    } else {
      items.forEach((item, index) => {
        item.style.display = index < visibleCount ? "flex" : "none";
      });
      button.textContent = "View more";
    }
  };

  updateVisibility();

  button.addEventListener("click", () => {
    const totalItems = items.length;
    if (!expanded) {
      visibleCount = Math.min(visibleCount + 3, totalItems);
      if (visibleCount >= totalItems) {
        expanded = true;
      }
    } else {
      visibleCount = 3;
      expanded = false;
    }
    updateVisibility();
  });

  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      expanded = false;
      visibleCount = items.length;
    } else {
      visibleCount = expanded ? items.length : 3;
    }
    updateVisibility();
  });
});
