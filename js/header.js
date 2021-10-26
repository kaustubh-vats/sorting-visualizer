var algo = '0';
var arraySize = 0;
const navSlide = () =>{
    const burger = document.querySelector('.burger');  
    const nav = document.querySelectorAll('.lis');
    const bar = document.querySelector('.nav-links');
    burger.addEventListener('click',()=>{
        bar.classList.toggle('nav-active');
        nav.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
function selectthis(e, params){
    if(params == 'algorithms') {
        algo = e.innerHTML;
        document.querySelector('#algoName').innerHTML = e.innerHTML;
        setDetails(e.innerHTML);
    }
    else {
        arraySize = Number(e.innerHTML);
        setArray();
    }
    document.querySelector('.'+params+' button').innerHTML = e.innerHTML+' <i class="fas fa-angle-down"></i>';
    document.querySelector("."+params+" ul").classList.toggle('visible-links');
    document.querySelector("."+params+" ul").classList.toggle('invisible-links');
}
function showDropDown(params){
    document.querySelector("."+params+" ul").classList.toggle('visible-links');
    document.querySelector("."+params+" ul").classList.toggle('invisible-links');
}
function setDetails(algo){
    let bubble = "Average Case Time Complexity: O(n <sup>2</sup>) <br /> Best Case Time Complexity: O(n) <br />Worst Case Time Complexity:  O(n <sup>2</sup>)  <br />Space Complexity: O(1) <br />";
    let insertion = "Average Case Time Complexity:  O(n <sup>2</sup>) <br /> Best Case Time Complexity: O(n) <br />Worst Case Time Complexity:  O(n <sup>2</sup>)  <br />Space Complexity: O(1) <br />";
    let selection = "Average Case Time Complexity:  O(n <sup>2</sup>) <br /> Best Case Time Complexity:  O(n <sup>2</sup>)  <br />Worst Case Time Complexity:  O(n <sup>2</sup>)  <br />Space Complexity: O(1) <br />";
    let quick = "Average Case Time Complexity: O(n logn) <br /> Best Case Time Complexity: O(n logn) <br />Worst Case Time Complexity:  O(n <sup>2</sup>)  <br />Space Complexity: O(log n) <br />";
    let merge = "Average Case Time Complexity: O(n logn) <br /> Best Case Time Complexity: O(n logn) <br />Worst Case time Complexity: O(n log n) <br />Space Complexity: O(n) <br />";
    let shell = "Average Case Time Complexity: O(n <sup>3/2</sup>) <br /> Best Case Time Complexity: O(n logn) <br />Worst Case time Complexity: O(n <sup>2</sup>) <br />Space Complexity: O(1) <br />";
    let heap = "Average Case Time Complexity: O(n logn) <br /> Best Case Time Complexity: O(n logn) <br />Worst Case time Complexity: O(n logn) <br />Space Complexity: O(1) <br />";
    let counting = "Average Case Time Complexity: O(max_element) <br /> Best Case Time Complexity: O(max_element) <br />Worst Case time Complexity: O(max_element) <br />Space Complexity: O(max_element) <br />";
    let bubbleCode = "\nvoid bubbleSort(int arr[], int n){\n    int i, j;\n    for (i = 0; i < n-1; i++)\n    for (j = 0; j < n-i-1; j++)\n        if (arr[j] > arr[j+1])\n            swap(&arr[j], &arr[j+1]);\n}"
    let insertionCode = "\n    void insertionSort(int arr[], int n)\n    {\n        int i, key, j;\n        for (i = 1; i < n; i++)\n        {\n            key = arr[i];\n            j = i - 1;\n     \n            /* Move elements of arr[0..i-1], that are\n            greater than key, to one position ahead\n            of their current position */\n            while (j >= 0 && arr[j] > key)\n            {\n                arr[j + 1] = arr[j];\n                j = j - 1;\n            }\n            arr[j + 1] = key;\n        }\n    }"
    let selectionCode ="\n    void selectionSort(int arr[], int n)\n    {\n        int i, j, min_idx;\n     \n        // One by one move boundary of unsorted subarray\n        for (i = 0; i < n-1; i++)\n        {\n            // Find the minimum element in unsorted array\n            min_idx = i;\n            for (j = i+1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n     \n            // Swap the found minimum element with the first element\n            swap(&arr[min_idx], &arr[i]);\n        }\n    }"
    let quickCode = "\nint partition (int arr[], int low, int high) \n{ \n    int pivot = arr[high]; // pivot \n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) \n    { \n        // If current element is smaller than the pivot \n        if (arr[j] < pivot) \n        { \n            i++; // increment index of smaller element \n            swap(&arr[i], &arr[j]); \n        } \n    } \n    swap(&arr[i + 1], &arr[high]); \n    return (i + 1); \n}\nvoid quickSort(int arr[], int low, int high) \n{ \n    if (low < high) \n    { \n        /* pi is partitioning index, arr[p] is now \n        at right place */\n        int pi = partition(arr, low, high); \n        // Separately sort elements before \n        // partition and after partition \n        quickSort(arr, low, pi - 1); \n        quickSort(arr, pi + 1, high); \n    } \n}";
    let mergeCode = "\nvoid merge(int array[], int const left, int const mid, int const right)\n{\n    auto const subArrayOne = mid - left + 1;\n    auto const subArrayTwo = right - mid;\n  \n    // Create temp arrays\n    auto *leftArray = new int[subArrayOne],\n         *rightArray = new int[subArrayTwo];\n  \n    // Copy data to temp arrays leftArray[] and rightArray[]\n    for (auto i = 0; i < subArrayOne; i++)\n        leftArray[i] = array[left + i];\n    for (auto j = 0; j < subArrayTwo; j++)\n        rightArray[j] = array[mid + 1 + j];\n  \n    auto indexOfSubArrayOne = 0,\n        indexOfSubArrayTwo = 0;  \n    int indexOfMergedArray = left;\n    while (indexOfSubArrayOne < subArrayOne && indexOfSubArrayTwo < subArrayTwo) {\n        if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {\n            array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];\n            indexOfSubArrayOne++;\n        }\n        else {\n            array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];\n            indexOfSubArrayTwo++;\n        }\n        indexOfMergedArray++;\n    }\n    while (indexOfSubArrayOne < subArrayOne) {\n        array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];\n        indexOfSubArrayOne++;\n        indexOfMergedArray++;\n    }\n    while (indexOfSubArrayTwo < subArrayTwo) {\n        array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];\n        indexOfSubArrayTwo++;\n        indexOfMergedArray++;\n    }\n}\nvoid mergeSort(int array[], int const begin, int const end)\n{\n    if (begin >= end)\n        return; \n  \n    auto mid = begin + (end - begin) / 2;\n    mergeSort(array, begin, mid);\n    mergeSort(array, mid + 1, end);\n    merge(array, begin, mid, end);\n}"
    let shellCode = "\nvoid shellSort(int arr[], int n)\n{\n    for (int gap = n/2; gap > 0; gap /= 2)\n    {\n        for (int i = gap; i < n; i += 1)\n        {\n            int temp = arr[i];\n            int j;           \n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n             \n            arr[j] = temp;\n        }\n    }\n}"
    let heapCode = "\nvoid heapify(int arr[], int n, int i)\n{\n    int largest = i; // Initialize largest as root\n    int l = 2 * i + 1; // left = 2*i + 1\n    int r = 2 * i + 2; // right = 2*i + 2\n \n    // If left child is larger than root\n    if (l < n && arr[l] > arr[largest])\n        largest = l;\n \n    // If right child is larger than largest so far\n    if (r < n && arr[r] > arr[largest])\n        largest = r;\n \n    // If largest is not root\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n \n        // Recursively heapify the affected sub-tree\n        heapify(arr, n, largest);\n    }\n}\n \n// main function to do heap sort\nvoid heapSort(int arr[], int n)\n{\n    // Build heap (rearrange array)\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n \n    // One by one extract an element from heap\n    for (int i = n - 1; i > 0; i--) {\n        // Move current root to end\n        swap(arr[0], arr[i]);\n \n        // call max heapify on the reduced heap\n        heapify(arr, i, 0);\n    }\n}"
    let countingCode ="\nvoid countSort(char arr[])\n{\n    // The output character array\n    // that will have sorted arr\n    char output[strlen(arr)];\n \n    // Create a count array to store count of individual\n    // characters and initialize count array as 0\n    int count[RANGE + 1], i;\n    memset(count, 0, sizeof(count));\n \n    // Store count of each character\n    for (i = 0; arr[i]; ++i)\n        ++count[arr[i]];\n \n    // Change count[i] so that count[i] now contains actual\n    // position of this character in output array\n    for (i = 1; i <= RANGE; ++i)\n        count[i] += count[i - 1];\n \n    // Build the output character array\n    for (i = 0; arr[i]; ++i) {\n        output[count[arr[i]] - 1] = arr[i];\n        --count[arr[i]];\n    }\n \n    // Copy the output array to arr, so that arr now\n    // contains sorted characters\n    for (i = 0; arr[i]; ++i)\n        arr[i] = output[i];\n}"
    let complexityDiv = document.querySelector('#complexity');
    let codeDiv = document.querySelector('#code');
    switch(algo){
        case "Bubble Sort": complexityDiv.innerHTML = bubble;
                            codeDiv.innerHTML = hljs.highlight(bubbleCode, {language: 'cpp'}).value;
                            break;
        case "Insertion Sort": complexityDiv.innerHTML = insertion;
                                codeDiv.innerHTML = hljs.highlight(insertionCode, {language: 'cpp'}).value;
                                break;
        case "Selection Sort":complexityDiv.innerHTML = selection;
                                codeDiv.innerHTML = hljs.highlight(selectionCode, {language: 'cpp'}).value;
                                break;
        case "Quick Sort": complexityDiv.innerHTML = quick;
                            codeDiv.innerHTML = hljs.highlight(quickCode, {language: 'cpp'}).value;
                            break;
        case "Merge Sort": complexityDiv.innerHTML = merge;
                            codeDiv.innerHTML =  hljs.highlight(mergeCode, {language: 'cpp'}).value;
                            break;
        case "Shell Sort": complexityDiv.innerHTML = shell;
                            codeDiv.innerHTML =  hljs.highlight(shellCode, {language: 'cpp'}).value;
                            break;
        case "Heap Sort": complexityDiv.innerHTML = heap;
                            codeDiv.innerHTML =  hljs.highlight(heapCode, {language: 'cpp'}).value;
                            break;
        case "Counting Sort": complexityDiv.innerHTML = counting;
                                codeDiv.innerHTML =  hljs.highlight(countingCode, {language: 'cpp'}).value;
                                break;
    }
}
navSlide();