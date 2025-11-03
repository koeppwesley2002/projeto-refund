// SELECIOMA OS ELEMENTOS DO FORMULÁRIO
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const expensesList = document.querySelector('ul')

//seleciona elemento do total
const expensequantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

// CAPTURA DO EVENTO E FORMATAR O VALOR
amount.oninput = () => {
    //CAPTURANDO O VALOR ATUAL DO INPUT E REMOVENDO CARACTERES 
  let value = amount.value.replace(/\D/g, "")
  //console.log(value)

  //TRANSFORMA O VALOR EM CENTAVOS (ex: 150/100 = 1.5)
  value = Number(value) / 100
  
  //RETORNO PARA A VARIAVEL
  amount.value = formatcurrency(value)
}

//FORMATA VALOR PARA MOEDA BRASILEIRA
function formatcurrency(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

//CAPTURA O EVENTO DE SUBMIT DO FOR E OBTEM OS VALORES
form.onsubmit = (event) => {
    //PREVINE COMPORTAMENTO DE ATT AUTOMATICA
    event.preventDefault()

    // CRIA UM OBJETO COM OS DETALHES DA NOSSA DESPESA
    const newEXPENSE = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        creat_at: new Date()
    }

    expenseADD(newEXPENSE)
}

//ADIÇÃO DOS ITENS NA LISTA 
function expenseADD(newEXPENSE) {
    try {
       //CRIA O ELEMENTO PARA ADD NA LISTA
  const expenseItem = document.createElement('li')
  expenseItem.classList.add('expense')

  //criando o icone  na categoria
  const expenseIcon = document.createElement('img')
  expenseIcon.setAttribute("src", `img/${newEXPENSE.category_id}.svg`)
  expenseIcon.setAttribute("alt", newExpense.category_name)

  //criando a info da despesa
  const expenseInfo = document.createElement('div')
  expenseName.classList.add('expense-info')

  //criando o nome da despesa
  const expenseName = document.createElement("strong")
  expenseName.textContent = newExpense.expense

  //criando a categoria da despesa
   const expenseCategory = document.createElement("span")
   expenseCategory.textContent = newExpense.category_name

   //adiciona nome e categoria na div, antes do item 
   expenseInfo.append(expenseName, expenseCategory)

   //add valor
   const expenseAmount = document.createElement("span")
   expenseAmount.classList.add("expense-amount")
   expenseAmount.innerHTML = `small>R$</small> ${newExpense.amount.replace("R$ ","")}`

    // add o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src","img/remove.svg")
    removeIcon.setAttribute("alt","remover")

  //add info no item 
  expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //adiciona os itens na lista
    expensesList.append(expenseItem)

    //chama a atualização do total
    updatetotal()

    //limpa o for
    formclear()

} catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.")
    console.log(error)
}
}

function updatetotal() {
    try {
      //recupera todos os itens (li) da lista (ul)
      const items = expensesList.children
     //console.log(items)

        //atualiza a quantidade de itens da lista
      expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`


       //variavel para incrementar o total
       let total = 0

       //percorrer cada item (li)
       for(let item = 0; item < items.length; item++) {
        // vai percorrer cada irtem (li) e busca somente a classe .expense-amount
        const itemamount = items[item].querySelector(".expense-amount")
        //console.log(itemamount)

        //agora vamos pegar somente o valor 
        const value = itemamount.textContent.replace(/[^d,]/g, "").replace(",", ".")

        //converter o valor para float
        const valueformatted = parseFloat (value)
       
        //verificar se realmente é um numero
        if(!isNaN (valueformatted)) {
            return alert("Não foi possivel calcular o total. O valor não parece ser um número.")
        }

        //incrementa o valor TOTAL
        total += valueformatted // total = total + valueformatted
       }

      //expenseTotal.textContent= total
      //expenseAmount.innerHTML = ` <small>R$</small> ${String(total).replace(".", ",")}`

      const symbol = document.createElement("small")
      symbol.textContent = "R$"

      total = formatcurrencyBRL(total).replace("R$ ","")
      expenseTotal.innerHTML = ""
      expenseTotal.append(symbol, total)
     
    } catch (error) {
    console.log(error)
     alert("não foi possivel atualizar os valores")
    }
}

expensesList.addEventListener("click", function() {
    //console.log(event)

    if(event.target.classList.contains("remove-icon")) {
        //obter a lista pai do elemento clicado
        const item = Event.target.closest(".expense")
        item.remove()
    }

    updatetotal()
    })

    function formclear() {
        expense.value = ""
        category.value = ""
        amount.value = ""

        expense.focus()
    }