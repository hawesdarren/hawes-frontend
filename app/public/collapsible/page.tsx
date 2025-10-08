'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function Page(this: any) {

    return (
        <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
            <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>State Management & Isolation</h4>
            <p>Each interactive component manages its own state. Tests must ensure toggling one does not affect the other, and state resets between tests to avoid flakiness.</p>
            <h4>Accessibility</h4>
            <p>Each interactive component manages its own state. Tests must ensure toggling one does not affect the other, and state resets between tests to avoid flakiness.</p>
            <h4>Dynamic Content Verification</h4>
            <p>Content inside AccordionContent and CollapsibleContent is conditionally rendered. Tests must wait for UI updates and assert visibility and content correctness.</p>
            <h4>Selector Ambiguity</h4>
            <p>Multiple similar components on the page can make it difficult to target the correct element in tests. Unique selectors or test IDs are needed for reliable queries.</p>
            <h4>Responsive Layout</h4>
            <p>The grid layout changes across screen sizes. Visual regression tests or responsive assertions are needed to ensure consistent appearance.</p>
            <h4>Animation & Transition Timing</h4>
            <p>If open/close actions use animations, tests may need to account for timing delays to avoid false negatives.</p>
            <h4>Edge Cases</h4>
            <p>Tests should cover cases like rapidly toggling components, opening multiple sections, and verifying correct behavior when content is long or empty.</p>
            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
        <div className="grid col-start-1 col-span-3">            
                <div>
                    <Collapsible>
                        <div className="flex flex-col items-start gap-2 text-(--text-color)">
                            <CollapsibleTrigger>Read more...</CollapsibleTrigger>
                            <CollapsibleContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu ullamcorper eros. Fusce metus libero, rutrum eget bibendum quis, iaculis vitae leo.</CollapsibleContent>
                            <CollapsibleContent>Etiam ultricies orci commodo ligula ornare tempus in a dui. Aenean at metus a risus commodo accumsan et at ex. Nullam scelerisque accumsan suscipit.</CollapsibleContent>
                            <CollapsibleContent>Fusce vehicula lacus nec metus pretium laoreet. Maecenas tortor felis, placerat vel nibh ac, elementum consequat magna. Vestibulum non gravida lorem.</CollapsibleContent>
                        </div>
                    </Collapsible>
                </div>
            </div>
            
        </div>

    )}