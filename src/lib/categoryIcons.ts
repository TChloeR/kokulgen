import {
  Baby, HeartHandshake, Flag, GraduationCap, Accessibility, Users,
  Heart, Home, HandHeart, BookOpen, Stethoscope, Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "child-care": Baby,
  mother: HeartHandshake,
  flag: Flag,
  school: GraduationCap,
  accessibility: Accessibility,
  people: Users,
  heart: Heart,
  home: Home,
  hand: HandHeart,
  book: BookOpen,
  health: Stethoscope,
  wallet: Wallet,
};

export const CATEGORY_ICON_OPTIONS = [
  { value: "child-care", label: "Çocuk" },
  { value: "mother", label: "Anne / Destek" },
  { value: "flag", label: "Bayrak (Şehit/Gazi)" },
  { value: "school", label: "Eğitim / Öğrenci" },
  { value: "accessibility", label: "Engelli" },
  { value: "people", label: "Genel / İnsanlar" },
  { value: "heart", label: "Kalp" },
  { value: "home", label: "Ev / Barınma" },
  { value: "hand", label: "Yardım Eli" },
  { value: "book", label: "Kitap" },
  { value: "health", label: "Sağlık" },
  { value: "wallet", label: "Maddi Destek" },
];
