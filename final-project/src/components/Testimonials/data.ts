import Avatar1 from "../../assets/svgs/avatar_1.svg";
import Avatar2 from "../../assets/svgs/avatar_2.svg";
import Avatar3 from "../../assets/svgs/avatar_3.svg";

type Testimonial = {
  company: string;
  quote: string;
  name: string;
  role: string;
  avatar: typeof Avatar1;
};

export const testimonials: Testimonial[] = [
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar1,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar2,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar3,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar1,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar2,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar3,
  },
  {
    company: "webflow",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    role: "Position, Company name",
    avatar: Avatar1,
  },
];
