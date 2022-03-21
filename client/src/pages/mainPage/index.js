import React, { useEffect } from "react";
import { Header } from "../../components/header";
import { HelloSection } from "../../components/helloSection";
import { CarouselSection } from "../../components/carouselSection";
import { CakesSection } from "../../components/cakesSection";
import { BentoCakesSection } from "../../components/bentoCakesSection";
import { CupCakesSection } from "../../components/cupCakesSection";
import { Footer } from "../../components/footer";
import { AboutUs } from "../../components/aboutUs";
import "./index.css";

function MainPage() {
  useEffect(() => {
    document.title = "Kate's Sweets";
  }, []);
  return (
    <div className="maincontainer">
      <Header />
      <HelloSection />
      <CarouselSection />
      <CakesSection />
      <BentoCakesSection />
      <CupCakesSection />
      <AboutUs />
      <Footer />
    </div>
  );
}

export { MainPage };
