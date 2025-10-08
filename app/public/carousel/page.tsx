'use client'

import React from "react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Page(this: any) {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndexMulti, setSelectedIndexMulti] = React.useState(0);
  const [selectedIndexVert, setSelectedIndexVert] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>()
  const [apiMulti, setApiMulti] = React.useState<CarouselApi>()
  const [apiVert, setApiVert] = React.useState<CarouselApi>()

  React.useEffect(() => {
      if (!api) {
        return;
      }
      // Scroll to the selected item when selectedIndex changes
      api.scrollTo(selectedIndex);
    }, [selectedIndex, api]);

  React.useEffect(() => {
      if (!apiMulti) {
        return;
      }
      // Scroll to the selected item when selectedIndex changes
      apiMulti.scrollTo(selectedIndexMulti);
    }, [selectedIndexMulti, apiMulti]);

  React.useEffect(() => {
      if (!apiVert) {
        return;
      }
      // Scroll to the selected item when selectedIndex changes
      apiVert.scrollTo(selectedIndexVert);
    }, [selectedIndexVert, apiVert]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-1 sm:col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Multiple Carousels with Independent State:</h4>
            <p>There are three carousels, each with its own selection and API state. Tests must ensure that interactions with one carousel do not affect the others, and that state isolation is maintained.</p>
            <h4>Responsive Layout:</h4>
            <p>The grid layout changes between mobile and desktop (grid-cols-1 vs. sm:grid-cols-[1fr_2fr_1fr]). Tests must verify correct stacking and sizing of carousels and content across breakpoints.</p>
            <h4>Conditional Rendering of Controls:</h4>
            <p>Carousel navigation buttons are hidden on mobile (hidden sm:flex). Tests need to check their visibility and functionality only on appropriate screen sizes.</p>
            <h4>Dynamic Styling Based on State:</h4>
            <p>Carousel items have different styles based on their selected state. Tests must verify that the correct styles are applied when an item is selected or deselected.</p>
            <h4>Complex Interactions:</h4>
            <p>Clicking carousel items updates selection and scrolls to the item. Tests must simulate user clicks, verify selection state, and check that the carousel scrolls as expected.</p>
            <h4>Vertical vs. Horizontal Orientation:</h4>
            <p>The vertical carousel uses different orientation and sizing. Tests must verify correct behavior and appearance for both orientations.</p>
            <h4>Accessibility:</h4>
            <p>Custom components may lack native accessibility features. Tests should check for ARIA roles, keyboard navigation, and screen reader compatibility.</p>
            <h4>Test Selectors and Targeting:</h4>
            <p>With repeated structures and similar class names, reliably selecting elements for assertions can be challenging. Unique test IDs or roles may be needed.</p>
            <h4>State Reset Between Tests:</h4>
            <p>Because state is managed in React, tests must ensure state is reset between runs to avoid flakiness.</p>
            <h4>Summary:</h4>
            <p>Testing this page requires careful handling of state isolation, responsive layouts, conditional rendering, dynamic styling, and accessibility. Robust selectors and cleanup between tests are essential for reliability.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
     <div className="sm:col-start-2 sm:span-1">
       <h2>Horizontal carousel</h2>
        <Carousel 
          setApi={setApi} 
          className="bg-muted p-4 rounded-lg max-w-full"
          data-testid="horizontal-carousel"
          id="horizontal-carousel"
          >
          <CarouselContent>
            {[1, 2, 3].map((item, idx) => (
              <CarouselItem
                key={idx}
                selected={selectedIndex === idx}
                tabIndex={0}
                role="option"
                aria-selected={selectedIndex === idx}
                className="flex flex-col items-center justify-center h-48 basis-7/10 sm:basis-8/10 carousel-item cursor-pointer"
                onClick={() => {
                  //console.log(`Carousel item ${idx} selected`);
                  setSelectedIndex(idx)
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIndex(idx);
                  }
                }}
              >
                <h2 className="text-xl font-bold">{`Item ${item}`}</h2>
                <p>{`This is the content of item ${item}.`}</p>
                <p>Select me</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-between mt-4">
            <CarouselPrevious className="btn btn-outline">Previous</CarouselPrevious>
            <CarouselNext className="btn btn-outline">Next</CarouselNext>
          </div>
        </Carousel>
        <div>
          <p className="mt-2" id="horizontalResult" data-testid="horizontalResult">Selected item: {selectedIndex + 1}</p>
        </div>
     </div>
     <div className="sm:col-start-2 sm:span-1">
       <h2>Horizontal carousel - mutliple items viewable</h2>
        <Carousel 
          setApi={setApiMulti} 
          className="bg-muted p-4 rounded-lg max-w-full"
          data-testid="horizontal-carousel-multi"
          id="horizontal-carousel-multi"
          opts={{
            loop: true,
            align: "center",
            containScroll: "trimSnaps",
            //slidesToScroll: 1,
            skipSnaps: false,
            
          }}
        >
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <CarouselItem
                key={idx}
                selected={selectedIndexMulti === idx}
                className="flex flex-col items-center justify-center h-48 basis-1/3 sm:basis-1/3 carousel-item cursor-pointer"
                tabIndex={0}
                role="option"
                aria-selected={selectedIndexMulti === idx}
                onClick={() => {
                  console.log(`Carousel item ${idx} selected`);
                  setSelectedIndexMulti(idx)
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIndexMulti(idx);
                  }
                }}
              >
                <h2 className="text-xl font-bold">{`Item ${item}`}</h2>
                <p>{`This is the content of item ${item}.`}</p>
                <p>Select me</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-between mt-4">
            <CarouselPrevious className="btn btn-outline">Previous</CarouselPrevious>
            <CarouselNext className="btn btn-outline">Next</CarouselNext>
          </div>
        </Carousel>
        <div>
          <p className="mt-2" id="horizontalResultMulti" data-testid="horizontalResultMulti">Selected item: {selectedIndexMulti + 1}</p>
        </div>
     </div>
      <div className="sm:col-start-2 sm:span-1">
       <h2>Vertical carousel</h2>
        <Carousel 
          setApi={setApiVert} 
          className="bg-muted p-4 rounded-lg max-w-full "
          data-testid="vertical-carousel"
          id="vertical-carousel"
          opts={{
            loop: true,
            align: "center",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            skipSnaps: false,
            
          }}
          orientation="vertical"
        >
          <CarouselContent className="max-h-75">
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <CarouselItem
                key={idx}
                selected={selectedIndexVert === idx}
                className="flex flex-col items-center justify-center h-48 basis-1/3 sm:basis-1/3 carousel-item cursor-pointer"
                tabIndex={0}
                role="option"
                aria-selected={selectedIndexVert === idx}
                onClick={() => {
                  console.log(`Carousel item ${idx} selected`);
                  setSelectedIndexVert(idx)
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIndexVert(idx);
                  }
                }}
              >
                <h2 className="text-xl font-bold">{`Item ${item}`}</h2>
                <p>{`This is the content of item ${item}.`}</p>
                <p>Select me</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-between mt-4">
            <CarouselPrevious className="btn btn-outline">Previous</CarouselPrevious>
            <CarouselNext className="btn btn-outline">Next</CarouselNext>
          </div>
        </Carousel>
        <div>
          <p className="mt-2" id="verticalResult" data-testid="verticalResult">Selected item: {selectedIndexVert + 1}</p>
        </div>
     </div>
     
     
    </div>
  )
}