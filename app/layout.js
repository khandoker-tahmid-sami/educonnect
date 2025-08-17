import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400"], // or ["400","500","600"]
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"], // or ["400","500","600"]
});

export const metadata = {
  title: "EduConnect - A great learning platform",
  description: "You can increase your productivity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
