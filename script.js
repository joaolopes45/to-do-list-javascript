const localStorageKey = "to-do-list";

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById("input-new-task").value;

    let exists = values.find(x => x.name === inputValue);

    return exists ? true : false;
}

function newTask() {
    let input = document.getElementById("input-new-task");

    input.style.border = "";

    // Validação
    if (!input.value) {
        input.style.border = "1px solid red";
        alert("Digite algo para inserir na sua lista de tarefas!");
        return;
    }

    if (validateIfExistsNewTask()) {
        alert("Essa tarefa já existe na sua lista de tarefas!");
        return;
    }

    // Incrementa no Local Storage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    values.push({
        name: input.value
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showValues();

    input.value = "";
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById("to-do-list");

    list.innerHTML = "";

    for (let i = 0; i < values.length; i++) {
        let li = document.createElement("li");

        li.innerHTML = `
            ${values[i].name}

            <button id="btn-ok" onclick="removeItem(${i})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                </svg>
            </button>
        `;

        list.appendChild(li);
    }
}

function removeItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    values.splice(index, 1);

    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showValues();
}

showValues();