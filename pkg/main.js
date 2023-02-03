
let Main = document.querySelector('.Main')
let Cureent = document.querySelector('.current')
let sub = document.querySelector('.sub')

let inputOne = document.getElementById('FileOne')
let inputTwo = document.getElementById('FileTwo')

let def = document.querySelector('.def')
let ArrOne = []
let ArrTwo = []
async function unlockData (FirstData, SecoData) { // This function for getting the data from promise and publish it
    let dataOne = await FirstData
    
    let dataTwo = await SecoData
    if(dataOne[0]){
        dataOne.forEach(element => {
            if(element !== null && element !== "Name"){
                ArrOne.push(element[0])
            }
        });
    
    dataTwo.forEach(element => {
        ArrTwo.push(element[0])
    });
    const seen = new Set();
    const duplicates = ArrTwo.filter(n => seen.size === seen.add(n).size);
    
    let difference = ArrOne.filter(x => ArrTwo.indexOf(x) === -1);
    
    ArrTwo = ArrTwo.filter((item, index) => ArrTwo.indexOf(item) === index );
    let discount = []
    let ArrayOfDifference = []
    for(let i = 0; i < difference.length; i++){
        for(let j = 0; j < dataOne.length; j++){
            if(difference[i] === dataOne[j][0]){
                ArrayOfDifference.push(dataOne[j])
                if(typeof dataOne[j][dataOne[0].indexOf('Status')] === typeof Number()){
                    discount.push(dataOne[j][dataOne[0].indexOf('Status')])
                }
            }
        }
    }
    let table = document.querySelector('.table')
    for(let i = 1; i < ArrayOfDifference.length ; i++){  
	if( ArrayOfDifference[i][1] === null){
	break;
}
        table.style.display = ""
        let tr = document.createElement('tr')
        let tdOne = document.createElement('td')
        let tdTwo = document.createElement('td')
        let tdThree = document.createElement('td')
        let tdFoured = document.createElement('td')

        if(ArrTwo.length !== 0){
            let anchor = document.createElement('a')
            tdFoured.appendChild(anchor)
            anchor.textContent = 'Click Here'
            anchor.target = "_blank"
            anchor.href = `https://wa.me/20${typeof ArrayOfDifference[i][2] !== typeof "string" ? `0${ArrayOfDifference[i][2]}` : ArrayOfDifference[i][2]}?text= ابن/بنت حضرتك ${ArrayOfDifference[i][1]} غياب مع حضرتك سكرتارية مستر احمد محب `
        }else if (ArrTwo.length === 0){
            if(ArrayOfDifference[i][ArrayOfDifference[i].length -1] !== null){
                let anchor = document.createElement('a')
                tdFoured.appendChild(anchor)
                anchor.textContent = 'Click Here'
                anchor.target = "_blank"
                anchor.href = `https://wa.me/20${typeof ArrayOfDifference[i][2] !== typeof "string" ? `0${ArrayOfDifference[i][2]}` : ArrayOfDifference[i][2]}?text= ابن/بنت حضرتك ${ArrayOfDifference[i][1]} جاب ${ArrayOfDifference[i][ArrayOfDifference[i].length - 1]} في امتحان النهرضة بتاع مستر احمد محب كمياء`
            }else{
                let anchor = document.createElement('a')
                anchor.textContent = ' '
                tdFoured.appendChild(anchor)
            }
        }
        tdOne.textContent = ArrayOfDifference[i][0]
        tdTwo.textContent = ArrayOfDifference[i][1]
        tdThree.textContent = typeof ArrayOfDifference[i][2] !== typeof "string" ? `0${ArrayOfDifference[i][2]}` : ArrayOfDifference[i][2]
        tr.appendChild(tdOne)
        tr.appendChild(tdTwo)
        tr.appendChild(tdThree)
        tr.appendChild(tdFoured)
        table.appendChild(tr)
    }
    let Percentage = document.querySelector('.Percentage')
    let Price = document.querySelector('.Price')
    
    let Total = document.querySelector('.Total')
    let Count = document.querySelector('.Count')
    
    let unique = [...new Set(ArrTwo)];
let discountCount
let discountMoney
if(discount.length !== 0 && Price.value){
     discountCount = discount.length * Price.value
     discountMoney = discount.reduce((prev, curr) => prev + curr )
}

    Count.textContent = `students: ${unique.length}`
    let Result;
    if(Percentage.value){
        let equation =  (ArrTwo.length * Price.value * Percentage.value)/100
	if(discount.length !== 0){

	  Result = ArrTwo.length * Price.value - equation
        Result -= discountCount
        Result += discountMoney
        Total.textContent = `Total Money: ${Result}`

}else{
	 Result = ArrTwo.length * Price.value - equation
	 Total.textContent = `Total Money: ${Result}`
}
        
    }else if(!Percentage.value){
	if(discount.length !== 0){
	  Result = ArrTwo.length * Price.value
	  Result -= discountCount
        Result += discountMoney
	  Total.textContent = `Total Money: ${Result}`
}else{

        Result = ArrTwo.length * Price.value
        Total.textContent = `Total Money: ${Result}`
}

    }else {
        Total.textContent = `Total Money: ${Result}`
    }
    
    Percentage.value = ""
    Price.value = ""
}else{
    let body = document.querySelector('body')
    body.style.display = 'flex'
    body.style.flexDirection = "column"
    body.style.alignItems = "center"
    body.style.gap = "60px"
    body.style.justifyContent = "center"
    body.innerHTML = `<div class="error" >Sorry The Program will not work</div><div class="error" >Contact us to Active the program\n: 01068687233</div>`
    
}
}



sub.addEventListener('click', () => { // Relasing the data from excel sheet
    document.querySelector('h1').textContent = 'Class Report'
    document.querySelector('h1').style.display = "block"
    let dataOne = readXlsxFile(inputOne.files[0]).then((data) => {
        return data
    })
    let dataTwo = readXlsxFile(inputTwo.files[0]).then((data) => {
        return data
    })
    unlockData(dataOne, dataTwo)
    inputOne.value = ''
    inputTwo.value = ''
})