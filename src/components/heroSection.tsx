import TruckScene from "./TruckScene";
import { useEffect, useState } from "react";

const words = ["Solana speed.", "just one scan.", "blockchain transparency."];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typeSpeed = isDeleting ? 50 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setCurrentText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      <div className="absolute bottom-56 left-0 z-20 flex flex-col items-start px-8 ml-14 text-gray-800">
  <div className="text-left">
    <h1 className="uppercase text-7xl leading-none tracking-tighter font-['Founders_Grotesk'] font-medium">
      Track your
    </h1>
    <h1 className="uppercase mt-2 text-7xl leading-none tracking-tighter font-['Founders_Grotesk'] font-medium">
      cargo in real-time
    </h1>
    <h1 className="uppercase mt-2 text-7xl leading-none tracking-tighter font-['Founders_Grotesk'] font-medium whitespace-nowrap">
      <span className="text-gray-800">with </span>
      <span className="text-primary transition-all duration-300 ease-in-out">
        {currentText}
      </span>
      <span className="inline-block w-1 animate-blink text-primary">|</span>
    </h1>
  </div>
</div>



    </div>
  );
};

export default HeroSection;
