'use client'

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Page(this: any) {
    const [isDelete, setIsDelete] = React.useState(false);

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Modal/Alert Dialog Handling:</h4>
            <p>The alert is rendered as a modal (`role="alertdialog"`), which may be hidden or removed from the DOM when not active. Tests must reliably trigger the alert and wait for it to appear before interacting.</p>
            <h4>Focus Management:</h4>
            <p>Proper accessibility requires focus to move to the alert dialog when opened and return to the triggering element when closed. Tests should verify focus behavior, which can be tricky with custom modals.</p>
            <h4>Multiple Actions and Outcomes:</h4>
            <p>The alert supports both "Cancel" and "Continue" actions, each with different outcomes. Tests must assert that the correct result is shown for each action and that the dialog closes appropriately.</p>
            <h4>Dynamic Content:</h4>
            <p>The alert title and message may change based on context. Tests must verify the correct content is displayed for each scenario.</p>
            <h4>Selector Robustness:</h4>
            <p>Selectors used to interact with the alert must be robust and not fragile. Tests should account for potential changes in the DOM structure or element attributes.</p>
            <h4>Accessibility:</h4>
            <p>Keyboard users must be able to navigate the alert dialog using standard keyboard controls. Tests should verify that all interactive elements are reachable and usable via keyboard.</p>
            <h4>Summary:</h4>
            <p>Testing this page requires careful handling of modal visibility, focus management, multiple actions, accessibility, and robust selectors. Modal dialogs and custom alert components are common sources of test flakiness and accessibility issues.</p>
            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
        <div className="grid col-start-2 col-span-1 justify-items-center ">            
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default" className="min-w-[200px]">Show Alert</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDelete(false)}
                        >
                            Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => setIsDelete(true)}
                        >
                            Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="mt-2">
                    <p data-testid="alert-action">{`Action: ${isDelete}`}</p>
                </div>
            </div>  
            <div className="mt-6 ">
                <Button 
                    variant='default'
                    className="min-w-[200px]"
                    onClick={() => {
                        toast.success('This is a success alert!', { duration: 5000, position: "top-center" });
                    }}
                >
                    Show Success Alert
                </Button>
            </div>
        </div>
            
      </div>

    )}