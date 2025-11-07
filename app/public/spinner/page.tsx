'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"



export default function Page(this: any) {
    const [saveBtnText, setSaveBtnText] = React.useState("Save");
    const [loading, setLoading] = React.useState(false);
    const router =useRouter();

    const handleSave = () => {
        setLoading(true);
        setSaveBtnText("Saving...");
        // Simulate a save operation
        setTimeout(() => {
            setLoading(false);
            setSaveBtnText("Save");
        }, 10000);
    };

    const handleLoadNextPage = () => {
        setTimeout(() => {
            router.push('/public/spinner/loading-page');
        }, 100);
    };

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Async Operations with Timers:</h4>
            <p>The "Save" button uses a `setTimeout` with a 10-second delay. Tests must wait for this async operation to complete, which can make tests slow. If timeouts are not handled correctly, tests may become flaky.</p>
            <h4>Button State Management:</h4>
            <p>The button text changes from "Save" to "Saving..." during the async operation. This requires careful management of the button state to ensure it reflects the current operation accurately.</p>
            <h4>Spinner Visibility:</h4>
            <p>The spinner is shown while the async operation is in progress. This provides visual feedback to the user that something is happening in the background.</p>
            <h4>Timing and Race Conditions:</h4>
            <p>With a 10-second delay for the save operation and a 100ms delay for navigation, tests must use proper waits and timeouts to avoid race conditions or premature assertions.</p>
            <h4>Accessibility:</h4>
            <p>The spinner and button states should be accessible to screen readers. Tests should verify ARIA attributes (e.g., `aria-busy`, `aria-disabled`) and that assistive technologies can detect the loading state.</p>
            <h4>Server-Side Loading State:</h4>
            <p>The target page (`loading-page`) uses an async Server Component with a fake delay and `loading.tsx`. Tests must verify:</p>
            <p>- The loading spinner shows during server-side loading.</p>
            <p>- The final page content appears after the delay.</p>
            <p>- This requires waiting for both client-side navigation and server-side rendering.</p>
            <h4>Prefetching Behavior:</h4>
            <p>Next.js may prefetch the target route, causing it to load faster than expected. This can make it hard to consistently test the loading state. Tests may need to disable prefetching or clear cache between runs.</p>
            <h4>Summary:</h4>
            <p>Testing this page requires careful handling of async operations, button state, navigation delays, server-side loading, accessibility, and timing. Long timeouts, navigation with delays, and server-side rendering are the biggest sources of test complexity and flakiness.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
        <div className="grid col-start-2 col-span-1">            
               <div>
                    <h4>Save your changes</h4>
                    <Button 
                        data-testid="save-button" 
                        id="save-button" 
                        onClick={handleSave} 
                        disabled={loading} 
                        aria-busy={loading}
                        aria-disabled={loading}
                        aria-label={loading ? "Saving..." : "Save"}
                        className="min-w-[200px] dark:text-black bg-(--text-color)"
                    >
                        {loading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {saveBtnText}
                    </Button>
               </div>
               <div className="mt-8">
                    <h4>Load the next page</h4>
                    <Button 
                        data-testid="load-button" 
                        id="load-button" 
                        className="min-w-[200px] dark:text-black bg-(--text-color)"
                        onClick={handleLoadNextPage}
                        aria-label="Navigate to loading page"
                    >
                        Load Next Page
                    </Button>
               </div>
        </div>
      </div>

    )}