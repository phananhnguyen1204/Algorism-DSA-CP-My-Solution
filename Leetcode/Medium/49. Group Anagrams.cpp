class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        mapping = {}
        for word in strs:
            key = ''.join(sorted(word))
            if key in mapping:
                mapping[key].append(word)
            else: mapping[key] = [word]
        return list(mapping.values())