import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | AdMuseAI",
  description:
    "Privacy Policy for AdMuseAI's AI-powered ad creative generation platform.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            AdMuseAI ("we," "our," or "us") respects your privacy and is
            committed to protecting your personal data. This privacy policy will
            inform you about how we look after your personal data when you visit
            our website and tell you about your privacy rights and how the law
            protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p>
            We may collect, use, store, and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Identity Data</strong> includes your name and email
              address when provided.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP)
              address, browser type and version, time zone setting and location,
              browser plug-in types and versions, operating system and platform,
              and other technology on the devices you use to access this
              website.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use
              our website and services.
            </li>
            <li>
              <strong>User Content</strong> includes images you upload for
              processing.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>To provide our AI image processing services.</li>
            <li>
              To manage our relationship with you including notifying you about
              changes to our terms or privacy policy.
            </li>
            <li>
              To improve our website, products/services, marketing, and customer
              relationships.
            </li>
            <li>
              To make suggestions and recommendations to you about services that
              may be of interest to you.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Uploaded Content</h2>
          <p>
            When you upload images to our service for processing, we store these
            images temporarily to perform the requested services. After
            processing is complete, your original images and generated content
            are stored for a limited time to allow you to download them.
          </p>
          <p className="mt-2">
            We may use anonymized versions of generated content for improving
            our AI models and for promotional purposes, but will never use your
            original uploaded images without explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way, altered, or disclosed. We limit access to your
            personal data to employees, agents, contractors, and other third
            parties who have a business need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to
            fulfill the purposes we collected it for, including for the purposes
            of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to
            request access, correction, erasure, restriction, transfer, to
            object to processing, to portability of data, and the right to
            withdraw consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at:
            <br />
            <a
              href="mailto:support@admuseai.com"
              className="text-indigo-600 hover:text-indigo-800"
            >
              support@admuseai.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
