// The tax percentages
const taxGST = 5;
const taxPST = 8;

// This function adds two numbers from the array
const array_sum = function (accumulator, current_value) {
  return accumulator + current_value;
};

// Calculate the price before tax and the final price
const calculateTotal = (prices) => {
  const totals = {};

  // Add all prices together
  totals.beforeTax = prices.reduce(array_sum);

  // Work out both taxes
  totals.GST = totals.beforeTax * (taxGST / 100);
  totals.PST = totals.beforeTax * (taxPST / 100);

  // Add the taxes to the original price
  totals.sum = totals.beforeTax + totals.GST + totals.PST;

  return totals;
};

// Two different lists of prices for testing
const pricesArr = [
  [2.5, 9.99, 3.99, 18.59, 49.96],
  [2.99, 3.99, 4.99, 5.99, 6.99],
];

// Choose one of the lists randomly
const randomPrices = Math.floor(Math.random() * pricesArr.length);
const totals = calculateTotal(pricesArr[randomPrices]);

// Show the answers in the HTML page
document.querySelector("#before-tax").textContent = totals.beforeTax.toFixed(2);
document.querySelector("#gst").textContent = totals.GST.toFixed(2);
document.querySelector("#pst").textContent = totals.PST.toFixed(2);
document.querySelector("#sum").textContent = totals.sum.toFixed(2);
