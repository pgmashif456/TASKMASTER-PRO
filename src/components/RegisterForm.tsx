 import React from "react";
  

import { useForm } from "react-hook-form";

import { useAuth } from "../contexts/AuthContext";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {

  const {
    register: registerUser,
  } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormInputs>();

  const password =
    watch("password");

  const onSubmit = async (
    data: RegisterFormInputs
  ) => {

    if (
      data.password !==
      data.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    try {

      await registerUser(
        data.email,
        data.password
      );

      alert(
        "Registration successful"
      );

    } catch (error) {

      alert(
        "Registration failed: " +
        (error as Error).message
      );
    }
  };

  return (

    <form
      onSubmit={
        handleSubmit(onSubmit)
      }
      className="space-y-5"
    >

      {/* Email */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>

        <input
          type="email"

          placeholder="Enter your email"

          {...register("email", {
            required:
              "Email is required",
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

          placeholder="Create password"

          {...register("password", {
            required:
              "Password is required",

            minLength: {
              value: 6,
              message:
                "Password must be at least 6 characters",
            },
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

      {/* Confirm Password */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>

        <input
          type="password"

          placeholder="Confirm password"

          {...register(
            "confirmPassword",
            {
              required:
                "Please confirm password",

              validate:
                (value) =>
                  value === password ||
                  "Passwords do not match",
            }
          )}

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

        {errors.confirmPassword && (

          <p className="text-red-500 text-sm mt-1">
            {
              errors
                .confirmPassword
                .message
            }
          </p>

        )}

      </div>

      {/* Submit Button */}
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
          ? "Creating Account..."
          : "Register"}

      </button>

    </form>
  );
};