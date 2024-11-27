$(document).ready(function() {
  const taskRow = $(this).closest("li")
  const taskText = taskRow.find("span").text()
  const editBtn = $("#editBtn")

  $("#addBtn").click(function(){
    const task = $("#taskInput").val().trim()
    if (task) {
      const list =
      `
        <li class="list-group-item d-flex justify-content-between align-items-center bg-dark">
          <span>${task}</span>
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

  $(document).on("click", "#completeBtn", function(){
    taskText.toogleClass("completed")

    if (taskText.hasClass("completed")) {
      editBtn.addClass("disabled")
      taskRow.addClass("disabled")
    } else {
      editBtn.removeClass("disabled")
      taskRow.removeClass("disabled")
    }
  })

  $(document).on("click", "#editBtn", function(){
  const newTaskText = prompt("Ingrese la nueva tarea: ", taskText)
      if (newTaskText) {
        taskRow.find("span").text(newTaskText)
      }
  })

  $(document).on("click", "#deleteBtn", function(){
    $(this).closest("li").remove()
  })

  $("#filterAll").click(function(){
    $("#taskList li").show()
  })

  $("#filterCompleted").click(function(){
    $("#taskList li").hide()
    $("#taskList li:hasClass(.completed)").show()
  })

  $("#filterPending").click(function(){
    $("#taskList li").hide()
    $("#taskList li:not(:hasClass(.completed))").show()
  })
})



//Este archivo ha sido creado por: Francisco Tejero Angel