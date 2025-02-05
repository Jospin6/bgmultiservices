import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesLast7Days } from "@/features/saleSlice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { AppDispatch, RootState } from "@/features/store";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salesLast7Days = useSelector((state: RootState) => state.sale.salesLast7Days);

  console.log(`putain ce quoi ça: ${salesLast7Days}`)

  useEffect(() => {
    dispatch(fetchSalesLast7Days());
  }, [dispatch]);

  const data = {
    labels: salesLast7Days ? Object.keys(salesLast7Days) : [],
    datasets: [
      {
        label: "Ventes (€)",
        data: salesLast7Days ? Object.values(salesLast7Days) : [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default SalesChart;
