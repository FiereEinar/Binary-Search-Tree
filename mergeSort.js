/**
 * The main sorting Array
 * @param {array} arr: Array in question
 * @returns Sorted array
 */

export default function mergeSort(arr) {
    if (arr.length === 0) return "Please provide a non empty array!"
    if (arr.length == 1) return arr;

    const left = arr.slice(0, arr.length / 2);
    const right = arr.slice(arr.length / 2, arr.length);

    return sort(mergeSort(left), mergeSort(right));
}

function sort(left, right) {
    const arr = [];
    let k = 0;
    let size = left.length + right.length;

    while (k <= size && right[0] !== undefined) {
        if (left[0] < right[0]) {
            arr[k] = left.shift();
            k++;
        } else {
            arr[k] = right.shift();
            k++;
        }
    }

    while (left.length !== 0) {
        arr[k] = left.shift();
    }

    return arr;
}

// console.log(mergeSort([])) // "Please provide a non empty array!"
// console.log(mergeSort([10, 7, 8, 9, 1, 5])); // [1, 5, 7, 8, 9, 10]
// console.log(mergeSort([30, 20, 10, 50, 22, 33, 55])); // [10, 20, 22, 30, 33, 50, 55]
// console.log(mergeSort([2, 91, 80, 7, 32, 49, 1, 36, 7, 3, 4, 0, 52, 9, 18, 37, 3,]))
//  [
//     0,  1,  2,  3,  3,  4,
//     7,  7,  9, 18, 32, 36,
//    37, 49, 52, 91
//  ]