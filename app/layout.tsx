

import { ReactNode } from "react";
import Navbar from "./component/Navbar/Navbar";
import SessionWrapper from "./component/SessionWrapper/SessionWrapper";
import "./globals.css";

// Directly typing the props in the function definition
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <Navbar />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
