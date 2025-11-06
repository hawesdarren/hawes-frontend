'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Label } from "@radix-ui/react-label";

const fruitItems = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' }
    ]

function getRandomAccount(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "Account " + result;
}

function getRandomDollarValue(min: number = 1, max: number = 1000): string {
  const value = (Math.random() * (max - min) + min).toFixed(2);
  return `$${value}`;
}

const accounts = [
    { name: getRandomAccount(), accountNumber: "42-6200-185211452-00", balance: getRandomDollarValue() },
    { name: getRandomAccount(), accountNumber: "42-3456-789012345-67", balance: getRandomDollarValue() },
    { name: getRandomAccount(), accountNumber: "42-7654-321098765-43", balance: getRandomDollarValue() },
    { name: getRandomAccount(), accountNumber: "42-7890-123456789-01", balance: getRandomDollarValue() },
    { name: getRandomAccount(), accountNumber: "42-5678-901234567-89", balance: getRandomDollarValue() }
]

const animalItems = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'guinea-pig', label: 'Guinea Pig' }
]

export default function Page(this: any) {
    const [open, setOpen] = React.useState(false);
    const [selectedFruit, setSelectedFruit] = React.useState("");
    const [openAccounts, setOpenAccounts] = React.useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState("");
    const [selectedAnimal, setSelectedAnimal] = React.useState("");

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Dynamic Data Generation:</h4>
            <p>The account list uses random names and balances on each render. This makes it hard to write stable tests that assert specific values, as the data changes every time.</p>
            <h4>Custom Combobox Components:</h4>
            <p>The comboboxes use custom UI primitives (Popover, Command, etc.) instead of native {'<select>'}. Tests must simulate keyboard and mouse interactions and verify ARIA roles for accessibility.</p>
            <h4>Popover and Focus Management:</h4>
            <p>The combobox dropdowns are rendered in popovers, which may be outside the main DOM tree. Tests must handle focus, open/close state, and ensure elements are visible and interactable.</p>
            <h4>Selection State:</h4>
            <p>Selecting an item updates state and closes the popover. Tests must verify that the correct item is shown as selected, and that the popover closes as expected.</p>
            <h4>Accessibility:</h4>
            <p>Custom components may lack native accessibility features. Tests should check for correct ARIA roles, keyboard navigation, and screen reader compatibility.</p>
            <h4>Responsive Layout:</h4>
            <p>The grid layout changes across screen sizes. Tests should verify that comboboxes are positioned and sized correctly on both desktop and mobile.</p>
            <h4>Selector Reliability:</h4>
            <p>Many elements use dynamic data or custom classes. Tests should use robust selectors (e.g., role, aria-label, testid) to avoid flakiness.</p>
            <h4>Edge Cases:</h4>
            <p>Tests should cover cases like selecting the same item twice, clearing selection, and handling empty search results.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
        <div className="grid col-start-2 col-span-1">            
                <div className="pb-8" data-testid="static-combobox-section">
                    <div className="pb-2">
                            <h4>Static combobox</h4>
                    </div>
                    <div className="pb-1">    
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[300px] justify-between text-(--text-color) hover:text-(--text-color) hover:font-bold"
                            >
                                {selectedFruit 
                                   ? fruitItems.find((fruitItem) => fruitItem.value == selectedFruit)?.label
                                   : "Select a fruit"
                                }
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Search fruit..." />
                                <CommandList>
                                    <CommandEmpty>No fruit found.</CommandEmpty>
                                    <CommandGroup>
                                        {fruitItems.map((fruitItem) => (
                                            <CommandItem
                                                className="text-(--text-color)"    
                                                key={fruitItem.value}
                                                value={fruitItem.value}
                                                onSelect={(value) => {
                                                    setSelectedFruit(value === selectedFruit ? "" : value);
                                                    setOpen(false);
                                                }}
                                            >
                                                {fruitItem.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    </div>
                    <div>
                        <p data-testid="static-combobox-selected">Selected: {selectedFruit ? fruitItems.find((fruitItem) => fruitItem.value == selectedFruit)?.label : "No fruit selected"}</p>
                    </div>
                </div>
                <div className="pb-8" data-testid="dynamic-combobox-section">
                    <div className="pb-2">
                        <h4>Dynamic combobox</h4>
                    </div>
                    <div className="pb-1">
                    <Popover open={openAccounts} onOpenChange={setOpenAccounts}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openAccounts}
                                className="w-[300px] justify-between text-(--text-color) hover:text-(--text-color) hover:font-bold"
                            >
                                {selectedAccount 
                                   ? accounts.find((account) => account.accountNumber == selectedAccount)?.name
                                   : "Select an account"
                                }
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Search accounts..." />
                                <CommandList>
                                    <CommandEmpty>No accounts found.</CommandEmpty>
                                    <CommandGroup>
                                        {accounts.map((account) => (
                                            <CommandItem
                                                className="text-(--text-color)"    
                                                key={account.accountNumber}
                                                value={account.accountNumber}
                                                onSelect={(value) => {
                                                    setSelectedAccount(value === selectedAccount ? "" : value);
                                                    setOpenAccounts(false);
                                                }}
                                            >
                                                <div className="flex flex-col">
                                                    <span>{account.name}</span>
                                                    <span className="text-sm text-(--muted-text-color)">{account.accountNumber} - {account.balance}</span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    </div>
                    <div>
                        <p data-testid="dynamic-combobox-selected">Selected: {selectedAccount ? accounts.find((account) => account.accountNumber == selectedAccount)?.accountNumber : "No account selected"}</p>
                    </div>
                </div>
                <div className="pb-8" data-testid="static-select-section">
                    <div className="pb-2">
                            <h4>Static select</h4>
                    </div>
                    <div className="pb-1">    
                        <Select
                            onValueChange={(value) => {
                                setSelectedAnimal(value === selectedAnimal ? "" : value);
                            }}
                        >
                            <SelectTrigger className="w-[300px] text-(--text-color) hover:text-(--text-color) hover:font-bold" >
                                <SelectValue placeholder="Select an animal" />
                            </SelectTrigger>
                            <SelectContent>
                                {animalItems.map((animal) => (
                                    <SelectItem 
                                        className="text-(--text-color) hover:text-(--text-color) hover:font-bold"
                                        key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p data-testid="static-select-selected">Selected: {selectedAnimal ? animalItems.find((animalItem) => animalItem.value == selectedAnimal)?.label : "No animal selected"}</p>
                    </div>
                </div>
            </div>
        </div>

    )}