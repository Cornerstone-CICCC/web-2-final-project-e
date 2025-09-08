document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("testimonial-carousel");
  if (!root) return;

  const track = root.querySelector<HTMLElement>(
    ".testimonials__carousel-track",
  )!;
  const slides = Array.from(root.querySelectorAll<HTMLElement>(".card"));
  const prevBtn = root.querySelector<HTMLButtonElement>(
    ".testimonials__nav--prev",
  )!;
  const nextBtn = root.querySelector<HTMLButtonElement>(
    ".testimonials__nav--next",
  )!;
  const dotsContainer = root.querySelector<HTMLElement>(".testimonials__dots")!;

  let currentPage = 0;
  let slidesPerView = calcSlidesPerView();
  let slideWidth = calcSlideWidth();
  let pageCount = calcPageCount();
  let pointerStartX: number | null = null;
  let pointerDeltaX = 0;

  function calcSlidesPerView() {
    return window.innerWidth >= 900 ? 3 : 1;
  }

  function calcSlideWidth() {
    if (!slides[0]) return 0;
    const gap = parseFloat(getComputedStyle(track).gap || "32");
    const width = slides[0].offsetWidth;
    return width + gap;
  }

  function calcPageCount() {
    return Math.max(1, Math.ceil(slides.length / slidesPerView));
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < pageCount; i++) {
      const btn = document.createElement("button");
      btn.className =
        "testimonials__dot" +
        (i === currentPage ? " testimonials__dot--active" : "");
      btn.setAttribute("data-index", String(i));
      btn.setAttribute("aria-label", `Go to testimonial page ${i + 1}`);
      btn.addEventListener("click", () => {
        currentPage = clampPage(i);
        updateCarousel();
      });
      dotsContainer.appendChild(btn);
    }
  }

  function updateCarousel() {
    const startIndex = Math.min(
      currentPage * slidesPerView,
      Math.max(0, slides.length - slidesPerView),
    );
    const offset = -startIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;

    const dots = Array.from(
      dotsContainer.querySelectorAll<HTMLButtonElement>(".testimonials__dot"),
    );
    dots.forEach((dot, i) => {
      dot.classList.toggle("testimonials__dot--active", i === currentPage);
    });
  }

  function clampPage(page: number) {
    return Math.max(0, Math.min(page, pageCount - 1));
  }

  prevBtn.addEventListener("click", () => {
    currentPage = clampPage(currentPage - 1);
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentPage = clampPage(currentPage + 1);
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    const prevSlidesPerView = slidesPerView;
    slidesPerView = calcSlidesPerView();
    slideWidth = calcSlideWidth();
    pageCount = calcPageCount();

    if (slidesPerView !== prevSlidesPerView) {
      currentPage = clampPage(currentPage);
      buildDots();
    }
    updateCarousel();
  });

  track.addEventListener("pointerdown", (e) => {
    pointerStartX = e.clientX;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (pointerStartX !== null) {
      pointerDeltaX = e.clientX - pointerStartX;
      const startIndex = Math.min(
        currentPage * slidesPerView,
        Math.max(0, slides.length - slidesPerView),
      );
      track.style.transform = `translateX(${-startIndex * slideWidth + pointerDeltaX}px)`;
    }
  });

  track.addEventListener("pointerup", () => {
    if (pointerStartX !== null) {
      if (pointerDeltaX > 50) {
        currentPage = clampPage(currentPage - 1);
      } else if (pointerDeltaX < -50) {
        currentPage = clampPage(currentPage + 1);
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

  buildDots();
  updateCarousel();
});
