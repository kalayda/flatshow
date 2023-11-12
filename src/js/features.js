fetch('/assets/content.txt')
    .then(response => response.text())
    .then((content) => {
            let features = content.split(/\r\n\r\n/)
            let featuresContainer = document.querySelector('#features')
            features.forEach((content, index) => {
                let lines = content.split(/\r\n/)
                let item = document.createElement("div")
                item.id = `item${index}`
                item.classList.add("item", "accent", "col-xl-6", "p-2")
                let title = document.createElement("h3")
                title.innerText = lines[0]
                let button = document.createElement("span")
                button.setAttribute("type", "button")
                button.classList.add("btn", "btn-primary")
                button.innerText = "Интересно!"
                title.append(button)
                item.append(title)
                featuresContainer.append(item)
                lines.forEach((line, index) => {
                    if (index === 0) return
                    let p = document.createElement("p")
                    p.innerHTML = line
                    item.append(p)
                })
                installListener(item)
            })
        }
    )

const xhr = new XMLHttpRequest()

let enterTime = 0

function installListener(item) {
    let id = item.id.replace("item", "")
    item.addEventListener('mouseenter', () => {
        enterTime = Date.now()
    })
    item.addEventListener('mouseleave', () => {
        let time = Date.now() - enterTime
        if (time < 1000) return
        xhr.open("GET", `/m?${id}&${time}`, true)
        try {
            xhr.send()
        } catch (error) {
        }
    })
    const onLike = (event) => {
        let button = event.currentTarget
        button.removeAttribute("type")
        button.className = "badge bg-success fs-6"
        button.innerHTML = "Сделаем в первую очередь"
        button.removeEventListener("click", onLike)
        xhr.open("GET", `/c?${id}`, true)
        try {
            xhr.send()
        } catch (error) {
        }
    }
    let button = item.querySelector('.btn')
    button?.addEventListener('click', onLike)
}