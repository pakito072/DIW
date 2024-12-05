$(document).ready(function () {
  
  // Función para obtener la tarea y sus elementos relacionados
  function getTask (element) {
    const task = $("#taskInput").val().trim()
    const taskRow = $(element).closest("li") // Encontrar el elemento de lista más cercano
    const taskSpan = taskRow.find("span")
    const taskText = taskSpan.text()
    
    return {task, taskRow, taskSpan, taskText}
  }

  // Función para actualizar el mensaje de "no hay tareas"
  function updateNoTasksMessage() {
    const noTasksMessage = $("#noTasksMessage");
    if ($("#taskList li").length === 0) { // Si no hay tareas en la lista
      noTasksMessage.show();
    } else {
      noTasksMessage.hide();
    }
  }

  // Evento que se activa cuando se escribe en el campo de entrada de tarea
  $("#taskInput").on("input", function() {
    const {task} = getTask(this)
    if (task !== "") {
      $("#addBtn").removeClass("disabled")
    }else {
      $("#addBtn").addClass("disabled");
  }
  })

  // Evento que se activa al hacer clic en el botón de agregar tarea
  $("#addBtn").click(function () {
    const {task} = getTask(this)

    if (task) {
      const list =
        `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="text-wrap">${task}</span>
          <div class="btn-group">
            <button class="btn btn-success btn-sm" id="completeBtn">Completar</button>
            <button class="btn btn-warning btn-sm" id="editBtn">Editar</button>
            <button class="btn btn-danger btn-sm" id="deleteBtn">Eliminar</button>
          </div>
        </li>
      `
      $("#taskList").append(list)
      $("#taskInput").val("")
      $("#addBtn").addClass("disabled");
      updateNoTasksMessage()
    }
    console.log()
  })

  // Evento que se activa al hacer clic en el botón de completar tarea
  $(document).on("click", "#completeBtn", function () {
    const {taskRow, taskSpan} = getTask(this)
    const editBtn = taskRow.find("#editBtn")
    const completeBtn = taskRow.find("#completeBtn")

    taskSpan.toggleClass("completed")
    if (taskSpan.hasClass("completed")) {
      editBtn.addClass("disabled")
      completeBtn.text("Descompletar")
    } else {
      editBtn.removeClass("disabled")
      completeBtn.text("Completar")
    }
  })

  // Evento que se activa al hacer clic en el botón de editar tarea
  $(document).on("click", "#editBtn", function () {
    const {taskRow, taskSpan} = getTask(this)
    const actionsBtn = taskRow.find(".btn")
    const instruction = taskRow.find(".instruction")

    actionsBtn.addClass("disabled")
    taskSpan.attr("contentEditable", "true").focus()
    instruction.show()

    // Configurar el tooltip para el span
    taskSpan.attr("data-bs-toggle", "tooltip")
    taskSpan.attr("title", "Presiona Enter para confirmar los cambios")
    const tooltip = new bootstrap.Tooltip(taskSpan[0])

    tooltip.show()

    // Evento que se activa al presionar una tecla en el span editable
    taskSpan.on("keypress", function(event) {
      if (event.key === "Enter") {
        $(this).attr("contenteditable", "false")
        instruction.hide()
        actionsBtn.removeClass("disabled")
        tooltip.hide()
        $(this).off("keypress")
      }
    })
  })

  // Evento que se activa al hacer clic en el botón de eliminar tarea
  $(document).on("click", "#deleteBtn", function () {
    const {taskRow} = getTask(this)
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tarea?")

    if (confirmDelete) {
    taskRow.remove()
    updateNoTasksMessage()
    }
  })

  //Filtro para mostrar todas las tareas
  $("#filterAll").click(function() {
    $("#taskList li").show()
    updateNoTasksMessage()

  })

  //Filtro para mostrar las tareas que tengan la clase completed
  $("#filterCompleted").click(function() {
    $("#taskList li").hide()
    $("#taskList li").filter(function() {
      return $(this).find("span").hasClass("completed")
    }).show()
    updateNoTasksMessage()
  })

  //Filtro para mostrar las tareas que no tengan la clase completed
  $("#filterPending").click(function() {
    $("#taskList li").hide();
    $("#taskList li").filter(function() {
      return !$(this).find("span").hasClass("completed")
    }).show()
    updateNoTasksMessage()
  })

})



//Este archivo ha sido creado por: Francisco Tejero Angel