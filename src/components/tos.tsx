export default function ToS() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Please read these terms carefully before using our application.
        </p>

        <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="font-semibold text-blue-900">1. Acceptance of Terms</h2>
            <p>
              By using our service, you agree to be bound by these terms. If you do not accept them, please do not use our platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-blue-900">2. User Responsibilities</h2>
            <p>
              You are responsible for your use of the platform. Please act respectfully and do not misuse any features.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-blue-900">3. Privacy</h2>
            <p>
              We are committed to protecting your privacy. Please refer to our Privacy Policy for more information on how we handle your data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-blue-900">4. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of our services indicates your acceptance of the changes.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-blue-900">5. Contact Us</h2>
            <p>
              If you have any questions, feel free to email us at{" "}
              <a href="mailto:support@yourfirstmove.com" className="underline text-blue-900">
                support@yourfirstmove.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
