$(document).ready(function () {
  
  // Función para obtener la tarea y sus elementos relacionados
  function getTask (element) {
    const task = $("#taskInput").val().trim(); // Obtener el texto de la entrada de tarea
    const taskRow = $(element).closest("li"); // Encontrar el elemento de lista más cercano
    const taskSpan = taskRow.find("span"); // Encontrar el span que contiene el texto de la tarea
    const taskText = taskSpan.text(); // Obtener el texto de la tarea

    return {task, taskRow, taskSpan, taskText}; // Devolver un objeto con la tarea y sus elementos
  }

  // Función para actualizar el mensaje de "no hay tareas"
  function updateNoTasksMessage() {
    const noTasksMessage = $("#noTasksMessage");
    if ($("#taskList li").length === 0) { // Si no hay tareas en la lista
      noTasksMessage.show(); // Mostrar el mensaje de "no hay tareas"
    } else {
      noTasksMessage.hide(); // Ocultar el mensaje si hay tareas
    }
  }

  // Evento que se activa cuando se escribe en el campo de entrada de tarea
  $("#taskInput").on("input", function() {
    const {task} = getTask(this); // Obtener la tarea actual
    if (task !== "") {
      $("#addBtn").removeClass("disabled"); // Habilitar el botón de agregar si hay texto
    } else {
      $("#addBtn").addClass("disabled"); // Deshabilitar el botón si no hay texto
    }
  });

  // Evento que se activa al hacer clic en el botón de agregar tarea
  $("#addBtn").click(function () {
    const {task} = getTask(this); // Obtener la tarea actual

    if (task) {
      // Crear un nuevo elemento de lista con la tarea
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
      `;
      $("#taskList").append(list); // Agregar la nueva tarea a la lista
      $("#taskInput").val(""); // Limpiar el campo de entrada
      $("#addBtn").addClass("disabled"); // Deshabilitar el botón de agregar
      updateNoTasksMessage(); // Actualizar el mensaje de "no hay tareas"
    }
  });

  // Evento que se activa al hacer clic en el botón de completar tarea
  $(document).on("click", "#completeBtn", function () {
    const {taskRow, taskSpan} = getTask(this); // Obtener la fila de tarea y el span
    const editBtn = taskRow.find("#editBtn"); // Encontrar el botón de editar
    const completeBtn = taskRow.find("#completeBtn"); // Encontrar el botón de completar

    taskSpan.toggleClass("completed"); // Alternar la clase "completed" en el span
    if (taskSpan.hasClass("completed")) {
      editBtn.addClass("disabled"); // Deshabilitar el botón de editar si está completada
      completeBtn.text("Descompletar"); // Cambiar el texto del botón a "Descompletar"
    } else {
      editBtn.removeClass("disabled"); // Habilitar el botón de editar si no está completada
      completeBtn.text("Completar"); // Cambiar el texto del botón a "Completar"
    }
  });

  // Evento que se activa al hacer clic en el botón de editar tarea
  $(document).on("click", "#editBtn", function () {
    const {taskRow, taskSpan} = getTask(this); // Obtener la fila de tarea y el span
    const actionsBtn = taskRow.find(".btn"); // Encontrar todos los botones de acción
    const instruction = taskRow.find(".instruction"); // Encontrar la instrucción

    actionsBtn.addClass("disabled"); // Deshabilitar los botones de acción
    taskSpan.attr("contentEditable", "true").focus(); // Hacer el span editable y enfocar
    instruction.show(); // Mostrar la instrucción

    // Configurar el tooltip para el span
    taskSpan.attr("data-bs-toggle", "tooltip");
    taskSpan.attr("title", "Presiona Enter para confirmar los cambios");
    const tooltip = new bootstrap.Tooltip(taskSpan[0]); // Crear el tooltip

    tooltip.show(); // Mostrar el tooltip

    // Evento que se activa al presionar una tecla en el span editable
    taskSpan.on("keypress", function(event) {
      if (event.key === "Enter") { // Si se presiona Enter
        $(this).attr("contenteditable", "false"); // Deshabilitar la edición
        instruction.hide(); // Ocultar la instrucción
        actionsBtn.removeClass("disabled"); // Habilitar los botones de acción
        tooltip.hide(); // Ocultar el tooltip
        $(this).off("keypress"); // Desvincular el evento de keypress
      }
    });
  });

  // Evento que se activa al hacer clic en el botón de eliminar tarea
  $(document).on("click", "#deleteBtn", function () {
    const {taskRow} = getTask(this); // Obtener la fila de tarea
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tarea?"); // Confirmar eliminación

    if (confirmDelete) {
      taskRow.remove(); // Eliminar la fila de tarea
      updateNoTasksMessage(); // Actualizar el mensaje de "no hay tareas"
    }
  });

  // Evento que se activa al hacer clic en el botón de filtrar todas las tareas
  $("#filterAll").click(function() {
    $("#taskList li").show(); // Mostrar todas las tareas
    updateNoTasksMessage(); // Actualizar el mensaje de "no hay tareas"
  });

  // Evento que se activa al hacer clic en el botón de filtrar tareas completadas
  $("#filterCompleted").click(function() {
    $("#taskList li").hide(); // Ocultar todas las tareas
    $("#taskList li").filter(function() {
      return $(this).find("span").hasClass("completed"); // Filtrar solo las completadas
    }).show(); // Mostrar las tareas completadas
    updateNoTasksMessage(); // Actualizar el mensaje de "no hay tareas"
  });

  // Evento que se activa al hacer clic en el botón de filtrar tareas pendientes
  $("#filterPending").click(function() {
    $("#taskList li").hide(); // Ocultar todas las tareas
    $("#taskList li").filter(function() {
      return !$(this).find("span").hasClass("completed"); // Filtrar solo las pendientes
    }).show(); // Mostrar las tareas pendientes
    updateNoTasksMessage(); // Actualizar el mensaje de "no hay tareas"
  });

});

// Este archivo ha sido creado por: Francisco Tejero Angel