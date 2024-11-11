"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { validateEmail, validatePassword, validateName } from "@/lib/validate";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import FormInput from "../forms/FormInput";
import AuthCard from "./AuthCard";
import RoleSelector from "./RoleSelector";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "instructor"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const nameError = validateName(formData.name);
    if (nameError) {
      toast.error(nameError);
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Sign up to get started"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <FormInput
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Enter your full name"
            required
            maxLength={50}
            Icon={FiUser}
            label="Full Name"
          />

          <FormInput
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="Enter your email"
            required
            maxLength={100}
            Icon={FiMail}
            label="Email address"
          />

          <FormInput
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Create a password"
            required
            minLength={6}
            maxLength={50}
            Icon={FiLock}
            label="Password"
          />

          <FormInput
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirm your password"
            required
            minLength={6}
            maxLength={50}
            Icon={FiLock}
            label="Confirm Password"
          />

          <RoleSelector
            role={formData.role}
            onRoleChange={(role) => setFormData(prev => ({ ...prev, role }))}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}