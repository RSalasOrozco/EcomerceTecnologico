import Link from "next/link";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <nav className="mb-8">
            <ul className="flex space-x-6 border-b border-gray-200">
              <li>
                <Link
                  href="/dashboard"
                  className="inline-block px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 hover:text-blue-800 hover:border-blue-800 transition-colors duration-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/orders"
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
