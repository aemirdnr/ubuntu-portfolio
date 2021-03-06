window.onload = function() {
  getFullDate()
  document.querySelector(".boot").style.display = "none"
}

let dateText = document.querySelector("#date")

//Console
const console = document.querySelector(".console")
const consoleBody = document.querySelector(".console__body")
const consoleHeader = console.querySelector(".console__header")
const consoleInput = document.querySelector("#console__input")
const consoleOutput = document.querySelector(".console__output")

//Files
const readMe = document.querySelector("#readme")
const files = document.querySelector("#files")

//Apps
const browser = document.querySelector("#browser")
const browserInput = document.querySelector(".browser__input")

const signal = document.querySelector("#signal")
const signalInput = document.getElementById("signal__input")
const chatList = document.getElementById("chat__list")

const spotify = document.querySelector("#spotify")
const netflix = document.querySelector("#netflix")

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

function openObject(id) {
  let object = document.getElementById(id.id)

  if (object.style.display != "none") {
    object.style.display = "none"
  } else {
    object.style.display = "block"
    if (id == console || id == files || id == readme) {
      consoleInput.focus()
      object.style.top = "20vh"
      object.style.left = "30vh"
    }
  }
}

function buttonClose(id) {
  document.getElementById(id.id).style.display = "none"

  if (id == console) {
    consoleInput.value = ""
    consoleOutput.innerHTML = ""
  }
  else if (id == signal) {
    document.querySelectorAll(".chat__message").forEach(e => e.remove())

    document.getElementById("signal__default").style.display = "flex"
    document.getElementById("signal__chat").style.display = "none"
  }
}

function buttonMinimize(id) {
  document.getElementById(id.id).style.display = "none"
}

let isConsoleFullscreen = false
let isReadmeFullscreen = false

function buttonFullscreen(id) {
  if (id == console) {
    if (!isConsoleFullscreen) {
      isConsoleFullscreen = true
  
      consoleInput.focus()
      consoleHeader.onmousedown = null
  
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
  
      console.style.top = "30vh"
      console.style.left = "30vh"
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

function openApp(id) {
  let app = document.getElementById(id.id)
  let apps = document.querySelectorAll(".app")

  if (app.style.display != "none") {
    app.style.display = "none"
  } else {
    apps.forEach(app => {
      app.style.display = "none"
    })

    app.style.display = "block"
  }
}

//Console commands
consoleInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (consoleInput.value == "whoami") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Hey, this is Emir. Studied Computer Programming at Kocatepe University. Interested in Web Development, mostly front-end. Currently improving myself on JS and React. If you wanna reach out to me write 'contact' to console.<br>\n"
    }
    else if (consoleInput.value == "contact") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Contact via Mail: aemirdnr@gmail.com<br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Contact via Mail 2: aemirdnr@protonmail.com<br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Write 'social' to see my social links.<br>\n"
    }
    else if (consoleInput.value == "social") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Linkedin: <a href='https://linkedin.com/in/aemirdnr' target='_blank'>[GO]<a><br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Github: <a href='https://github.com/aemirdnr' target='_blank'>[GO]<a><br>\n"
    }
    else if (consoleInput.value == "linkedin") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Linkedin: <a href='https://linkedin.com/in/aemirdnr' target='_blank'>[GO]<a><br>\n"
    }
    else if (consoleInput.value == "certificates") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Cybersecurity Essentials - Cisco <a href='https://www.credly.com/badges/2bf82e5d-8815-4a59-8999-ea05758b3aeb/public_url' target='_blank'>[GO]<a><br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Practical Ethical Hacking  - TCM Security <a href='https://drive.google.com/file/d/1TvpNLG47giQiyWu0SpPEr5Cm6NessOQ0/view' target='_blank'>[GO]<a><br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "ICS Cybersecurity (401V) - CISA <a href='https://drive.google.com/file/d/1PgJvOS4_W7NyvxGquQ1g7G71o1EJVTeP/view' target='_blank'>[GO]<a><br>\n"
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "ICS Cybersecurity (301V) - CISA <a href='https://drive.google.com/file/d/15R3Ty2mQMaWfLpwmqUxSPUf760vVshb4/view' target='_blank'>[GO]<a><br>\n"
    }
    else if (consoleInput.value == "help") {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Commands: whoami, contact, social, linkedin, certificates, help, clear, exit.<br>\n"
    }
    else if (consoleInput.value == "clear") {
      consoleOutput.innerHTML = ""
    }
    else if (consoleInput.value == "exit") {
      consoleOutput.innerHTML = ""
      consoleInput.value = ""
      console.style.display = "none"
    }
    else {
      consoleOutput.innerHTML += "aemirdnr@ubuntu: ~$ " + "Command not found. Write 'help' to see commands.<br>\n"
    }
    //Move to end of overflow
    consoleOutput.scrollTop = consoleOutput.scrollHeight
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

