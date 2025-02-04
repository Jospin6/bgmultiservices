"use client";

import SalesChart from "@/components/salesChart";
import { AppDispatch, RootState } from "@/features/store";
import { Printer } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLast10Sales } from "@/features/saleSlice"

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    loading, 
    sales, 
    salesCountToday, 
    totalSalesCount, 
    salesAmountToday, 
    totalSalesAmount } = useSelector((state: RootState) => state.sale)
  const {totalProductsInStock} = useSelector((state: RootState) => state.product)
  const {
    impressionsAmountCurrentMonth, 
    printedPapersCountCurrentMonth} = useSelector((state: RootState) => state.impression)

  useEffect(() => {
    dispatch(fetchLast10Sales())
  }, [dispatch])

  return (
    <>
      <div className="grid grid-cols-8 gap-4 mt-4">
        <div className="col-span-2 shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]"> {salesCountToday ?? 0} </div>
          <div className="text-[14px] text-gray-400">Nbr vente du jour</div>
        </div>
        <div className="col-span-2 shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]"> {salesAmountToday ?? 0} </div>
          <div className="text-[14px] text-gray-400">Montant encaisé</div>
        </div>
        <div className="col-span-2 shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]">{impressionsAmountCurrentMonth ?? 0}</div>
          <div className="text-[14px] text-gray-400">Montant impression mois courant</div>
        </div>
        <div className="col-span-2 shadow-lg rounded-lg h-[100px] p-[10px]">
          <div className="text-2xl font-[500]">{ printedPapersCountCurrentMonth ?? 0 }</div>
          <div className="text-[14px] text-gray-400">Nbr papiers sorties</div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-2">
        <div className="col-span-3 shadow-lg rounded-lg h-auto p-[10px]">
          <SalesChart />
        </div>
        <div className="col-span-3 h-auto">
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalProductsInStock ?? 0}</div>
            <div className="text-[14px] text-gray-400">Nbr produits en stock</div>
          </div>
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalSalesCount ?? 0}</div>
            <div className="text-[14px] text-gray-400">Nbr total des ventes</div>
          </div>
          <div className="shadow-lg rounded-lg h-[100px] p-[10px]">
            <div className="text-2xl font-[500]">{totalSalesAmount ?? 0}</div>
            <div className="text-[14px] text-gray-400">Tot montant ventes</div>
          </div>
        </div>
      </div>
      <div className="text-xl py-4">
        les 10 derniers ventes
      </div>

      <table className="w-full text-center">
        <thead>
          <tr className="border-b-[1px] border-gray-300">
            <th>Date</th>
            <th>Articles</th>
            <th>Prix total</th>
            <th>Actions</th>
          </tr>
        </thead>
        {
          loading ? (<div>Loading...</div>) : (
            <tbody>
              {
                sales?.map(sale => (
                  <tr className="border-b-[1px] border-gray-300">
                    <td> {sale.date} </td>
                    <td>
                      {
                        sale.articles.map(article => (
                          <span> nom: {article.nom}, qté: {article.quantite}, prixTot {article.prix} fc </span>
                        ))
                      }
                    </td>
                    <td> {sale.total} fc </td>
                    <td className="flex justify-center"><Printer size={20} /></td>
                  </tr>
                ))
              }
            </tbody>
          )
        }
      </table>
    </>
  );
}
