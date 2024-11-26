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
      "Desain berkelas, dimana developer bisa membuat tampilan yang spektakuler tanpa mengorbankan user experience.",
    name: "Adyuta Prajahita",
    role: "Project Manager - Backend",
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
