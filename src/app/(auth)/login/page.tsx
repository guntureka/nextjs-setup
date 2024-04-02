import LoginForm from "@/components/form/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen mx-auto flex-col justify-center items-center max-w-7xl">
      <div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
