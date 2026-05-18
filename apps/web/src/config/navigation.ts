import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Overview", href: routes.dashboard },
  { label: "Drivers", href: routes.drivers },
  { label: "Violations", href: routes.violations },
];
