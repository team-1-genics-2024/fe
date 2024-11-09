import React, { useEffect, useState, useMemo, ReactNode } from "react";
import Image from "next/image";
import { getStoredToken, refreshUserToken } from "@/lib/auth";
import { showToast } from "@/lib/toast";

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

interface AuthRequiredScreenProps {
  children: ReactNode;
}

const PARTICLE_STYLES = {
  background: "bg-white/30",
  position: "absolute",
  rounded: "rounded-full",
} as const;

const AuthScreen: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
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

  const [isLeaving, setIsLeaving] = useState(false);

  const handleReturn = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onReturn();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#3498db] transition-all duration-500 ease-in-out
        ${isLeaving ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
    >
      {/* Background particles */}
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

      {/* Main Content */}
      <div className="relative w-full max-w-md px-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${i * 90}deg)` }}
              >
                <div className="absolute w-2 h-2 bg-white rounded-full -top-1 left-1/2 transform -translate-x-1/2" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-pulse">
              <Image
                src="/image/homepage/icon_white.png"
                width={48}
                height={48}
                alt="SinauPo'o"
                className="w-12 h-12"
                priority
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 text-white">
          <h2 className="text-2xl font-bold tracking-wider animate-pulse">
            Login Required
          </h2>
          <p className="text-lg opacity-90">Please login to access this page</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mt-8">
            <button
              onClick={handleReturn}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-[#3498db] bg-white rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>

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

export const WithAuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAuthScreen, setShowAuthScreen] = useState<boolean>(false);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const token = getStoredToken();

        if (!token) {
          const refreshResult = await refreshUserToken();

          if (!refreshResult) {
            setIsAuthenticated(false);
            setShowAuthScreen(true);
            showToast("Please login to continue.", "error");
            return;
          }

          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth validation error:", error);
        setIsAuthenticated(false);
        setShowAuthScreen(true);
        showToast("Authentication error occurred.", "error");
      } finally {
        setIsLoading(false);
        setMounted(true);
      }
    };

    validateAuth();
  }, []);

  const handleReturn = () => {
    setShowAuthScreen(false);
  };

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <>
      {showAuthScreen && <AuthScreen onReturn={handleReturn} />}
      {isAuthenticated && children}
    </>
  );
};

export default WithAuthRequiredScreen;
