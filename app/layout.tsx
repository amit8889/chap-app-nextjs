"use client";

import Navbar from "./component/Navbar/Navbar";
import "./globals.css";
import SessionWrapper from "./component/SessionWrapper/SessionWrapper";
export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: unknown;
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
