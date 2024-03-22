"use client";

import Header from "@/components/header/header";
import BookModal from "@/components/modals/book_modal";
import Navbar from "@/components/navbar/navbar";
import useUserAuthentification from "@/hooks/requests/user/check_authentification";
import ReduxProvider from "@/state/redux_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Bookpic1 from "../../../public/images/book_pic_1.svg";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get authentication status and function to update it
  const [{ isLoggedIn }] = useUserAuthentification();

  // Create a client
  const queryClient = new QueryClient();

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <main>{children}</main>
          <Navbar />
          <BookModal />
          {/* Display overlay if user is not logged in />*/}
          {!isLoggedIn && (
            <div className="login-modal">
              <div className="login-modal__overlay"></div>
              <div className="login-modal__content">
                <div className="login-modal__content__picture">
                  <Image src={Bookpic1} alt="BookPic1" />
                </div>
                <h2 className="login-modal__content__header">
                  Please log in to continue!
                </h2>
                <Link href="/signin/login">Navigate to login</Link>
              </div>
            </div>
          )}
        </div>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
