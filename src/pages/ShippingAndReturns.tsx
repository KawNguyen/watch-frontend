const ShippingAndReturns = () => {
  return (
    <div className="container mx-auto w-full mt-20 flex flex-col">
      <main className="flex-grow bg-white">
        <div className="  px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Shipping and Returns
            </h1>
          </div>
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Processing Time
              </h2>
              <ul className="text-gray-700 mb-4">
                <li>All orders are processed within [1–2 business days].</li>
                <li>
                  Orders are not shipped or delivered on weekends or holidays.
                </li>
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Shipping Rates & Delivery Estimates
              </h2>
              <p className="text-gray-700 mb-4">
                Shipping charges will be calculated and displayed at checkout.
              </p>
              <p className="text-gray-700 mb-4">Estimated delivery times:</p>
              <ul className="text-gray-700 mb-4">
                <li>Domestic: [2–5 business days]</li>
                <li>International: [7–15 business days]</li>
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Tracking
              </h2>
              <p className="text-gray-700 mb-4">
                Once your order is shipped, you will receive a confirmation
                email with tracking information.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Shipping Destinations , Delays
              </h2>
              <p className="text-gray-700 mb-4">
                Delays may occasionally occur due to high order volume, weather
                conditions, or customs clearance. We appreciate your patience
                and understanding.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ShippingAndReturns;
