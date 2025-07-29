let messages = document.querySelector(".message")
let inp = document.querySelector(".inp")
let btn = document.querySelector(".btn")
let btnJoin = document.querySelector(".btnJoin")
let btnLeave = document.querySelector(".btnLeave")
let guruh = document.querySelector(".guruh")

const socket = io("http://localhost:3000/")

socket.on("habar", (h) => {
    messages.insertAdjacentHTML(
        "beforeend",
        `
        <div>
            <h1>${h.text}</h1>
            <b>Kimdan: ${h.from}</b><br>
            <b>Sana: ${h.date}</b>
        </div>
        `
    )
})


btnLeave.addEventListener("click", (e) => {
    socket.emit("leave-guruh", guruh.value)
})

btnJoin.addEventListener("click", (e) => {
    socket.emit("join-guruh", guruh.value)
})

btn.addEventListener("click", (e) => {
    socket.emit("newhabar", { text: inp.value, guruh: guruh.value })
})
