window.onload = function() {
    getFullDate()
}

let dateText = document.querySelector("#date")

const console = document.querySelector(".console")
const consoleBody = document.querySelector(".console__body")
const header = console.querySelector(".console__header")

const consoleInput = document.querySelector("#console__input")
let consoleOutput = document.querySelector(".console__output")

let consoleText = "aemirdnr@ubuntu: ~$ "
let isFullscreen = false

dragElement(console)

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  if (document.getElementById(elmnt.id + "__header")) {
    document.getElementById(elmnt.id + "__header").onmousedown = dragMouseDown
  } else {
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}

function getFullDate() {
    const date = new Date()

    let day = date.toLocaleString('en-us', {  weekday: 'short' })
    let dayNumber = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let fullDate = day + " " + dayNumber + " " + hours + ":" + minutes

    dateText.innerHTML = fullDate

    setTimeout(getFullDate, 60000)
}

function openTerminal() {
  if (console.style.display != "none") {
    console.style.display = "none"
  } else {
    console.style.display = "block"
    consoleInput.focus()
  }
}

function buttonClose() {
  console.style.display = "none"
  consoleInput.value = ""
  consoleOutput.innerHTML = ""
}

function buttonMinimize() {
  console.style.display = "none"
}

function buttonFullscreen() {
  if (!isFullscreen) {
    isFullscreen = true

    consoleInput.focus()
    header.onmousedown = null

    console.style.top = "0"
    console.style.left = "0"
    console.style.width = "100%"
    consoleBody.style.height = "100vh"
    consoleOutput.style.maxHeight = "92vh"
  }
  else {
    isFullscreen = false

    consoleInput.focus()
    dragElement(console)

    console.style.top = "25%"
    console.style.left = "32%"
    console.style.width = "666px"
    consoleBody.style.height = "400px"
    consoleOutput.style.maxHeight = "374px"
  }
}

//Console commands
consoleInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (consoleInput.value == "whoami") {
      consoleOutput.innerHTML += consoleText + "Hi, I'm Emir.<br>\n"
    }
    else if (consoleInput.value == "contact") {
      consoleOutput.innerHTML += consoleText + "You can reach me on e-mail, my e-mail adress is aemirdnr@gmail.com<br>\n"
    }
    else if (consoleInput.value == "help") {
      consoleOutput.innerHTML += consoleText + "Commands: whoami, contact, help, clear<br>\n"
    }
    else if (consoleInput.value == "clear") {
      consoleOutput.innerHTML = ""
    }
    else if (consoleInput.value == "test") {
      consoleOutput.innerHTML += consoleText + "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet<br>\n"
    }
    else {
      consoleOutput.innerHTML += consoleText + "Command not found. Write 'help' to see commands.<br>\n"
    }
    //Clear after press ENTER
    consoleInput.value = ""
}
})