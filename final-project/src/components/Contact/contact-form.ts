import { EmailForm } from "../../utils/email.ts";

function initInput(el: HTMLInputElement, attrs: Record<string, string>) {
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function attachValidator(
  el: HTMLInputElement,
  {
    onInput,
    onBlur,
  }: {
    onInput?: (el: HTMLInputElement) => void;
    onBlur?: (el: HTMLInputElement) => void;
  },
) {
  if (onInput) {
    el.addEventListener("input", () => {
      el.setCustomValidity("");
      onInput(el);
    });
  }
  if (onBlur) {
    el.addEventListener("blur", () => {
      onBlur(el);
    });
  }
}

function formatPhone(value: string): string {
  let raw = (value || "").replace(/\D/g, "").slice(0, 11);
  if (!raw) return "";

  const hasCountry = raw.startsWith("1");
  const country = hasCountry ? "1-" : "";
  const digits = hasCountry ? raw.slice(1) : raw;

  if (digits.length <= 3) {
    return country + digits;
  } else if (digits.length <= 6) {
    return country + `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else {
    return (
      country +
      `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    );
  }
}

function validatePhone(el: HTMLInputElement) {
  const raw = el.value.replace(/\D/g, "");
  const hasCountry = raw.length === 11 && raw.startsWith("1");
  const digits = hasCountry ? raw.slice(1) : raw;

  const lenOk = digits.length === 10;
  const areaOk = /^[2-9]/.test(digits.charAt(0));
  const exchOk = /^[2-9]/.test(digits.charAt(3));

  if (digits && (!lenOk || !areaOk || !exchOk)) {
    el.setCustomValidity("The Canadian phone number format is invalid.");
    el.reportValidity();
  } else {
    el.setCustomValidity("");
  }
}

function setupPhoneInput(el: HTMLInputElement) {
  initInput(el, {
    inputmode: "numeric",
    autocomplete: "tel",
    maxlength: "13",
    pattern: "^(?:1-)?[2-9]\\d{2}-[2-9]\\d{2}-\\d{4}$",
    title: "e.g.: 604-555-1234 OR 1-604-555-1234",
  });

  el.addEventListener("keydown", (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  });

  attachValidator(el, {
    onInput: (inputEl) => {
      const formatted = formatPhone(inputEl.value);
      if (inputEl.value !== formatted) inputEl.value = formatted;
    },
    onBlur: validatePhone,
  });
}

function isValidEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
}

function validateEmail(el: HTMLInputElement) {
  const val = el.value.trim();
  if (!val) {
    el.setCustomValidity("");
    return;
  }
  if (!isValidEmail(val)) {
    el.setCustomValidity("Please enter a valid email address.");
    el.reportValidity();
  } else {
    el.setCustomValidity("");
  }
}

function setupEmailInput(el: HTMLInputElement) {
  attachValidator(el, {
    onBlur: validateEmail,
  });
}

const emailForm = new EmailForm("contact-form", "form-status");
emailForm.init();

const phoneInput = document.getElementById("phone");
if (phoneInput instanceof HTMLInputElement) {
  setupPhoneInput(phoneInput);
}

const emailInput = document.getElementById("email");
if (emailInput instanceof HTMLInputElement) {
  setupEmailInput(emailInput);
}
