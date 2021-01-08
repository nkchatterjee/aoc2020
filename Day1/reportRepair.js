function twoSum(arr, target) {
  const sums = [];
  const hashTable = {};

  for (let i = 0; i < arr.length; i++) {
    let sumMinusElement = target - arr[i];

    if (hashTable[sumMinusElement.toString()] !== undefined) {
      sums.push([arr[i], sumMinusElement]);
    }

    hashTable[arr[i].toString()] = arr[i];
  }

  return sums[0][0] * sums[0][1];
}

  console.log(twoSum(input, 2020))

  function threeSum(arr, target) {
    const nums = [];
    arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > target) break;
      if (i == 0 || arr[i] != arr[i - 1]) twoSum(arr, i, nums, target)
    }
    return nums[0][0] * nums[0][1] * nums[0][2];
  }
  
  function twoSum(arr, i, nums, target) {
    const seen = {};
    let j = i + 1;
    while (j < arr.length) {
      let complement = target - arr[i] - arr[j]
      if (seen[complement.toString()] !== undefined) {
        nums.push([arr[i], arr[j], complement])
        while (j + 1 < arr.length && arr[j] == arr[j + 1]) j++;
      }
      seen[arr[j].toString()] = arr[j];
      j++;
    }
  }
  
  console.log(threeSum(input, 2020))