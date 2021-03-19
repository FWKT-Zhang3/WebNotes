function method(a) {
    const div = document.createElement("div")
    div.id = "tab"
    const ul = document.createElement("ul")
    const subdiv = document.createElement("div")
    div.appendChild(ul)
    div.appendChild(subdiv)


    for (let i = 0; i < a.length; i++) {
        const label = document.createElement("li")
        const box = document.createElement("div")
        label.innerText = a[i]
        label.number = i
        box.number = i
        box.innerText = a[i]
        box.className = ""
        ul.appendChild(label)
        subdiv.appendChild(box)
    }

    ul.onclick = function(e) {
        const target = e.target
        const boxes = subdiv.childNodes
        for (let key in boxes) {
            if (boxes[key].number === target.number) {
                boxes[key].className = "active"
            } else {
                boxes[key].className = ""
            }
        }
    }
    document.body.appendChild(div)
}

window.onload = function () {
    method([1,2,3,4])
}

