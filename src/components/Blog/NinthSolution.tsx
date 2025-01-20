"use client"
import React, { useState } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const NinthSolution = () => {
  const [isFrench, setIsFrench] = useState(false);

  const handleTranslate = () => {
    setIsFrench(!isFrench);
  };

  const englishText =
    "Ekoso Cash-Out is Ghana’s leading e-gaming and lottery platform, designed to bring fun and excitement while fostering opportunities for financial improvement. Our mission is to enhance the lives of Ghanaians by promoting responsible gaming, ensuring that every interaction with our platform is safe, enjoyable, and rewarding. This innovative gaming experience is accessible to everyone through multiple channels, including USSD codes, a user-friendly web interface, and a mobile application that guarantees convenience on the go. Whether you’re at home or on the move, Ekoso Cash-Out is your trusted partner in responsible entertainment and life-changing wins.";
  const frenchText =
    "Ekoso Cash-Out est la principale plateforme de jeux en ligne et de loterie au Ghana, conçue pour offrir plaisir et excitation tout en favorisant des opportunités d'amélioration financière. Notre mission est d'améliorer la vie des Ghanéens en promouvant le jeu responsable, en veillant à ce que chaque interaction avec notre plateforme soit sûre, agréable et enrichissante. Cette expérience de jeu innovante est accessible à tous via plusieurs canaux, y compris des codes USSD, une interface web conviviale et une application mobile qui garantit la commodité en déplacement. Que vous soyez à la maison ou en déplacement, Ekoso Cash-Out est votre partenaire de confiance pour un divertissement responsable et des gains qui changent la vie.";

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Lottery Service"
                paragraph={isFrench ? frenchText : englishText}
                mb="44px"
              />
              <button
                onClick={handleTranslate}
                className="px-6 py-2 mt-4 text-white bg-primary rounded-md"
              >
                {isFrench ? "Translate to English" : "Translate to French"}
              </button>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  src="/images/solutions/lottery.svg"

                  alt="about-image"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NinthSolution;
