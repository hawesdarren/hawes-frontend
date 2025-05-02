'use client'

import Header from '../../components/header'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


var radioThreeValue: string | undefined  
var radioThreeSecondValue: string | undefined 

export default function Page(this: any) {

  return (

<div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_1fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>The challange is to use the radio buttons</p>
      </div>
      
      <div className="valueChange grid col-start-2 place-items-start">
        <h2>Triple option</h2>
        <RadioGroup  
            //value={selectedValue} 
            onValueChange={itemValue => document.getElementById('selectedOption')!.innerText = itemValue.toString()}
                                           >
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
      <h2>Default option</h2>
        <RadioGroup  
            //value={selectedValue} 
            defaultValue='no'
            onValueChange={itemValue => document.getElementById('selectedOptionTwo')!.innerText = itemValue.toString()}
            >
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
            >
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
            
        </RadioGroup>
        <p>Select yes or no</p>
        <RadioGroup  
            onValueChange={selectedValue => {radioThreeSecondValue = selectedValue}}
            >
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="yes"/>
                <Label htmlFor="yes">Yes</Label>    
            </div>
            <div className="flex p-2 gap-x-3">
                <RadioGroupItem value="no"/>
                <Label htmlFor="no">No</Label>
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

function buttonClicked(){
    /*if(radioThreeValue !== undefined){
        document.getElementById('selectedOptionThree')!.innerText = "Options selected:\n" + radioThreeValue + "\n" + radioThreeSecondValue
    }
    else {
        document.getElementById('selectedOptionThree')!.innerText = "No option selected"
    }*/
    document.getElementById('selectedOptionThree')!.innerText = "Options selected: " + radioThreeValue + "\n"
    document.getElementById('selectedOptionThree')!.innerText += "Yes/No selected: " + radioThreeSecondValue + "\n"
}


