const bgVid = document.getElementById("bgVid")
const bgMusic = document.getElementById("bgMusic")
const volPlusBtn = document.getElementById("vol+Btn")
const volLessBtn = document.getElementById("vol-Btn")
const muteBtn = document.getElementById("muteBtn")
const nextSongBtn = document.getElementById("nextSongBtn")
const prevSongBtn = document.getElementById("prevSongBtn")
const statServText = document.getElementById("statServText")

let isMuted = false
let volume = 1
let currentSong = 0
let currentStatus = 0

//Funcion para ir cambiando el estado (me refiero los textos que ejemplifican el estado)
function updateStatusServer() {
  const states = ["JOINING SERVER", "PREPARING ASSETS", "ESTABLISHING CONNECTION"] // Queria poner textos random para hacer la gracia pero no me la quiero jugar a que me baje la nota 
  currentStatus = (currentStatus + 1) % states.length
  statServText.textContent = states[currentStatus]
}


//Lista de canciones
const songs = [
  {
    audio: "",
    video: ""
  },
  {
    audio: "",
    video: ""
  },
  {
    audio: "",
    video: ""
  }
]


//Funcion para ajustar el video a la cancion correspondiente
function playSong() {
  bgVid.src = songs[currentSong].video
  bgMusic.src = songs[currentSong].audio
  bgMusic.volume = volume
  bgVid.play()
  bgMusic.play()

}


//Funcion para cambiar canciones a lo random
function switchSong() {
  currentSong = Math.floor(Math.random() * songs.length)
  playSong()

}


//Funcion para quitar o no el sonido (MUTE)
function mute() {
  isMuted = !isMuted
  bgMusic.muted = isMuted
  muteBtn.innerText = isMuted ? "UNMUTE" : "MUTE"

}


//Funcion para aumentar el volumen (vol+)
function volPlus() {
  if (volume < 1){
    volume += 0.1
    bgMusic.volume = volume
  }

}


//Funcion para disminuir el volumen (vol-)
function volLess() {
  if (volume > 0){
    volume -= 0.1
    bgMusic.volume = volume
  }

}


//Funcion para pasar a la siguiente cancion (NEXT)
function next() {
  currentSong = (currentSong + 1) % songs.length
  playSong()

}


//Funcion para retroceder a la cancion anterior (PREV)
function prev() {
  currentSong = (currentSong - 1 + songs.length) % songs.length
  playSong()

}

//Asignacion de uso a cada boton
volPlusBtn.addEventListener("click", volPlus)
volLessBtn.addEventListener("click", volLess)
muteBtn.addEventListener("click", mute)
nextSongBtn.addEventListener("click", next)
prevSongBtn.addEventListener("click", prev)


//Asignacion del control de la musica a teclas del teclado
document.addEventListener("keydown", function (event){
  if (event.key === "ArrowRight"){
    next()
  }
  if (event.key === "ArrowLeft"){
    prev()
  }
  if (event.key === "ArrowUp"){
    volPlus()
    }
  if (event.key === "ArrowDown"){
    volLess()
  }
  if (event.key === "Space"){
    mute()
  }

}) 


//Iniciar musica al entrar a la pagina
window.onload = function() {
  playSong()
  setInterval(updateStatusServer, 3000)
}


