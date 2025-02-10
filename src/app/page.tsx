"use client";

import SalesChart from "@/components/salesChart";
import { AppDispatch, RootState } from "@/features/store";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {parseISODate} from "@/helpers/date"

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

  useEffect(() => {
    dispatch(fetchLast10Sales())
    dispatch(fetchSalesCountToday())
    dispatch(fetchTotalSalesCount())
    dispatch(fetchSalesAmountToday())
    dispatch(fetchTotalSalesAmount())
    dispatch(fetchImpressionsAmountCurrentMonth())
    dispatch(fetchPrintedPapersCountCurrentMonth())
    dispatch(fetchTotalProductsInStock())
  }, [dispatch])

  return (
    <>
      <div className="md:grid md:grid-cols-8 md:gap-4 mt-4">
        <div className="md:col-span-2 sm:block shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]"> {salesCountToday ?? 0} </div>
          <div className="text-[14px] text-gray-400">Nbr vente du jour</div>
        </div>
        <div className="md:col-span-2 sm:block shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]"> {salesAmountToday ?? 0} fc </div>
          <div className="text-[14px] text-gray-400">Montant encaisé</div>
        </div>
        <div className="md:col-span-2 sm:block shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]">{impressionsAmountCurrentMonth ?? 0} fc</div>
          <div className="text-[14px] text-gray-400">Montant impression mois courant</div>
        </div>
        <div className="md:col-span-2 sm:block shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]">{printedPapersCountCurrentMonth ?? 0}</div>
          <div className="text-[14px] text-gray-400">Nbr papiers sorties</div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-6 sm:block md:gap-4 mt-2">
        <div className="md:col-span-3 shadow-lg rounded-lg h-auto p-[10px]">
          <SalesChart />
        </div>
        <div className="md:col-span-3 h-auto">
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalProductsInStock ?? 0}</div>
            <div className="text-[14px] text-gray-400">Nbr produits en stock</div>
          </div>
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalSalesCount ?? 0}</div>
            <div className="text-[14px] text-gray-400">Nbr total des ventes</div>
          </div>
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalSalesAmount ?? 0} fc</div>
            <div className="text-[14px] text-gray-400">Tot montant ventes</div>
          </div>
        </div>
      </div>
      <div className="text-xl py-4">
        les 10 derniers ventes
      </div>

      <table className="w-full text-center table-auto sm:table-fixed">
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
              <tr className="border-b-[1px] border-gray-300" key={sale.id}>
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
}
