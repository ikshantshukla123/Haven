import { publicUrl } from "./supabase/admin";

export const SITE = {
  name: "Hamper Heaven",
  tagline: "Premium Gift Experiences",
  phone: "+91 971-7150-055",
  phoneHref: "tel:+919717150055",
  email: "pratyushrohilla6527@gmail.com",
  emailHref: "mailto:pratyushrohilla6527@gmail.com",
  hours: "Mon-Sun: 9AM-8PM",
  orderNote: "Order 5 days in advance for guaranteed delivery.",
};

export const LOGO_URL = publicUrl("brand/logo.webp");

export const TEAM = [
  {
    name: "Abhijay Maurya",
    image: publicUrl("team/abhijay.webp"),
    instagram: "https://www.instagram.com/abhijay_maurya12?igsh=MWJkeXVzOHNuenhxaw%3D%3D",
  },
  {
    name: "Pratyush Rohilla",
    image: publicUrl("team/pratyush.webp"),
    instagram: "https://www.instagram.com/pratyush__rohilla?igsh=MWhrdDRzNGNtNmZtZQ%3D%3D",
  },
  {
    name: "Kavita Goswami",
    image: publicUrl("team/kavita.webp"),
    instagram: "https://www.instagram.com/kavitaa_19?igsh=am9yZ21rem53ZWhv",
  },
] as const;

export const GALLERY = [
  "one.webp",
  "two.webp",
  "three.webp",
  "four.webp",
  "five.webp",
  "six.webp",
  "seven.webp",
  "eight.webp",
  "nine.webp",
  "ten.webp",
  "eleven.webp",
  "twelve.webp",
];

export const HERO_IMAGES = ["six.webp", "one.webp", "two.webp"];

export function galleryUrl(name: string) {
  return publicUrl(`site/${name}`);
}