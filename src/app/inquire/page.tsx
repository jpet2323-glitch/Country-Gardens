import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = { title: "Request a Quote or Inquiry" };

export default function InquirePage() {
  return (
    <>
      <PageHeader
        kicker="Get in Touch"
        title="Request a Quote or Inquiry"
        description="Tell us what you need and we'll get back to you within one business day."
        bgWord="QUOTE"
      />
      <section className="section section-light">
        {/* InquiryForm calls useSearchParams to pre-select the variant from
            ?type=landscape|catering|other, which requires a Suspense boundary
            so Next.js can statically render everything above it. */}
        <Suspense fallback={null}>
          <InquiryForm />
        </Suspense>
      </section>
    </>
  );
}
