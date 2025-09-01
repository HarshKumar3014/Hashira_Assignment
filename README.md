# Hashira Placements Assignment – Polynomial Reconstruction

This project solves the **Hashira Placements coding assignment**. The task is to reconstruct a polynomial from its roots, where roots are provided in different bases via a JSON input file.

## 🚀 Problem Statement

* You are given a JSON object containing:
  * **n** → total number of roots available
  * **k** → minimum number of roots required (`k = degree + 1`)
  * Each root has a `base` and `value`
* Convert each root's representation into a numeric value.
* Use the **first (k-1) roots** to construct a polynomial of degree `k-1`.
* Expand `(x - r1)(x - r2)...(x - r(k-1))` and output the coefficients.
* Output format: coefficients from **constant term (a0)** to **highest degree term (an)**.

## 📂 Example Test Case

```json
{
  "keys": { "n": 10, "k": 7 },
  "1": { "base": "6", "value": "15425505243424435125" },
  "2": { "base": "15", "value": "c3a6d27b5e49b81" },
  "3": { "base": "15", "value": "71b8e4a9d2f30c7" },
  "4": { "base": "16", "value": "f9c2a0b356d774e" },
  "5": { "base": "8", "value": "427156207314502164523" },
  "6": { "base": "3", "value": "12022021001222110120011221200202112122" },
  "7": { "base": "3", "value": "21121002011222011201202112100102022201" },
  "8": { "base": "6", "value": "43025134350424413223345120" },
  "9": { "base": "12", "value": "8b67423122a4965104" },
  "10": { "base": "7", "value": "2314051524303561432263052" }
}
```

* Here `n = 10`, `k = 7`.
* Degree = `k - 1 = 6`.
* Use the **first 6 roots**.
* Construct a polynomial of degree 6.

## 🧩 Code Walkthrough

### 1. Parsing Roots

```javascript
async function parseRoot(rootEntry) {
  return BigInt(parseInt(rootEntry.value, rootEntry.base));
}
```

* Converts each root into a `BigInt`.
* Uses `parseInt` to support bases up to 36.

### 2. Building Polynomial Coefficients

```javascript
function buildPolynomialCoefficients(roots) {
  let coefficients = [1n]; // start with 1
  
  for (const root of roots) {
    const updated = new Array(coefficients.length + 1).fill(0n);
    
    for (let i = 0; i < coefficients.length; i++) {
      updated[i + 1] += coefficients[i];           // multiply with x
      updated[i] -= root * coefficients[i];        // multiply with -root
    }
    
    coefficients = updated;
  }
  
  return coefficients;
}
```

* Expands `(x - r1)(x - r2)...` iteratively.
* At each step, coefficients are updated to include the new root.

### 3. Main Execution

```javascript
async function main() {
  const requiredRootsCount = testCase.keys.k - 1;
  
  const allRoots = [];
  for (let i = 1; i <= testCase.keys.n; i++) {
    if (testCase[i]) allRoots.push(await parseRoot(testCase[i]));
  }
  
  const selectedRoots = allRoots.slice(0, requiredRootsCount);
  const polynomialCoefficients = buildPolynomialCoefficients(selectedRoots);
  
  console.log("Polynomial Coefficients (constant term first):");
  polynomialCoefficients.forEach((coef, index) => {
    console.log(`a${index} = ${coef.toString()}`);
  });
}
```

* Reads `n` and `k`.
* Selects the **first (k-1) roots**.
* Computes polynomial coefficients.
* Prints results in order: `a0, a1, ..., an`.

## 📊 Example Output

For the above test case, you may see output like:

```
Polynomial Coefficients (constant term first):
a0 = 123456789...
a1 = -987654321...
a2 = 456789123...
...
a6 = 1
```

(The actual numbers will be very large since roots are big integers).

## ⚙️ How to Run

1. Save the file as `hashira.js`.
2. Install Node.js if not already installed.
3. Run the script:

```bash
node hashira.js
```

## 🛠️ Features

* Handles arbitrary bases (2–36).
* Supports very large numbers with `BigInt`.
* Generic design — just replace `testCase` JSON to test new inputs.
* Polynomial expansion works for **any degree** within computational limits.