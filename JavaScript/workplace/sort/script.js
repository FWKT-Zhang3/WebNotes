const temp = [3,2,4,1,3,5,2,5,8,6,7,9,10,2,0, -3,-2,-8]
// const temp = [3,5,2]

/**
 * Bubble sort, normal implement
 * @param {*} arr the arr to be sorted
 */
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

/**
 * Selection sort
 * @param {*} arr the arr to be sorted
 */
function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let maxIndex = 0
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j
            }
        }
        let temp = arr[maxIndex]
        arr[maxIndex] = arr[arr.length - i - 1]
        arr[arr.length - i - 1] = temp
    }
}

/**
 * Insertion sort
 * @param {*} arr the arr to be sorted
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = temp
    }
}

/**
 * Shell Sort
 * @param {*} arr the arr to be sorted
 */
function shellSort(arr) {
    let len = arr.length
    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {
            let temp = arr[i]
            let j = i - gap
            while (j >= 0 && arr[j] > temp) {
                arr[j + gap] = arr[j]
                j -= gap
            }
            arr[j + gap] = temp
        }
    }
}

/**
 * Merge sort
 * 分、治
 * mergeSort函数分开数组
 * merge函数把数组合起来
 * @param {*} arr 
 */
function mergeSort(arr) {
    if (arr.length < 2) return arr
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid, arr.length)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let res = []

    while (left.length > 0 && right.length > 0) {
        if (left[left.length - 1] <= right[right.length - 1]) {
            res.unshift(right.pop())
        } else res.unshift(left.pop())
    }

    while (left.length) {
        res.unshift(left.pop())
    }

    while (right.length) {
        res.unshift(right.pop())
    }

    return res
}

/**
 * Quick Sort
 * @param {*} arr 
 * @param {*} left 
 * @param {*} right 
 */
function quickSort(arr, left, right) {
    if (left === undefined) left = 0
    if (right === undefined) right = arr.length - 1
    if (left >= right) return

    let pivot = left
    let index = pivot + 1
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++
        }
    }
    swap(arr, pivot, index - 1)
    quickSort(arr, left, index - 1)
    quickSort(arr, index, right)
}

/**
 * Heap sort
 * 关键在于构建最大堆
 * @param {*} arr 
 */
function heapSort(arr) {
    // 构建最大堆
    // arr.length / 2 - 1: the last parent node
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        maxHeap(arr, i, arr.length - 1)
    }

    // sort
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i)
        maxHeap(arr, 0, i - 1)
    }
}

/**
 * 小堆排序
 * @param {*} arr 
 */
function minHeapSort(arr) {
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        minHeap(arr, i, arr.length - 1)
    }
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i)
        minHeap(arr, 0, i - 1)
    }
}

function minHeap(arr, start, end) {
    let parent = start, son = start * 2 + 1
    while (son <= end) {
        if (son + 1 <= end && arr[son + 1] < arr[son]) son++
        if (arr[son] < arr[parent]) {
            swap(arr,son, parent)
            parent = son
            son = parent * 2 + 1
        } else return
    }
}

minHeapSort(temp)
console.log(temp)

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function maxHeap(arr, start, end) {
    let parent = start, son = start * 2 + 1
    while (son <= end) {
        if (son + 1 <= end && arr[son + 1] > arr[son]) son++
        if (arr[son] > arr[parent]) {
            swap(arr,son, parent)
            parent = son
            son = parent * 2 + 1
        } else return
    }
}

