"use client";

import { useEffect, useRef, useState } from "react";
import "./contact.css";
import BreadCrumb from "../breadCrumb/breadCrumb";
import SoftAurora from "../SoftAurora/SoftAurora ";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" dir="rtl">
      <div className="contact-hero">
        <div className="contact-aurora">
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
          className={`contact-title ${
            visible ? "RunContact" : ""
          }`}
        >
          <span className="contact-eyebrow">
            LET&apos;S CONNECT / 04
          </span>

          <h1>ارتباط با من</h1>

          <p>
            ایده‌ای داری یا می‌خوای درباره یک پروژه صحبت کنیم؟
            <br />
            خوشحال می‌شم ازت بشنوم.
          </p>

          <BreadCrumb />
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-top">
          <span className="contact-label">
            <span className="contact-dot"></span>
            GET IN TOUCH
          </span>

          <span className="contact-coordinate">
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        <div className="contact-content">
          <div className="contact-heading">
            <span className="contact-index">01 / CONTACT</span>

            <h2>
              بیایید چیزی
              <br />
              <span>متفاوت بسازیم.</span>
            </h2>

            <p>
              از همکاری در پروژه‌های نرم‌افزاری و وب گرفته تا
              ایده‌های مرتبط با هوش مصنوعی، آماده‌ام درباره
              فرصت‌های جدید گفت‌وگو کنیم.
            </p>

            <div className="contact-status">
              <span className="contact-status-dot"></span>
              آماده گفت‌وگو درباره پروژه‌های جدید
            </div>
          </div>

          <div className="contact-methods">
            <a
              href="tel:09059627668"
              className="contact-card"
            >
              <span className="contact-card-number">01</span>

              <div className="contact-card-content">
                <span className="contact-card-label">
                  PHONE
                </span>
                <h3 dir="ltr">09059627668</h3>
                <p>برای تماس مستقیم</p>
              </div>

              <span className="contact-arrow">↗</span>
            </a>

            <a
              href="https://t.me/mtgharaei"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <span className="contact-card-number">02</span>

              <div className="contact-card-content">
                <span className="contact-card-label">
                  TELEGRAM
                </span>
                <h3>تلگرام</h3>
                <p>برای گفت‌وگو و هماهنگی</p>
              </div>

              <span className="contact-arrow">↗</span>
              </a>

        <a
          href="https://github.com/tahamtg"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <span className="contact-card-number">03</span>

          <div className="contact-card-content">
            <span className="contact-card-label">
              GITHUB
            </span>
            <h3>گیت‌هاب</h3>
            <p>برای مشاهده پروژه‌ها و کدها</p>
          </div>

          <span className="contact-arrow">↗</span>
        </a>
      </div>
    </div>

    <div className="contact-divider"></div>

    <div className="contact-bottom">
      <div>
        <span className="contact-bottom-label">
          HAVE AN IDEA?
        </span>

        <h3>از یک گفت‌وگو شروع کنیم.</h3>
      </div>

      <a
        href="https://t.me/mtgharaei"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-cta"
      >
        شروع گفت‌وگو
        <span>↗</span>
      </a>
    </div>

    <footer className="contact-footer">
      <span>TAHA GHARAEE</span>
      <span>
        BUILT WITH CURIOSITY <span className="contact-star">✳</span>
      </span>
    </footer>
  </div>
</section>

);
}