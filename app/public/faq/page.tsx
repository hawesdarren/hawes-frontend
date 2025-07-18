'use client'

import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@/components/ui/accordion"

export default function Page(this: any) {

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3">
                <div >
                    <Accordion type='single' collapsible className='accordion'>
                        <AccordionItem value='item1'>
                            <AccordionTrigger>What is this website for?</AccordionTrigger>
                            <AccordionContent>This site helps you learn and practice software testing. You can try out different types of tests, find bugs, and improve your QA (Quality Assurance) skills.</AccordionContent> 
                        </AccordionItem>
                        <AccordionItem value='item2'>
                            <AccordionTrigger>Do I need to be an expert to use this site?</AccordionTrigger>
                            <AccordionContent>Not at all! This site is great for beginners. You’ll find easy-to-follow examples and practice tasks to help you learn step by step.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item3'>
                            <AccordionTrigger>What kind of testing can I practice here?</AccordionTrigger>
                            <AccordionContent>You can try:
                                <li>Manual testing (checking things by hand)</li>
                                <li>Automated testing (using tools like Selenium)</li>
                                <li>API testing (checking how apps talk to each other)</li>
                                <li>Bug reporting (writing clear reports when something goes wrong)</li>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item4'>
                            <AccordionTrigger>Do I need to install anything?</AccordionTrigger>
                            <AccordionContent>Nope! You can do most things right in your browser. For some automation tasks, you will need to install your tool of choice like Postman or a code editor.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item5'>
                            <AccordionTrigger>Are there practice websites or apps I can test?</AccordionTrigger>
                            <AccordionContent>Yes! We provide fake websites and apps made just for testing practice. You can safely explore and test them.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item6'>
                            <AccordionTrigger>Is it free to use?</AccordionTrigger>
                            <AccordionContent>Yes</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item7'>
                            <AccordionTrigger>What if I find a bug on this site?</AccordionTrigger>
                            <AccordionContent>Great catch! You can report it using the “Feedback” button or email us at support@hawes.co.nz</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item8'>
                            <AccordionTrigger>Can I suggest new features or test ideas?</AccordionTrigger>
                            <AccordionContent>Yes, we’d love that! You can send your ideas through our contact form.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )}