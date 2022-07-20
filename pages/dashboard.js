import React, { useEffect } from "react";
import Head from "next/head";
export default function DashBoardPage() {
  const [email, setEmail] = React.useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-black mb-5">DashBoard 👋</h1>
        <p>
          Email:&nbsp;
          <span className="p-1 px-2 bg-pink-300 rounded font-bold">
            {email}
          </span>
        </p>
      </div>
    </>
  );
}
