export interface SocialLink {
  key: "github" | "linkedin" | "whatsapp" | "telegram" | "email";
  href: string;
  icon: React.ReactNode;
}