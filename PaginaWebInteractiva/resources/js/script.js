// Función para aplicar el tema claro u oscuro
function applyTheme(theme) {
  const body = document.body
  const themeEmoji = document.getElementById("theme")
  if (theme === "light") {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme")
    themeEmoji.textContent = "🌜" // Emoji para el tema claro
  } else {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
    themeEmoji.textContent = "🌞" // Emoji para el tema oscuro
  }
}

// Aplicar el tema al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark" // Obtener el tema guardado en localStorage o usar "dark" por defecto
  applyTheme(savedTheme)
})

// Lógica para cambiar entre tema oscuro y claro y guardar la preferencia en localStorage
document.getElementById("changeTheme").addEventListener("click", function() {
  const body = document.body
  let newTheme
  if (body.classList.contains("dark-theme")) {
    newTheme = "light" // Cambiar a tema claro si el tema actual es oscuro
  } else {
    newTheme = "dark" // Cambiar a tema oscuro si el tema actual es claro
  }
  applyTheme(newTheme)
  localStorage.setItem("theme", newTheme) // Guardar la preferencia del tema en localStorage
})

// Función para actualizar la barra de progreso y mostrar/ocultar el botón de volver arriba
window.addEventListener("scroll", function() {
  const progressBar = document.querySelector(".progress .progress-bar")

  const scroll = window.scrollY // Obtener la cantidad de desplazamiento vertical
  const docHeight = this.document.documentElement.scrollHeight - window.innerHeight // Calcular la altura total del documento menos la altura de la ventana

  const scrollPercent = (scroll / docHeight) * 100 // Calcular el porcentaje de desplazamiento
  progressBar.style.height = scrollPercent + "%" // Actualizar la altura de la barra de progreso

  const backBtn = document.getElementById("backBtn")
  const startRange = 0
  const finishRange = 101

  if (scrollPercent > startRange && scrollPercent < finishRange) {
    backBtn.style.display = "block" // Mostrar el botón de volver arriba si el porcentaje de desplazamiento está en el rango
  } else {
    backBtn.style.display = "none" // Ocultar el botón de volver arriba si el porcentaje de desplazamiento está fuera del rango
  }

})

// Función para volver al inicio de la página al hacer clic en el botón
document.getElementById("backBtn").addEventListener("click", function() {
  window.scrollTo({top: 0, behavior: "smooth"}) // Desplazarse suavemente al inicio de la página
})

// Función para cambiar el color de un área al hacer clic en el botón
document.getElementById("colorBtn").addEventListener("click", function() {
  const colorArea = document.getElementById("colorArea")
  const ramColor = "#" + Math.floor(Math.random() * 16777215).toString(16) // Generar un color aleatorio en formato hexadecimal

  colorArea.style.backgroundColor = ramColor // Aplicar el color aleatorio al área
})

// Función para contar el número de clics en la página
let clickCount = 0
document.addEventListener("click", function() {
  clickCount++ // Incrementar el contador de clics
  document.getElementById("clickCounter").textContent = clickCount // Actualizar el contador de clics en la página
})

// Función para mostrar un saludo basado en la hora del día
document.addEventListener("DOMContentLoaded", function() {
  const fecha = new Date()
  const hora = fecha.getHours() // Obtener la hora actual

  if (hora >= 6 && hora < 12) {
    document.getElementById("title").textContent = "Buenos días" // Mostrar "Buenos días" si la hora está entre 6 y 12
  } else if (hora >= 12 && hora < 20) {
    document.getElementById("title").textContent = "Buenas tardes" // Mostrar "Buenas tardes" si la hora está entre 12 y 20
  } else {
    document.getElementById("title").textContent = "Buenas noches" // Mostrar "Buenas noches" si la hora está entre 20 y 6
  }
})

// Función para aumentar o disminuir el tamaño del texto al hacer clic en el botón
let increasedState = 0
document.getElementById("sizeBtn").addEventListener("click", function(){
  const sizeArea = document.querySelectorAll("p, h1, h4, span, a, button")
  sizeArea.forEach(function(sizeArea) {
  const currentSize = parseFloat(window.getComputedStyle(sizeArea).fontSize) // Obtener el tamaño de fuente actual
  const newSizeArea = increasedState ? currentSize - 2 + "px" : currentSize + 2 + "px" // Aumentar o disminuir el tamaño de fuente
  sizeArea.style.fontSize = newSizeArea // Aplicar el nuevo tamaño de fuente
})

increasedState = !increasedState // Alternar el estado de aumento
document.getElementById("emoji").textContent = increasedState ? "➖" : "➕" // Cambiar el emoji según el estado de aumento
})

// Función para leer en voz alta el contenido de la página
document.getElementById("voiceBtn").addEventListener("click", function() {
  const textToRead = document.body.innerText // Obtener el texto del cuerpo de la página
  const speech = new SpeechSynthesisUtterance(textToRead) // Crear una instancia de SpeechSynthesisUtterance con el texto
  window.speechSynthesis.speak(speech) // Leer en voz alta el texto

})

//Este archivo ha sido creado por: Francisco Tejero Angel