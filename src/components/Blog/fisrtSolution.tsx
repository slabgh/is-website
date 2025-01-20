import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const FirstSolution = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              {/* <SectionTitle
                title="SMS Solutions."
                paragraph="90% of people read on SMS within seven seconds, meaning that the readability chances ore extremely high. Bulk SMS messaging, application-to-person (A2P) person-to-application (P2A) SMS works for both B2C and B2B environments and is ideal for commercial brands, third-sector, and public-sector companies. It helps to increase customer engagement, promote products and services and delivers urgent notifications to your audiences."                
                mb="44px"
              /> */}
              <SectionTitle
                title="Digital Payment Solutions."
                paragraph="iSmart offers comprehensive digital payment solutions designed to streamline transactions and enhance the convenience of financial processes. Our services encompass a wide range of capabilities, including payment gateway integration, mobile wallet development, and QR code payment solutions. iSmart enables businesses and individuals to accept various payment methods, such as credit cards, digital wallets, and bonk transfers, through secure and efficient channels."                
                mb="44px"
              />
              <div></div>

              <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
             
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  src="/images/solutions/payment.svg"
                  alt=""
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

export default FirstSolution;
