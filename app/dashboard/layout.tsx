"use client"
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import Providers from "../provider";
import ResponsiveSizes from "./components/appshell";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NotificationPermission from "@/app/components/NotificationPermission"

const inter = Poppins({ subsets: ["latin"], weight:["500"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  useEffect(() => {
    // Request notification permission
    const askNotificationPermission = async () => {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        registerServiceWorker();
      }
    };

    // Register the service worker
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service Worker registered');
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    askNotificationPermission();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NotificationPermission />
          <ResponsiveSizes>
            {children}
          </ResponsiveSizes>
        </Providers>
      </body>
    </html>
  );
}
