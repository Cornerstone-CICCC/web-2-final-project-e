type MaybeEl<T extends Element = Element> = T | null;

function expandPanel(panel: HTMLElement) {
  panel.style.height = panel.scrollHeight + "px";
  const onEnd = (ev: TransitionEvent) => {
    if (ev.propertyName !== "height") return;
    panel.style.height = "auto";
    panel.removeEventListener("transitionend", onEnd);
  };
  panel.addEventListener("transitionend", onEnd);
}

function collapsePanel(panel: HTMLElement) {
  const current = panel.scrollHeight;
  panel.style.height = current + "px";

  void panel.offsetHeight;
  panel.style.height = "0px";
}

function handleToggle(trigger: HTMLButtonElement, panel: HTMLElement) {
  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  const next = !isOpen;
  trigger.setAttribute("aria-expanded", String(next));
  if (next) expandPanel(panel);
  else collapsePanel(panel);
}

const INIT_KEY = "__faqDelegatedInit__" as const;
if (!(window as any)[INIT_KEY]) {
  (window as any)[INIT_KEY] = true;
  document.addEventListener("click", (evt) => {
    const target = (evt.target as Element | null)?.closest(
      ".faq__trigger",
    ) as MaybeEl<HTMLButtonElement>;
    if (!target) return;

    const item = target.closest(".faq__item") as MaybeEl<HTMLElement>;
    const panel = item?.querySelector(".faq__panel") as MaybeEl<HTMLElement>;
    if (!panel) return;

    handleToggle(target, panel);
  });
}
