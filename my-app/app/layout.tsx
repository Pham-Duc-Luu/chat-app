import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <GoogleOAuthProvider
                        clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}
                    >
                        {children}
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
