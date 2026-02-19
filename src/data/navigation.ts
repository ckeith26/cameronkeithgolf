export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  handle?: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Golf", href: "/golf" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** @deprecated Use navLinks instead */
export type NavItem = NavLink;
/** @deprecated Use navLinks instead */
export const navItems = navLinks;

export const socialLinks: SocialLink[] = [
  {
    label: "X",
    href: "https://x.com/camkeithgolf",
    icon: "x",
    handle: "@camkeithgolf",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/cam-keith",
    icon: "linkedin",
    handle: "@cam-keith",
  },
  {
    label: "GitHub",
    href: "https://github.com/ckeith26",
    icon: "github",
    handle: "@ckeith26",
  },
  {
    label: "Email",
    href: "mailto:cameron.s.keith.26@dartmouth.edu",
    icon: "mail",
  },
];
