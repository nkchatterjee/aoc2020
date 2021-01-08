class Solution:
    def threeSum(self, nums, target):
        res = []
        nums.sort()
        for i in range(len(nums)):
            if nums[i] > target:
                break
            if i == 0 or nums[i - 1] != nums[i]:
                self.twoSum(nums, i, res, target)
        return res

    def twoSum(self, nums, i, res, target):
        seen = set()
        j = i + 1
        while j < len(nums):
            complement = target - nums[i] - nums[j]
            if complement in seen:
                res.append([nums[i], nums[j], complement])
                while j + 1 < len(nums) and nums[j] == nums[j + 1]:
                    j += 1
            seen.add(nums[j])
            j += 1

sl = Solution()
print(sl.threeSum(input, 2020))