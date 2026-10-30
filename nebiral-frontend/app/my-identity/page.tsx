"use client"

import "./about.css";
import BreadCrumb from "../breadCrumb/breadCrumb";
import SoftAurora from "../SoftAurora/SoftAurora ";
import { useRef, useState, useEffect } from "react";
import Typing_Animation from "../typingAnimCamponent/typingAnim";

export default function About() {

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionAbout = sectionRef.current;
  
  useEffect(() => {
      const sectionAbout = sectionRef.current;

      if (!sectionAbout) return;

      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  setVisible(true);
                  observer.unobserve(sectionAbout);
              }
          });
      }, {
          threshold: 0.0
      });

      observer.observe(sectionAbout);

      return () => observer.disconnect();
  }, []);

  return (

    <section className="about-section" id="about" dir="rtl">

        <section className="aura">

            <div style={{ width: '100%', height: '600px', position: 'relative' }}>

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

                <div ref={sectionRef} className={`title-and-breadCrumb ${visible === true ? "RunAbout" : ""}`}>
                  <h2 className="title-of-page">
                    درباره من
                  </h2>
                  <BreadCrumb />
                </div>
                
        </section>

      <div className="about-container">

        <div className="about-top">
          <span className="about-label">
            <span className="about-dot"></span>
            ABOUT ME / 01
          </span>

          <span className="about-coordinate">
            DEVELOPER & AI ENGINEER
          </span>
        </div>

        <div className="about-content">

          <div className="about-heading">

            <h2 className="typing-Animation">
             <Typing_Animation
                  text="<فراتر از کد/>"
                  speed={100}
              />
              <span>در جست‌وجوی راه‌حل.</span>
            </h2>

            <div className="about-orbit">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="orbit-core"></div>
              <span className="orbit-star">✳</span>
            </div>
          </div>

          <div className="about-description">
            <p className="about-intro">
              سلام، من طاها قرایی هستم؛ توسعه‌دهنده نرم‌افزار
              با علاقه‌ای عمیق به هوش مصنوعی و ساخت محصولاتی
              که فراتر از یک ایده، کاربرد واقعی دارند.
            </p>

            <p>
              مسیر من از طراحی وب شروع شد و به توسعه
              اپلیکیشن‌های فول‌استک و تجربه کار با مدل‌های
              یادگیری ماشین و سیستم‌های هوش مصنوعی رسید.
              برای من، برنامه‌نویسی فقط نوشتن کد نیست؛
              فرصتی است برای درک مسائل، پیدا کردن راه‌حل‌های
              بهتر و تبدیل ایده‌ها به محصولاتی واقعی.
            </p>

            <p>
              همیشه در حال یادگیری‌ام؛ از معماری نرم‌افزار
              و توسعه وب گرفته تا سیستم‌های مبتنی بر هوش
              مصنوعی. چیزی که برایم اهمیت دارد، ساختن،
              آزمایش کردن و بهتر شدن با هر پروژه است.
            </p>
          </div>

        </div>

        <div className="about-divider"></div>

        <div className="about-bottom">

          <div className="about-principle">
            <span className="principle-number">01</span>
            <div>
              <h3>کنجکاوی</h3>
              <p>همیشه یک سؤال دیگر برای کشف کردن هست.</p>
            </div>
          </div>

          <div className="about-principle">
            <span className="principle-number">02</span>
            <div>
              <h3>مهندسی</h3>
              <p>ساختن راه‌حل‌های دقیق و قابل توسعه.</p>
            </div>
          </div>

          <div className="about-principle">
            <span className="principle-number">03</span>
            <div>
              <h3>آینده‌نگری</h3>
              <p>یادگیری امروز برای ساختن فردا.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}