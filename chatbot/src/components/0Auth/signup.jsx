import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);
  const validate = async () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^\d{8}$/;
    const usernameRegex = /^[a-z\s]{6,13}$/;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must be 2-50 alphabetic characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.username.trim()) {
      newErrors.username = "username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Enter a valid username address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Enter a valid password of 8 digits.";
    }

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means valid
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
      });
      setErrors({});
    }
    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.username);
    } catch (error) {
      console.error(error.message.data.error || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* Username field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        {/* password field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="set new password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (Optional)
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.phone ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-600 text-gray-100 hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-400">
          login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
