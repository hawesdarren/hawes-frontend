'use client'

import Header from '../../components/header'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { termsAndConditions } from '@/app/components/termsAndConditions'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import React from "react";
import { Separator } from "@/components/ui/separator"



export default function Page(this: any) {

  const [termsAndConditionsValue, setTermsAndConditionsValue] = React.useState<boolean>(false)
  return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">               
            <Accordion type="single" collapsible>
                <AccordionItem value='item1'>
                    <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
                    <AccordionContent>
                        <h4>State Management Validations</h4>
                        <p>The Terms and nd conditions value managed via React state, this test reqires:</p>
                        <li>Simulating checkbox interactions and verifying state updates.</li>
                        <li>Ensuring the rendered output (e.g., Terms and Conditions: true/false) reflects the state accurately.</li>
                        <h4>UI Component Interactions</h4>
                        <p>The page includes:</p>
                        <li>Single-expand accordion</li>
                        <li>Multi-expand accordion</li>
                        <li>Tabs with nested accordion items</li>
                        <li>Checkbox for terms acceptance</li>
                        <p>Testing challenges include:</p>
                        <li>Verifying accordion behavior (e.g., only one open at a time vs. multiple).</li>
                        <li>Ensuring tab switching updates visible content correctly.</li>
                        <li>Testing nested interactions, like accordions inside tabs.</li>
                        <h4>Test Isolation & Cleanup</h4>
                        <p>Since state is involved, tests must:</p>
                        <li>Reset state between runs to avoid test pollution.</li>
                        <li>Use tools like @testing-library/react or Playwright with proper beforeEach() hooks.</li>
                        <h4>Accessibility Testing</h4>
                        <p>Accordions, tabs, and checkboxes are interactive elements:</p>
                        <li>Validate keyboard navigation and ARIA roles.</li>
                        <li>Ensure screen readers can interpret the structure and state changes.</li>
                        <h4>E2E Testing Complexity</h4>
                        <p>A realistic user flow might involve:</p>
                        <ol className='list-decimal list-inside'>
                            <li>Accepting terms via checkbox.</li>
                            <li>Navigating tabs.</li>
                            <li>Expanding accordions.</li>
                        </ol>
                        <li>These flows should be tested across devices and screen sizes to ensure responsiveness and usability.</li>
                        
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
      </div>
      <div className="grid col-start-2 m-6 gap-6 text-left accordion">
            <div >
                <h4>Terms and condtions</h4>
                <Accordion type='single' collapsible >
                    <AccordionItem value='Accordion item'>
                        <AccordionTrigger>Terms and conditions</AccordionTrigger>
                        <AccordionContent data-testid='termsContent'>{termsAndConditions()}</AccordionContent>
                        <AccordionContent className='flex gap-3'>
                            <Checkbox 
                                id='termsAndCondtions'
                                checked={termsAndConditionsValue}
                                onCheckedChange={value => setTermsAndConditionsValue(!!value)}
                            >
                            </Checkbox>
                            <div>
                                <label
                                    htmlFor="termsAndCondtions"
                                    >Accept terms and conditions</label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
        
                </Accordion>
            </div>
            <div>
                <p id='tAndCResult' data-testid='tAndCResult'>Terms and Conditions: {termsAndConditionsValue.toString()}</p>
            </div>
            <Separator className='my-4' />
            <div >
                <h4>Only one can be expanded at a time</h4>
                <Accordion type='single' collapsible>
                    <AccordionItem value='Single accordion - number 1' className='indent-3' data-testid='single-accordion-1'>
                        <AccordionTrigger>1st Accordion</AccordionTrigger>
                            <AccordionContent >Content 1</AccordionContent>
                            <AccordionContent>Content 1b</AccordionContent>
                            <AccordionContent>Content 1c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Single accordion - number 2' className='indent-3' data-testid='single-accordion-2'>
                        <AccordionTrigger >2nd Accordion</AccordionTrigger>
                            <AccordionContent>Content 2</AccordionContent>
                            <AccordionContent>Content 2b</AccordionContent>
                            <AccordionContent>Content 2c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Single accordion - number 3' className='indent-3' data-testid='single-accordion-3'>
                        <AccordionTrigger >3rd Accordion</AccordionTrigger>
                            <AccordionContent>Content 3</AccordionContent>
                            <AccordionContent>Content 3b</AccordionContent>
                            <AccordionContent>Content 3c</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <Separator className='my-4' />
            <div >
                <h4>Multiple accordions can be expanded</h4>
                <Accordion type='multiple' >
                    <AccordionItem value='Multiple accordion - number 1' className='indent-3' data-testid="multiple-accordion-1">
                        <AccordionTrigger >Item 1</AccordionTrigger>
                            <AccordionContent>Content 1</AccordionContent>
                            <AccordionContent>Content 1b</AccordionContent>
                            <AccordionContent>Content 1c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Multiple accordion - number 2' className='indent-3' data-testid="multiple-accordion-2">
                        <AccordionTrigger >Item 2</AccordionTrigger>
                            <AccordionContent>Content 2</AccordionContent>
                            <AccordionContent>Content 2b</AccordionContent>
                            <AccordionContent>Content 2c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Multiple accordion - number 3' className='indent-3' data-testid="multiple-accordion-3">
                        <AccordionTrigger >Item 3</AccordionTrigger>
                            <AccordionContent>Content 3</AccordionContent>
                            <AccordionContent>Content 3b</AccordionContent>
                            <AccordionContent>Content 3c</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        <Separator className='my-4' />    
        </div>
        
        <div className="grid col-start-2 m-6 gap-6 text-left">
                <h4>A tab work horizontally</h4>
                <Tabs className="tab" defaultValue='tab1'>
                    <TabsList>
                        <TabsTrigger value='tab1' data-testid="tab-1">Tab 1</TabsTrigger>
                        <TabsTrigger value='tab2' data-testid="tab-1">Tab 2</TabsTrigger>
                        <TabsTrigger value='tab3' data-testid="tab-1">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value='tab1'>
                        <p>Item 1 in tab 1</p>
                        <p>Item 2 in tab 1</p>
                    </TabsContent>
                    <TabsContent value='tab2'>
                        <p>Item 1 in tab 2</p>
                        <p>Item 2 in tab 2</p>
                    </TabsContent>
                    <TabsContent value='tab3'>
                        <p>Item 1 in tab 3</p>
                        <p>Item 2 in tab 3</p>
                        <p>Item 3 in tab 3</p>
                        <Link href='/public/checkbox' className='underline'>Checkbox</Link>
                    </TabsContent>
                </Tabs>
            </div>
    </div>

  )}
