const RefundPolicyPage = () => {
    return (
        <div className="container mx-auto w-full mt-20 flex flex-col">
            <main className="flex-grow bg-white">
                <div className="  px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Refund Policy
                        </h1>
                    </div>
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                1. Return Eligibility
                            </h2>
                            <p className="text-gray-700 mb-4">
                                You may return your watch within [14 or 30 days] of delivery if:
                            </p>
                            <ul className="text-gray-700 mb-4">
                                <li>The watch is unused, undamaged, and in original packaging.</li>
                                <li>You provide proof of purchase (e.g., order number, receipt).</li>
                            </ul>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                2. Non-Returnable Items
                            </h2>
                            <ul className="text-gray-700 mb-4">
                                <li>Custom-engraved or personalized watches</li>
                                <li>Gift cards</li>
                                <li>Clearance or final sale items</li>s
                            </ul>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                3. How to Return
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Email [support@yourstore.com] with your order number and reason for return.
                            </p>
                            <p className="text-gray-700 mb-4">
                                We will provide return instructions and a return address.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Once received and inspected, we’ll issue a refund to your original payment method within [5–10 business days].
                            </p>
                        </section>
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                4. Exchanges
                            </h2>
                            <p className="text-gray-700 mb-4">
                                We only replace items if they are defective or damaged. Please contact us immediately if you received a faulty item.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default RefundPolicyPage;  