import Breadcrumb from "@/components/Common/Breadcrumb";
import Consultation from "@/components/Consultation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | iSmart International Ghana",
  description: "Discover iSmart, Africa's trusted partner for Bulk SMS, USSD, Digital Payments, & Toll-Free solutions. Simplify communication & grow your business today",
  // other metadata
};

const ConsultationPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Consultation Page"
        description="Book a consultation with iSmart International Ghana through here."
      />

      <Consultation />
    </>
  );
};

export default ConsultationPage;
