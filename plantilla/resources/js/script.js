$(document).ready(function () {
  
  function getTask (element) {
    const task = $("#taskInput").val().trim()
    const taskRow = $(element).closest("li")
    const taskSpan = taskRow.find("span")
    const taskText = taskSpan.text()
    
    return {task, taskRow, taskSpan, taskText}
  }

  $("#taskInput").on("input", function() {
    const {task} = getTask(this)
    if (task !== "") {
      $("#addBtn").removeClass("disabled")
    }else {
      $("#addBtn").addClass("disabled");
  }
  })

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
    }
    console.log()
  })

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

  $(document).on("click", "#editBtn", function () {
    const {taskRow, taskSpan} = getTask(this)
    const actionsBtn = taskRow.find(".btn")
    const instruction = taskRow.find(".instruction")

    actionsBtn.addClass("disabled")
    taskSpan.attr("contentEditable", "true").focus()
    instruction.show()

    taskSpan.attr("data-bs-toggle", "tooltip")
    taskSpan.attr("title", "Presiona Enter para confirmar los cambios")
    const tooltip = new bootstrap.Tooltip(taskSpan[0])

    tooltip.show()

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

  $(document).on("click", "#deleteBtn", function () {
    const {taskRow} = getTask(this)
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tarea?")

    if (confirmDelete) {
    taskRow.remove()
    }
  })

  $("#filterAll").click(function() {
    $("#taskList li").show()

  })

  $("#filterCompleted").click(function() {

    $("#taskList li").hide()
    $("#taskList li").filter(function() {
      return $(this).find("span").hasClass("completed")
    }).show()
  })

  $("#filterPending").click(function() {

    $("#taskList li").hide();
    $("#taskList li").filter(function() {
      return !$(this).find("span").hasClass("completed")
    }).show()
  })
})



//Este archivo ha sido creado por: Francisco Tejero Angel