
//Declaração de variáveis
let listaTarefas = document.querySelector('#lista-tarefas');
let nomeTarefas = document.querySelector('#tarefaAdd-nome');
let btnAddTarefa = document.querySelector('#btn-AddTarefa');
let lista = [];

//Salvando no local storange
if (localStorage.getItem("listaTarefas") == null) {
    localStorage.setItem("listaTarefas", "null");
}
else {
    localStorage.getItem("listaTarefas").split(",").forEach((valor) => {
        if (valor != "null") { //Gambiarra para impedir que crie uma label vazia ou nesse caso "null"
            let item = createNewItem(valor);
            checkboxListener(item);
            listaTarefas.appendChild(item);
        }
    })
    nomeTarefas.value = '';
    nomeTarefas.focus();
}

//Espera para adição de novas tarefas
btnAddTarefa.addEventListener('click', addTarefa);

nomeTarefas.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addTarefa()
    }
})

//Funções internas
function addTarefa() {
    let item = createNewItem(nomeTarefas.value);
    checkboxListener(item);
    listaTarefas.appendChild(item);
    //Adicionar ao localstorange
    localStorage.setItem("listaTarefas", localStorage.getItem("listaTarefas") + "," + nomeTarefas.value);
    nomeTarefas.value = '';
    nomeTarefas.focus();
}

function removeTarefa(item) {
    checkboxListener(item, true);
    item.remove()
    //Remover do localstorange
    localStorage.setItem("listaTarefas", localStorage.getItem("listaTarefas").replace(","+item.children[1].innerText,""));
}

function createNewItem(name) {
    let li = document.createElement("li");;
    li.classList.add("row", "py-2", "px-5", "li_background", "my-1");

    let input = document.createElement("input");
    input.classList.add("col-1");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", name);
    input.setAttribute("name", name);

    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-danger", "col-1");
    button.innerHTML = "X";
    button.setAttribute("onclick", "removeTarefa(this.parentElement,true)");

    let label = document.createElement("label");
    label.classList.add("col-10", "text-start", "align-self-center");
    label.innerHTML = name;
    label.setAttribute("for", name);

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(button);
    return li
}

function checkboxListener(item, remove = false) {
    let input = item.getElementsByTagName("input")[0];
    if (remove) {
        console.log("Event removed");
        input.removeEventListener('change', function () {
        });
    }
    else {
        input.addEventListener('change', function () {
            if (this.checked) {
                console.log("Checkbox is checked..");
                console.log(item.children[1].style.textDecoration="line-through");
            } else {
                console.log("Checkbox is not checked..");
                console.log(item.children[1].style.textDecoration="");
            }
        });
    }
}

