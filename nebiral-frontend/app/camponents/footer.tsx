import Link from "next/link";
import "@/app/camponents/footer.css";
import Image from "next/image";

const footerLinks = [
  { label: "خانه", href: "/" },
  { label: "درباره من", href: "/my-identity" },
  { label: "ارتباط با من", href: "/contactme" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-logo-text">Taha's Digital Space</span>
            </Link>

            <p className="footer-description">
              من طاها قرایی هستم؛ توسعه‌دهنده وب و هوش مصنوعی.
              اینجا می‌تونی با پروژه‌ها، مهارت‌ها و مسیر حرفه‌ای من آشنا بشی.
            </p>
          </div>

          <div className="footer-navigation">
            <h3 className="footer-heading">دسترسی سریع</h3>

            <nav
              className="footer-links"
              aria-label="لینک‌های فوتر"
            >
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">ارتباط با من</h3>

            <p className="footer-contact-description">
              برای همکاری، پروژه‌های جدید و فرصت‌های کاری خوشحال می‌شم
              با هم در ارتباط باشیم.
            </p>

            <Link href="/contact" className="footer-contact-link">
              شروع یک همکاری
              <span aria-hidden="true">↗</span>
            </Link>

            <section className="socials">
              <Link href="https://github.com/tahamtg" target="blank">
                <Image style={{paddingTop:"20px"}} src="/images/github-142-svgrepo-com (1).svg" width={30} height={30} alt="github"/>
              </Link>
              <Link href="https://telegram.org/@mtgharaei" target="blank">
                <Image style={{paddingTop:"20px"}} src="/images/telegram-svgrepo-com.svg" width={30} height={30} alt="github"/>
              </Link>
            </section>

          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright" dir="ltr">
            © {new Date().getFullYear()} Taha's Digital Space. All rights reserved.
          </p>

          <p className="footer-made">
            طراحی و توسعه توسط طاها قرایی
          </p>
        </div>
      </div>
    </footer>
  );
}
