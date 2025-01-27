import QueryProvider from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import UpdateProfileDialog from "@/components/dialogs/update-profile-dialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finedine",
  description: "Fine Dine: Where Every Reservation Creates Memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <Toaster
            toastOptions={{ duration: 3000 }}
            theme="dark"
            richColors
            closeButton
          />
          <UpdateProfileDialog />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
