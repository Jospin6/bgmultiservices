"use client";

import { useState } from "react";
import Link from "next/link";
import {Menu, X} from "lucide-react";

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full h-[80px] bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center h-full px-6">
                {/* Logo */}
                <div className="text-2xl font-bold">BgMultiServices</div>

                {/* Menu Desktop */}
                <div className="hidden md:flex space-x-8 text-lg">
                    <Link href="/impression" className="hover:text-gray-200 transition">
                        Impression
                    </Link>
                    <Link href="/vente" className="hover:text-gray-200 transition">
                        Vente
                    </Link>
                    <Link href="/produits" className="hover:text-gray-200 transition">
                        Produits
                    </Link>
                    <Link href="/compte" className="hover:text-gray-200 transition">
                        Compte
                    </Link>
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
                <div className="md:hidden bg-blue-700 py-4 z-10">
                    <div className="flex flex-col items-center space-y-4 text-lg">
                        <Link href="/impression" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                            Impression
                        </Link>
                        <Link href="/vente" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                            Vente
                        </Link>
                        <Link href="/produits" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                            Produits
                        </Link>
                        <Link href="/compte" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
                            Compte
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
