/* clean the inputs when a click event happend */
const cleandInputs = () =>{
    inputs = document.getElementsByName('input')
    inputs.forEach((element) => {
       element.addEventListener("click", function (){
              if( parseInt(element.value) === 0 || element.value === 'Custom'){
               document.getElementById(element.id).value = ""
              }              
       })
    }) 
}

function clean(){
    document.getElementById('tip-total-input').value =  "$0.00"
    document.getElementById('bill-input').value = 0
    document.getElementById('custom-input').value = "Custom"
    document.getElementById('bill-number-people').value = 0
    document.getElementById('tip-amount-input').value = "$0.00"
} 


/* load the default values for the inputs*/
const onLoad = () =>{      
    clean()
    cleandInputs()
    const resetBtn = document.getElementById('btn-reset')
    resetBtn.onclick = clean

    let tipSelect = document.querySelectorAll('.btn-offer')    
    tipSelect = Array.from(tipSelect)
    calculateForTip(tipSelect)
}





/* Calculate te tip amount and the total amount  */
var value = 100
const calculateForTip = (tipSelect) =>{      
    tipSelect.forEach((element,index) => {
        element.addEventListener("click", function (){
           value = parseInt(valueTip(index))           
           calculator()           
        })        
     })            
}


const calculator = () =>{
   
    let data = []      
    data = validateData()
    
    if(!data[2]){
        return} else{

        data.push(value)      

        let bill = parseInt(data[0])
        let people = parseInt(data[1])
        let tip = data[3]

        bill = bill.toFixed(3)
        tip = tip.toFixed(3)
        let billDiscount =  (bill  * tip ) / 100
        billDiscount = billDiscount.toFixed(3)

        let tipAmount = billDiscount/ people
        let totalPerson = (bill/people) + tipAmount

        tipAmount = tipAmount.toFixed(2)
        totalPerson = totalPerson.toFixed(2)

        if(!isNaN(tipAmount) || !isNaN(totalPerson)){
            document.getElementById('tip-amount-input').value =  `$${tipAmount}`
            document.getElementById('tip-total-input').value =  `$${totalPerson}`
        }    
  }
}

function valueTip(elementId){
    
     switch(elementId){
        case 0 : return value = 5        
        case 1 : return value = 10        
        case 2 :  return value = 15           
        case 3 : return value = 25        
        case 4 : return value = 50
        case 5 : let customTip = document.getElementById('custom-input').value 
                 return customTip     
              
    } 
}

const validateData = () =>{
    const bill = document.getElementById('bill-input')
    const people = document.getElementById('bill-number-people')
    let billError = document.getElementById('error-bill')
    let peopleError = document.getElementById('error-people')   

    var validation = true
    const arrayData = [bill.value, people.value]
    if(parseInt(bill.value) === 0 || bill.value === ""){
        billError.removeAttribute('hidden')
        bill.setAttribute("style", "border-width: 2px; border-style: solid; border-color:hsla(15, 72%, 76%, 1);")
        validation = false 
    }else{
        billError.setAttribute('hidden', 'true')
         bill.removeAttribute("style") 
    }

    if(parseInt(people.value) === 0 || people.value === ""){
        peopleError.removeAttribute('hidden')
        people.setAttribute("style", "border-width: 2px; border-style: solid; border-color:hsla(15, 72%, 76%, 1);")
        validation = false
        
    }else{
        peopleError.setAttribute('hidden', 'true')
        people.removeAttribute("style")
    }
    arrayData.push(validation)   
    return arrayData
}



