"use client";

import { useEffect, useRef, useState } from "react";
import SoftAurora from "../SoftAurora/SoftAurora ";
import BreadCrumb from "../breadCrumb/breadCrumb";

export default function StartCollab() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="start-collab" dir="rtl">
      <section className="aura">
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "relative",
          }}
        >
          <SoftAurora
            speed={0.7}
            scale={1.5}
            brightness={1}
            color1="#f8f8f8"
            color2="#0094ff"
            bandHeight={0.5}
            bandSpread={0.8}
            enableMouseInteraction
            mouseInfluence={0.1}
            spectrum={1}
            colorSpeed={1.3}
            noiseFrequency={2.5}
            noiseAmplitude={1.1}
            tilt={0}
            octaveDecay={0.08}
            layerOffset={0}
            clickPulse
            intro
            lightMode={false}
          />
        </div>

        <div
          ref={sectionRef}
          className={`title-and-breadCrumb ${visible ? "RunAbout" : ""}`}
        >
          <h2 className="title-of-page">شروع همکاری</h2>
          <BreadCrumb />
        </div>
      </section>
    </section>
  );
}
