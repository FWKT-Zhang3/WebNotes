// class Eventhandler {
//     constructor() {
//         this.c = {}
//     }
//     addEventListener(eventName, callBack) {
//         if (this.c[eventName]) {
//             this.c[eventName].push(callBack)
//         } else this.c[eventName] = [callBack]
//     }
//     removeEventListener(eventName, callBack) {
//         if (!this.c[eventName]) return
//         for (let key in this.c[eventName]) {
//             if (this.c[eventName][key] === callBack) this.c[eventName].splice(key, 1)
//         }
//     }
//     emit(eventName) {
//         if (!this.c[eventName]) return
//         for (let key in this.c[eventName]) {
//             this.c[eventName][key]()
//         }
//     }
// }

function getPath(tree, k) {
    if (tree === null) return -1
    // let path = []
    let res = find(tree, k)
    return res
}

function find(tree, k) {
    for (let i = 0; i< tree.length; i++) {
        // path.push(tree[i])
        if (tree[i][id] === k) {
            return [tree[i]]
        }
        else {
            if (tree[i][children] === undefined) {
                // path.pop()
                continue
            }
            let temp = find(tree[i][children], k, path) 
            if (temp) return [...temp, tree[i]]
        }
        // path.pop()
    }
}