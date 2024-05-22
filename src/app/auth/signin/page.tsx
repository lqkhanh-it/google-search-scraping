"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { hash } from "bcryptjs";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { email, password } = loginForm;
      const hashedPassword = await hash(password, 10); // Hash password before sending
      const hashedEmail = await hash(email, 10); // Hash password before sending

      const result = await signIn("credentials", {
        redirect: false,
        email: hashedEmail,
        password: hashedPassword,
        callbackUrl: "/home",
      });

      if (result && result.ok) {
        console.log("Login successful!");
      } else if (result && result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
