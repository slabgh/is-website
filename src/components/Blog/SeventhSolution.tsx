import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const SeventhSolution = () => {
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
            <SectionTitle
                title="Custom Application Development"
                paragraph="Custom app development services provided by iSmart can be a valuable resource for businesses, SOHOs, SMEs & Enterprises looking to create tailored mobile or web applications to meet their specific needs. Custom app development involves designing and building applications from scratch, customized to match the unique requirements of clients.
By offering custom app development services, iSmart assists businesses in transforming their ideas into fully functional and personalized applications. Whether it’s a mobile app, web app, or both, iSmart’s expertise helps businesses achieve their specific objectives and deliver a high-quality, tailored solution."
                mb="44px"
              />
              <div></div>

              <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                {/* <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="To create a fast, efficient and reliable mode of communication with your clients and staff." />
                    <List text="To provide enhanced and comprehensive customer service through fast response time" />
                    <List text="To reduce the cost of communication as compared to other forms of advertising." />
                    <List text="Quality of Delivery Reports" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Message Concentration" />
                    <List text="Intelligent Queuing System" />
                    <List text="Built-In Do-No-Disturb Integration" />
                    <List text="Schedule Messages" />
                  </div>

                  
                </div> */}
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  src="/images/solutions/code.svg"
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

export default SeventhSolution;
