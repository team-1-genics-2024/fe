import { testimonials } from "@/lib/static-data/testimonials-data";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import React from "react";
import Image from "next/image";

export const AnimatedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-4xl xl:text-4xl font-bold text-center mb-4 text-gray-800">
          What people say about
          <Image
            src="/image/logo/logo.png"
            alt="SinauPo'o Icon"
            width={250}
            height={250}
            quality={100}
            className="md:-mt-2 lg:-mt-2 sm:mt-4 inline-flex items-center justify-center ml-4"
          />
        </h2>

        <CardContainer className="w-full">
          <CardBody className="relative w-full h-[600px]">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 ${
                    isActive ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <CardItem translateZ="100" className="w-full h-full">
                    <div className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:cursor-pointer hover:shadow-2xl hover:shadow-[#3498DB]/[0.8] hover:rounded-2xl">
                      <div className="relative w-32 h-32 mx-auto mb-8">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={100}
                            height={100}
                            className="w-full h-full rounded-full object-cover border-4 border-[#3498DB]/70 shadow-lg"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <CardItem translateZ="50" className="text-center">
                        <blockquote className="text-2xl text-gray-700 font-medium mb-8 leading-relaxed">
                          &apos;&apos;{testimonial.quote}&apos;&apos;
                        </blockquote>
                      </CardItem>

                      <div className="flex flex-col items-center justify-center text-center">
                        <cite className="block text-xl font-semibold text-gray-900 not-italic">
                          {testimonial.name}
                        </cite>
                        <p className="text-lg text-gray-600 mt-2 text-center">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardItem>
                </motion.div>
              );
            })}
          </CardBody>
        </CardContainer>

        <div className="flex justify-center items-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ease-out ${
                index === currentIndex
                  ? "w-12 h-3 bg-[#3498DB] rounded-full"
                  : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
