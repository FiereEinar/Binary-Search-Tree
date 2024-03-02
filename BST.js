const HashMap = require('./hashMap.js');

const myHashMap = new HashMap();

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = [...new Set(array.sort((a, b) => a - b))];
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        const mid = parseInt((start + end) / 2);
        const node = new Node(array[mid]);

        this.addToHash(array[mid], node);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }

    addToHash(key, value) {
        const myKey = key.toString(); // the key is just a string version of the data
        myHashMap.set(myKey, value);
    }

    insert(value) {
        this.root = insertRec(value, this.root);
        this.addToHash(value, new Node(value));

        function insertRec(value, root) {
            if (root === null) return new Node(value);

            if (value < root.data) root.left = insertRec(value, root.left);
            if (value > root.data) root.right = insertRec(value, root.right);

            return root;
        }
    }

    delete(value) {
        this.root = deleteRec(value, this.root);
        myHashMap.remove(value.toString());

        function deleteRec(item, node) {
            if (node === null) return node;

            // recursing towards the given value
            if (item < node.data) {
                node.left = deleteRec(item, node.left);
                return node;
            } else if (item > node.data) {
                node.right = deleteRec(item, node.right);
                return node;
            }

            // when we reach the given value we proceed here

            // if its a leaf
            if (node.left === null && node.right === null) return null;

            // if it has one child
            if (node.left === null && node.right !== null) {
                return node.right;
            } else if (node.right === null && node.left !== null) {
                return node.left
            }

            // if it has a both childs
            else {
                let newTree = node.right;
                const right = node.right
                // we go to the second biggest number
                while (newTree.left !== null) {
                    newTree = newTree.left;
                }
                // if the second biggest number has a child 
                // on the right then we set that child to the left of newTree
                if (newTree.right !== null && right.left !== null) {
                    right.left = newTree.right;
                    newTree.right = right; // building the right of newTree
                }
                newTree.left = node.left; // building the left of newTree
                return newTree;
            }
        }
    }

    findFast(value) {
        return myHashMap.get(value.toString()); 
    }

    find(value, root = this.root) {
        if (root === null) return null;
        if (value === root.data) return root;

        if (value < root.data) return this.find(value, root.left);
        if (value > root.data) return this.find(value, root.right);
    }

    levelOrder(callbackFn) {
        const nodes = [];
        let queue = [];
        queue.push(this.root)
        nodes.push(this.root.data)

        while (queue.length !== 0) {
            let current = queue[0];
            if (current.left !== null) {
                nodes.push(current.left.data);
                queue.push(current.left);
            }
            if (current.right !== null) {
                nodes.push(current.right.data);
                queue.push(current.right);
            }
            queue.shift();
        }

        if (callbackFn) {
            nodes.forEach((node) => callbackFn(node));
        } else {
            return nodes;
        }
    }

    inOrder(callbackFn) {
        const nodes = [];
        traverse(this.root);

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            nodes.push(node.data);
            traverse(node.right);
        }
        if (callbackFn) {
            nodes.forEach((node) => callbackFn(node));
        } else {
            return nodes;
        }
    }

    preOrder(callbackFn) {
        const nodes = [];
        traverse(this.root);

        function traverse(node) {
            if (node === null) return;

            nodes.push(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        if (callbackFn) {
            nodes.forEach((node) => callbackFn(node));
        } else {
            return nodes;
        }
    }

    postOrder(callbackFn) {
        const nodes = [];
        traverse(this.root);
        if (!callbackFn) return nodes;
        nodes.forEach((node) => callbackFn(node));

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            nodes.push(node.data);
        }
    }

    height(node) {
        if (node === null) return null;
        let highestCounter = 0;
        heightRec(node);
        return highestCounter;

        function heightRec(node, accCounter) {
            let counter = accCounter || 0;

            if (node.left !== null) heightRec(node.left, counter + 1);
            if (node.right !== null) heightRec(node.right, counter + 1);

            if (counter > highestCounter) highestCounter = counter;
        }
    }

    depth(node, root = this.root, count = 0) {
        if (root.data === node.data) return count;

        if (node.data < root.data) return this.depth(node, root.left, count + 1);
        if (node.data > root.data) return this.depth(node, root.right, count + 1);
    }

    isBalanced() {
        const queue = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            let current = queue[0];

            const left = this.height(current.left);
            const right = this.height(current.right);

            if (left - right >= 2 || left - right <= -2) return false;

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
            queue.shift();
        }
        return true;
    }

    reBalance() {
        this.array = [...new Set(this.postOrder().sort((a, b) => a - b))];
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function generateRandomArray(length) {
    const array = [];

    for (let i = 0; i <= length - 1; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}

//const myArray = generateRandomArray(12)
const myArray = [
   37,  14, 84,  4, 20, 54,
  101,   7, 15, 22, 46, 64,
   86, 103
]
const myTree = new Tree(myArray);

prettyPrint(myTree.root)

console.log(myTree.isBalanced())
console.log(myTree.levelOrder())
console.log(myTree.preOrder())
console.log(myTree.postOrder())
console.log(myTree.inOrder())

myTree.insert(101)
myTree.insert(103)

prettyPrint(myTree.root)
console.log(myTree.isBalanced())

myTree.reBalance()

prettyPrint(myTree.root)
console.log(myTree.isBalanced())

console.log(myTree.levelOrder())
console.log(myTree.preOrder())
console.log(myTree.postOrder())
console.log(myTree.inOrder())


//prettyPrint(myTree.find(20))
console.log('depth: ' + myTree.depth(myTree.find(20)))
console.log('height: ' + myTree.height(myTree.find(20)))