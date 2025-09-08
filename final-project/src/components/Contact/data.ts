export const FORM_FIELDS = [
  {
    id: "first-name",
    label: "First name",
    type: "text",
    name: "first_name",
    required: true,
  },
  {
    id: "last-name",
    label: "Last name",
    type: "text",
    name: "last_name",
    required: true,
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    name: "phone_number",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    name: "user_email",
    required: true,
  },
  {
    id: "service",
    label: "Select service",
    name: "service",
    as: "select",
    options: [
      { value: "service1", label: "Service 1" },
      { value: "service2", label: "Service 2" },
    ],
    required: true,
  },
  {
    id: "date",
    label: "Appointment date",
    type: "date",
    name: "appointment_date",
    required: true,
  },
];

type ContactItem = {
  icon: "email" | "chat" | "phone" | "office";
  title: string;
  link: string;
  text: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "email",
    title: "Email",
    link: "mailto:hello@dsgnr.io",
    text: "hello@dsgnr.io",
  },
  { icon: "chat", title: "Live chat", link: "#", text: "Start new chat" },
  {
    icon: "phone",
    title: "Phone",
    link: "tel:+15550000000",
    text: "+1 (555) 000-0000",
  },
  {
    icon: "office",
    title: "Office",
    link: "#",
    text: "123 Sample St, Sydney NSW 2000 AU",
  },
];
