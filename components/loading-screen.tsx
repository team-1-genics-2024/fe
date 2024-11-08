// components/LoadingScreen.tsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen w-full bg-[#3498DB] bg-gradient-to-br from-[#3498DB] to-[#2980B9] overflow-hidden">
      {/* Geometric background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full transform animate-pulse"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading animation */}
      <div className="relative">
        {/* DNA Helix Animation */}
        <div className="relative w-40 h-40">
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <div
                className="absolute w-4 h-4 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: `${i * 12.5}%`,
                  transform: `translateX(-50%) translateX(${
                    Math.sin((i * Math.PI) / 4) * 40
                  }px)`,
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <div
                className="absolute w-4 h-4 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: `${i * 12.5}%`,
                  transform: `translateX(-50%) translateX(${
                    Math.sin((i * Math.PI) / 4 + Math.PI) * 40
                  }px)`,
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1 + 0.75}s`,
                }}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Rotating circles */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "8s" }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${i * 90}deg)`,
              }}
            >
              <div className="absolute w-3 h-3 bg-white rounded-full -top-1.5 left-1/2 transform -translate-x-1/2 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Center element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full animate-pulse opacity-50" />
        </div>

        {/* Loading text with gradient */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full text-center">
          <div className="relative inline-block">
            <span className="relative text-white text-xl font-bold tracking-widest">
              Redirecting...
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left animate-loadingBar" />
            </span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const styles = `
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
`;

export const WithLoadingScreen = () => {
  return (
    <>
      <style>{styles}</style>
      <LoadingScreen />
    </>
  );
};

export default LoadingScreen;
