$(document).ready(function () {
  
  function getTask (element) {
    const task = $("#taskInput").val().trim()
    const taskRow = $(element).closest("li")
    const taskSpan = taskRow.find("span")
    const taskText = taskSpan.text()
    
    return {task, taskRow, taskSpan, taskText}
  }

  $("#addBtn").click(function () {
    const {task} = getTask(this)

    if (task) {
      const list =
        `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="text-wrap">${task}</span>
          <div>
            <button class="btn btn-success btn-sm" id="completeBtn">Completar</button>
            <button class="btn btn-warning btn-sm" id="editBtn">Editar</button>
            <button class="btn btn-danger btn-sm" id="deleteBtn">Eliminar</button>
          </div>
        </li>
      `
      $("#taskList").append(list)
      $("#taskInput").val("")
    }
  })

  $(document).on("click", "#completeBtn", function () {
    const {taskRow, taskSpan} = getTask(this)
    const editBtn = taskRow.find("#editBtn")

    taskSpan.toggleClass("completed")
    if (taskSpan.hasClass("completed")) {
      editBtn.addClass("disabled")
    } else {
      editBtn.removeClass("disabled")
    }
  })

  $(document).on("click", "#editBtn", function () {
    const {taskRow, taskText} = getTask(this)
    const newTaskText = prompt("Ingrese la nueva tarea: ", taskText)

    if (newTaskText) {
      taskRow.find("span").text(newTaskText)
    }
  })

  $(document).on("click", "#deleteBtn", function () {
    const {taskRow} = getTask(this)
    taskRow.remove()
  })
})



//Este archivo ha sido creado por: Francisco Tejero Angel