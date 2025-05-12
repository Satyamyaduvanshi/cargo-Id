import { useRef, useEffect } from "react";
import gsap from "gsap";

const TruckImage = () => {
  // Create a reference to the truck image container
  const truckContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (truckContainerRef.current) {
      // Initial position off-screen to the left
      gsap.set(truckContainerRef.current, { 
        x: -1000, // Start off-screen to the left
        opacity: 0 
      });
      
      // Animate to the final position with opacity increasing as it approaches
      gsap.to(truckContainerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: function() {
          // Calculate progress (0 to 1)
          const progress = this.progress();
          // Set opacity based on progress (0 to 1)
          if (truckContainerRef.current) {
            truckContainerRef.current.style.opacity = String(progress);
          }
        }
      });
    }
  }, []);

  return (
    <div 
      ref={truckContainerRef}
      className="z-10"
      style={{ 
        position: 'absolute',
        right: '230px',
        bottom: '200px',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >
      <img 
        src="/truckImg.png" 
        alt="Truck" 
        style={{ 
          width: '700px',
          height: 'auto',
        }} 
      />
    </div>
  );
};

export default TruckImage; 