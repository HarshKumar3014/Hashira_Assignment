/**
 * Hashira Placements Assignment
 * Polynomial reconstruction from roots provided in multiple bases.
 *
 * Language: JavaScript (Node.js)
 * Author: <Your Name>
 */

const testCase = {
    keys: { n: 10, k: 7 },
    "1": { base: "6", value: "15425505243424435125" },
    "2": { base: "15", value: "c3a6d27b5e49b81" },
    "3": { base: "15", value: "71b8e4a9d2f30c7" },
    "4": { base: "16", value: "f9c2a0b356d774e" },
    "5": { base: "8", value: "427156207314502164523" },
    "6": { base: "3", value: "12022021001222110120011221200202112122" },
    "7": { base: "3", value: "21121002011222011201202112100102022201" },
    "8": { base: "6", value: "43025134350424413223345120" },
    "9": { base: "12", value: "8b67423122a4965104" },
    "10": { base: "7", value: "2314051524303561432263052" }
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
  
  async function main() {
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
  
    console.log("Polynomial Coefficients (constant term first):");
    polynomialCoefficients.forEach((coefficient, index) => {
      console.log(`a${index} = ${coefficient.toString()}`);
    });
  }
  
  main().catch((error) => {
    console.error("Error while computing polynomial coefficients:", error);
  });
  