'use client';

import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar1Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

    return (
        <div className='grid grid-cols-[1fr_8fr_1fr] p-6 gap-3 '>
            <div className="grid grid-rows-1 col-start-1 col-span-3">
                <div>                 
                    <Accordion type="single" collapsible>
                        <AccordionItem value='item1'>
                            <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
                                <AccordionContent>
                                    <h4>State Management Validationa</h4>
                                    <p>Each calendar interaction updates a different piece of state (date, dob, dateRange, etc.). Ensuring that:</p>
                                    <li>The correct state is updated for each interaction.</li>
                                    <li>The UI reflects the updated state accurately.</li>
                                    <li>No unintended side effects occur when multiple states are updated.</li>
                                    <h4>Date Parsing and Validation</h4>
                                    <p>Functions like isValidDate() and formatDate() are used to handle date inputs. Challenges include:</p>
                                    <li>Ensuring invalid dates are gracefully handled.</li>
                                    <li>Verifying locale-specific formatting.</li>
                                    <li>Testing edge cases like leap years, time zones, and daylight saving transitions.</li>
                                    <h4>UI Component Integration</h4>
                                    <p>The component uses several custom UI elements (Calendar, Input, Popover, Button). Testing must ensure:</p>
                                    <li>Proper rendering and interaction of these components.</li>
                                    <li>Accessibility compliance (e.g., keyboard navigation).</li>
                                    <li>Responsiveness across screen sizes.</li>
                                    <h4>Calendar Behavior</h4>
                                    <p>Each calendar instance has unique behavior:</p>
                                    <li>Single calendar: Select and display a single date.</li>
                                    <li>Date of birth: Similar to single calendar but semantically different.</li>
                                    <li>Date range: Requires validation of from and to dates.</li>
                                    <li>Input calendar: Opens on arrow key press and parses text input.</li>
                                    <li>Button calendar: Opens on button click and sets current date.</li>
                                    <p>Testing must cover:</p>
                                    <li>Correct rendering and interaction for each calendar type.</li>
                                    <li>Proper handling of month changes.</li>
                                    <li>Ensuring calendars open/close as expected.</li>
                                    <h4>Event Handling</h4>
                                    <p>Many event handlers are embedded inline (e.g., onKeyDown, onMonthChange). Challenges include:</p>
                                    <li>Ensuring all events trigger correctly.</li>
                                    <li>Preventing default behaviors where necessary.</li>
                                    <li>Avoiding race conditions or unexpected re-renders.</li>
                                    <h4>Edge Case Coverage</h4>
                                    <p>Test cases should include:</p>
                                    <li>Empty or undefined dates.</li>
                                    <li>Rapid date changes.</li>
                                    <li>Invalid input formats.</li>
                                    <li>Simultaneous interactions with multiple calendars.</li>

                                    
                                </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                           
                </div>
                <div className="sm:flex flex-row flex-wrap flex-auto gap-5 justify-items-center col-start-1 row-start-2">
                    <div>
                        <div className="grid max-w-70">
                            <div>
                                <h4>Single calendar</h4>
                                <p>You can use the calendar to select a date and it will be displayed in the below.</p>
                                <br />
                                <Calendar
                                    id="singleCalendar"
                                    data-testid="singleCalendar"
                                    mode="single"
                                    selected={date}
                                    onSelect={(date) => {
                                    setDate(date);
                                }}
                                className="rounded-lg border shadow-sm text-(--text-color)"
                                />
                            </div>
                            <div>
                                <br />
                                <p id="dateResult" data-testid="dateResult">
                                Selected date: {date?.toLocaleDateString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="grid max-w-70">
                            <h4>Set date of birth</h4>
                            <p>You can use the calendar to select a date of birth and it will be displayed in the below.</p>
                            <br />
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
                            className="rounded-lg border shadow-sm text-(--text-color)"
                            />
                        </div>
                        <div>
                            <br />
                            <p id="dobResult" data-testid="dobResult">
                                Date of birth: {dob?.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="grid max-w-70">
                            <h4>Date range calendar</h4>
                            <p>You can use the calendar to select a date range and it will be displayed in the below.</p>
                            <br />
                            <Calendar
                                id="dateRangeCalendar"
                                data-testid="dateRangeCalendar"
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => {
                                    setDateRange(range || { from: new Date(), to: new Date() });
                                }}
                            className="rounded-lg border shadow-sm text-(--text-color)"
                            />
                        </div>
                        <div className="grid col-start-2">
                            <br />
                            <p id="dateRangeResult" data-testid="dateRangeResult">
                                From: {dateRange?.from?.toLocaleDateString()}<br/>
                                To: {dateRange?.to?.toLocaleDateString()}
                            </p>
                        </div>
                        
                    </div>
                    <div className="grid max-w-70">
                        <div >
                                    <h4>Input date</h4>
                                    <p>You can use the input to select a date and it will be displayed in the below.</p>
                                    <br />
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
                                        className="text-(--text-color)"
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
                          
                                                className="rounded-lg border shadow-sm text-(--text-color)"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                </div>
                    </div>
                    <div className="grid max-w-70">
                        <div>
                                    <h4>Button date</h4>
                                    <p>You can use the button to select a date and it will be displayed in the below.</p>
                                    <br />
                                    <Label htmlFor="setDateButton" >
                                        Select a date:
                                    </Label>
                                    <div>
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
                                            
                                            className="text-(--text-color)"
                                            >
                                            {buttonDate ? formatDate(buttonDate) : "Set current date"}
                                            <Calendar1Icon />
                            
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent 
                                            className="w-auto overflow-hidden p-0 "
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
                                                className="rounded-lg border shadow-sm text-(--text-color)"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                    
                                </div>
                    </div>
                </div>
                
            </div>
        </div>
    )};