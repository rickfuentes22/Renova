import React from "react";
import Layout from "./../components/Layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/HomePage.css";

const HomePage = () => {
  const images = [
    {
      src: "/licencia1.png",
      alt: "Imagen 1",
      href: "https://mejoresconductores.conaset.cl/#/ObtencionLicencia",
    },
    {
      src: "/licencia2.png",
      alt: "Imagen 2",
      href: "https://mejoresconductores.conaset.cl/#/TipsCiclos",
    },
    {
      src: "/licencia3.png",
      alt: "Imagen 3",
      href: "https://mejoresconductores.conaset.cl/#/DS962018",
    },
    {
      src: "/licencia4.png",
      alt: "Imagen 4",
      href: "https://mejoresconductores.conaset.cl/#/DudasFrecuentes",
    },
  ];
  return (
    <>
      <Layout>
        <div className="home-container">
          <div className="content"></div>
          <div className="custom-carousel">
            <Carousel autoPlay>
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <a href={image.href}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="carousel-image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </a>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="additional-image">
            <img
              src="/renovacion.png"
              alt="Imagen Adicional"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
        <div className="footer">
          {/* Footer section with improved styling */}
          <div className="footer-social">
            <a href="https://www.instagram.com/your_instagram_page">
              <img src="/iglogo.png" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/your_facebook_page">
              <img src="/fblogo.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
