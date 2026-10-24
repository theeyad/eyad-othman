export interface SocialLink {
  key: "github" | "linkedin" | "whatsapp" | "telegram" | "email";
  href: string;
  icon: React.ReactNode;
}

export interface NavTabProps {
  href: string;
  label: string;
  isActive?: boolean;
  isAr: boolean;
  isExternal?: boolean;
  download?: string;
  logo?: React.ReactNode;
}

export interface SplitTextProps {
  text: string;
  isArabic?: boolean;
  className?: string;
  delay?: number;
  charDelay?: number;
  wordDelay?: number;
}

export interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme | null;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}
