# [dnjs](https://github.com/leontrolski/dnjs#dnjs) client helper

_For when you don't need all of [mithril](https://mithril.js.org/) (this is currently 33 lines)._

## Usage:

```html
<ul id="comments"></ul>

<script type="module">
    import m from "https://unpkg.com/dnjs2dom@0.0.2/index.js"

    const commentsEl = document.getElementById("comments")
    const comments = [{text: "hiya!"}, {text: "oioi"}]
    const ul = m("ul#foo.bar",
        comments.map((comment, i) => m("li", `Comment ${i} says: ${comment.text}`))
    )
    m.setInner(commentsEl, m.makeEl(ul))
</script>
```
