const list = document.getElementById("brands-list");
const button = document.getElementById("view-more-btn");

const items = Array.from(list?.children || []);
let visibleCount = 4;

const updateVisibility = () => {
  items.forEach((item, index) => {
    if (item instanceof HTMLElement) {
      item.style.display = index < visibleCount ? "flex" : "none";
    }
  });

  if (button instanceof HTMLElement) {
    if (visibleCount >= items.length) {
      button.style.display = "none";
    } else {
      button.style.display = "";
    }
  }
};

const handleResize = () => {
  if (window.innerWidth > 768) {
    items.forEach((item) => {
      if (item instanceof HTMLElement) {
        item.style.display = "flex";
      }
    });
    if (button instanceof HTMLElement) {
      button.style.display = "none";
    }
  } else {
    updateVisibility();
  }
};

updateVisibility();
handleResize();

button?.addEventListener("click", () => {
  visibleCount += 4;
  updateVisibility();
});

window.addEventListener("resize", handleResize);
