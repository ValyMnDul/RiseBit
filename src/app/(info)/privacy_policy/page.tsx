import Link from "next/link"

export default function privacy_policy(){
    return(
        <main className="max-w-3xl mx-auto py-12 px-6">
            <h1 className="text-[40px] font-bold mb-8 text-center">Privacy Policy</h1>

            <Link href='/feed' className="text-2xl cursor-pointer text-blue-600 hover:text-blue-400">&larr;Back</Link>

            <p className="mb-6 mt-[9px] text-2xl">Your privacy is important to us. This Privacy Policy explains how <strong>RiseBit</strong> collects, uses, and protects your personal data when you use our website and services.</p>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">1. Information We Collect</h2>
            <ul className="list-disc ml-6 mb-6">
                <li className="text-[22px]"><strong>Account Information:</strong> name, email address, date of birth, and password.</li>
                <li className="text-[22px]"><strong>Usage Data:</strong> actions you take on the site (for analytics and security).</li>
                <li className="text-[22px]"><strong>Technical Data:</strong> browser type, device, and IP address.</li>
            </ul>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">2. How We Use Your Data</h2>
            <p className="mb-4 text-2xl">
                We use your information to:
            </p>
            <ul className="list-disc ml-6 mb-6">
                <li className="text-[22px]">Create and manage your account.</li>
                <li className="text-[22px]">Provide secure access to the platform.</li>
                <li className="text-[22px]">Analyze performance and improve user experience.</li>
                <li className="text-[22px]">Send important notifications related to your account.</li>
            </ul>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">3. Data Protection</h2>
            <p className="mb-4 text-2xl">
                Your password is securely encrypted. We use industry-standard security protocols to protect your personal data 
                from unauthorized access or disclosure.
            </p>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">4. Data Sharing</h2>
            <p className="mb-4 text-2xl">
                We do not sell or rent your personal data. Your information is shared only with trusted services (such as hosting 
                providers or analytics tools) when necessary for the functioning of the platform.
            </p>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">5. Your Rights</h2>
            <ul className="list-disc ml-6 mb-6">
                <li className="text-[22px]">Access, correct, or delete your data.</li>
                <li className="text-[22px]">Request a copy of your stored information.</li>
                <li className="text-[22px]">Withdraw consent at any time.</li>
            </ul>

            <h2 className="text-[30px] font-semibold mt-10 mb-4">6. Contact</h2>
            <p className="text-2xl">
                If you have any questions, email us at <strong>privacy@risebit.com</strong>.
            </p>

            <p className="mt-14 text-xl text-gray-500 text-center italic">
                🕒 Last updated: October 2025
            </p>

        </main>
    )
}