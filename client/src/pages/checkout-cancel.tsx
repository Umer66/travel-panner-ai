import { useLocation } from "wouter";

export default function CheckoutCancel() {
  const [, navigate] = useLocation();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6">❌ Payment Canceled</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-2">
          You canceled the checkout process. No changes were made to your plan.
        </p>
        <p className="text-sm text-gray-500">
          If this was a mistake, you can try upgrading again anytime.
        </p>
        <div className="mt-6 flex gap-4">
          {/* <button
            onClick={() => navigate("/subscribe")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Choose Plan Again
          </button> */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
