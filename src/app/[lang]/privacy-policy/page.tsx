export const metadata = {
  title: "Privacy Policy | COzuna Web Design & Printing",
  description: "Privacy Policy for COzuna Web Design & Printing.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl prose prose-invert prose-zinc">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Privacy Policy</h1>
        <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
        <p className="text-zinc-400 mb-4">
          Welcome to COzuna Web Design & Printing. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. The Data We Collect</h2>
        <p className="text-zinc-400 mb-4">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-5 text-zinc-400 mb-4 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. How We Use Your Data</h2>
        <p className="text-zinc-400 mb-4">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-5 text-zinc-400 mb-4 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
        <p className="text-zinc-400 mb-4">
          If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:contact@cozuna.com" className="text-brand-primary hover:underline">contact@cozuna.com</a>.
        </p>
      </div>
    </main>
  );
}
