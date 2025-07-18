'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { JSX, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function Page(this: any) {

    const options: readonly string[] = ['Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isChecked, setIsChecked]:any[] = useState(Array(options.length).fill(false))
    const optionsAll: readonly string[] = ['Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isCheckedAll, setIsCheckedAll]:any[] = useState(Array(optionsAll.length).fill(false))
    const router = useRouter()

    function multipleOptResult(){
        //Get the elements for the multi checkbox
        var elements = document.getElementsByClassName('multiCheckbox')
        //Loop over elements
        var i = 0;
        var strResult = 'Options selected:\n'
        for(i; i < elements.length; i++){
            var isChecked = elements[i].ariaChecked
            if(isChecked === 'true'){

                var id = elements[i].id
                var option = document.querySelector(`label[for="${id}"]`)
                strResult = strResult + `${option?.textContent}\n`
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
      <div className="grid col-start-1 col-span-3">
        <p data-testid='challenge'>The challenge is to use the checkboxes</p>
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
        <div>
            <p id="tAndCResult"></p>
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
        <div>
            <p id="optInResult"></p>
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
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt1'
                    className='multiCheckbox'
                    
                ></Checkbox>
                <div>
                    <label
                        htmlFor="opt1"
                    >Option 1</label>
                </div>
            </div>
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt2'
                    className='multiCheckbox'
                    
                ></Checkbox>
                <div>
                    <label
                        htmlFor="opt2"
                    >Option 2</label>
                </div>
            </div>
            <div className="flex flex-row gap-3 m-3">
                <Checkbox 
                    id='opt3'
                    className='multiCheckbox'
                    
                >

                </Checkbox>
                <div>
                    <label
                        htmlFor="opt3"
                    >Option 3</label>
                </div>
                
            </div>
            <div className="m-3 gap-3">
                <Button onClick={multipleOptResult}>Submit</Button>
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




