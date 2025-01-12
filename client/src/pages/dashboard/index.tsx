import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import './financial-record.css';
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

export const Dashboard = () => {
    const { user } = useUser();
    const {records} = useFinancialRecords();

    const total = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });

        return totalAmount;
    }, [records])


    return(
        <div className="dashboard-container">
            <h1>Welcome {user?.firstName || "User"}! Add Transactions Here:</h1>
            <FinancialRecordForm />
            <h1>View Transactions:</h1>
            <h3>Total Balance: ${total}</h3>
            <FinancialRecordList />
        </div>
    )
}