var speed = 550;
var randomArray = [];
var isSorting = false;
function setArray() {
    if (isSorting) return;
    var mainDiv = document.querySelector('.main-div');
    randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
    for (let i = 0; i < arraySize; i++) {
        let bar = document.createElement('div');
        bar.setAttribute('class', 'bar');
        bar.setAttribute('id', 'bar' + i);
        bar.style.height = randomArray[i] + "px";
        bar.style.width = "calc(90vw/" + arraySize + " - 4px)";
        mainDiv.appendChild(bar);
    }
    let p = document.createElement('p');
    p.setAttribute('id', 'instruction');
    mainDiv.appendChild(p);
}
function changeSpeed(elem) {
    speed = 1100 - Number(elem.value);
    document.querySelector('#speedp').innerHTML = elem.value;
}
function beginSorting(elem) {
    if (isSorting) return;
    if (arraySize == 0) {
        alert('Select the array length');
        return;
    }
    if (algo == '0') {
        alert('Please Select algorithm to visualize');
        return;
    }
    switch (algo) {
        case 'Bubble Sort': bubbleSort(elem);
            break;
        case 'Insertion Sort': insertionSort(elem);
            break;
        case 'Selection Sort': selectionSort(elem);
            break;
        case 'Quick Sort': quickSort(elem);
            break;
        case 'Merge Sort': mergeSort(elem);
            break;
        case 'Shell Sort': shellSort(elem);
            break;
        case 'Heap Sort': heapSort(elem);
            break;
        case 'Counting Sort': countingSort(elem);
            break;
        case 'Cycle Sort': cycleSort(elem);
            break;
        case 'Cocktail Sort': cocktailSort(elem);
            break;
        case 'Radix Sort': radixSort(elem);
            break;
    }
}
async function getMax(n) {
    let mx = randomArray[0];
    for (let i = 1; i < n; i++)
        if (randomArray[i] > mx)
            mx = randomArray[i];
    return mx;
}
async function countSort(n, exp, p) {
    let output = new Array(n); 
    let i;
    let count = new Array(10);
    for(let i=0;i<10;i++)
        count[i]=0;
    for (i = 0; i < n; i++)
        count[Math.floor(randomArray[i] / exp) % 10]++;
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (i = n - 1; i >= 0; i--) {
        output[count[Math.floor(randomArray[i] / exp) % 10] - 1] = randomArray[i];
        count[Math.floor(randomArray[i] / exp) % 10]--;
    }
    let flg = 0;
    for (let i = 0; i < n; ++i) {
        while (flg <= (output[i]/exp)%10) {
            p.innerHTML = "For Place " + exp + "s Counting: " + flg;
            await new Promise(resolve => setTimeout(resolve, speed));
            flg++;
        }
        await setKey(i, output[i], '#42BBFF');
    }
}
async function radixSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    p.style.display = 'block';
    let n = arraySize;
    let m = await getMax(n);
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
        await countSort(n, exp, p);

    p.innerHTML = "";
    p.style.display = "none";
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function cocktailSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let n = arraySize;

    let swapped = true;
    let start = 0;
    let end = n;
    while (swapped == true) {
        swapped = false;
        for (let i = start; i < end - 1; ++i) {
            await clearcompare(end, 'rgb(201, 201, 201)', start);
            if (randomArray[i] > randomArray[i + 1]) {
                await myswap(i, i+1);
                swapped = true;
            }
        }
        await setSorted(end-1, '#75D701');
        if (swapped == false)
            break;
        swapped = false;
        end = end - 1;
        for (let i = end - 1; i >= start; i--) {
            await clearcompare(end, 'rgb(201, 201, 201)', start);
            if (randomArray[i] > randomArray[i + 1]) {
                await myswap(i, i+1);
                swapped = true;
            }
        }
        await setSorted(start, '#75D701');
        start++;
    }

    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function cycleSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    p.style.display = 'block';
    let n = arraySize;

    let writes = 0;
    for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++)
    {
        let pos = cycle_start;
        let item = randomArray[cycle_start];
        for (let i = cycle_start + 1; i < n; i++)
            if (randomArray[i] < item)
                pos++;

        if (pos == cycle_start)
            continue;

        while (item == randomArray[pos])
            pos += 1;

        if (pos != cycle_start)
        {
            await cycleSwap(item, pos);
                
            let temp =  randomArray[pos];
            randomArray[pos] = item;
            item = temp;

            writes++;
            p.innerHTML = "Writes: "+writes;
        }
        while (pos != cycle_start)
        {
            pos = cycle_start;
            for (let i = cycle_start + 1; i < n; i++)
                if (randomArray[i] < item)
                    pos += 1;
            while (item == randomArray[pos])
                pos += 1;
            if (item != randomArray[pos]) {
                await cycleSwap(item, pos);
                
                let temp =  randomArray[pos];
                randomArray[pos] = item;
                item = temp;

                writes++;
                p.innerHTML = "Writes: "+writes;
            }
        }
    }

    p.innerHTML = "";
    p.style.display = "none";
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function cycleSwap(item, pos){
    let a = document.querySelector("#bar" + pos);
    a.style.background = '#FCA311';
    await new Promise(resolve => setTimeout(resolve, speed));
    a.style.height = item + "px";
    a.style.background = '#42BBFF';
    await new Promise(resolve => setTimeout(resolve, speed));
    a.style.background = '#75D701';
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function countingSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    p.style.display = 'block';
    let n = arraySize;
    let output = Array.from({ length: n }, (_, i) => 0);
    let count = Array.from({ length: 501 }, (_, i) => 0);
    for (let i = 0; i < n; ++i)
        ++count[randomArray[i]];
    for (let i = 1; i <= 500; ++i) {
        count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
        output[count[randomArray[i]] - 1] = randomArray[i];
        --count[randomArray[i]];
    }
    let flg = 0;
    for (let i = 0; i < n; ++i) {
        while (flg <= output[i]) {
            p.innerHTML = "Counting: " + flg;
            await new Promise(resolve => setTimeout(resolve, speed));
            flg++;
        }
        await setKey(i, output[i]);
    }
    p.innerHTML = "";
    p.style.display = "none";
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function heapify(n, i, p) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && randomArray[l] > randomArray[largest])
        largest = l;
    if (r < n && randomArray[r] > randomArray[largest])
        largest = r;
    if (largest != i) {
        p.innerHTML = "Swapping";
        await myswap(i, largest);
        p.innerHTML = "Heapify";
        await new Promise(resolve => setTimeout(resolve, speed));
        await clearcompare(n, 'rgb(201, 201, 201)');
        await heapify(n, largest, p);
    }
}
async function heapSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    let n = arraySize;
    p.style.display = "block";
    p.innerHTML = "Heapify";
    await new Promise(resolve => setTimeout(resolve, speed));
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(n, i, p);

    for (let i = n - 1; i > 0; i--) {
        p.innerHTML = "Swapping";
        await myswap(0, i);
        p.innerHTML = "Heapify";
        await new Promise(resolve => setTimeout(resolve, speed));
        await clearcompare(i + 1, 'rgb(201, 201, 201)');
        await heapify(i, 0, p);
        setSorted(i, '#75D701')
    }
    await clearcompare(n, '#75D701');
    p.innerHTML = "";
    p.style.display = "none";
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function shellSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    let n = arraySize;
    p.style.display = "block";
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        p.innerHTML = "Gap: " + gap;
        for (let i = gap; i < n; i += 1) {
            let temp = randomArray[i];
            let j;
            await setSorted(i, '#42BBFF');
            for (j = i; j >= gap && randomArray[j - gap] > temp; j -= gap) {
                randomArray[j] = randomArray[j - gap];
                await setInsertion(j - gap, j);
            }
            randomArray[j] = temp;
            await setKey(j, temp);
            await clearcompare(n, 'rgb(201, 201, 201)');
        }
    }
    await clearcompare(n, '#75D701');
    p.innerHTML = "";
    p.style.display = "none";
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function merge(l, m, r) {
    await clearcompare(r + 1, '#FCA311', l);
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++)
        L[i] = randomArray[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = randomArray[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        let a = document.querySelector('#bar' + k);
        if (L[i] <= R[j]) {
            a.style.background = '#42BBFF';
            a.style.height = L[i] + 'px';
            randomArray[k] = L[i];
            i++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        else {
            a.style.background = '#42BBFF';
            a.style.height = R[j] + 'px';
            randomArray[k] = R[j];
            j++;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        k++;
    }
    while (i < n1) {
        let a = document.querySelector('#bar' + k);
        a.style.background = '#42BBFF';
        a.style.height = L[i] + 'px';
        randomArray[k] = L[i];
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    while (j < n2) {
        let a = document.querySelector('#bar' + k);
        a.style.background = '#42BBFF';
        a.style.height = R[j] + 'px';
        randomArray[k] = R[j];
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    await clearcompare(r + 1, '#75D701', l);
}
async function mergeSortUtil(l, r, n) {
    if (l >= r) {
        return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSortUtil(l, m, n);
    await mergeSortUtil(m + 1, r, n);
    await merge(l, m, r);
}
async function mergeSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let n = arraySize;
    await mergeSortUtil(0, n - 1, n);
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function selectionSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    let n = arraySize;
    p.style.display = "block";
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (randomArray[j] < randomArray[min_idx]) {
                min_idx = j;
            }
            await selectmin(i, n, j, min_idx, p);
        }
        p.innerHTML = "Minimum Selected Index: " + min_idx;
        await myswap(min_idx, i);
        await setSorted(i, '#75D701');
        await clearcompare(n, 'rgb(201, 201, 201)', i + 1)
    }
    await clearcompare(n, '#75D701');
    p.innerHTML = "";
    p.style.display = "none";
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function partition(low, high) {
    let pivot = randomArray[high];
    let i = (low - 1);
    await setSorted(high, '#CC8899');
    await new Promise(resolve => setTimeout(resolve, speed));
    for (let j = low; j <= high - 1; j++) {
        if (randomArray[j] < pivot) {
            i++;
            await myswap(i, j);
        }
    }
    await myswap(i + 1, high);
    return (i + 1);
}
async function quickSortUtil(low, high, n, p) {

    while (low < high) {
        let pi = await partition(low, high);
        p.innerHTML = "Pivot Position: " + pi;
        await clearcompare(n, 'rgb(201, 201, 201)');
        if (pi - low < high - pi) {
            await quickSortUtil(low, pi - 1, n, p);
            low = pi + 1;
        }
        else {
            await quickSortUtil(pi + 1, high, n, p);
            high = pi - 1;
        }
    }
}
async function quickSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let p = document.querySelector('#instruction');
    let n = arraySize;
    p.style.display = "block";
    await quickSortUtil(0, n - 1, n, p);
    await clearcompare(n, '#75D701');
    p.innerHTML = "";
    p.style.display = "none";
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function bubbleSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let n = arraySize;
    for (let i = 0; i < n - 1; ++i) {
        let swapped = true;
        for (let j = 0; j < n - i - 1; ++j) {
            await clearcompare(n - i, 'rgb(201, 201, 201)');
            if (await mycompare(j, j + 1)) {
                await myswap(j, j + 1);
                swapped = false;
            }
        }
        if (swapped) {
            break;
        }
        await setSorted(n - 1 - i, '#75D701');
    }
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function insertionSort(elem) {
    isSorting = true;
    elem.setAttribute('onclick', '');
    let n = arraySize;
    for (let i = 1; i < n; i++) {
        let key = randomArray[i];
        let j = i - 1;
        await setSorted(i, '#42BBFF');
        while (j >= 0 && randomArray[j] > key) {
            await setInsertion(j, j + 1);
            j -= 1;
        }
        await setKey(j + 1, key);
        await clearcompare(n, 'rgb(201, 201, 201)');
    }
    await clearcompare(n, '#75D701');
    elem.setAttribute('onclick', 'beginSorting(this)');
    isSorting = false;
}
async function setKey(i, data, color = '#75D701') {
    randomArray[i] = data;
    let a = document.querySelector('#bar' + i);
    a.style.height = data + "px";
    a.style.background = color;
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function setInsertion(j, k) {
    let a = document.querySelector("#bar" + j);
    let b = document.querySelector("#bar" + k);
    randomArray[k] = randomArray[j];
    a.style.background = '#FCA311';
    b.style.height = randomArray[j] + "px";
    await new Promise(resolve => setTimeout(resolve, speed));
}

async function selectmin(ind, n, curr, minIdx, p) {
    for (let i = ind; i < n; i++) {
        let a = document.querySelector("#bar" + i);
        if (i == minIdx) {
            a.style.background = '#CC8899';
            p.innerHTML = "Min Index: " + minIdx;
        } else if (i == curr) {
            a.style.background = '#FCA311';
        } else {
            a.style.background = 'rgb(201, 201, 201)';
        }
    }
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function setSorted(i, color) {
    let a = document.querySelector("#bar" + i);
    a.style.background = color;
}
async function myswap(i, j) {
    let a = document.querySelector("#bar" + i);
    let b = document.querySelector("#bar" + j);
    a.style.background = '#FCA311';
    b.style.background = '#FCA311';
    let temp = randomArray[i];
    randomArray[i] = randomArray[j];
    randomArray[j] = temp;
    await new Promise(resolve => setTimeout(resolve, speed));
    a.style.height = randomArray[i] + "px";
    b.style.height = randomArray[j] + "px";
    a.style.background = '#42BBFF';
    b.style.background = '#42BBFF';
    await new Promise(resolve => setTimeout(resolve, speed));
}
async function mycompare(i, j) {
    let a = document.querySelector("#bar" + i);
    let b = document.querySelector("#bar" + j);
    a.style.background = 'yellow';
    b.style.background = 'yellow';
    await new Promise(resolve => setTimeout(resolve, speed));
    if (randomArray[i] > randomArray[j]) {
        return true;
    }
    return false;
}
async function clearcompare(n, color, init = 0) {
    for (let i = init; i < n; i++) {
        let a = document.querySelector("#bar" + i);
        a.style.background = color;
    }
}