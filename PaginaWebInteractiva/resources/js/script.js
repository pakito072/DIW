
window.addEventListener("scroll", function() {
  const progressBar = document.querySelector(".progress .progress-bar")

  const scroll = window.scrollY
  const docHeight = this.document.documentElement.scrollHeight - window.innerHeight

  const scrollPercent = (scroll / docHeight) * 100
  progressBar.style.height = scrollPercent + "%"

  const backBtn = document.getElementById("backBtn")
  const startRange = 0
  const finishRange = 101

  if (scrollPercent > startRange && scrollPercent < finishRange) {
    backBtn.style.display = "block"
  } else {
    backBtn.style.display = "none"
  }

})

document.getElementById("backBtn").addEventListener("click", function() {
  window.scrollTo({top: 0, behavior: "smooth"})
})

document.getElementById("colorBtn").addEventListener("click", function() {
  const colorArea = document.getElementById("colorArea")
  const ramColor = "#" + Math.floor(Math.random() * 16777215).toString(16)

  colorArea.style.backgroundColor = ramColor
})

let clickCount = 0
document.addEventListener("click", function() {
  clickCount++
  document.getElementById("clickCounter").textContent = clickCount
})

document.addEventListener("DOMContentLoaded", function() {
  const fecha = new Date()
  const hora = fecha.getHours()

  if (hora >= 6 && hora < 12) {
    document.getElementById("title").textContent = "Buenos días"
  } else if (hora >= 12 && hora < 20) {
    document.getElementById("title").textContent = "Buenas tardes"
  } else {
    document.getElementById("title").textContent = "Buenas noches"
  }
})

let increasedState = 0
document.getElementById("sizeBtn").addEventListener("click", function(){
  const sizeArea = document.querySelectorAll("p, h1, h4, span, a, button")
  sizeArea.forEach(function(sizeArea) {
  const currentSize = parseFloat(window.getComputedStyle(sizeArea).fontSize)
  const newSizeArea = increasedState ? currentSize - 2 + "px" : currentSize + 2 + "px"
  sizeArea.style.fontSize = newSizeArea
})

increasedState = !increasedState
document.getElementById("emoji").textContent = increasedState ? "➖" : "➕"
})

//Esto ha diso sacado de chat gpt ,pero creo saber como funciona
document.getElementById("voiceBtn").addEventListener("click", function() {
  const textToRead = document.body.innerText
  const speech = new SpeechSynthesisUtterance(textToRead)
  window.speechSynthesis.speak(speech)

})


//Este archivo ha sido creado por: Francisco Tejero Angel