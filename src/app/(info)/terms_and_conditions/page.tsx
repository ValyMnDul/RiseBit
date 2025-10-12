import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-[40px] font-bold mb-8 text-center">Terms and Conditions</h1>

      <Link href="/feed" className="text-2xl cursor-pointer text-blue-600 hover:text-blue-400">&larr;Back</Link>

      <p className="mb-6 mt-[9px] text-2xl">
        Welcome to <strong>RiseBit</strong>. These Terms and Conditions outline the rules and regulations for using our website and services. 
        By accessing or registering on our platform, you agree to comply with these terms.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">1. General Use</h2>
      <p className="mb-4 text-2xl">
        The RiseBit platform is intended for personal and educational use. You agree not to misuse, disrupt, or exploit the platform, 
        nor to attempt unauthorized access to any part of our system or data.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">2. Account Responsibilities</h2>
      <p className="mb-4 text-2xl">
        You are responsible for maintaining the confidentiality of your account and password. 
        Any activity under your account is your responsibility. 
        You agree to notify us immediately if you suspect unauthorized use of your account.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">3. Intellectual Property</h2>
      <p className="mb-4 text-2xl">
        All content on RiseBit, including code, design, text, and graphics, is owned or licensed by RiseBit. 
        Unauthorized reproduction or redistribution is prohibited without prior written permission.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">4. Data and Privacy</h2>
      <p className="mb-4 text-2xl">
        We handle user data according to our <Link href="/privacy" className="text-blue-600 ">Privacy Policy</Link>. 
        By using our platform, you consent to data processing as described there.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">5. Limitation of Liability</h2>
      <p className="mb-4 text-2xl">
        RiseBit shall not be held liable for any direct or indirect damages arising from the use or inability to use the service, 
        including data loss, unauthorized access, or service interruption.
      </p>

      <h2 className="text-[30px] font-semibold mt-10 mb-4">6. Modifications</h2>
      <p className="mb-4 text-2xl">
        We may revise these Terms at any time. Updates will be posted on this page. 
        Continued use of the platform after such changes means you accept the new terms.
      </p>

      <p className="mt-14 text-xl text-gray-500 text-center italic">
        🕒 Last updated: October 2025
      </p>
    </main>
  );
}
