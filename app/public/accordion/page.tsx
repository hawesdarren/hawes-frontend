'use client'

import Header from '../../components/header'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { termsAndConditions } from '@/app/components/termsAndConditions'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'



export default function Page(this: any) {

  return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>Challenge to to use the accordions</p>
      </div>
      <div className="grid col-start-2 m-6 gap-6 text-left accordion">
            <div >
                <Accordion type='single' collapsible >
                    <AccordionItem value='Accordion item'>
                        <AccordionTrigger>Terms and conditions</AccordionTrigger>
                        <AccordionContent>{termsAndConditions()}</AccordionContent>
                        <AccordionContent className='flex gap-3'>
                            <Checkbox 
                                id='termsAndCondtions'
                                onCheckedChange={value => document.getElementById('tAndCResult')!.innerText = "Terms and Conditions: " + value}
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
                <p id='tAndCResult'></p>
            </div>
            <div >
                <p>Only one can be expanded at a time</p>
                <Accordion type='single' collapsible>
                    <AccordionItem value='Single accordion - number 1' className='indent-3'>
                        <AccordionTrigger >1st Accordion</AccordionTrigger>
                            <AccordionContent>Content 1</AccordionContent>
                            <AccordionContent>Content 1b</AccordionContent>
                            <AccordionContent>Content 1c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Single accordion - number 2' className='indent-3'>
                        <AccordionTrigger >2nd Accordion</AccordionTrigger>
                            <AccordionContent>Content 2</AccordionContent>
                            <AccordionContent>Content 2b</AccordionContent>
                            <AccordionContent>Content 2c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Single accordion - number 3' className='indent-3'>
                        <AccordionTrigger >3rd Accordion</AccordionTrigger>
                            <AccordionContent>Content 3</AccordionContent>
                            <AccordionContent>Content 3b</AccordionContent>
                            <AccordionContent>Content 3c</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div >
                <p>Multiple accordions can be expanded</p>
                <Accordion type='multiple' >
                    <AccordionItem value='Multiple accordion - number 1' className='indent-3'>
                        <AccordionTrigger >Item 1</AccordionTrigger>
                            <AccordionContent>Content 1</AccordionContent>
                            <AccordionContent>Content 1b</AccordionContent>
                            <AccordionContent>Content 1c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Multiple accordion - number 2' className='indent-3'>
                        <AccordionTrigger >Item 2</AccordionTrigger>
                            <AccordionContent>Content 2</AccordionContent>
                            <AccordionContent>Content 2b</AccordionContent>
                            <AccordionContent>Content 2c</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='Multiple accordion - number 3' className='indent-3'>
                        <AccordionTrigger >Item 3</AccordionTrigger>
                            <AccordionContent>Content 3</AccordionContent>
                            <AccordionContent>Content 3b</AccordionContent>
                            <AccordionContent>Content 3c</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
        <div className="grid col-start-2 m-6 gap-6 text-left">
                <p>A tab work horizontally</p>
                <Tabs className="tab" defaultValue='tab1'>
                    <TabsList>
                        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
                        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
                        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
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
