"use client";
import React, { useState } from "react";
import { hash } from "bcryptjs";
interface RegisterForm {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { email, password } = registerForm;

      const hashedPassword = await hash(password, 10);
      const hashedEmail = await hash(email, 10);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailHash: hashedEmail,
          passwordHash: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      if (data.success) {
        console.log("Registration successful!");
        window.location.href = "/auth/login"; // Redirect to login page after successful registration
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registerForm.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registerForm.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
