import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const [location, navigate] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const session_id = params.get("session_id");
    setSessionId(session_id);
  }, [location]);

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6">🎉 Subscription Successful</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        <p className="text-lg text-gray-700 mb-2">
          Thank you! Your subscription is now active.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500">
            Session ID: <span className="font-mono">{sessionId}</span>
          </p>
        )}
        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
