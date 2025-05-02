'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

var multiOptOne:string|boolean = false;
var multiOptTwo:string|boolean = false;
var multiOptThree:string|boolean = false;

export default function Page(this: any) {

  return (

<div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>The challange is to use the checkboxes</p>
      </div>
      <div className="grid col-start-2">
        <h2>Single checkbox</h2>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='termsAndCondtions'
                onCheckedChange={value => document.getElementById('tAndCResult')!.innerText = "Terms and Conditions: " + value}
            ></Checkbox>
            <div>
                <label
                    htmlFor="termsAndCondtions"
                >Accept terms and conditions</label>
            </div>
        </div>
        <div id="tAndCResult">
            <p></p>
        </div>
        
      </div>
      <div className="grid col-start-2">
        <h2>Default checkbox</h2>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='optIn'
                defaultChecked={true}
                onCheckedChange={value => document.getElementById('optInResult')!.innerText = "Opt in: " + value}
            ></Checkbox>
            <div>
                <label
                    htmlFor="otpIn"
                >Send specials and newsletters</label>
            </div>
        </div>
        <div id="optInResult">
            <p></p>
        </div>
        
      </div>
      <div className="grid col-start-2">
        <h2>Multiple checkboxes</h2>
        <div>
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt-1'
                    name='multiCheckbox'
                    onCheckedChange={value => multiOptOne = value}
                ></Checkbox>
                <div>
                    <label
                        htmlFor="otp-1"
                    >Option 1</label>
                </div>
            </div>
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt-2'
                    name='multiCheckbox'
                    onCheckedChange={value => multiOptTwo = value}
                ></Checkbox>
                <div>
                    <label
                        htmlFor="otp-2"
                    >Option 2</label>
                </div>
            </div>
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt-3'
                    name='multiCheckbox'
                    onCheckedChange={value => multiOptThree = value}

                ></Checkbox>
                <div>
                    <label
                        htmlFor="otp-3"
                    >Option 3</label>
                </div>
            </div>
            <div>
                <Button onClick={multiplOptResult}>Submit</Button>
            </div>
        </div>
        
        
        <div>
            <p id="multiplOptResult"></p>
        </div>
        
      </div>
     
</div>
  
)};

function multiplOptResult(){
    console.log('multip opt triggered')
    var result = `Options selected:\n` +
                 `Option 1: ` + multiOptOne +  `\n` +
                 `Option 2: ` + multiOptTwo + `\n` +
                 `Option 3: ` + multiOptThree
    document.getElementById('multiplOptResult')!.innerText = result
}


