import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Baby,
  BookOpen,
  Droplets,
  GraduationCap,
  Handshake,
  Heart,
  Home,
  Package,
  Shield,
  Stethoscope,
  Truck,
  Users,
  Wheat,
} from "lucide-react";

export const PROGRAM_ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  heart: Heart,
  baby: Baby,
  home: Home,
  "graduation-cap": GraduationCap,
  droplets: Droplets,
  wheat: Wheat,
  apple: Apple,
  stethoscope: Stethoscope,
  "book-open": BookOpen,
  handshake: Handshake,
  truck: Truck,
  users: Users,
  package: Package,
};

export function programIcon(name: string): LucideIcon {
  return PROGRAM_ICONS[name] ?? Shield;
}
