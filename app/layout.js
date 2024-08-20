import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import {ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movo",
  description: "Movie/TV Show Recommendation Site",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16 sm:pt-20">
          {children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
