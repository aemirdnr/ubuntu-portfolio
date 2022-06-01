window.onload = function() {
  getFullDate()
  document.querySelector(".boot").style.display = "none"
}

let dateText = document.querySelector("#date")

const console = document.querySelector(".console")
const consoleBody = document.querySelector(".console__body")
const header = console.querySelector(".console__header")

const readMe = document.querySelector("#readme")
const files = document.querySelector("#files")

const consoleInput = document.querySelector("#console__input")
let consoleOutput = document.querySelector(".console__output")

let consoleText = "aemirdnr@ubuntu: ~$ "

dragElement(console)
dragElement(readMe)
dragElement(files)

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

function getResume() {
  window.open('./resume.jpg', '_blank')
}

function openNotepad() {
  if (readMe.style.display != "none") {
    readMe.style.display = "none"
  } else {
    readMe.style.display = "block"
  }
}

function openTerminal() {
  if (console.style.display != "none") {
    console.style.display = "none"
  } else {
    console.style.display = "block"
    consoleInput.focus()
  }
}

function openFiles() {
  if (files.style.display != "none") {
    files.style.display = "none"
  } else {
    files.style.display = "block"
  }
}

function buttonClose(id) {
  if (id == console) {
    console.style.display = "none"
    consoleInput.value = ""
    consoleOutput.innerHTML = ""
  }
  else if (id == readMe) {
    readMe.style.display = "none"
  }
  else if (id == files) {
    files.style.display = "none"
  }
}

function buttonMinimize(id) {
  if (id == console) {
    console.style.display = "none"
  }
  else if (id == readMe) {
    readMe.style.display = "none"
  }
  else if (id == files) {
    files.style.display = "none"
  }
}

let isConsoleFullscreen = false
let isReadmeFullscreen = false

function buttonFullscreen(id) {
  if (id == console) {
    if (!isConsoleFullscreen) {
      isConsoleFullscreen = true
  
      consoleInput.focus()
      header.onmousedown = null
  
      console.style.top = "0"
      console.style.left = "0"
      console.style.width = "100%"
      consoleBody.style.height = "100vh"
      consoleOutput.style.maxHeight = "92vh"
    }
    else {
      isConsoleFullscreen = false
  
      consoleInput.focus()
      dragElement(console)
  
      console.style.top = "25%"
      console.style.left = "32%"
      console.style.width = "666px"
      consoleBody.style.height = "400px"
      consoleOutput.style.maxHeight = "374px"
    }
  }
  else if (id == readMe) {
    if (!isReadmeFullscreen) {
      isReadmeFullscreen = true

      document.getElementById(id.id + "__header").onmousedown = null

      readMe.style.top = "0"
      readMe.style.left = "0"
      readMe.style.width = "100%"
      document.getElementById("readme__body").style.height = "100vh"
    }
    else {
      isReadmeFullscreen = false

      dragElement(id)

      readMe.style.top = "25%"
      readMe.style.left = "32%"
      readMe.style.width = "666px"
      document.getElementById("readme__body").style.height = "400px"
    }
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

function fileMoves(id) {
  const fileList = document.querySelectorAll(".files__item")
  const bodyList = document.querySelectorAll(".files__screen")

  //Press to different button
  if (!document.getElementById(id + "__files").classList.contains("active-file")) {
    fileList.forEach(listItem => {
      listItem.classList.remove('active-file')
    })

    bodyList.forEach(body => {
      body.style.display = "none"
    })

    document.getElementById(id + "__body").style.display = "flex"
    document.getElementById(id + "__files").classList.add("active-file")
  }
}