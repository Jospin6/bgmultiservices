"use client";

import SalesChart from "@/components/salesChart";
import { AppDispatch, RootState } from "@/features/store";
import { ArrowRight, BarChart, Boxes, DollarSign, FileText, Printer, ShoppingCart, Wallet } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard } from 'lucide-react'
import Link from "next/link";
import {
  fetchLast10Sales,
  fetchSalesCountToday,
  fetchTotalSalesCount,
  fetchSalesAmountToday,
  fetchTotalSalesAmount
} from "@/features/saleSlice"
import {
  fetchImpressionsAmountCurrentMonth,
  fetchPrintedPapersCountCurrentMonth
} from "@/features/impressionSlice"
import { fetchTotalProductsInStock } from "@/features/productSlice"
import { parseISODate } from "@/helpers/date"
import { currentUser } from "@/features/authSlice";
import { CardItem } from "@/components/cardItem";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    sales,
    salesCountToday,
    totalSalesCount,
    salesAmountToday,
    totalSalesAmount } = useSelector((state: RootState) => state.sale)
  const { totalProductsInStock } = useSelector((state: RootState) => state.product)
  const {
    impressionsAmountCurrentMonth,
    printedPapersCountCurrentMonth } = useSelector((state: RootState) => state.impression)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(currentUser())
    dispatch(fetchLast10Sales())
    dispatch(fetchSalesCountToday())
    dispatch(fetchTotalSalesCount())
    dispatch(fetchSalesAmountToday())
    dispatch(fetchTotalSalesAmount())
    dispatch(fetchImpressionsAmountCurrentMonth())
    dispatch(fetchPrintedPapersCountCurrentMonth())
    dispatch(fetchTotalProductsInStock())
  }, [dispatch])

  if (user?.name != "") {
    return (
      <>
        <div className="md:grid md:grid-cols-8 md:gap-4 mt-4">
          <CardItem title={`${salesCountToday ?? 0}`} subTitle={"Nbr vente du jour"} Icon={<ShoppingCart size={30} className="text-indigo-500" />} className="md:col-span-2" />
          <CardItem title={`${salesAmountToday ?? 0} fc`} subTitle={"Montant encaisé"} Icon={<DollarSign size={30} className="text-emerald-500" />} className="md:col-span-2" />
          <CardItem title={`${impressionsAmountCurrentMonth ?? 0} fc`} subTitle={"Montant impression"} Icon={<Printer size={30} className="text-pink-500" />} className="md:col-span-2" />
          <CardItem title={`${printedPapersCountCurrentMonth ?? 0}`} subTitle={"Nbr papiers sorties"} Icon={<FileText size={30} className="text-sky-500" />} className="md:col-span-2" />
        </div>
        <div className="md:grid md:grid-cols-6 sm:block md:gap-4 mt-2">
          <div className="md:col-span-3 shadow-lg rounded-lg h-auto p-[10px]">
            <SalesChart />
          </div>
          <div className="md:col-span-3 h-auto">
            <CardItem title={`${totalProductsInStock ?? 0}`} subTitle={"Nbr produits en stock"} Icon={<Boxes size={30} className="text-yellow-500" />} className="md:col-span-2" />
            <CardItem title={`${totalSalesCount ?? 0}`} subTitle={"Nbr total des ventes"} Icon={<BarChart size={30} className="text-rose-500" />} className="md:col-span-2" />
            <CardItem title={`${totalSalesAmount! + impressionsAmountCurrentMonth!} fc`} subTitle={"Montant Total"} Icon={<Wallet size={30} className="text-teal-500" />} className="md:col-span-2" />
          </div>
        </div>
        <div className="md:text-xl text-[14px] py-4 flex justify-between">
          <span>les 10 derniers ventes</span>
          {user?.role == "admin" && <Link href={"/rapports"} className="text-blue-700" >Voir les rapports</Link>}
        </div>

        <table className="w-full text-center table-auto sm:table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="border-b-[1px] border-gray-300">
              <th>Date</th>
              <th>Articles</th>
              <th>Prix total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales && sales.length > 0 ? (
              sales!.map(sale => (
                <tr className="border-[1px] border-gray-300" key={sale.id}>
                  <td className="w-1/3"> {parseISODate(sale.date)} </td>
                  <td className="w-1/3">
                    {
                      sale.articles.map((article, index) => (
                        <span key={index}> nom: {article.nom}, qté: {article.quantite}, prixTot {article.prix} fc </span>
                      ))
                    }
                  </td>
                  <td className="w-1/3"> {sale.total} fc </td>
                  <td className="flex justify-center w-1/3"> <Link href={"/sales"}><ArrowRight size={20} /></Link></td>
                </tr>
              ))) : <tr className="border-b-[1px] border-gray-300"><td colSpan={4}>Pas de ventes enregistrées</td></tr>
            }
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <div className="text-center mt-4">
        <p className="text-2xl">Bienvenue sur LgMultiServices</p>
        <p className="text-xl"><Link href={"/connexion"} className="text-blue-500">Connectez-vous</Link> pour accéder à votre compte</p>
      </div>
    )
  }


}
