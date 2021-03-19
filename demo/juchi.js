var zigzagLevelOrder = function(root) {
    if (root === null) return null
    
    let dir = 1
    let que = [root]
    let level = [],res = [], result = [], temp
    while (que.length || level.length) {
        if (que.length === 0) {
            result.push(res)
            que = level
            level = []
            res = []
            dir *= -1
        }
        if (dir > 0) {
            temp = que.shift()
        } else {
            temp = que.pop()
        }
        
        if (temp) {
            res.push(temp.val)
            if (dir > 0) {
                level.push(temp.left)
                level.push(temp.right)
            } else {
                level.unshift(temp.right)
                level.unshift(temp.left)
            }
        }
    }
    return result
};
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

console.log(zigzagLevelOrder(root))

