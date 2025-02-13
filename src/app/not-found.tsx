import Link from "next/link";

export default function Component() {
  return (
    <main className="min-h-[85vh] bg-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="text-9xl">😞</div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Oops! The page you&apos;re looking for could not be found.
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="mt-6">
          <Link
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            href="/"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
