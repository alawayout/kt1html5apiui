let currentStorage = localStorage
sessionStorage.clear()

function getStorage(e) {
  if (e.target.value === 'session') {
    sessionStorage.clear()
    currentStorage = sessionStorage
  } else {
    currentStorage = localStorage
  }
  updateTable()
}

document.querySelector('#selectStorage').addEventListener('change', (e) => {
  getStorage(e)
})

function updateTable() {
  let tbody = document.querySelector('tbody') 
  if (currentStorage) {
    tbody.innerHTML = ''
    for (let i of Object.entries(currentStorage)) {
      console.log(i)
      let tr = document.createElement('tr')
      let tdID = document.createElement('td')
      let tdValue = document.createElement('td')
      let tdDelete = document.createElement('td')
      let spanDelete = document.createElement('span')
      tdID.innerText = i[0]
      tdValue.innerText = i[1]
      spanDelete.innerText = 'X'
      tdDelete.appendChild(spanDelete)
      tr.append(tdID, tdValue, tdDelete)
      tbody.appendChild(tr)
      spanDelete.addEventListener('click', (e) => {
        deleteItem(e, i[0], tr)
      })
      
    }
  } else {
    tbody.innerHTML = '<tr></tr>'
  }
}

function deleteItem(e, key, tr) {
  if (confirm('Точно хотите удалить эту запись?')) {
    e.target.parentNode.parentNode.parentNode.removeChild(tr)
    currentStorage.removeItem(key)
    updateTable()
  }
}

function saveItem(){
  let keyInput = document.querySelector('#key')
  let valueInput = document.querySelector('#value')
  if (keyInput.value) {
    currentStorage.setItem(keyInput.value, valueInput.value)
    updateTable()
  } else {
    alert('Введите ключ')
  }
}

let btn = document.querySelector('#subBtn')
  btn.addEventListener('click', () => {
    saveItem()
})

function clearStorage() {
  if (confirm('Точно хотите очистить хранилище?')) {
    currentStorage.clear()
  }
}

document.querySelector('#clear').addEventListener('click', () => {
  clearStorage()
  updateTable()
})

updateTable()