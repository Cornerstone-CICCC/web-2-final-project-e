const carouselId = "testimonial-carousel";
const root = document.getElementById(carouselId);

const track = root!.querySelector<HTMLElement>(
  ".testimonials__carousel-track",
)!;
const slides = Array.from(root!.querySelectorAll<HTMLElement>(".card"));
const prevBtn = root!.querySelector<HTMLButtonElement>(
  ".testimonials__nav--prev",
)!;
const nextBtn = root!.querySelector<HTMLButtonElement>(
  ".testimonials__nav--next",
)!;
const dots = Array.from(
  root!.querySelectorAll<HTMLButtonElement>(".testimonials__dot"),
);

let currentIndex = 0;
let slidesPerView = calcSlidesPerView();
let slideWidth = calcSlideWidth();
let pointerStartX: number | null = null;
let pointerDeltaX = 0;

function calcSlidesPerView() {
  return window.innerWidth >= 900 ? 3 : 1;
}

function calcSlideWidth() {
  if (!slides[0]) return 0;
  const gap = parseFloat(getComputedStyle(track).gap || "24");
  const width = slides[0].offsetWidth;
  return width + gap;
}

function updateCarousel() {
  const offset = -currentIndex * slideWidth;
  track.style.transform = `translateX(${offset}px)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("testimonials__dot--active", i === currentIndex);
  });
}

function clampIndex(index: number) {
  return Math.max(0, Math.min(index, slides.length - slidesPerView));
}

prevBtn.addEventListener("click", () => {
  currentIndex = clampIndex(currentIndex - 1);
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = clampIndex(currentIndex + 1);
  updateCarousel();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = clampIndex(i);
    updateCarousel();
  });
});

window.addEventListener("resize", () => {
  slidesPerView = calcSlidesPerView();
  slideWidth = calcSlideWidth();
  currentIndex = clampIndex(currentIndex);
  updateCarousel();
});

track.addEventListener("pointerdown", (e) => {
  pointerStartX = e.clientX;
  track.setPointerCapture(e.pointerId);
});

track.addEventListener("pointermove", (e) => {
  if (pointerStartX !== null) {
    pointerDeltaX = e.clientX - pointerStartX;
    track.style.transform = `translateX(${-currentIndex * slideWidth + pointerDeltaX}px)`;
  }
});

track.addEventListener("pointerup", () => {
  if (pointerStartX !== null) {
    if (pointerDeltaX > 50) {
      currentIndex = clampIndex(currentIndex - 1);
    } else if (pointerDeltaX < -50) {
      currentIndex = clampIndex(currentIndex + 1);
    }
    updateCarousel();
    pointerStartX = null;
    pointerDeltaX = 0;
  }
});

track.addEventListener("pointerleave", () => {
  if (pointerStartX !== null) {
    pointerStartX = null;
    pointerDeltaX = 0;
    updateCarousel();
  }
});

updateCarousel();
