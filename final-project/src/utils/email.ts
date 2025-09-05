import emailjs from "@emailjs/browser";

export class EmailForm {
  private form: HTMLFormElement | null;
  private statusEl: HTMLParagraphElement | null;
  private submitBtn: HTMLButtonElement | null;

  private publicKey: string | undefined;
  private serviceId: string | undefined;
  private templateId: string | undefined;

  constructor(
    private formId = "contact-form",
    private statusId = "form-status",
  ) {
    this.form = document.getElementById(this.formId) as HTMLFormElement | null;
    this.statusEl = document.getElementById(
      this.statusId,
    ) as HTMLParagraphElement | null;
    this.submitBtn =
      (this.form?.querySelector(
        'button[type="submit"]',
      ) as HTMLButtonElement | null) ??
      (this.form?.querySelector('[type="submit"]') as HTMLButtonElement | null);

    this.publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
    this.serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    this.templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
  }

  public init() {
    if (!this.form || !this.statusEl || !this.submitBtn) {
      console.error("[email] Missing element(s):", {
        form: !!this.form,
        statusEl: !!this.statusEl,
        submitBtn: !!this.submitBtn,
      });
      return;
    }

    if (!this.publicKey || !this.serviceId || !this.templateId) {
      console.error(
        "[email] Missing EmailJS envs. Check .env: PUBLIC_EMAILJS_PUBLIC_KEY / _SERVICE_ID / _TEMPLATE_ID",
      );
      this.setStatus(
        "❌ Email is not configured. Please contact support.",
        "red",
      );
      return;
    }

    emailjs.init({ publicKey: this.publicKey });

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form || !this.statusEl || !this.submitBtn) return;

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.submitBtn.disabled = true;
    this.setStatus("🚀 Sending your message...", "blue");

    try {
      await emailjs.sendForm(this.serviceId!, this.templateId!, this.form);
      this.setStatus("✅ Your message has been sent successfully!", "green");
      this.form.reset();
    } catch (error) {
      console.error("[email] sendForm failed:", error);
      this.setStatus("❌ Failed to send message. Please try again.", "red");
    } finally {
      this.submitBtn.disabled = false;
    }
  }

  private setStatus(message: string, color: string) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message;
    this.statusEl.style.color = color;
  }
}
