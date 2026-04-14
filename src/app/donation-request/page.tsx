import { PageHeader } from "@/components/PageHeader";
import { DonationForm } from "@/components/DonationForm";

export const metadata = { title: "Donation Request" };

export default function DonationRequestPage() {
  return (
    <>
      <PageHeader
        kicker="Give Back"
        title="Donation Request Form"
        description="Country Gardens is proud to support local causes. Submit a donation request and our team will review it and get back to you."
        bgWord="DONATE"
      />
      <section className="section section-light">
        <p className="slead panel-intro-slead">
          We receive many donation requests throughout the year and do our best
          to support as many local organizations and causes as possible. Please
          fill out the form below and we will follow up within one week.
        </p>
        <DonationForm />
      </section>
    </>
  );
}
