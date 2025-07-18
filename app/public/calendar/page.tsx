'use client';

import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar1Icon } from "lucide-react";


function formatDate(date: Date | undefined) {
    if (!date) {
      return ""
    }
  
    return date.toLocaleDateString()
}

function isValidDate(date: Date | undefined) {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
  }

export default function Page(this: any) {
    
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({from: undefined, to: undefined});
    const [dob, setDob] = React.useState<Date | undefined>(new Date());
    const [inputDate, setInputDate] = React.useState<Date | undefined>(new Date());
    const [inputDateMonth, setInputDateMonth] = React.useState<Date | undefined>(inputDate);
    const [open, setOpen] = React.useState(false);
    const [buttonDate, setButtonDate] = React.useState<Date | undefined>(new Date());
    const [buttonDateMonth, setButtonDateMonth] = React.useState<Date | undefined>(buttonDate);
    const [buttonDateOpen, setButtonDateOpen] = React.useState(false);
    

    return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
        <div className="grid col-start-1 col-span-3">
            <p>The challenge is to use the calendars</p>
        </div>
        <div className="grid col-start-2">
            <h4>Single calendar</h4>
            <p>
                You can use the calendar to select a date and it will be displayed in the below.
            </p>
            <Calendar
                id="singleCalendar"
                data-testid="singleCalendar"
                mode="single"
                selected={date}
                onSelect={(date) => {
                    setDate(date);
                }}
                className="rounded-lg border shadow-sm"
            />
        </div>
        <div className="grid col-start-2">
            
            <p id="dateResult" data-testid="dateResult">
                Selected date: {date?.toLocaleDateString()}
            </p>
        </div>
        <div className="grid col-start-2">
            <h4>Set date of birth</h4>
            <p>
                You can use the calendar to select a date of birth and it will be displayed in the below.
            </p>
            <Calendar
                id="dobCalendar"
                data-testid="dobCalendar"
                mode="single"
                disabled={{after: new Date()}}
                selected={dob}
                captionLayout="dropdown"
                onSelect={(date) => {
                    setDob(date);
                }}
                className="rounded-lg border shadow-sm"
            />
        </div>
        <div className="grid col-start-2">
            <p id="dobResult" data-testid="dobResult">
                Date of birth: {dob?.toLocaleDateString()}
            </p>
        </div>
        <div className="grid col-start-2">
            <h4>Date range calendar</h4>
            <p>
                You can use the calendar to select a date range and it will be displayed in the below.
            </p>
            <Calendar
                id="dateRangeCalendar"
                data-testid="dateRangeCalendar"
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                    setDateRange(range || { from: new Date(), to: new Date() });
                    
                }}
                className="rounded-lg border shadow-sm"
            />
        </div>
        <div className="grid col-start-2">
            
            <p id="dateRangeResult" data-testid="dateRangeResult">
                From: {dateRange?.from?.toLocaleDateString()}<br/>
                To: {dateRange?.to?.toLocaleDateString()}
            </p>
        </div>
        <div className="grid col-start-2">
            <h4>Input date</h4>
            <p>
                You can use the input to select a date and it will be displayed in the below.
            </p>
            <Label htmlFor="inputDate" >
                Select a date:
            </Label>
            <div className="flex relative flex gap-2">
            <Input
                id="inputDate"
                data-testid="inputDate"
                placeholder="date"
                value={inputDate ? formatDate(inputDate) : ""}
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    if(isValidDate(newDate)) {
                        setInputDate(newDate);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                //disabled
            />
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        id="openCalendar"
                        data-testid="openCalendar"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        variant="ghost"
                    >
                        <Calendar1Icon className="size-3.5" />
                        <span className="sr-only">Open calendar</span>   
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        id="inputDateCalendar"
                        data-testid="inputDateCalendar"
                        mode="single"
                        selected={inputDate}
                        captionLayout="dropdown"
                        month={inputDateMonth}
                        onSelect={(date) => {
                            setInputDate(date);
                            setOpen(false);
                            setInputDateMonth(date);
                            
                        }}
                        onMonthChange={(month) => {
                            setInputDateMonth(month);
                        }}
  
                        className="rounded-lg border shadow-sm"
                    />
                </PopoverContent>
            </Popover>
            </div>
        </div>
        <div className="grid col-start-2">
            <h4>Button date</h4>
            <p>
                You can use the button to select a date and it will be displayed in the below.
            </p>
            <Label htmlFor="setDateButton" >
                Select a date:
            </Label>
            
            <Popover
                open={buttonDateOpen}
                onOpenChange={setButtonDateOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                    id="setDateButton"
                    data-testid="setDateButton"
                    value={buttonDate ? formatDate(buttonDate) : ""}
                    variant={buttonDate ? "secondary" : "outline"}
                    onClick={() => {
                        const newDate = new Date();
                        setButtonDate(newDate);
                        setButtonDateOpen(false);
                    }}
                    
                    //className="mt-2"
                    >
                    {buttonDate ? formatDate(buttonDate) : "Set current date"}
                    <Calendar1Icon />
    
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        id="buttonDateCalendar"
                        data-testid="buttonDateCalendar"
                        mode="single"
                        selected={buttonDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setButtonDate(date);
                            setButtonDateOpen(false);
                            setButtonDateMonth
                        }}
                        onMonthChange={(month) => {
                            setButtonDateMonth(month);
                        }}
                        month={buttonDateMonth} 
                        className="rounded-lg border shadow-sm"
                    />
                </PopoverContent>
            </Popover>
        </div>
    </div>
    )};