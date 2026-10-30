"use client"

import Starfield from "@/app/camponenetBackground/registry/starfield/starfield";
import "./page.css";
import Typing_Animation from "@/app/typingAnimCamponent/typingAnim";
import ProjectCarousel from "@/app/carouselCamponent/carousel"
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const sectionRefCarousel = useRef<HTMLDivElement | null>(null)
  const sectionRefCarouselzero = useRef<HTMLDivElement | null>(null)

  const [visible, setVisible] = useState(false)
  const [visibleCarousel, setVisibleCarousel] = useState(false)
  const [visibleCarouselZero, setVisibleCarouselZero] = useState(false)
  

    useEffect(() => {
      const section = sectionRef.current;
      const sectionCarousel = sectionRefCarousel.current;
      const sectionCarouselZero = sectionRefCarouselzero.current;

      if (!section || !sectionCarousel || !sectionCarouselZero) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target === section) {
                setVisible(true);
                observer.unobserve(section);
              }

              if (entry.target === sectionCarousel) {
                setVisibleCarousel(true);
                observer.unobserve(sectionCarousel);
              }

              if (entry.target === sectionCarouselZero) {
                setVisibleCarouselZero(true);
                observer.unobserve(sectionCarouselZero);
              }
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(section);
      observer.observe(sectionCarousel);
      observer.observe(sectionCarouselZero);

      return () => observer.disconnect();
    }, []);

  return (

    <>

    <main className="galaxy-hero">
      <div className="galaxy-background">

        <Starfield
          starColor="#ffffff"
          accentColor="#f9f9fa"
          density={1.0}
          layers={3}
          driftSpeed={0.2}
          twinkle={0.1}
          shootingStars={0.1}
          glow={2}
        />
      </div>

      <div className="galaxy-glow" />

      <section className="galaxy-content">
        <h1 className="galaxy-title">Taha's Digital Space</h1>

        <p className="galaxy-description">
          Explore the universe of possibilities.
        </p>

        <div className="galaxy-divider" />
      </section>
    </main>

      <section className="profile-section">
      <h2 className="profile-name">طاها قرایی</h2>

        <div className="profile-role">
          <Typing_Animation
            text="< توسعه ‌دهنده وب و هوش مصنوعی />"
            speed={100}
          />
        </div>
      </section>

            <div
        ref={sectionRef}
        className={`about ${visible ? "runSection" : ""}`}
      >
        <section className="about-image">
          <Image
            src="/images/car2.jpg"
            alt="Project preview"
            width={800}
            height={1000}
            className="about-img"
          />

          <span className="image-index">01 / ABOUT</span>
        </section>

        <section className="about-content">
          <span className="about-label">A LITTLE ABOUT ME</span>

          <h2>
            Building digital
            <br />
            <span>experiences.</span>
          </h2>

          <p>
            I design and develop modern digital experiences with a focus on
            simplicity, performance, and thoughtful details. My approach
            combines creative design with engineering to build products
            that feel as good as they work.
          </p>

          <div className="about-footer">
            <span>DESIGN · DEVELOPMENT · AI</span>
            <span className="about-arrow">↗</span>
          </div>
        </section>
      </div>

      <section className="project-perview">
         <h2 className="projects-title">
          <Typing_Animation
            text="< پروژه ها/>"
            speed={100}
          />
         </h2>
          <div ref={sectionRefCarouselzero} className={`carouselZero ${visibleCarouselZero ? "runSection" : ""}`}>
            <ProjectCarousel type="projects"/>
         </div>

      </section>

      <section className="project-perview">
         <h2 className="projects-title">
          <Typing_Animation
            text="< مهارت ها/>"
            speed={100}
          />
         </h2>
         <div ref={sectionRefCarousel} className={`carousel ${visibleCarousel ? "runSection" : ""}`}>
            <ProjectCarousel type="skills"/>
         </div>
          

      </section>





    </>

  );
}