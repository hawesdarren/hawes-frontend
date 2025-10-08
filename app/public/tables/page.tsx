'use client'

import { Button } from "@/components/ui/button";
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from 'lucide-react'
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const today = new Date();

function addSubtractDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function getRandomNegativeInt(min: number = -20, max: number = -1): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPaymentAmount(min: number = -100, max: number = 500): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomPastDate(date: Date) {
  const newDate = new Date(date);
  const days = getRandomNegativeInt();
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

type Payment = {
    date: Date;
    description: string;
    amount: number;
}

const paymentTableData = [
    { date: today, description: 'Rodd and Gunn', amount: getRandomPaymentAmount(100, 300) },
    { date: randomPastDate(today), description: 'Icebreaker merino', amount: getRandomPaymentAmount(50, 500) },
    { date: randomPastDate(today), description: 'Transfer', amount: getRandomPaymentAmount( -100, -10) },
    { date: randomPastDate(today), description: `Mojos's cofee`, amount: 7.50 },
    { date: randomPastDate(today), description: `Mojos's cofee`, amount: getRandomPaymentAmount(8, 15) },
    { date: randomPastDate(today), description: `Readings`, amount: getRandomPaymentAmount(15, 20) },
    { date: addSubtractDays(today, -3), description: `Mitre10`, amount: getRandomPaymentAmount(25, 55) },
    { date: randomPastDate(today), description: `Avalon Bakery`, amount: 7.50 },
];

paymentTableData.sort((a, b) => b.date.getTime() - a.date.getTime());

type User = {
    dob: Date;
    firstName: string;
    lastName: string;
}

const usersTable = [
  { dob: addSubtractDays(today, -7698), firstName: 'Sally', lastName: 'Thompson'},
  { dob: addSubtractDays(today, -8648), firstName: 'Sally', lastName: 'Simpson'},
  { dob: addSubtractDays(today, -7211), firstName: 'Sam', lastName: 'Neal'},
  { dob: addSubtractDays(today, -10450), firstName: 'Brad', lastName: 'Morgan'},
  { dob: addSubtractDays(today, -9100), firstName: 'Jade', lastName: 'Stewart'},
  { dob: addSubtractDays(today, -6990), firstName: 'Joanna', lastName: 'Wallace'},
  { dob: addSubtractDays(today, -6991), firstName: 'Grant', lastName: 'Mulins'},
]

usersTable.sort((a, b) => a.lastName.localeCompare(b.lastName));



export default function Page() {
  
  const [firstNameSort, setFirstNameSort] = React.useState<boolean | undefined>(undefined)
  const [lastNameSort, setLastNameSort] = React.useState<boolean | undefined>(undefined)
  const [dobSort, setDobSort] = React.useState<boolean | undefined>(undefined)

  function sortUsersByFirstName() {
    if(firstNameSort){
      setFirstNameSort(false)
      setLastNameSort(undefined)
      setDobSort(undefined)
      usersTable.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
    else{
      setFirstNameSort(true)
      setLastNameSort(undefined)
      setDobSort(undefined)
      usersTable.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
    
  }

  function sortUsersByLastName() {
    if(lastNameSort){
      setLastNameSort(false)
      setFirstNameSort(undefined)
      setDobSort(undefined)
      usersTable.sort((a, b) => b.lastName.localeCompare(a.lastName));
    }
    else{
      setLastNameSort(true)
      setFirstNameSort(undefined)
      setDobSort(undefined)
      usersTable.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }
    
  }

  function sortUsersByDob() {
    if (dobSort) {
      setDobSort(false);
      setFirstNameSort(undefined)
      setLastNameSort(undefined)
      usersTable.sort((a, b) => b.dob.getTime() - a.dob.getTime());
    } else {
      setDobSort(true);
      setFirstNameSort(undefined)
      setLastNameSort(undefined)
      usersTable.sort((a, b) => a.dob.getTime() - b.dob.getTime());
    }
  }


  return (
<div >
    <div data-testid='challenge'>
      <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Testing Randomized Data</h4>
            <p>The payments table uses random values for dates and amounts.</p>
            <p>Test Implications:</p>
            <li>Tests cannot rely on static values or row order.</li>
            <li>To find specific entries (e.g., "Mojo's coffee payment for $7.50"), tests must search the table dynamically.</li>
            <li>Flaky tests may occur if random data generation produces duplicate or unexpected values.</li>
            <h4>Testing for Specific Data</h4>
            <p>The table will always contain a payment to Mojos's coffee for $7.50</p>
            <p>Find payment amount to Mitre10</p>
            <p>Test Implications:</p>
            <li>Tests must search for rows matching both description and amount, not just one field.</li>
            <li>Amounts are floating-point numbers, so tests must handle formatting and precision (e.g., `$7.50` vs `7.5`).</li>
            <h4>Testing Dynamic Table Sorting</h4>
            <p>The users table supports sorting by first name, last name, and date of birth, toggling between ascending and descending order.</p>
            <p>Test Implications:</p>
            <li>Tests must verify that clicking each header sorts the table correctly in both directions.</li>
            <li>Since the sort mutates the `usersTable` array in-place, repeated tests or test order may affect results unless the table is reset between tests.</li>
            <li>Verifying sort order requires extracting table rows and comparing them to expected sorted arrays.</li>
            <h4>State Mutation and Test Isolation</h4>
            <p>Sorting functions mutate the `usersTable` array directly.</p>
            <p>Test Implications:</p>
            <li>Tests that depend on the initial order of data may fail if previous tests have mutated the array.</li>
            <li>Proper test isolation or resetting state between tests is necessary.</li>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <div>
      <h4>Payments table</h4>
      <Table data-testid="paymentsTable" id="paymentsTable" className="text-(--text-color)">
        <TableHeader>
          <TableRow>
            <TableHead className="text-(--text-color)">Date</TableHead>
            <TableHead className="text-(--text-color)">Description</TableHead>
            <TableHead className="text-(--text-color)">AmountDate</TableHead>
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
    <div>
          <br />
    </div>
    <div>
      <h4>Date of birth table</h4>
      <Table data-testid="dobTable" id="dobTable" className="text-(--text-color)">
        <TableHeader>
          <TableRow>
            <TableHead className="text-(--text-color)">
              <Button
              onClick={sortUsersByFirstName}
              variant="ghost"
              >First name
                <ArrowUpDown />
              </Button>
            </TableHead>
            <TableHead className="text-(--text-color)">
              <Button
              onClick={sortUsersByLastName}
              variant="ghost"
              >Last name
                <ArrowUpDown />
              </Button>
            </TableHead>
            <TableHead className="text-(--text-color)">
              <Button
              onClick={sortUsersByDob}
              variant="ghost"
              >Date of birth
                <ArrowUpDown />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersTable.map((user: User, index: number) => (
            <TableRow key={index}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.dob.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
 
</div>
  
  )
    
};


