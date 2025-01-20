import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
          <SectionTitle
                title="Why Choose iSmart."
                paragraph=""
                
                mb="44px"
              />
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              {/* <Image
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              /> */}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
  <div className="max-w-[470px]">
    {/* Section 1: Redundant Delivery Routes */}
    <div className="mb-9">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        Redundant Delivery Routes
      </h3>
      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
        We maintain redundant connections to multiple partner routes, this ensures messages are delivered when specific partners are not available.
      </p>
    </div>
    
    {/* Section 2: API Integration */}
    <div className="mb-9">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        API Integration
      </h3>
      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
        Seamless integration with client’s backend or frontend systems supporting multiple protocols i.e. HTTP, SMPP, SS7, SIP to meet client needs. This comes with a reporting dashboard to track every delivery activity.
      </p>
    </div>
    
    {/* Section 3: Two-way SMS via short code */}
    <div className="mb-9">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        Two-way SMS via short code
      </h3>
      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
        To enable the aggregation of programmable interactive SMS messaging services – allowing subscribers to send and receive text messages via standard-rate or premium-rate short codes on any or all telcos from any phone.
      </p>
    </div>
    
    {/* Section 4: Message Concentration */}
    <div className="mb-9">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        Message Concentration
      </h3>
      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
        To enable the seamless exchange of long SMS messages (with more than 160 characters), iSmart’s messaging gateways automatically segment and reassemble such messages with no custom code required.
      </p>
    </div>
    
    {/* New Section: Example Section */}
    <div className="mb-9">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        Intelligent Queuing System
      </h3>
      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
      iSmart connects to all networks in Ghana for SMS processing and utilizes a unique feedback system that monitors all connections to ensure messages always take the best path and are not dropped      </p>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
