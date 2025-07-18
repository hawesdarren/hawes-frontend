'use client'

import Header from '../../components/header'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


var radioThreeValue: string | undefined  
var radioThreeSecondValue: string | undefined 

function setTripleOptionResult(itemValue: string) {
  //Get the label for the value selected
  const label = document.querySelector(`label[for="${itemValue}"]`);
  if (label) {
    // Set the text of the paragraph to the label text              
    document.getElementById('selectedOption')!.innerText = 'Selected item:\n' + label.textContent;
  }
}

function setDefaultOptionResult(itemValue: string) {
    //Get the label for the value selected
    const label = document.querySelector(`label[for="${itemValue}"]`);
    if (label) {
      // Set the text of the paragraph to the label text              
      document.getElementById('selectedOptionTwo')!.innerText = 'Selected item:\n' + label.textContent;
    }
  }

function buttonClicked(){
    //Get the radio group-1
    const radioOptionGroup = document.querySelector('div[data-testid="double-option-radio-group-1"]')
    // Get the selected option values
    const selectValueButton = radioOptionGroup?.querySelector('button[data-state="checked"]') as HTMLButtonElement | null
    const selectedValue  = selectValueButton?.value
    //Get label for selected options
    const selectValueLabels = document.querySelector(`label[for="${selectedValue}"]`)
    // Get the radio group-2
    const radioOptionGroupTwo = document.querySelector('div[data-testid="double-option-radio-group-2"]')
    // Get the selected option values
    const selectValueButtonTwo = radioOptionGroupTwo?.querySelector('button[data-state="checked"]') as HTMLButtonElement | null
    const selectedValueTwo  = selectValueButtonTwo?.value
    //Get label for selected options
    const selectValueLabelsTwo = document.querySelector(`label[for="${selectedValueTwo}"]`)
    // Set the text of the paragraph to the label text
    
    document.getElementById('selectedOptionThree')!.innerText = "Options selected: " + selectValueLabels?.textContent + "\n"
    document.getElementById('selectedOptionThree')!.innerText += "Yes/No selected: " + selectValueLabelsTwo?.textContent + "\n"
}

export default function Page(this: any) {

  return (

<div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_1fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>The challenge is to use the radio buttons</p>
      </div>
      
      <div className="valueChange grid col-start-2 place-items-start">
        
        <RadioGroup  
            data-testid="triple-option-radio-group"
            onValueChange={itemValue => setTripleOptionResult(itemValue)}
             >
            <h2>Triple option</h2>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="option-1"/>
                <Label htmlFor="option-1">Option One</Label>
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="option-2"/>
                <Label htmlFor="option-2">Option Two</Label>
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="option-3"/>
                <Label htmlFor="option-3">Option Three</Label>
            </div>
            <div className="flex p-2 gap-x-3">
                <p id="selectedOption"></p>
            </div>
        </RadioGroup>
      </div>
      <div className="DefaultValue grid col-start-2 place-items-start">
      
        <RadioGroup  
            //value={selectedValue} 
            defaultValue='no'
            onValueChange={itemValue => setDefaultOptionResult(itemValue)}
            >
            <h2>Default option</h2>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="yes"/>
                <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="no"/>
                <Label htmlFor="no">No</Label>
            </div>
            
            <div className="flex p-2 gap-x-3">
                <p id="selectedOptionTwo"></p>
            </div>
        </RadioGroup>
      </div>
      <div className="radioWithButton grid col-start-2 place-items-start">
      <h2>Double option with button</h2>
      <p>Select options</p>
      <RadioGroup  
            onValueChange={selectedValue => {radioThreeValue = selectedValue}}
            data-testid="double-option-radio-group-1"
            >
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="double-option-1"/>
                <Label htmlFor="double-option-1">Option One</Label>    
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="double-option-2"/>
                <Label htmlFor="double-option-2">Option Two</Label>
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="double-option-3"/>
                <Label htmlFor="double-option-3">Option Three</Label>
            </div>
            
        </RadioGroup>
        <p>Select yes or no</p>
        <RadioGroup  
            onValueChange={selectedValue => {radioThreeSecondValue = selectedValue}}
            data-testid="double-option-radio-group-2"
            >
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="double-option-yes"/>
                <Label htmlFor="double-option-yes">Yes</Label>    
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="double-option-no"/>
                <Label htmlFor="double-option-no">No</Label>
            </div>
            
        </RadioGroup>
        <p>Confirm options</p>
        <div>
            <Button onClick={buttonClicked}>Submit</Button>
        </div>
        <div className="flex p-2 gap-x-3">
                <p id="selectedOptionThree"></p>
        </div>
      </div>
      
</div>
  
)};




