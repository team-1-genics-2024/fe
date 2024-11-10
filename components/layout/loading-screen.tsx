import React, { useEffect, useState, useMemo, ReactNode } from "react";
import Image from "next/image";

interface Particle {
  size: number;
  position: {
    left: number;
    top: number;
  };
  delay: number;
}

interface FloatingParticle {
  position: {
    left: number;
    top: number;
  };
  animation: {
    duration: number;
    delay: number;
  };
}

interface WithFullPageLoadingScreenProps {
  children: ReactNode;
}

const PARTICLE_STYLES = {
  background: "bg-white/30",
  position: "absolute",
  rounded: "rounded-full",
} as const;

const LOADING_TEXT_STYLES = {
  container: "relative text-white text-xl font-bold tracking-widest",
  underline:
    "absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left",
} as const;

const LoadingScreen: React.FC = () => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 12 }, () => ({
        size: Math.floor(10 + Math.random() * 15),
        position: {
          left: Math.floor(Math.random() * 100),
          top: Math.floor(Math.random() * 100),
        },
        delay: Math.random() * 2,
      })),
    []
  );

  const floatingParticles = useMemo<FloatingParticle[]>(
    () =>
      Array.from({ length: 8 }, () => ({
        position: {
          left: Math.floor(Math.random() * 100),
          top: Math.floor(Math.random() * 100),
        },
        animation: {
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 2,
        },
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3498db]">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`${PARTICLE_STYLES.background} ${PARTICLE_STYLES.position} ${PARTICLE_STYLES.rounded} animate-pulse`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.position.left}%`,
              top: `${particle.position.top}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-40 h-44">
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * 90}deg)` }}
            >
              <Image
                src="/star-5.svg"
                alt="stars"
                width={20}
                height={20}
                priority={true}
                className="absolute rounded-full -top-2 left-1/2 transform -translate-x-1/2"
              />
            </div>
          ))}
        </div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative animate-pulse">
              <Image
                src="/image/homepage/icon_white.png"
                alt="SinauPo'o"
                width={40}
                height={40}
                className="w-12 h-12"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            </div>
            <p className="text-white text-xl font-semibold animate-pulse">
              SinauPo'o
            </p>
          </div>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full text-center">
          <div className="inline-block">
            <span className={LOADING_TEXT_STYLES.container}>
              {/* Redirecting... */}
              <span
                className={`${LOADING_TEXT_STYLES.underline} animate-loadingBar`}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {floatingParticles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-float"
          style={{
            left: `${particle.position.left}%`,
            top: `${particle.position.top}%`,
            animationDuration: `${particle.animation.duration}s`,
            animationDelay: `${particle.animation.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const WithFullPageLoadingScreen: React.FC<
  WithFullPageLoadingScreenProps
> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowLoadingScreen(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes loadingBar {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-loadingBar {
          animation: loadingBar 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      {showLoadingScreen && <LoadingScreen />}
      {children}
    </>
  );
};

export default WithFullPageLoadingScreen;
