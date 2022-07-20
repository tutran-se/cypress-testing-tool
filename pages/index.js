import Link from "next/link";
import React from "react";
import Head from "next/head";
export default function HomePage() {
  return (
    <>
      <Head>
        <title>Cypress</title>
      </Head>

      <div className="flex flex-col space-y-7 w-1/2">
        <div>
          <p className="text-sm text-gray-500">End-to-End Demo</p>
          <h1 className="text-4xl font-black">Cypress</h1>
        </div>
        <div className="flex space-x-2 items-center text-center">
          <Link href="/register">
            <a
              id="authentication"
              className="font-bold p-3 rounded block w-full bg-indigo-600  text-white shadow-md"
            >
              Authentication Flow
            </a>
          </Link>
          <Link href="/manage-task">
            <a
              id="task-manage"
              className="font-bold p-3 rounded block w-full bg-pink-600  text-white shadow-md"
            >
              Manage Task Flow
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
