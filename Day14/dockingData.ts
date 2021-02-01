const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

// part 1 

// Prepare "empty" mask and memory.
let mask = [..."X".repeat(36)];
const mem = new Map<number, number>();

// Prepare `regex` for extracting memory address and value.
const regex = /\[(\d+)] = (\d+)$/;

lines.forEach((line) => {
  // Check if line is specifying a bitmask.
  if (line.startsWith("mask =")) {
    // Update mask.
    mask = [...line.split("=", 2).pop()!.trim()];
    return;
  }

  // Line attempts to write a value to memory.
  // Extract `address` and `value` from `line`.
  const match = regex.exec(line);
  const address = parseInt(match![1]);
  let value = parseInt(match![2]);

  // Expand `value` into binary form.
  const expandedValue = [...value.toString(2).padStart(mask.length, "0")];

  // Apply bitmask to value.
  mask.forEach((bit, i) => {
    if (bit === "X") return;
    expandedValue[i] = bit;
  });

  // Convert `expandedValue` to decimal and add to memory.
  value = parseInt(expandedValue.join(""), 2);
  mem.set(address, value);
});

// Sum all values in memory.
console.log([...mem.values()].reduce((previous, current) => previous + current));

// part 2

lines.forEach((line) => {
  // Check if line is specifying a bitmask.
  if (line.startsWith("mask =")) {
    // Update mask.
    mask = [...line.split("=", 2).pop()!.trim()];
    return;
  }

  // Line attempts to write a value to memory.
  // Extract `address` and `value` from `line`.
  const match = regex.exec(line);
  const address = parseInt(match![1]);
  const value = parseInt(match![2]);

  // Expand `address` into binary form.
  const expandedAddress = [...address.toString(2).padStart(mask.length, "0")];

  // Apply bitmask to value.
  mask.forEach((bit, i) => {
    if (bit === "0") return;
    expandedAddress[i] = bit;
  });

  // Use the expanded address to find all address variants.
  const addressVariants = findAddressVariants(expandedAddress);

  // Add all values for the addresses we've found.
  addressVariants.forEach((addressVariant) => {
    mem.set(parseInt(addressVariant.join(""), 2), value);
  });
});

// Sum all values in memory.
console.log( [...mem.values()].reduce((previous, current) => previous + current));
function findAddressVariants(expandedAddress: string[]): string[][] {
  // Copy `expandedAddress` array to allow for modification.
  expandedAddress = expandedAddress.slice();

  // Find first occurrence of a floating bit.
  const i = expandedAddress.indexOf("X");

  // No floating bit found, we can return the address.
  if (i === -1) {
    return [expandedAddress];
  }

  // Find all addresses where this floating bit is `"0"`.
  expandedAddress[i] = "0";
  const with0 = findAddressVariants(expandedAddress);

  // Find all addresses where this floating bit is `"1"`.
  expandedAddress[i] = "1";
  const with1 = findAddressVariants(expandedAddress);

  // Merge results.
  return with0.concat(with1);
}