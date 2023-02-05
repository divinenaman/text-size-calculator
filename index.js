
/***  Get request format ***/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const fontFile = urlParams.get("font")
const fontSize = urlParams.get("font_size")

const font = new FontFace("Custom Font", fontFile)
document.fonts.add(font)

const f = document.querySelector("#form")

f.addEventListener("submit", onSubmit)


f[0].value = urlParams.get("width")
f[1].value = urlParams.get("breakpoint")
f[2].value = urlParams.get("text")

f[3].click()

// callback
function onSubmit(e) {
    e.preventDefault()

    width = parseFloat(f[0].value)
    breakpoint = parseFloat(f[1].value)
    text = f[2].value

    if (width) {
        const div = document.createElement("div")
        div.setAttribute("style", `font-family: 'Custom Font', 'serif'; width:${width}px; background-color: red; height: auto; font-size: ${fontSize}px;`)
        div.innerHTML = text

        document.body.appendChild(div)
        t = text.split(/ |-/g) // split by space and '-'
        max_len = t.length

        if (div.clientHeight > breakpoint) {    
            max_len = binary_search(div, breakpoint, t, 0, t.length-1) + 1
                
            div.innerHTML = t.slice(0, max_len).join(" ")
        }

        const div2 = document.createElement("div")
        div2.innerHTML = `ans=${max_len}`
        div2.id = "ans"
        document.body.appendChild(div2)
    }

}

// optimization
function binary_search(ele, breakpoint, text, l, h) {
    if (l >= h) return l - 1
    
    const mid = parseInt((l + h) / 2)

    ele.innerHTML = text.slice(0, mid+1).join("-") // join with '-'
    
    if (ele.clientHeight <= breakpoint) {
        l = mid + 1
    } else {
        h = mid - 1
    }

    return binary_search(ele, breakpoint, text, l, h)
}