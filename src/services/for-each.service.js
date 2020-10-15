
const baseForEach = (initialIncrement, howToEndWhile, increment) => {
    return (array, callback) => {

        let i = initialIncrement(array),
            result;

        const newArray = [];

        while (howToEndWhile(i, array)) {

            result = callback(array[i], i);

            if (result === false) {
                break;
            }

            if (typeof result === "number") {
                i += result;
            }
            else {
                newArray.push(result);
            }

            i += increment;
        }

        return newArray;
    }
}

export const forEach = baseForEach(
    () => 0,
    (i, array) => i < array.length,
    1
);

export const reverseForEach = baseForEach(
    array => array.length - 1,
    i => i >= 0,
    -1
);
