import { publicUrl } from "./supabase/admin";

export const SITE = {
  name: "Hamper Haven",
  tagline: "Premium Gift Experiences",
  phone: "+91 89298 16244",
  phoneHref: "tel:+918929816244",
  whatsappNumber: "918929816244",
  email: "hamperhaven00@gmail.com",
  emailHref: "mailto:hamperhaven00@gmail.com",
  hours: "Mon-Sun: 9AM-8PM",
  orderNote: "Order 5 days in advance for guaranteed delivery.",
};

export function whatsappLink(
  message = "Hi Hamper Haven! I have a question about your hampers.",
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const LOGO_URL = publicUrl("brand/logo.webp");

export const TEAM = [
  {
    name: "Kavita Goswami",
    role: "Founder",
    image: "/team/kavita.jpg",
    position: "50% 35%",
    instagram: "https://www.instagram.com/kavitaa_19?igsh=am9yZ21rem53ZWhv",
  },
  {
    name: "Pratyush Rohilla",
    role: "Co-founder",
    image: "/team/pratyush.jpg",
    position: "50% 40%",
    instagram: "https://www.instagram.com/pratyush__rohilla?igsh=MWhrdDRzNGNtNmZtZQ%3D%3D",
  },
] as const;

export const GALLERY = [
  "/gallery/haven-01.jpg",
  "/gallery/haven-02.jpg",
  "/gallery/haven-03.jpg",
  "/gallery/haven-04.jpg",
  "/gallery/haven-05.jpg",
  "/gallery/haven-06.jpg",
  "/gallery/haven-07.jpg",
  "/gallery/haven-08.jpg",
  "/gallery/haven-09.jpg",
  "/gallery/haven-10.jpg",
  "/gallery/haven-11.jpg",
  "/gallery/haven-12.jpg",
  "/gallery/legacy-one.jpeg",
  "/gallery/legacy-two.jpeg",
  "/gallery/legacy-three.jpeg",
  "/gallery/legacy-four.jpeg",
  "/gallery/legacy-five.jpeg",
  "/gallery/legacy-six.jpeg",
  "/gallery/legacy-seven.jpeg",
  "/gallery/legacy-eight.jpeg",
  "/gallery/legacy-nine.jpeg",
  "/gallery/legacy-ten.jpeg",
  "/gallery/legacy-eleven.jpeg",
  "/gallery/legacy-twelve.jpeg",
];

export const HERO_IMAGES = [
  "/gallery/haven-01.jpg",
  "/gallery/haven-02.jpg",
  "/gallery/haven-03.jpg",
];

export function galleryUrl(name: string) {
  if (name.startsWith("/")) return name;
  return publicUrl(`site/${name}`);
}