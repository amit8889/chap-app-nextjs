"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  provider: string;
  bgColor: string;
  hoverColor: string;
  label: string;
  icon: React.ReactNode;  // ReactNode allows any valid JSX/React component as a type
}


export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    console.log(session);
    router.push("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign in to Continue
        </h1>
        <div className="flex flex-col space-y-4">
          <AuthButton
            provider="github"
            bgColor="bg-gray-800"
            hoverColor="hover:bg-gray-900"
            label="Sign in with GitHub"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .297C5.37.297 0 5.665 0 12.3c0 5.302 3.438 9.8 8.205 11.385.6.112.82-.26.82-.577v-2.3c-3.338.726-4.033-1.61-4.033-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.087-.746.082-.731.082-.731 1.205.084 1.838 1.24 1.838 1.24 1.07 1.83 2.81 1.303 3.496.997.107-.776.418-1.303.76-1.604-2.665-.3-5.466-1.332-5.466-5.932 0-1.311.468-2.382 1.238-3.222-.124-.302-.535-1.523.118-3.174 0 0 1.01-.324 3.3 1.24.957-.267 1.982-.4 3.003-.403 1.02.003 2.046.136 3.003.403 2.29-1.564 3.3-1.24 3.3-1.24.653 1.65.242 2.872.118 3.174.77.84 1.238 1.911 1.238 3.222 0 4.61-2.802 5.63-5.47 5.922.43.37.81 1.1.81 2.22v3.293c0 .32.216.693.824.577C20.565 22.1 24 17.603 24 12.3c0-6.635-5.37-12.003-12-12.003z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <AuthButton
            provider="google"
            bgColor="bg-blue-500"
            hoverColor="hover:bg-blue-600"
            label="Sign in with Google"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 488 512"
                fill="currentColor"
              >
                <path d="M488 261.8C488 403.3 391.6 512 248 512 110.9 512 0 401.1 0 264S110.9 16 248 16c66.2 0 124.9 24.4 169.4 64.6l-68.7 66.3C316.6 100.8 283.9 88 248 88c-90.5 0-164 74.3-164 176s73.5 176 164 176c83.8 0 143.4-60 149.1-135.9H248v-88h240c2.5 13.6 4 27.3 4 43.8z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}


function AuthButton({ provider, bgColor, hoverColor, label, icon }: AuthButtonProps) {
  return (
    <button
      onClick={() => signIn(provider)}
      className={`w-full ${bgColor} text-white font-bold py-2 rounded-lg flex items-center justify-center ${hoverColor} transition`}
    >
      {icon}
      {label}
    </button>
  );
}