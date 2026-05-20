 import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, watch, formState } = useForm<RegisterFormInputs>();
  const password = watch("password");

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser(data.email, data.password);
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        type="email"
      />
      <input
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        type="password"
      />
      <input
        {...register("confirmPassword", { required: "Please confirm password" })}
        placeholder="Confirm Password"
        type="password"
      />
      <button type="submit" disabled={formState.isSubmitting}>
        Register
      </button>
    </form>
  );
};