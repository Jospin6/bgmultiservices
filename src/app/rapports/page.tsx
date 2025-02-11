"use client"
import { CardItem } from '@/components/cardItem'
import { AppDispatch, RootState } from '@/features/store'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchAllDaysSales,
    fetchCountDaySales,
    fetchSumDaySales
} from "@/features/saleSlice"
import {
    fetchAllDaysImpressions,
    fetchCountDayImpressions,
    fetchSumDayImpressions
} from "@/features/impressionSlice"
import { fetchTotalProductsInStock } from "@/features/productSlice"
import { parseISODate } from '@/helpers/date'
import { BarChart, Boxes, DollarSign, FileText, ShoppingCart, Wallet } from 'lucide-react'


export default function Rapports() {
    const today = Date.now()
    const dispatch = useDispatch<AppDispatch>();
    const { salesAmountTDay, nbrSalesDay, allDaysSales } = useSelector((state: RootState) => state.sale)
    const { nbrImprDay, sumImprDay, allImprDay } = useSelector((state: RootState) => state.impression)
    const { totalProductsInStock } = useSelector((state: RootState) => state.product)
    const [date, setDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    useEffect(() => {
        let todayFormated = new Date(today).toISOString()
        let dayDate = new Date(date).toISOString()
        if (dayDate > todayFormated) {
            dispatch(fetchAllDaysSales(new Date(today).toISOString()))
            dispatch(fetchCountDaySales(new Date(today).toISOString()))
            dispatch(fetchSumDaySales(new Date(today).toISOString()))

            dispatch(fetchAllDaysImpressions(new Date(today).toISOString()))
            dispatch(fetchCountDayImpressions(new Date(today).toISOString()))
            dispatch(fetchSumDayImpressions(new Date(today).toISOString()))
        } else {
            dispatch(fetchAllDaysSales(new Date(dayDate).toISOString()))
            dispatch(fetchCountDaySales(new Date(dayDate).toISOString()))
            dispatch(fetchSumDaySales(new Date(dayDate).toISOString()))

            dispatch(fetchAllDaysImpressions(new Date(dayDate).toISOString()))
            dispatch(fetchCountDayImpressions(new Date(dayDate).toISOString()))
            dispatch(fetchSumDayImpressions(new Date(dayDate).toISOString()))
        }
        dispatch(fetchTotalProductsInStock())
    }, [dispatch, date])
    return (
        <>
            <div className='flex justify-between text-xl py-4'>
                <h1>Rapports du jour</h1>
                <span> </span>
                <input
                    type="date"
                    className="w-[300px] h-[35px] rounded-lg px-2 border-[1px] border-gray-300"
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <div className='md:grid md:grid-cols-6 md:gap-4'>
                <CardItem
                    title={`${salesAmountTDay} fc`}
                    subTitle={'somme entré vente'}
                    Icon={
                        <ShoppingCart size={30}
                            className="text-indigo-500" />}
                    className='md:col-span-2' />
                <CardItem
                    title={`${sumImprDay} fc`}
                    subTitle={'somme entré impression'}
                    Icon={
                        <DollarSign size={30}
                            className="text-emerald-500" />}
                    className='md:col-span-2' />
                <CardItem 
                    title={`${salesAmountTDay + sumImprDay} fc`} 
                    subTitle={'somme total'} 
                    Icon={
                        <Wallet size={30} 
                            className="text-teal-500" />} 
                    className='md:col-span-2' />

                <CardItem 
                    title={`${nbrImprDay}`} 
                    subTitle={'nbre papier sortie'} 
                    Icon={
                        <FileText size={30} 
                        className="text-sky-500" />} 
                    className='md:col-span-2' />
                <CardItem 
                    title={`${nbrSalesDay}`} 
                    subTitle={'nbre ventes'} 
                    Icon={
                        <BarChart size={30} 
                        className="text-rose-500" />} 
                    className='md:col-span-2' />
                <CardItem 
                    title={`${totalProductsInStock}`} 
                    subTitle={'Qté produits en stock'} 
                    Icon={
                        <Boxes size={30} 
                            className="text-yellow-500" />} 
                    className='md:col-span-2' />
            </div>
            <div>
                <h1 className='text-xl py-4'>les ventes du jour</h1>
                <table className="w-full text-center border-collapse border border-gray-300">
                    <thead>
                        <tr className="border-b-[1px] border-gray-300">
                            <th>Date</th>
                            <th>Articles</th>
                            <th>Prix total</th>
                            <th>Encodé par</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDaysSales && allDaysSales.length > 0 ? (
                            allDaysSales.map((sale) => (
                                <tr className="border-b-[1px] border-gray-300" key={sale.id}>
                                    <td>{parseISODate(sale.date)}</td>
                                    <td>
                                        {sale.articles.map((article, idx) => (
                                            <span key={idx}>
                                                Nom: {article.nom}, 
                                                Qté: {article.quantite}, 
                                                PrixTot: {article.prix} FC{" "}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{`${sale.total} fc`}</td>
                                    <td>{`${sale.user ?? ""}`}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b-[1px] border-gray-300">
                                <td colSpan={4}>Pas de ventes enregistrées</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <h1 className='text-xl py-4'>les impression du jour</h1>
                <table className="w-full text-center border-collapse border border-gray-300">
                    <thead>
                        <tr className="border-b-[1px] border-gray-300">
                            <th>Date</th>
                            <th>Nombre des papiers</th>
                            <th>Montant</th>
                            <th>Encodé par</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allImprDay && allImprDay.length > 0 ? (
                            allImprDay?.map(impr => (
                                <tr className="border-b-[1px] border-gray-300" key={impr.id}>
                                    <td> {parseISODate(impr.date)} </td>
                                    <td> {impr.totalPapers} </td>
                                    <td> {impr.amount} fc </td>
                                    <td> {impr.user} </td>
                                </tr>
                            ))) : (
                            <tr className="border-b-[1px] border-gray-300">
                                <td colSpan={4}>Pas d'impressions enregistrées</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}