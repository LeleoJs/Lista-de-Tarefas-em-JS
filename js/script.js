// ID da ul da lista de produtos -> lista-produtos
// ID do input do nome do produto -> produtoAdd-nome
// ID do input do preço do produto -> produtoAdd-preco
// ID do botão de adicionar o novo produto -> btn-AddProduto


//Declaração de variáveis
let listaProdutos = document.querySelector('#lista-produtos');
let nomeProduto = document.querySelector('#produtoAdd-nome');
// let precoProduto = document.querySelector('#produtoAdd-preco');
let btnAddProduto = document.querySelector('#btn-AddProduto');

let lista = [];

//Espera para adição de novos produtos
btnAddProduto.addEventListener('click', addProduto);

nomeProduto.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addProduto()
    }
})

//Espera para adicionar valor do produto
if (lista.length = !0) {

}

//Funções internas
function addProduto() {
    let item = createNewItem(nomeProduto.value);
    checkboxListener(item);
    listaProdutos.appendChild(item);
    nomeProduto.value = '';
    nomeProduto.focus();

}

function removeProduto(item) {
    checkboxListener(item,true);
    item.remove()
}

function createNewItem(name) {
    let li = document.createElement("li");;
    li.classList.add("row", "px-5", "pb-1");

    let input = document.createElement("input");
    input.classList.add("col-1");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", name);
    input.setAttribute("name", name);

    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-danger", "col-1");
    button.innerHTML = "X";
    button.setAttribute("onclick", "removeProduto(this.parentElement,true)");

    let label = document.createElement("label");
    label.classList.add("col-10", "text-start");
    label.innerHTML = name;
    label.setAttribute("for", name);

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(button);
    return li
}

function checkboxListener(item, remove = false) {
    let input=item.getElementsByTagName("input")[0];
    if (remove) {
        console.log("Event removed");
        input.removeEventListener('change', function () {
        });
    }
    else {
        input.addEventListener('change', function () {
            if (this.checked) {
                console.log("Checkbox is checked..");
            } else {
                console.log("Checkbox is not checked..");
            }
        });
    }
}

