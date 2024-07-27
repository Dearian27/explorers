import React, { ComponentPropsWithoutRef, FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import "./style.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string;
  onClick?: () => void;
  clickedClassName?: string;
  freezeActive?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  clickedClassName = "",
  freezeActive = false,
  ...props
}) => {
  const [wasClicked, setWasClicked] = useState(false);

  const buttonRef = React.useRef(null);

  const handleClick = (e) => {
    const numParticles = 40;
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const particles = [];
    const maxDistance = 100;
    const minAngle = 0;
    const maxAngle = -Math.PI;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * (maxAngle - minAngle) + minAngle;
      const distance = Math.random() * maxDistance;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = `${e.clientX - buttonRect.left}px`;
      particle.style.top = `${e.clientY - buttonRect.top}px`;
      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);
      particle.style.setProperty("--duration", `${Math.random() * 0.5 + 1.5}s`);
      particles.push(particle);
      buttonRef.current.appendChild(particle);
    }

    particles.forEach((particle) => {
      particle.style.animation =
        "particleAnimation ease-in-out var(--duration) forwards";
      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    });
  };

  return (
    <button
      {...props}
      id="bloodButton"
      ref={buttonRef}
      onClick={(e) => {
        if (!wasClicked) handleClick(e);
        setWasClicked(true);
        onClick?.();
      }}
      className={twMerge(
        "btn3d disabled:bg-zinc-300 disabled:!shadow-zinc-400",
        className,
        wasClicked &&
          freezeActive &&
          `!translate-y-1 !shadow-none ${clickedClassName}`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
