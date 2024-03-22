"use client";

import ReduxProvider from "@/state/redux_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
        Component for rendering the layout of the sign-in page.
        This layout component wraps the children with ReduxProvider and QueryClientProvider.
    */
  // Create a query client instance
  const queryClient = new QueryClient();

  return (
    // Wrap children with ReduxProvider and QueryClientProvider
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <main>{children}</main>
        </div>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