//Browser Functions
const browserFrame = document.querySelector(".browser__screen")

browserInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    if (!browserInput.value.includes("http") && !browserInput.value.includes("https")) {
      browserInput.value = "https://" + browserInput.value
      browserFrame.src = browserInput.value
    } else {
      browserFrame.src = browserInput.value
    }
  }
})

function goHomepage() {
  browserInput.value = "https://ubuntu.com"
  browserFrame.src = "https://ubuntu.com"
}

function reloadPage() {
  browserFrame.src = browserFrame.src
}

//Signal Functions
function showChat() {
  document.getElementById("signal__default").style.display = "none"
  document.getElementById("signal__chat").style.display = "flex"
}


signalInput.addEventListener("keyup", function (e){
  if (e.key === 'Enter') {
    if (signalInput.value.length != 0) {
      //HTML DOM - Create message baloon
      const object = document.createElement("li")

      object.classList.add("chat__message", "p-3")
      object.innerHTML = signalInput.value
      chatList.appendChild(object)

      //Go to end of the overflow-x
      chatList.scrollTop = chatList.scrollHeight

      //Clean to input
      signalInput.value = ""
    }
  }
})


//Spotify Functions
document.getElementById("song-slider").oninput = function() {
  var value = (this.value-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient(to right, #1db954 0%, #1db954 ' + value + '%, hsla(0,0%,100%,0.3) ' + value + '%, hsla(0,0%,100%,0.3) 100%)'
};

document.getElementById("volume-slider").oninput = function() {
  var value = (this.value-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient(to right, #1db954 0%, #1db954 ' + value + '%, hsla(0,0%,100%,0.3) ' + value + '%, hsla(0,0%,100%,0.3) 100%)'
};


//Netflix Functionss
function changeScreen(id) {
  let screen = document.getElementById("netflix-" + id)
  let screens = document.querySelectorAll(".netflix-screen")

  let sidebarButton = document.getElementById(id + "-screen")
  let sidebarButtons = document.querySelectorAll(".netflix__sidebar-item")

  if (screen.style.display != "flex") {

    sidebarButtons.forEach(item => {
      item.classList.remove("netflix__sidebar-active")
    })

    sidebarButton.classList.add("netflix__sidebar-active")

    screens.forEach(screen => {
      screen.style.display = "none"
    })

    screen.style.display = "flex"
  }
}

function activateCard(id) {
  let card = document.getElementById("card-" + id)
  let cards = document.querySelectorAll(".netflix__card")

  let intro = document.getElementById("intro-" + id)
  let intros = document.querySelectorAll(".netflix-intro")

  cards.forEach(item => {
    item.classList.remove("netflix__card-active")
  })

  intros.forEach(item => {
    item.style.display = "none"
  })

  card.classList.add("netflix__card-active")

  intro.style.display = "block"
}

//scroll cards using mouse wheel 
let scrollContainers = document.querySelectorAll(".netflix__cards")

scrollContainers.forEach(scrollContainer => {
  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault()
    scrollContainer.scrollLeft += evt.deltaY
  })
})
