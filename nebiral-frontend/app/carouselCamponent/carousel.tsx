"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "@/app/carouselCamponent/carousel.css";

interface CarouselType{
  type: "projects" | "skills"
}

export default function ProjectCarousel({type}:CarouselType) {
  const [loadedFrames, setLoadedFrames] = useState<number[]>([]);

  const data = [
    {
      id: 1,
      image: "/images/messagesbox.png",
      url: "https://massagesbox.ir/",
      title: "MASSAGESBOX",
      category: "کد نویسی نرم افزار",
      description: "طراحی و پیاده‌سازی وب‌سایت پیام رسان با تمرکز بر تجربه کاربری و رابط کاربری مدرن.",
    },
    {
      id: 2,
      image: "/images/welder.png",
      url: "https://welderclock.com/",
      title: "WELDERCLOCK.COM",
      category: "طراحی وب‌سایت",
      description: "طراحی یک تجربه دیجیتال مدرن با ساختاری ساده و ظاهری حرفه‌ای.",
    },
    {
      id: 3,
      image: "",
      url: "https://set-clocl.com/",
      title: "SET-CLOCK.COM",
      category: "طراحی سایت شرکتی",
      description: "معرفی خدمات و محصولات در قالب یک وب‌سایت شرکتی و کاتالوگی.",
    },
    {
      id: 4,
      image: "/images/drmolaei.png",
      url: "https://dr-molaei.ir/",
      title: "DR-MOLAEI.IR",
      category: "طراحی سایت پزشکی زیبایی",
      description: "طراحی وب‌سایت تخصصی با ساختار مناسب معرفی خدمات پزشکی.",
    },
    {
      id: 5,
      image: "/images/msn.png",
      url: "https://msncable.ir/",
      title: "MSNCABLE.IR",
      category: "طراحی سایت شرکتی",
      description: "طراحی وب‌سایت برای معرفی محصولات و خدمات یک مجموعه صنعتی.",
    },
    {
      id: 6,
      image: "",
      url: "https://orginalfam.ir/",
      title: "ORIGINALFAM.IR",
      category: "طراحی وب سایت ",
      description: "یک پروژه با تمرکز بر ارائه خدمات و ایجاد تجربه کاربری مناسب.",
    },
    {
      id: 7,
      image: "/images/ilexmachine.png",
      url: "https://ilexmachine.com/",
      title: "ILEXMACHINE.COM",
      category: "توسعه وب",
      description: "پیاده‌سازی رابط کاربری و توسعه بخش‌های مختلف وب‌سایت.",
    },
    {
      id: 8,
      image: "/images/HYRCAN-LOGO-WHITE-PNG-scaled-e1765189445274.png",
      url: "https://hyrcanproductions.com/",
      title: "HYRCAN PRODUCTIONS",
      category: "طراحی وب‌سایت",
      description: "طراحی یک فضای دیجیتال برای معرفی برند و نمایش نمونه‌کارها.",
    },

     {
      id: 9,
      image: "",
      url: "https://tahagharaei.com/",
      title: "taha protofolio",
      category: "توسعه وب",
      description: "طراحی یک فضای مینیمال برای معرفی پروژه ها و نمایش نمونه‌کارها.",
    },

  ];


  const skillsData = [
    {
      id: 1,
      title: "Docker & Nginx",
      category: "Deployment",
      level: "Junior",
      description: "استقرار و راه‌اندازی پروژه‌ها با استفاده از Docker و Nginx.",
    },
    {
      id: 2,
      title: "Next.js",
      category: "Frontend Development",
      level: "Strong Junior",
      description: "توسعه وب‌سایت و رابط کاربری با React، TypeScript و Next.js.",
    },
    {
      id: 3,
      title: "Django",
      category: "Backend Development",
      level: "Strong Junior",
      description: "توسعه بک‌اند، طراحی API و مدیریت دیتابیس با Django و Django REST Framework.",
    },
    {
      id: 4,
      title: "Machine Learning",
      category: "Artificial Intelligence",
      level: "Junior",
      description: "آشنایی با الگوریتم‌های یادگیری ماشین، پیش‌پردازش داده‌ها، آموزش مدل و ارزیابی عملکرد آن‌ها.",
    },
    {
      id: 5,
      title: "AI Engineering",
      category: "LLMs, RAG Systems, NLP",
      level: "Junior",
      description: "آشنایی با مدل‌های زبانی بزرگ، طراحی سیستم‌های RAG و توسعه راهکارهای مبتنی بر هوش مصنوعی.",
    },
    {
      id: 5,
      title: "AI Engineering",
      category: "GIT & GITHUB",
      level: "Junior",
      description: "آشنایی با مدل‌های زبانی بزرگ، طراحی سیستم‌های RAG و توسعه راهکارهای مبتنی بر هوش مصنوعی.",
    },
  ];

  if(type==="projects"){
    return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      className="project-swiper"
      pagination={{ clickable: true }}
      slidesPerView={3}
      spaceBetween={20}
      speed={1000}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >

      
      {data.map((cars) => {
        const isLoaded = loadedFrames.includes(cars.id);

        return (
          <SwiperSlide key={cars.id} className="project-slide">
            <article className="project-card">
              <div className="project-preview">
                {cars.image && !isLoaded && (
                  <div className="skeleton-container">
                    <div className="skeleton-style" />
                  </div>
                )}

                <Link
                  href={cars.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-image-link"
                >
                  {cars.image ? (
                    <Image
                      src={cars.image}
                      alt={cars.title}
                      width={500}
                      height={500}
                      className={`project-image ${
                        isLoaded ? "image-loaded" : ""
                      }`}
                      onLoad={() => {
                        window.setTimeout(() => {
                          setLoadedFrames((prev) =>
                            prev.includes(cars.id)
                              ? prev
                              : [...prev, cars.id]
                          );
                        }, 1200);
                      }}
                    />
                  ) : (
                    <div className="project-placeholder">
                      <span>
                        {cars.title.match(/^.{2}|\..+$/gi)?.join("")}
                      </span>
                      <span className="placeholder-icon">↗</span>
                    </div>
                  )}
                </Link>

                <span className="project-number">
                  PROJECT / {String(cars.id).padStart(2, "0")}
                </span>
              </div>

              <div className="project-info">
                <div className="project-category">
                  <span className="category-dot" />
                  {cars.category}
                </div>

                <div className="project-heading">
                  <h3 className="project-title">{cars.title}</h3>

                  <Link
                    href={cars.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-arrow"
                    aria-label={`مشاهده پروژه ${cars.title}`}
                  >
                    ↗
                  </Link>
                </div>

                <p className="project-description">
                  {cars.description}
                </p>

                <div className="project-footer">
                  <span>VIEW PROJECT</span>
                  <span className="project-footer-line" />
                </div>
              </div>
            </article>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
  }

  if(type==="skills"){
    return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      className="project-swiper"
      pagination={{ clickable: true }}
      slidesPerView={3}
      spaceBetween={20}
      speed={1000}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >

      
     {skillsData.map((skill) => {
  return (
    <SwiperSlide key={skill.id} className="project-slide">
      <article className="project-card">
        <div className="project-preview">
          <div className="project-placeholder">
            <span>{skill.title}</span>
            <span className="placeholder-icon">↗</span>
          </div>

          <span className="project-number">
            SKILL / {String(skill.id).padStart(2, "0")}
          </span>
        </div>

        <div className="project-info">
          <div className="project-category">
            <span className="category-dot" />
            {skill.category}
          </div>

          <div className="project-heading">
            <h3 className="project-title">{skill.title}</h3>
          </div>

          <p className="project-description">
            {skill.description}
          </p>

          <div className="project-footer">
            <span>{skill.level}</span>
            <span className="project-footer-line" />
          </div>
        </div>
      </article>
    </SwiperSlide>
  );
})}
    </Swiper>
  );
  }
  
}