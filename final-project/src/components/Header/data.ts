export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface ContactInfo {
  id: string;
  label: string;
  value: string;
  type: "phone" | "location" | "hours" | "email";
}

export const CONTACT_INFO: ContactInfo[] = [
  {
    id: "emergency",
    label: "For emergency cases:",
    value: "800 123 45 67",
    type: "phone",
  },
  {
    id: "location",
    label: "Location:",
    value: "121 Wallstreet Street, NY, USA",
    type: "location",
  },
  {
    id: "hours",
    label: "Open hours:",
    value: "9:00-24:00 Mon-Sat",
    type: "hours",
  },
  {
    id: "email",
    label: "Email:",
    value: "info@Ddsgnr.com",
    type: "email",
  },
];
