'use client'

import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function Page(this: any) {

    // State for each radio group
    const [tripleOption, setTripleOption] = useState<string | undefined>(undefined)
    const [defaultOption, setDefaultOption] = useState<string>('no')
    const [doubleOption, setDoubleOption] = useState<string | undefined>(undefined)
    const [doubleYesNo, setDoubleYesNo] = useState<string | undefined>(undefined)
    const [doubleResult, setDoubleResult] = useState<string>('')

    // Helper to get label text by value for a given group
    const getLabel = (group: { value: string, label: string }[], value?: string) =>
    group.find(opt => opt.value === value)?.label ?? ''

    // Options for each group
    const tripleOptions = [
        { value: 'option-1', label: 'Option One' },
        { value: 'option-2', label: 'Option Two' },
        { value: 'option-3', label: 'Option Three' },
    ]
    const defaultOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ]
    const doubleOptions = [
        { value: 'double-option-1', label: 'Option One' },
        { value: 'double-option-2', label: 'Option Two' },
        { value: 'double-option-3', label: 'Option Three' },
    ]
    const doubleYesNoOptions = [
        { value: 'double-option-yes', label: 'Yes' },
        { value: 'double-option-no', label: 'No' },
    ]

    // Handler for submit button
    const handleDoubleSubmit = () => {
        const selectedOption = getLabel(doubleOptions, doubleOption)
        const selectedYesNo = getLabel(doubleYesNoOptions, doubleYesNo)
        setDoubleResult(
        `Options selected: ${selectedOption}\nYes/No selected: ${selectedYesNo}`
        )
    }

  return (

<div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>State Management & Isolation</h4>
            <p>Each radio group manages its own state. Tests must ensure that selecting an option in one group does not affect the others. Resetting state between tests is crucial to avoid flaky results.</p>
            <h4>Radio Button Accessibility</h4>
            <p>The custom radio components (`RadioGroup`, `RadioGroupItem`) may not use native HTML elements, so verifying accessibility (keyboard navigation, screen reader support, correct labeling) is more complex.</p>
            <h4>Dynamic Content Verification</h4>
            <p>The selected option labels are shown dynamically. Tests must reliably query and assert these updates, which may require waiting for React state updates.</p>
            <h4>Multiple Groups with Similar Structure</h4>
            <p>There are several radio groups with similar markup and labels. Test selectors (like `data-testid`) are needed to uniquely identify and interact with each group, or else tests may become brittle or ambiguous.</p>
            <h4>Compound Interactions</h4>
            <p>The "Double option with button" section requires selecting from two groups and clicking a button to see a result. Tests must simulate multi-step user flows and verify the composed output.</p>
            <h4>Default Values</h4>
            <p>Some groups have default selections. Tests must check both the initial state and state after user interaction.</p>
            <h4>Edge Cases</h4>
            <p>Tests should cover cases where no option is selected, or only one of the two required options is chosen before clicking "Submit".</p>
            <h4>Styling and Layout</h4>
            <p>While not strictly functional, verifying that the layout and spacing are correct across screen sizes may require visual regression testing.</p>
            <h4>Test Flakiness</h4>
            <p>Asynchronous state updates and UI rendering may cause timing issues in tests, requiring careful use of async utilities and selectors.</p>
            <h4>Summary</h4>
            <p>Testing this page requires careful handling of state, selectors, and user flows, as well as attention to accessibility and asynchronous updates. Robust test IDs and cleanup between tests are essential.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      
      <div className="valueChange grid col-start-2 place-items-start">
        
        <RadioGroup  
            data-testid="triple-option-radio-group"
            value={tripleOption}
            onValueChange={setTripleOption}
             >
            <h2>Triple option</h2>
             {tripleOptions.map(opt => (
            <div className="flex p-2 gap-x-3" key={opt.value}>
              <RadioGroupItem value={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
            ))}
            <div className="flex p-2 gap-x-3">
                <p id="selectedOption">
              {tripleOption && (
                <>Selected item:<br />{getLabel(tripleOptions, tripleOption)}</>
              )}
            </p>
            </div>
        </RadioGroup>
      </div>
      <div className="DefaultValue grid col-start-2 place-items-start">
      
        <RadioGroup  
            //value={selectedValue} 
            value={defaultOption}
            onValueChange={setDefaultOption}
            >
            <h2>Default option</h2>
            {defaultOptions.map(opt => (
            <div className="flex p-2 gap-x-3" key={opt.value}>
              <RadioGroupItem value={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
            ))}
            
            <div className="flex p-2 gap-x-3">
                <p id="selectedOptionTwo">
              {defaultOption && (
                <>Selected item:<br />{getLabel(defaultOptions, defaultOption)}</>
              )}
            </p>
            </div>
        </RadioGroup>
      </div>
      <div className="radioWithButton grid col-start-2 place-items-start">
      <h2>Double option with button</h2>
      <p>Select options</p>
      <RadioGroup  
            value={doubleOption}
            onValueChange={setDoubleOption}
            data-testid="double-option-radio-group-1"
            >
            {doubleOptions.map(opt => (
            <div className="flex p-2 gap-x-3" key={opt.value}>
              <RadioGroupItem value={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
            ))}
            
        </RadioGroup>
        <p>Select yes or no</p>
        <RadioGroup  
            value={doubleYesNo}
            onValueChange={setDoubleYesNo}
            data-testid="double-option-radio-group-2"
            >
            {doubleYesNoOptions.map(opt => (
            <div className="flex p-2 gap-x-3" key={opt.value}>
              <RadioGroupItem value={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
            ))}
            
        </RadioGroup>
        <p>Confirm options</p>
        <div>
            <Button onClick={handleDoubleSubmit}>Submit</Button>
        </div>
        <div className="flex p-2 gap-x-3">
            <p id="selectedOptionThree" style={{ whiteSpace: 'pre-line' }}>
                {doubleResult}
            </p>
        </div>
      </div>
      
</div>
  
)};




