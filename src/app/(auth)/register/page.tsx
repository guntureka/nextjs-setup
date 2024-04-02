import RegisterForm from "@/components/form/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center mx-auto max-w-7xl">
      <div>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
