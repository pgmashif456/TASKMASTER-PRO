  import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormInputs
  ) => {
    try {
      await login(
        data.email.trim(),
        data.password
      );

      // Login Success
      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      alert(
        "Login failed: " +
        (error as Error).message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>

        <input
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>

        <input
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          py-3
          rounded-lg
          transition
          duration-200
          disabled:bg-slate-400
          disabled:cursor-not-allowed
        "
      >
        {isSubmitting
          ? "Signing In..."
          : "Login"}
      </button>
    </form>
  );
};