import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const SecondSolution = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
         
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/solutions/Air.png"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
            
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
            <SectionTitle
                title="International Airtime Top-Up"
                paragraph="Bringing Africa Closer, One Top-Up at a Speed

With iSmart’s International Top-Ups, staying connected across Africa is easier than ever. With over 181 mobile networks—including MTN, Orange, Telecel, etc.—we deliver fast, reliable mobile credit transfers to any country on the continent. Whether for personal use or managing business communications, our service connects you to loved ones, colleagues, and customers in an instant. This prepaid service offers full transparency, with no hidden fees, ensuring seamless connectivity across borders and empowering you to stay in touch"
                
                mb="44px"

                
              />
                 
              
              {/* <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Redundant Delivery Routes
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                We maintain redundant connections to multiple partner routes, this ensures messages are delivered when specific partners are not available.
                </p>
              </div> */}
              {/* <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  API Integration
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Seamless integration with client’s backend or frontend systems supporting multiple protocols i.e. HTTP, SMPP, SS7, SIP to meet client needs. This comes with a reporting dashboard to track every delivery activity.
                </p>
              </div> */}
              {/* <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Two way SMS via short code
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                To enable the aggregation of programmable interactive SMS messaging services – allowing subscribers to send and receive text messages via standard-rate or premium-rate short codes on any or all telcos from any phone.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>

    
  );
};

export default SecondSolution;
