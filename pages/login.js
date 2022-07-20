import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
export default function LoginPage() {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    if (email === "") {
      setErrorMessage("Email is required");
      setLoading(false);
      emailRef.current.focus();
      return;
    }
    if (password === "") {
      setErrorMessage("Password is required");
      setLoading(false);
      passwordRef.current.focus();
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        localStorage.setItem("email", email);
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col space-y-6 p-10 shadow-md rounded">
        <header>
          <h1 className="text-4xl font-black">Welcome back</h1>
          <p className="text-sm text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </p>
        </header>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div>
            <button
              type="submit"
              className={
                loading
                  ? "shadow-md opacity-50 cursor-not-allowed bg-indigo-600 text-white font-bold uppercase rounded w-full block mt-4 p-3"
                  : "shadow-md mt-4 p-3 bg-indigo-600 text-white rounded w-full block font-bold uppercase"
              }
            >
              Login
            </button>
          </div>
        </form>
        <div>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
