'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";




export default function Page(this: any) {

    const [tAndCChecked, setTAndCChecked] = useState(false);
    const [optInChecked, setOptInChecked] = useState(true);
    const multiOptions: readonly string[] = ['Option 1', 'Option 2', 'Option 3'];
    const [multiChecked, setMultiChecked]:any[] = useState(Array(multiOptions.length).fill(false));
    const options: readonly string[] = ['Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isChecked, setIsChecked]:any[] = useState(Array(options.length).fill(false))
    const optionsAll: readonly string[] = ['Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isCheckedAll, setIsCheckedAll]:any[] = useState(Array(optionsAll.length).fill(false))
    const router = useRouter()

   function handleMultiChange(index: number, checked: boolean) {
        setMultiChecked((prev: any) => {
            // Create a new array to avoid mutating th state directly
            const next = [...prev];
            // Set the value at the specified index
            next[index] = checked;
            return next;
        });
    }

    function getMultiResult() {
        var strResult = 'Selected options:\n'
        //Get the elements for the multi checkboxes
        //Get number of checkboxes checked
        var count = multiChecked.filter((check:boolean) => check === true).length
        //If count is greater then 1, loop through the checkboxes and add to result string
        if(count >= 1){
            for(var i = 0; i < multiChecked.length; i++){
                if(multiChecked[i] === true){
                    strResult += `${multiOptions[i]}\n`
                    
                }

            }
        }
        document.getElementById('multipleOptResult')!.innerText = strResult
    }

    function onAnyTwoChange(value:string|boolean, index:number){
                
        setIsChecked((prevState: any) => {
            // Create a new array to avoid mutating the state directly
            const newState = [...prevState];
            // Set the value at the specified index
            newState[index] = value;
            return newState;
        })

        
    }

    function onAllOptionChange(value:string|boolean, index:number){
                
            setIsCheckedAll((prevState: any) => {
                // Create a new array to avoid mutating the state directly
                const newState = [...prevState];
                // Set values
                newState[index] = value;    
                return newState;
            });
               
    }

    function selectAllOptionsChange(value:string|boolean){
        // If id is allOption0 then set all option true|false as required

        if(value === true){
            setIsCheckedAll(Array(optionsAll.length).fill(true))

        }
        else {
            setIsCheckedAll(Array(optionsAll.length).fill(false))
        }
        
    }

    function anyTwoResult(){

        var strResult = 'Selected options:\n'
        //Get the elements for the anyTwo checkboxes
        //Get number of checkboxes checked
        var count = isChecked.filter((check:boolean) => check === true).length
        //If count is greater then 1, loop through the checkboxes and add to result string
        if(count >= 1){
            for(var i = 0; i < isChecked.length; i++){
                if(isChecked[i] === true){
                    strResult += `${options[i]}\n`
                    
                }

            }
        }
        document.getElementById('anyTwoResult')!.innerText = strResult
       
    }

    function onCheckAllSubmit(){
        
        var strResult = 'Selected options: \n'
        // Check if all option are true

        var isAllTrueArray = Array(optionsAll.length).fill(true)
        isAllTrueArray.shift() // Remove the first element which is 'All'
        // Remove the first element from isCheckedAll
        var isCheckedAllTest = isCheckedAll;
        isCheckedAllTest.shift() // Remove the first element which is 'All'
        if(JSON.stringify(isCheckedAllTest) === JSON.stringify(isAllTrueArray)){
            console.log(`isAllTrueArray: ${isAllTrueArray}`)
            console.log(`isCheckedAll: ${isCheckedAllTest}`)
            strResult = strResult + 'All options selected'
            document.getElementById('onCheckAllMessage')!.innerText = strResult
            document.getElementById('onCheckAllMessage')?.parentElement?.setAttribute('class', '')
        }
        else {
            strResult = strResult + 'All options MUST be selected'
            console.log(`set errorr message, isAllTrueArray: ${isAllTrueArray}`)
            console.log(`set error message, isCheckedAll: ${isCheckedAllTest}`)
            document.getElementById('onCheckAllMessage')!.innerText = strResult
            document.getElementById('onCheckAllMessage')?.parentElement?.setAttribute('class', 'errorMessage')
        }
        
    }
    


    useEffect(() => {
        var count = isChecked.filter((check:boolean) => check === true).length
        // If count is greater than 2, show error message
        if(count > 2){
            document.getElementById('anyTwoErrorMessage')?.setAttribute('class', 'visible')
        }
        else {
            document.getElementById('anyTwoErrorMessage')?.setAttribute('class', 'invisible')
        }

    })
  
    return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3" data-testid="challenge" id="challenge">
        <Accordion type="single" collapsible>
        <AccordionItem value='item1'>
          <AccordionTrigger className="challenge-chevron">The challenge...</AccordionTrigger>
          <AccordionContent>
            <h4>Multiple Checkbox Groups:</h4>
            <p>There are several independent checkbox groups (single, default, multiple, any two, select all), each with different logic. Tests must isolate each group and ensure interactions in one do not affect others.</p>
            <h4>Dynamic Error and Result Messages:</h4>
            <p>Error and result messages are shown/hidden or updated based on checkbox state. Tests must assert both visibility and content, and handle timing issues if updates are asynchronous or delayed.</p>
            <h4>Edge Cases and Validation:</h4>
            <p>For "Any Two," selecting more than two checkboxes triggers an error. For "Select All," not all boxes checked triggers an error. Tests must cover boundary conditions and verify correct error handling.</p>
            <h4>Disabled State:</h4>
            <p>Disabled checkboxes must not be interactable. Tests need to ensure that clicks or keyboard events do not change their state.</p>
            <h4>Accessibility:</h4>
            <p>Custom checkbox components may lack native accessibility features. Tests should check for correct labeling, keyboard navigation, and ARIA attributes.</p>
            <h4>Visual Feedback:</h4>
            <p>Some feedback is shown via class changes (e.g., errorMessage, invisible/visible). Tests must assert both the presence of messages and the correct CSS classes.</p>
            <h4>Summary:</h4>
            <p>Testing this page requires careful handling of DOM updates, state isolation, error conditions, accessibility, and robust selectors. Direct DOM manipulation and mixed state logic are the biggest sources of test complexity and flakiness. Refactoring to use React state for all UI updates would make tests more reliable and maintainable.</p>     
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      <div className="grid col-start-2">
        <h2>Single checkbox</h2>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='termsAndCondtions'
                checked={tAndCChecked}
                onCheckedChange={checked => setTAndCChecked(checked === true)}
            ></Checkbox>
            <div>
                <label
                    htmlFor="termsAndCondtions"
                >Accept terms and conditions</label>
                <p id="tAndCResult">{`Terms and Conditions: ${tAndCChecked}`}</p>
            </div>
        </div>
        
      </div>
      <div className="grid col-start-2">
        <h2>Default checkbox</h2>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='optIn'
                checked={optInChecked}
                onCheckedChange={checked => {setOptInChecked(checked === true)}}
            ></Checkbox>
            <div>
                <label
                    htmlFor="otpIn"
                >Send specials and newsletters</label>
                <p id="optInResult">{`Opt in: ${optInChecked}`}</p>
            </div>
        </div>
        
      </div>
      <div className="grid col-start-2">
        <h2>Disabled checkbox</h2>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='enabled' 
            ></Checkbox>
            <div>
                <label
                    htmlFor="enabled"
                >Enabled</label>
            </div>
        </div>
        <div className="flex flex-row gap-3 m-3">
            <Checkbox 
                id='disabled' 
                disabled={true}
            ></Checkbox>
            <div>
                <label
                    htmlFor="disabled"
                >Disabled</label>
            </div>
        </div>
        
      </div>
      <div className="grid col-start-2">
        <h2>Multiple checkboxes</h2>
        <div data-testid="multiCheckboxes">
            {multiOptions.map((el, index) => (
            <div key={el} className="flex flex-row gap-3 m-3">
                
                    <Checkbox
                    id={`multi${index}`} 
                    name={el}
                    value={el}   
                    key={el}
                        checked={multiChecked[index]}
                        onCheckedChange={checked => {handleMultiChange(index, checked === true)}}
                    />
                        <div>
                            <label htmlFor={`multi${index}`} >{el}</label>
                        </div>
                    </div>       
                    ))}
            
            <div className="m-3 gap-3">
                <Button onClick={getMultiResult}>Submit</Button>
            </div>
            <div className="m-3 gap-3">
                <p id="multipleOptResult"></p>
            </div>
        </div>
     
      </div>
        <div className="grid col-start-2" data-testid="anyTwoCheckboxes">
            <h2>Select any two</h2>
            <div>
            {options.map((el, index) => (
                    <div key={el} className="flex flex-row gap-3 m-3">
                            <Checkbox
                                id={`anyTwo${index}`}
                                name={el}
                                value={el}
                                onCheckedChange={checked => {onAnyTwoChange(checked, index)}}
                                
                            />
                        <div>
                            <label htmlFor={`anyTwo${index}`} >{el}</label>
                        </div>
                        
                    </div>
                ))} 
            </div>
            
            <div className='errorMessage'>
                <p id='anyTwoErrorMessage' className='invisible'>Only two may be checked</p>
            </div>
            <div className="m-3 gap-3">
            <Button onClick={anyTwoResult}>Submit</Button>
            </div>   
            <div>
                <p id="anyTwoResult"></p>    
            </div> 
        </div>  
        <div className="grid col-start-2" data-testid="allCheckboxes">
            <h2>Select All</h2>
            <div className="flex flex-row gap-3 m-3">
                            <Checkbox
                                id={`allOptions`}
                                name={'allOptions'}
                                value={'allOptions'}
                                className='allOptions'
                                onCheckedChange={checked => {selectAllOptionsChange(checked)}}
                                
                            />
                        <div>
                            <label htmlFor='allOptions' >All</label>
                        </div>
                        
                    </div>
            {optionsAll.map((el, index) => (
                    <div key={el} className="flex flex-row gap-3 m-3">
                            <Checkbox
                                id={`allOptions${index}`}
                                name={el}
                                value={el}
                                className='allOptions'
                                onCheckedChange={checked => {onAllOptionChange(checked, index)}}
                                checked={isCheckedAll[index]}
                            />
                        <div>
                            <label htmlFor={`allOptions${index}`} >{el}</label>
                        </div>
                        
                    </div>
                ))}
            
            <div className="m-3 gap-3">
                <Button onClick={onCheckAllSubmit}>Submit</Button>
            </div>
            <div>
                <p id="onCheckAllMessage"></p>
            </div>
        </div>
        
</div>


)};




