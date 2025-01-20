import FirstBlog from "@/components/Blog/FirstBlog";
import blogData from "@/components/Blog/blogData";
import FirstSolution from "@/components/Blog/fisrtSolution";
import SecondSolution from "@/components/Blog/secondSolution"
import ThirdSolution from "@/components/Blog/thirdSolution";
import FourthSolution from "@/components/Blog/fourthSolution";
import FifthSolution from "@/components/Blog/fifthSolution";
import SixthSolution from "@/components/Blog/SixthSolution";
import SeventhSolution from "@/components/Blog/SeventhSolution";
import EightSolution from "@/components/Blog/EightSolution";
import NinthSolution from "@/components/Blog/NinthSolution";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions Page | iSmart International Ghana",
  description: "Discover iSmart, Africa's trusted partner for Bulk SMS, USSD, Digital Payments, & Toll-Free solutions. Simplify communication & grow your business today",
  // other metadata
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="Solutions"
        description="Here are some solution we offer"
      />
<FirstSolution/>
<SecondSolution/>
<ThirdSolution/>
<FourthSolution/>
<FifthSolution/>
<SixthSolution/>
<SeventhSolution/>
<EightSolution/>
<NinthSolution/>

      {/* <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <FirstSolution/>
          </div>

        </div>
      </section> */}
    </>
   
  );
};

export default Blog;
