"use client";
import { SaleForm } from "@/components/saleForm";
import { AppDispatch, RootState } from "@/features/store";
import { Printer, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, deleteSale } from "@/features/saleSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SaleState } from "@/helpers/types"
import { parseISODate } from "@/helpers/date"


// Fonction pour générer un PDF
const generatePDF = (sale: SaleState) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Facture", 20, 20);

  doc.setFontSize(12);
  doc.text(`Date: ${parseISODate(sale.date)}`, 20, 30);

  const tableData = sale.articles.map((article, index) => [
    index + 1,
    article.nom,
    article.quantite,
    `${article.prix} FC`,
  ]);

  // Initial Y position for the table
  let yPosition = 40;

  // Render the table using autoTable
  autoTable(doc, {
    head: [["#", "Nom du Produit", "Quantité", "Prix Total"]],
    body: tableData,
    startY: yPosition,
  });

  // Manually calculate finalY (this assumes each row is of roughly the same height)
  const rowHeight = 10; // adjust this based on your table style
  const totalRows = tableData.length;
  const finalY = yPosition + (totalRows * rowHeight);

  // Add the total text after the table
  doc.text(`Total: ${sale.total} FC`, 20, finalY + 10);

  doc.save(`Facture_${sale.id}.pdf`);
};

export default function Sales() {
  const dispatch = useDispatch<AppDispatch>();
  const sales = useSelector((state: RootState) => state.sale.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  // remove item

  const removeSale = (id: string) => dispatch(deleteSale(id))

  return (
    <>
      <div className="text-2xl py-4">Ventes</div>
      <SaleForm />

      <div className="text-xl py-4">Les ventes enregistrées</div>
      <table className="w-full text-center border-collapse border border-gray-300">
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
            sales.map((sale) => (
              <tr className="border-b-[1px] border-gray-300" key={sale.id}>
                <td>{parseISODate(sale.date)}</td>
                <td>
                  {sale.articles.map((article, idx) => (
                    <span key={idx}>
                      Nom: {article.nom}, Qté: {article.quantite}, PrixTot: {article.prix} FC{" "}
                    </span>
                  ))}
                </td>
                <td>{sale.total} FC</td>
                <td className="flex justify-center">
                  <Printer
                    size={20}
                    className="cursor-pointer"
                    onClick={() => generatePDF(sale)}
                  />
                  <span className="w-[10px]"></span>
                  <Trash size={20} onClick={() => removeSale(sale.id!)} className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b-[1px] border-gray-300">
              <td colSpan={4}>Pas de ventes enregistrées</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
