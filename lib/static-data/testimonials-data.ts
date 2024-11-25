export const userAvatars = [
  "/avatar/avatar1.png",
  "/avatar/avatar2.png",
  "/avatar/avatar3.png",
  "/avatar/avatar4.png",
  "/avatar/avatar5.png",
  "/avatar/avatar6.png",
  "/avatar/avatar7.png",
  "/avatar/avatar8.png",
  "/avatar/avatar9.png",
  "/avatar/avatar10.png",
  "/avatar/avatar11.png",
  "/avatar/avatar12.png",
  "/avatar/avatar13.png",
  "/avatar/avatar14.png",
  "/avatar/avatar15.png",
] as const;

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "SinauPo'o membantu saya meningkatkan skill dengan cara yang menyenangkan dan fleksibel.",
    name: "Adyuta Prajahita",
    role: "Project Manager",
    image: "/image/photo/photo1.png",
  },
  {
    id: 2,
    quote:
      "Antarmuka yang user-friendly dan materi yang berkualitas. Sangat recommended untuk yang ingin belajar online!",
    name: "Adnan Juan",
    role: "PIC Backend",
    image: "/image/photo/photo2.jpeg",
  },
  {
    id: 3,
    quote:
      "SinauPo'o membantu saya meningkatkan skill dengan cara yang menyenangkan dan fleksibel.",
    name: "Nicholas N",
    role: "PIC UI/UX",
    image: "/image/photo/photo3.jpeg",
  },
  {
    id: 4,
    quote:
      "Platform ini sangat membantu saya dalam belajar. Materinya mudah dipahami dan bisa diakses kapan saja.",
    name: "Abdurrofi",
    role: "PIC Frontend",
    image: "/image/photo/photo4.jpg",
  },
];
