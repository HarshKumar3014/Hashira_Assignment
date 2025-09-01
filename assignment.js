/**
 * Hashira Placements Assignment
 * Polynomial reconstruction from roots provided in multiple bases.
 *
 * Language: JavaScript (Node.js)
 * Author: <Your Name>
 */

// Sample Test Case (from assignment description)
const sampleTestCase = {
    keys: { n: 4, k: 3 },
    "1": { base: "10", value: "4" },
    "2": { base: "2", value: "111" },
    "3": { base: "10", value: "12" },
    "6": { base: "4", value: "213" }
};

// Second Test Case (official dataset)
const secondTestCase = {
    keys: { n: 10, k: 7 },
    "1": { base: "6", value: "13444211440455345511" },
    "2": { base: "15", value: "aed7015a346d635" },
    "3": { base: "15", value: "6aeeb69631c227c" },
    "4": { base: "16", value: "e1b5e05623d881f" },
    "5": { base: "8", value: "316034514573652620673" },
    "6": { base: "3", value: "2122212201122002221120200210011020220200" },
    "7": { base: "3", value: "20120221122211000100210021102001201112121" },
    "8": { base: "6", value: "20220554335330240002224253" },
    "9": { base: "12", value: "45153788322a1255483" },
    "10": { base: "7", value: "1101613130313526312514143" }
};

/**
 * Parse a root from its base representation into a BigInt.
 */
async function parseRoot(rootEntry) {
    return BigInt(parseInt(rootEntry.value, rootEntry.base));
    // Note: parseInt handles bases up to 36. If >36 is expected, implement a custom parser.
}

/**
 * Expand polynomial coefficients from roots.
 * Given roots r1, r2, ..., rn, returns coefficients of (x - r1)(x - r2)...(x - rn).
 *
 * @param {BigInt[]} roots
 * @returns {BigInt[]} coefficients in order [a0, a1, ..., an]
 */
function buildPolynomialCoefficients(roots) {
    let coefficients = [1n]; // Start with polynomial = 1

    for (const root of roots) {
        const updatedCoefficients = new Array(coefficients.length + 1).fill(0n);

        for (let i = 0; i < coefficients.length; i++) {
            // Contribution from multiplying with "x"
            updatedCoefficients[i + 1] += coefficients[i];

            // Contribution from multiplying with "-root"
            updatedCoefficients[i] -= root * coefficients[i];
        }

        coefficients = updatedCoefficients;
    }

    return coefficients;
}

/**
 * Process a single test case and return formatted output
 */
async function processTestCase(testCase, testNumber) {
    const totalRootsAvailable = testCase.keys.n;
    const requiredRootsCount = testCase.keys.k - 1; // degree = k - 1

    // Parse roots from JSON
    const allRoots = [];
    for (let i = 1; i <= totalRootsAvailable; i++) {
        if (testCase[i]) {
            const root = await parseRoot(testCase[i]);
            allRoots.push(root);
        }
    }

    // Select only the first (k-1) roots
    const selectedRoots = allRoots.slice(0, requiredRootsCount);

    // Build polynomial coefficients
    const polynomialCoefficients = buildPolynomialCoefficients(selectedRoots);

    // Format output
    console.log(`Test case ${testNumber}`);
    console.log(`Input values:`);
    console.log(JSON.stringify(testCase, null, 2));
    console.log(`Output values:`);
    
    polynomialCoefficients.forEach((coefficient, index) => {
        console.log(`a${index} = ${coefficient.toString()}`);
    });
    
    console.log();
}

async function main() {
    try {
        // Process Sample Test Case
        await processTestCase(sampleTestCase, 1);
        
        // Process Second Test Case  
        await processTestCase(secondTestCase, 2);
        
    } catch (error) {
        console.error("Error while computing polynomial coefficients:", error);
    }
}

main();