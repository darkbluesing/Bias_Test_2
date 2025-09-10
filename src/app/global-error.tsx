'use client';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  오류 발생
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  문제가 발생했습니다.
                </p>
                <div className="mt-6">
                  <button
                    onClick={reset}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}