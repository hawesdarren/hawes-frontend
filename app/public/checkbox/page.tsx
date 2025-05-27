'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { JSX, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";



export default function Page(this: any) {

    const options: readonly string[] = ['Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isChecked, setIsChecked]:any[] = useState(Array(options.length).fill(false))
    const optionsAll: readonly string[] = ['All', 'Option 1','Option 2','Option 3','Option 4','Option 5', ]
    const [isCheckedAll, setIsCheckedAll]:any[] = useState(Array(optionsAll.length).fill(false))
    const router = useRouter()

    function multiplOptResult(){
        //Get the elements for the multi checkbox
        var elements = document.getElementsByClassName('multiCheckbox')
        //Loop over elements
        var i = 0;
        var strResult = 'Options selected:\n'
        for(i; i < elements.length; i++){
            var isChecked = elements[i].ariaChecked
            if(isChecked === 'true'){
                //If checked, get the label text
                //Get the id of the element
                var id = elements[i].id
                var option = document.querySelector(`label[for="${id}"]`)
                strResult = strResult + `${option?.textContent}\n`
            }
        }
        document.getElementById('multiplOptResult')!.innerText = strResult
    }

    function onAnyTwoChange(value:string|boolean, id:number){
                
        setIsChecked((isChecked: (string | boolean)[])=>{
            isChecked[id] = value
            return isChecked
        })
        //Count checkboxes with true
        var count = isChecked.filter((check:boolean) => check === true).length
        //Set error message when > 2
        if(count > 2){
            document.getElementById('anyTwoErrorMessage')?.setAttribute('class', 'visible')
            //Unset 
            setIsChecked((isChecked: (string | boolean)[])=>{
                isChecked[id] = false
                return isChecked
                
            })
            
        }
        else {
            document.getElementById('anyTwoErrorMessage')?.setAttribute('class', 'invisible')
        }
        router.refresh()
        
    }

    function onAllOptionChange(value:string|boolean, id:number){
        // If id is allOption0 then set all option true|false as required
        if(id === 0){
            // Create new array and set value to true|false
            var newArray = Array(optionsAll.length).fill(value)
            setIsCheckedAll((isCheckedAll: (string|boolean)[]) =>{
                isCheckedAll = newArray
                return isCheckedAll
            })
        }
        else {
            // Set the individual value
            setIsCheckedAll((isCheckedAll: (string|boolean)[]) =>{
                isCheckedAll[id] = value
                return isCheckedAll
            })
        }        
              
        console.log('refreshing router')
        router.refresh()
        
    }

    function CheckBoxArray(){
        //Function to make checkbox array
        const checkboxArray: JSX.Element[] = []
        options.forEach(function (optionLabel) {
            const id:number = options.indexOf(optionLabel)
            const newCheckBox = CheckBoxAndLabel(id, optionLabel)
            checkboxArray.push(newCheckBox)
        })
        
       return checkboxArray
    }

    function CheckBoxAllArray(){
        //Function to make checkbox array
        const checkboxArray: JSX.Element[] = []
        optionsAll.forEach(function (optionLabel) {
            const id:number = optionsAll.indexOf(optionLabel)
            const newCheckBox = CheckBoxAndLabelAll(id, optionLabel)
            checkboxArray.push(newCheckBox)
        })
        
       return checkboxArray
    }
    
    function anyTwoResult(){
        //var elements = document.getElementsByClassName('anyTwo');
        var elements = document.getElementsByName('anyTwo');
        var strResult = 'Selected options: \n'
        //Loop through the elements, add options to result string if set to true
        var i:number = 0;
        for(i; i < elements.length; i++){
            if(elements[i].ariaChecked === 'true'){
                let id = elements[i].id
                let option = document.querySelector(`label[for="${id}"]`)
                strResult = strResult + `${option?.textContent}\n`
            }
        }
        document.getElementById('anyTwoResult')!.innerText = strResult
    }

    function onCheckAllSubmit(){
        var elements = document.getElementsByClassName('allOptions');
        var strResult = 'Selected options: \n'
        // Check if all option are true
        var newArray = Array(optionsAll.length).fill(true)
        if(JSON.stringify(isCheckedAll) === JSON.stringify(newArray)){
            strResult = strResult + 'All options selected'
            document.getElementById('onCheckAllMessage')!.innerText = strResult
            document.getElementById('onCheckAllMessage')?.parentElement?.setAttribute('class', '')
        }
        else {
            strResult = strResult + 'All options MUST be selected'
            document.getElementById('onCheckAllMessage')!.innerText = strResult
            document.getElementById('onCheckAllMessage')?.parentElement?.setAttribute('class', 'errorMessage')
        }
        
    }
    
    function CheckBoxAndLabel(id:number, label:string){
        //Function to make each checkbox and label 
        const strId:string = `anyTwo${id.toString()}`
        //const strName:string = ``
        return (<div className="flex flex-row gap-3 m-3" key={id}>
            <Checkbox 
                id={strId}
                name='anyTwo'
                checked={isChecked[id]}
                value={isChecked[id]}
                onCheckedChange={checked => onAnyTwoChange(checked, id)}
                data-state={isChecked[id] ? true : false}
                
            >
            </Checkbox>
            <div>
                <label
                    htmlFor={strId}
                >
                    {label}
                </label>
            </div>
            
        </div>)
    }

    function CheckBoxAndLabelAll(id:number, label:string){
        //Function to make each checkbox and label 
        const strId:string = `allOptions${id.toString()}`
        //const strName:string = ``
        return (<div className="flex flex-row gap-3 m-3" key={id}>
            <Checkbox 
                id={strId}
                className='allOptions'
                checked={isCheckedAll[id]}
                value={isCheckedAll[id]}
                onCheckedChange={checked => onAllOptionChange(checked, id)}
                data-state={isCheckedAll[id] ? true : false}
                
            >
            </Checkbox>
            <div>
                <label
                    htmlFor={strId}
                >
                    {label}
                </label>
            </div>
            
        </div>)
    }

    
  
    return (
    <div className="grid grid-cols-[1fr_8fr_1fr] sm:grid-cols-[1fr_2fr_1fr] p-6 gap-3 ">
      <div className="grid col-start-1 col-span-3">
        <p>The challenge is to use the checkboxes</p>
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
        <h2>Multiple checkboxes</h2>
        <div>
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
                <Button onClick={multiplOptResult}>Submit</Button>
            </div>
            <div className="m-3 gap-3">
                <p id="multiplOptResult"></p>
            </div>
        </div>
     
      </div>
        <div className="grid col-start-2">
            <h2>Select any two</h2>
            <CheckBoxArray></CheckBoxArray>
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
        <div className="grid col-start-2">
            <h2>Select All</h2>
            <CheckBoxAllArray></CheckBoxAllArray>
            <div className="m-3 gap-3">
                <Button onClick={onCheckAllSubmit}>Submit</Button>
            </div>
            <div>
                <p id="onCheckAllMessage"></p>
            </div>
        </div>
        
</div>


)};




