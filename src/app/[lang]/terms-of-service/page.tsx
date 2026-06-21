export const metadata = {
  title: "Terms of Service | COzuna Web Design & Printing",
  description: "Terms of Service for COzuna Web Design & Printing.",
};

import PageHero from "@/components/PageHero";

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      <PageHero title="Terms of Service" subtitle={`Last updated: ${new Date().toLocaleDateString()}`} />
      <div className="mx-auto max-w-3xl prose prose-invert prose-zinc py-12 px-6 lg:px-8">
        
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="text-zinc-400 mb-4">
          By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Services</h2>
        <p className="text-zinc-400 mb-4">
          COzuna Web Design & Printing provides web design, graphic design, printing, and signage services. The specifics of any project, including timelines, deliverables, and costs, will be agreed upon in a separate written contract or proposal.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Intellectual Property</h2>
        <p className="text-zinc-400 mb-4">
          Unless otherwise stated, COzuna and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from COzuna for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-zinc-400 mb-4">
          In no event shall COzuna or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on COzuna's website or services.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Revisions</h2>
        <p className="text-zinc-400 mb-4">
          We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>
      </div>
    </main>
  );
}
