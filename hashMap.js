module.exports = class HashMap {
    table = new Array(16);
    items = 0;

    hash(string, arraySize) {
        if (string === undefined) return;
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < string.length; i++) {
            hashCode = (primeNumber * hashCode + string.charCodeAt(i)) % arraySize;
        }
        return hashCode;
    }

    set(key, value) {
        this.items++;
        const load = this.items / this.table.length;

        if (load > 0.8) this.resize();

        const idx = this.hash(key, this.table.length);

        if (idx < 0 || idx >= this.table.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (!this.table[idx]) {
            this.table[idx] = [[key, value]];
        } else {
            this.table[idx].push([key, value]);
        }
    }

    get(key) {
        const idx = this.hash(key, this.table.length);
        if (!this.table[idx]) return null;
        // .find() will return the matching array and were returning the [1] index (value)
        return this.table[idx].find(x => x[0] === key)[1];
    }

    resize() {
        const newTable = new Array(this.table.length * 2);
        this.entries().forEach(entry => {
            const idx = this.hash(entry[0], newTable.length);
            if (!newTable[idx]) {
                newTable[idx] = [[entry[0], entry[1]]];
            } else {
                newTable[idx].push([entry[0], entry[1]]);
            }
        });
        this.table = newTable;
    }

    has(key) {
        const idx = this.hash(key, this.table.length);
        if (this.table[idx]) {
            const hasKey = this.table[idx].find(x => x[0] === key)
            if (hasKey) return true;
        }
        return false;
    }

    remove(key) {
        const idx = this.hash(key, this.table.length);
        if (this.table[idx]) {
            this.table[idx] = this.table[idx].filter((arr) => arr[0] !== key);
            this.items--;
            return true;
        }
        return false;
    }

    length() {
        return this.items;
    }

    clear() {
        this.table = new Array(16);
        this.items = 0;
    }

    keys() {
        return this.table.reduce(
            (accumulated, current) =>
                accumulated.concat(
                    current.reduce(
                        (accumulatedKeys, currentCell) =>
                            accumulatedKeys.concat(currentCell[0]),
                        []
                    )
                ),
            []
        );
    }

    values() {
        return this.table.reduce(
            (accumulated, current) =>
                accumulated.concat(
                    current.reduce(
                        (accumulatedKeys, currentCell) =>
                            accumulatedKeys.concat(currentCell[1]),
                        []
                    )
                ),
            []
        );
    }

    entries() {
        const entries = [];

        this.table.forEach(entry => {
            if (entry) {
                entry.forEach(data => {
                    entries.push(data);
                });
            }
        });

        return entries;
    }
}

// exports.HashMap = HashMap;

// const myHash = new HashMap();

// myHash.set('name', 'John');
// myHash.set('lastname', 'Doe');
// myHash.set('age', 19);
// myHash.set('test', 'test test');

// console.log(myHash.get('name')); // John
// console.log(myHash.get('lastname')); // Doe

// console.log(myHash.has('name')); // true
// console.log(myHash.has('job')); // false

// console.log(myHash.remove('test')); // true
// console.log(myHash.remove('none')); // false

// console.log(myHash.length()); // 3

// // myHash.clear(); // clears the array

// console.log(myHash.keys()); // [ 'lastname', 'name', 'age' ]

// console.log(myHash.values()); // [ 'Doe', 'John', 19 ]

// console.log(myHash.entries()); // [ 'lastname', 'Doe', 'name', 'John', 'age', 19 ]