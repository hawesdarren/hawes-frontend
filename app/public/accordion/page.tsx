'use client'

import Header from '../../components/header'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Page(this: any) {

  return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>Challenge to to use the accordions</p>
      </div>
      <div className="grid col-start-2 m-6 gap-6 indent-6">
            <div >
                <Accordion type='single' collapsible >
                    <AccordionItem value='Accordion item'>
                        <AccordionTrigger className='indent-3'>Accordion</AccordionTrigger>
                        <AccordionContent>Accordion content 1</AccordionContent>
                        <AccordionContent>Accordion content 2</AccordionContent>
                        <AccordionContent>Accordion content 3</AccordionContent>
                    </AccordionItem>
                    
                </Accordion>
            </div>
            <div >
                <Accordion type='multiple' >
                    <AccordionItem value='Accordion item'>
                        <AccordionTrigger className='indent-3'>Accordion multiple select</AccordionTrigger>
                        <AccordionContent>Accordion content 1</AccordionContent>
                        <AccordionContent>Accordion content 2</AccordionContent>
                        <AccordionContent>Accordion content 3</AccordionContent>
                    </AccordionItem>
                    
                </Accordion>
            </div>
            <div>
                <Accordion type='single' collapsible className='accordion'>
                    <AccordionItem value='Accordion item'>
                        <AccordionTrigger className='indent-3 fill-black'>Nested Accordion</AccordionTrigger>
                        <AccordionContent>Accordion content 1</AccordionContent>
                        <AccordionContent>Accordion content 2</AccordionContent>
                        <AccordionContent>Accordion content 3</AccordionContent>
                        <AccordionContent>
                                <Accordion type='single' collapsible>
                                    <AccordionItem value='Accordion item'>
                                        <AccordionTrigger className='indent-6'>Accordion trigger 3</AccordionTrigger>
                                        <AccordionContent className='indent-9'>Accordion content 1a</AccordionContent>
                                        <AccordionContent className='indent-9'>Accordion content 2a</AccordionContent>
                                        <AccordionContent className='indent-9'>Accordion content 3a</AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                        </AccordionContent>
                        

                    </AccordionItem>
                    
                </Accordion>
            </div>
            
      </div>
    </div>

  )}