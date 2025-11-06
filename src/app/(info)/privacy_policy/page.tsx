import Link from "next/link"

export default function privacy_policy(){
    return(

        <main 
        className="max-w-3xl mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        >
            <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center"
            >
                Privacy Policy
            </h1>

            <Link 
            href='/feed' 
            className="text-lg sm:text-xl md:text-2xl cursor-pointer text-blue-600 
            hover:text-blue-400"
            >
                &larr;Back
            </Link>

            <p 
            className="mb-6 mt-2 sm:mt-3 text-base sm:text-lg md:text-xl"
            >
                Your privacy is important to us. This Privacy Policy explains how 
                <strong> RiseBit </strong> collects, uses, and protects your personal 
                data when you use our website and services.
            </p>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 mb-3 
            sm:mb-4"
            >
                1. Information We Collect
            </h2>

            <ul 
            className="list-disc ml-4 sm:ml-6 mb-6 space-y-2"
            >
                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    <strong>Account Information:</strong> name, email address, 
                    date of birth, and password.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    <strong>Usage Data:</strong> actions you take on 
                    the site (for analytics and security).
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    <strong>Technical Data:</strong> browser type, 
                    device, and IP address.
                </li>

            </ul>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 mb-3 
            sm:mb-4"
            >
                2. How We Use Your Data
            </h2>
            
            <p 
            className="mb-4 text-base sm:text-lg md:text-xl"
            >
                We use your information to:
            </p>

            <ul 
            className="list-disc ml-4 sm:ml-6 mb-6 space-y-2"
            >
                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Create and manage your account.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Provide secure access to the platform.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Analyze performance and improve user experience.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Send important notifications related to your account.
                </li>
                
            </ul>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 mb-3 
            sm:mb-4"
            >
                3. Data Protection
            </h2>

            <p 
            className="mb-4 text-base sm:text-lg md:text-xl"
            >
                Your password is securely encrypted. We use industry-standard 
                security protocols to protect your personal data 
                from unauthorized access or disclosure.
            </p>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 
            mb-3 sm:mb-4"
            >
                4. Data Sharing
            </h2>

            <p 
            className="mb-4 text-base sm:text-lg md:text-xl"
            >
                We do not sell or rent your personal data. Your information 
                is shared only with trusted services (such as hosting 
                providers or analytics tools) when necessary for the 
                functioning of the platform.
            </p>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 
            mb-3 sm:mb-4"
            >
                5. Your Rights
            </h2>
            
            <ul 
            className="list-disc ml-4 sm:ml-6 mb-6 space-y-2"
            >
                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Access, correct, or delete your data.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Request a copy of your stored information.
                </li>

                <li 
                className="text-sm sm:text-base md:text-lg"
                >
                    Withdraw consent at any time.
                </li>

            </ul>

            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-10 
            mb-3 sm:mb-4"
            >
                6. Contact
            </h2>

            <p 
            className="text-base sm:text-lg md:text-xl"
            >
                If you have any questions, email us at 
                <strong> privacy@risebit.com</strong>.
            </p>

            <p 
            className="mt-10 sm:mt-12 md:mt-14 text-sm sm:text-base md:text-lg 
            text-gray-500 text-center italic"
            >
                🕒 Last updated: October 2025
            </p>

        </main>
    )
}