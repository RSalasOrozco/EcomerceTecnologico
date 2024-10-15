import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <section className="relative bg-[url(https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <div className="m-1 rounded-lg border border-gray-300 bg-white/50 shadow-lg p-4 backdrop-blur-md">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-4xl">
              Innovation and design,
              <strong className="block font-semibold text-gray-900">
                Always within your reach.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-gray-700 sm:text-lg font-medium">
              Discover the excellence of Apple in our store.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/register"
              className="block w-full rounded-full bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
