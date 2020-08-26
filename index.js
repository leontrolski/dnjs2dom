const m = (...args) => {
    let [attrs, [head, ...tail]] = [{}, args]
    let tag = "div"
    let id = undefined
    const classes = []
    for (const part of head.split(/(?=\.)|(?=#)|(?=\[)/)){
        if(part[0] === ".") classes.push(part.slice(1))
        else if(part[0] === "#") id = part.slice(1)
        else tag = part
    }
    if (tail.length && !m.isRenderable(tail[0])) [attrs, ...tail] = tail
    if (attrs.class) classes = [...classes, ...attrs.class]
    attrs = {...attrs}; delete attrs.class
    attrs.className = classes.join(" ")
    if (id) attrs.id = id
    const children = []
    const addChildren = v => v === null? null : Array.isArray(v)? v.map(addChildren) : children.push(v)
    addChildren(tail)
    return {tag, attrs, children}
}
m.isRenderable = v =>v === null || ["string", "number"].includes(typeof v) || v.tag || Array.isArray(v)
m.makeEl = v => {
    if(!v.tag) return document.createTextNode(v)
    const el = document.createElement(v.tag)
    for (const name of Object.keys(v.attrs)) el[name] = v.attrs[name]
    for (const child of v.children) el.appendChild(m.makeEl(child))
    return el
}
m.setInner = (el, content) => {
    if (el.lastChild) return el.replaceChild(content, el.lastChild)
    el.appendChild(content)
}
export default m
