'use client'
import { GridScan } from '@/components/GridScan';
import Shuffle from '@/components/Shuffle';
import StaggeredMenu from '@/components/StaggeredMenu';
import { pressStart2P } from '@/lib/fonts';
import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Events', ariaLabel: 'View our events', link: '/events' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Website', link: 'https://musaliarcollege.com' },];

const eventLabels = ["CYBER PUNK", "ROBO WARS", "TECH SUMMIT"];

export default function Home() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);  const starsRef = useRef([]);
  const ribbonsRef = useRef([]);

  useGSAP(() => {    const images = imagesRef.current;
    const ribbons = ribbonsRef.current;

    // Star Parallax
    starsRef.current.forEach((star, i) => {
      const speed = (i + 1) * 100;
      gsap.to(star, {
        y: -speed,        ease: "none",
        scrollTrigger: {
          trigger: star,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    images.forEach((img, index) => {
      const ribbon = ribbons[index];
      const isEven = index % 2 === 0;

      // Initial States
      gsap.set(img, { yPercent: 100, scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" });
      gsap.set(ribbon, { xPercent: isEven ? 150 : -150 });

      // 1. Image Slide In & Ribbon Entry      
      tl.to(img, {
        yPercent: 0,
        duration: 1,
        ease: "power2.out"
      }, index === 0 ? 0 : "-=0.8");

      tl.to(ribbon, {
        xPercent: isEven ? -150 : 150, // Continuous slide across the screen
        duration: 2.5,
        ease: "none"
      }, index === 0 ? 0 : "-=1.2");

      // 2. Image Recede (Sync with Ribbon mid-point)
      if (index < images.length - 1) {
        tl.to(img, {
          scale: 0.3,
          opacity: 0,
          filter: "blur(8px) brightness(0.4)",
          duration: 1.5,
          ease: "power1.inOut"
        }, ">-1.2");
      }
    });
  }, { scope: containerRef });

  return (
    <section className='relative text-[#FED700] w-full overflow-x-hidden'>
      <div className='fixed inset-0 -z-10 bg-black' >
        <GridScan sensitivity={0.75} lineThickness={1} linesColor="#FFF800" gridScale={0.15} scanColor="#FFF800" scanOpacity={0.5} enablePost={false} enableGyro={true} bloomIntensity={0.6} chromaticAberration={0.002} noiseIntensity={0.01} scanDirection='forward' scanDelay={2} enableWebcam={false} />
      </div>
      
      <div className='h-[100dvh] fixed inset-0 z-20 pointer-events-none'>
        <StaggeredMenu position="right" items={menuItems} socialItems={socialItems} displaySocials={true} displayItemNumbering={true} menuButtonColor="#FFFFE0" openMenuButtonColor="#000000" changeMenuColorOnOpen={true} colors={['#FFFFE0', '#FED700']} logoUrl="/images/star.svg" accentColor="#FED700" />
      </div>

      {/* Hero Header */}
      <div className="relative h-screen flex justify-center items-center overflow-hidden">
        {/* Star elements mapping... */}
        {[60, 90, 180, 50, 120, 105].map((size, i) => (
          <Image key={i} ref={el => (starsRef.current[i] = el)} src="/images/star.svg" alt="star" width={size} height={size} className="absolute opacity-50" style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }} />
        ))}
        <div className="text-center">
          <Shuffle className={pressStart2P.className} text="Avishkar" duration={0.45} loop loopDelay={3} />
          <h3 className={`${pressStart2P.className} text-lg `}>2026</h3>
        </div>
      </div>

      {/* Cinematic Image & Ribbon Sequence */}
      <div ref={containerRef} className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-transparent">
        
        {/* Ribbon Layer */}
        {eventLabels.map((label, i) => (
          <div
            key={`ribbon-${i}`}
            ref={el => (ribbonsRef.current[i] = el)}
            className="absolute w-[200vw] h-16 md:h-24 bg-[#FED700] flex items-center justify-center z-50 shadow-2xl"
            style={{ 
              transform: `rotate(${i % 2 === 0 ? '-5deg' : '5deg'})`,
              top: `${30 + (i * 15)}%` 
            }}
          >
            <span className={`${pressStart2P.className} text-black text-xl md:text-4xl whitespace-nowrap`}>
              {label} • {label} • {label} • {label} • {label}
            </span>
          </div>
        ))}

        {/* Image Layer */}
        <div className="relative w-full h-full flex justify-center items-center">
          {[1, 2, 3].map((num, i) => (
            <div key={num} ref={(el) => (imagesRef.current[i] = el)} className="absolute w-full h-full flex justify-center items-center px-4" style={{ zIndex: 10 + i }}>
              <div className="relative w-full max-w-2xl aspect-square">
                <Image src={`/images/event (${num}).png`} alt={`event-${num}`} fill className="object-contain" priority />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen" />
    </section>
  );
}