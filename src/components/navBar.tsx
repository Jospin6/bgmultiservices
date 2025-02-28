"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { currentUser } from "@/features/authSlice";
import Image from "next/image";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch])

  return (
    <nav className={`w-full min-h-[80px] h-auto bg-gray-800 text-white shadow-md`}>
      <div className="container mx-auto min-h-[80px] flex justify-between items-center h-full px-6">
        {/* Logo */}
        <Image src="/images/logo.jpg" alt={"logo"} className="rounded-full " width={60} height={60} />

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-gray-200 transition">
            Accueil
          </Link>
          {user?.name != "" && (
            <>
              {(user?.role == "admin" || user?.role == "caissier") && (
                <Link href="/sales" className="hover:text-gray-200 transition">
                  Vente
                </Link>
              )}

              {user?.role === "admin" && (
                <Link href="/products" className="hover:text-gray-200 transition">
                  Produits
                </Link>
              )}

              {(user?.role == "admin" || user?.role == "impression") && (
                <Link href="/impressions" className="hover:text-gray-200 transition">
                  Impression
                </Link>
              )}
              <Link href="/account" className="hover:text-gray-200 transition">
                Compte
              </Link>
            </>)}


        </div>

        {/* Menu Mobile (Bouton) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Liste) */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 py-4 z-[100]">
          <div className="flex flex-col items-center space-y-4 text-lg">
            <Link href="/" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
            {user?.name != "" && (
              <>
                {(user?.role == "admin" || user?.role == "caissier") && (
                  <Link href="/sales" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                    Vente
                  </Link>
                )}

                {user?.role === "admin" && (
                  <Link href="/products" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                    Produits
                  </Link>
                )}

                {(user?.role == "admin" || user?.role == "impression") && (
                  <Link href="/impressions" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                    Impression
                  </Link>
                )}
                <Link href="/account" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                  Compte
                </Link>
              </>)}

          </div>
        </div>
      )}
    </nav>
  );
};
