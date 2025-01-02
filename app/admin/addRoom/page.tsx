'use client';

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAuthRedirect from "../../hooks/useAuthHook"

interface RoomForm {
  name: string;
  description: string;
}

interface FormStatus {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const AddRoom: React.FC = () => {
  const {session} = useAuthRedirect()
  const [formData, setFormData] = useState<RoomForm>({
    name: "",
    description: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: null,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status.loading) return; 

    setStatus({ loading: true, error: null, success: null }); 

    try {
      const response = await axios.post("/api/rooms", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatus({
          loading: false,
          error: null,
          success: "Room added successfully!",
        });
        setFormData({ name: "", description: "" });
        router.push("/admin");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setStatus({
          loading: false,
          error:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
          success: null,
        });
      } else {
        setStatus({
          loading: false,
          error: "An unknown error occurred. Please try again.",
          success: null,
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Add a Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {status.success && <p className="text-green-500">{status.success}</p>}
        {status.error && <p className="text-red-500">{status.error}</p>}

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Room Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Room Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className={`mt-4 w-full p-2 bg-blue-500 text-white rounded-md ${
            status.loading ? "opacity-50" : ""
          }`}
        >
          {status.loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
