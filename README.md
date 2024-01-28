# Binary Search Tree

## Test the code

```bash
node BST.js
```

### Or if you have nodemon...

```bash
nodemon BST.js
```

### I recommend to install nodemon if you want to test the functions

```bash
    npm install --save-dev nodemon
```

## Explanations

first we are sorting the given array and putting it in the new Set constructor to remove duplicates. The new Set will return an object so we use the spread operator (...) to convert it into an array. I recently just learned about this.

```javascript
[...new Set(array.sort((a, b) => a - b))];
```

## Extras

I have an extra function called findFast() where it uses a hashmap to get the value. I don't know why i did it.
