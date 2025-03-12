"use client";

import { useSearchParams } from "next/navigation";
import DataCard, { DataCardLoading } from "./data-card";
import { formatDateRange } from "@/lib/utils";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useState } from "react";

const DataGrid = () => {
    const mockData = {
        data: {
            remainingAmount: 1859905,
            remainingChange: -3.340283487286519,
            incomeAmount: 4718030,
            incomeChange: -7.787526456192414,
            expensesAmount: -2858125,
            expensesChange: -10.468129708401374,
            categories: [
                { name: "Rent", value: 1255856 },
                { name: "Utilities", value: 953993 },
                { name: "Clothing", value: 462628 },
                { name: "Other", value: 185648 }
            ],
            days: [
                { date: "2024-08-12T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-08-13T03:00:00.000Z", income: 380999, expenses: 0 },
                { date: "2024-08-14T03:00:00.000Z", income: 110895, expenses: 403341 },
                { date: "2024-08-15T03:00:00.000Z", income: 243308, expenses: 0 },
                { date: "2024-08-16T03:00:00.000Z", income: 0, expenses: 117990 },
                { date: "2024-08-17T03:00:00.000Z", income: 74020, expenses: 12305 },
                { date: "2024-08-18T03:00:00.000Z", income: 184754, expenses: 560882 },
                { date: "2024-08-19T03:00:00.000Z", income: 139378, expenses: 0 },
                { date: "2024-08-20T03:00:00.000Z", income: 32160, expenses: 308865 },
                { date: "2024-08-21T03:00:00.000Z", income: 22415, expenses: 243869 },
                { date: "2024-08-22T03:00:00.000Z", income: 114624, expenses: 0 },
                { date: "2024-08-23T03:00:00.000Z", income: 192743, expenses: 158337 },
                { date: "2024-08-24T03:00:00.000Z", income: 574921, expenses: 281853 },
                { date: "2024-08-25T03:00:00.000Z", income: 114915, expenses: 210709 },
                { date: "2024-08-26T03:00:00.000Z", income: 383352, expenses: 0 },
                { date: "2024-08-27T03:00:00.000Z", income: 898488, expenses: 0 },
                { date: "2024-08-28T03:00:00.000Z", income: 333264, expenses: 0 },
                { date: "2024-08-29T03:00:00.000Z", income: 278406, expenses: 208839 },
                { date: "2024-08-30T03:00:00.000Z", income: 244915, expenses: 48532 },
                { date: "2024-08-31T03:00:00.000Z", income: 0, expenses: 59935 },
                { date: "2024-09-01T03:00:00.000Z", income: 209587, expenses: 56719 },
                { date: "2024-09-02T03:00:00.000Z", income: 184886, expenses: 90094 },
                { date: "2024-09-03T03:00:00.000Z", income: 0, expenses: 95855 },
                { date: "2024-09-04T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-05T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-06T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-07T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-08T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-09T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-10T03:00:00.000Z", income: 0, expenses: 0 },
                { date: "2024-09-11T03:00:00.000Z", income: 0, expenses: 0 }
            ]
        }
    } as const;

    const [data, setData] = useState<typeof mockData["data"] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setData(mockData.data);
        setIsLoading(false);
    }, 1000);

    const params = useSearchParams();
    const to = params?.get("to") || "";
    const from = params?.get("from") || "";

    const dateRangeLabel = formatDateRange({ to, from });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
                title="Restante"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Renda"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />

            <DataCard
                title="Despesas"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
        </div>
    );
};

export default DataGrid;
