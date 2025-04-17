const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto w-full mt-20 flex flex-col">
            <main className="flex-grow bg-white">
                <div className="  px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Privacy Policy
                        </h1>
                    </div>
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                1. Information We Collect
                            </h2>
                            <p className="text-gray-700 underline mb-4">
                                a. Information You Provide
                            </p>
                            <ul className="text-gray-700 mb-4">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Shipping and billing addresses</li>
                                <li>Phone number</li>
                                <li>Payment information (processed securely via third-party gateways)</li>
                            </ul>
                            <p className="text-gray-700 underline mb-4">
                                b. Automatically Collected Information
                            </p>
                            <ul className="text-gray-700 mb-4">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device type</li>
                                <li>Pages visited and browsing actions</li>
                                <li>Cookies and tracking data</li>
                            </ul>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                2. How We Use Your Information

                            </h2>
                            <ul className="text-gray-700 mb-4">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about orders, promotions, and updates</li>
                                <li>Improve our website and services</li>
                                <li>Prevent fraud and ensure secure transactions</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                3. Sharing Your Information
                            </h2>
                            <ul className="text-gray-700 mb-4">
                                <li>Payment processors (e.g., PayPal, Stripe)</li>
                                <li>Shipping partners (e.g., DHL, FedEx)</li>
                                <li>Marketing platforms (e.g., email services, if you opt-in)</li>
                                <li>Legal authorities if required by law</li>
                            </ul>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                4. Cookies and Tracking
                            </h2>
                            <p className="text-gray-700 mb-4">
                                We use cookies and similar technologies to enhance your shopping experience. You can manage cookie preferences through your browser settings.
                            </p>

                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                5. Your Rights
                            </h2>
                            <ul className="text-gray-700 mb-4">
                                <li>Accessing your personal data</li>
                                <li>Correcting or updating your data</li>
                                <li>Requesting deletion of your data</li>
                                <li>Opting out of marketing communications</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default PrivacyPolicyPage;  