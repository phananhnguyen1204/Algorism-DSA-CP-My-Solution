# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0
        def dfs(root):
            if not root: return 0
            nonlocal res
            left = dfs(root.left)
            right = dfs(root.right)
            print(left, right)
            res = max(res, left + right)
            return max(left, right) + 1
        dfs(root)
        return res