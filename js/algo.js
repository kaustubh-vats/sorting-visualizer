var speed = 550;
var randomArray = [];
function setArray(){
    var mainDiv = document.querySelector('.main-div');
    randomArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 500));
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
    for (let i=0;i<arraySize;i++){
        let bar = document.createElement('div');
        bar.setAttribute('class','bar');
        bar.setAttribute('id','bar'+i);
        bar.style.height = randomArray[i]+"px";
        bar.style.width = "calc(90vw/"+ arraySize +" - 4px)";
        mainDiv.appendChild(bar);
    }
}
function changeSpeed(elem){
    speed = 1100 - Number(elem.value);
    document.querySelector('#speed').innerHTML=elem.value;
}
function beginSorting(elem){
    if(arraySize == 0){
        alert('Select the array length');
        return;
    }
    if(algo == '0'){
        alert('Please Select algorithm to visualize');
        return;
    }
    switch(algo){
        case 'Bubble Sort': bubbleSort(elem);
                            break;
        case 'Insertion Sort': insertionSort(elem);
                                break;
        case 'Selection Sort': selectionSort(elem);
                                break;
        default : alert('Under Development');
                 break;
    }
}
async function selectionSort(elem){
    elem.setAttribute('onclick','');
    let n = arraySize;
    for (let i = 0; i < n-1; i++)
    {
        let min_idx = i;
        for (let j = i + 1; j < n; j++)
        {
            if (randomArray[j] < randomArray[min_idx]){
                min_idx = j;
            }
            await selectmin(i,n,j,min_idx);
        }
        await myswap(min_idx, i);
        await setSorted(i,'#75D701');
        await clearcompare(n,'rgb(201, 201, 201)',i+1)
    }
    clearcompare(n,'#75D701');
    elem.setAttribute('onclick','beginSorting(this)');
}
async function selectmin(ind,n,curr,minIdx){
    for(let i=ind;i<n;i++){
        let a = document.querySelector("#bar"+i);
        if(i==minIdx){
            a.style.background = '#CC8899';
        }else if(i==curr){
            a.style.background = '#FCA311';
        } else {
            a.style.background = 'rgb(201, 201, 201)';
        }
    }
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function bubbleSort(elem){
    elem.setAttribute('onclick','');
    let n = arraySize;
    for(let i = 0 ; i < n - 1 ; ++i) {
        let swapped = true;
        for(let j = 0 ; j < n - i - 1 ; ++j) {
            await clearcompare(n-i,'rgb(201, 201, 201)');
            if(await mycompare(j, j+1)) {
                await myswap(j, j+1);
                swapped = false;
            }
        }
        if(swapped){
            break;
        }
        await setSorted(n-1-i,'#75D701');
    }
    clearcompare(n,'#75D701');
    elem.setAttribute('onclick','beginSorting(this)');
}
async function insertionSort(elem){
    elem.setAttribute('onclick','');
    let n = arraySize;
    for(let i = 1 ; i < n ; i++) {
        let key = randomArray[i];
        let j = i - 1;
        await setSorted(i,'#42BBFF')
        while(j >= 0 && randomArray[j] > key) {
            await setInsertion(j);
            j -= 1;
        }
        await setKey(j+1,key);
        clearcompare(n,'rgb(201, 201, 201)');
    }
    clearcompare(n,'#75D701');
    elem.setAttribute('onclick','beginSorting(this)');
}
async function setKey(i,data){
    randomArray[i]=data;
    let a = document.querySelector('#bar'+i);
    a.style.height = data+"px";
    a.style.background = '#75D701';
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function setInsertion(j){
    let a = document.querySelector("#bar"+j);
    let b = document.querySelector("#bar"+(j+1));
    randomArray[j+1] = randomArray[j];
    a.style.background = '#FCA311';
    b.style.height = randomArray[j]+"px";
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function setSorted(i,color){
    let a = document.querySelector("#bar"+i);
    a.style.background = color;
}
async function myswap(i,j){
    let a = document.querySelector("#bar"+i);
    let b = document.querySelector("#bar"+j);
    a.style.background = '#FCA311';
    b.style.background = '#FCA311';
    let temp = randomArray[i];
    randomArray[i] = randomArray[j];
    randomArray[j] = temp;
    await new Promise(resolve => setTimeout(resolve, speed));
    a.style.height = randomArray[i]+"px";
    b.style.height = randomArray[j]+"px";
    a.style.background = '#42BBFF';
    b.style.background = '#42BBFF';
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function mycompare(i,j){
    let a = document.querySelector("#bar"+i);
    let b = document.querySelector("#bar"+j);
    a.style.background = 'yellow';
    b.style.background = 'yellow';
    await new Promise(resolve => setTimeout(resolve, speed));
    if(randomArray[i] > randomArray[j]){
        return true;
    }
    return false;
}
async function clearcompare(n,color,init=0){
    for(let i=init;i<n;i++){
        let a = document.querySelector("#bar"+i);
        a.style.background = color;
    }
}