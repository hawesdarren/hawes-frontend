'use client'

import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const today = new Date();
const pastPaymentDate = new Date(today);
pastPaymentDate.setDate(today.getDate() - 5);

function addSubtractDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

type Payment = {
    date: Date;
    description: string;
    amount: number;
}

const paymentTableData = [
    { date: today, description: 'Payment for services', amount: 100.00 },
    { date: pastPaymentDate, description: 'Payment for goods', amount: 200.00 },
    { date: addSubtractDays(today, -9), description: 'Refund for overpayment', amount: -50.00 },
];

export default function Page() {
  
  return (
<div >
    <h1>Tables page</h1>
    <div>
      <Table>
        <TableCaption>A list of payments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>AmountDate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentTableData.map((payment: Payment, index: number) => (
            <TableRow key={index}>
              <TableCell>{payment.date.toLocaleDateString()}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
 
</div>
  
  )
    
};


