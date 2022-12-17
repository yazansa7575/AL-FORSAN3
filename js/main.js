let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let number = document.getElementById('number')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let deleteall = document.getElementById('deleteall')
let mode = 'create'
let temp


//get total
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.background = "green"
  } else {
    total.style.background = "#0099ff"
    total.innerHTML = ''

  }
}

//create product

let arrProduct;
if (localStorage.localStorageProduct != null) {
  arrProduct = JSON.parse(localStorage.localStorageProduct)
}
else {
  arrProduct = []
}
submit.onclick = function () {

  let objProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    number: number.value,
    category: category.value.toLowerCase(),
  }
  //next if has created to check clean data from user
  if(title.value !=''&& price.value !='' && category.value !=''&& number.value <250){
    if (mode === 'create') {
      if (objProduct.number > 1) {
        for (let i = 0; i < objProduct.number; i++) {
          arrProduct.push(objProduct)
        }
      } else {
        arrProduct.push(objProduct)
      }
    } else {
      arrProduct[temp] = objProduct
      mode = 'create'
      submit.innerHTML = "create"
      number.style.display = "block"
    }
    let warning =document.getElementById('warning') 
    warning.style.display = "none"
    
    cleardata()
  }else{
    let warning =document.getElementById('warning') 
    warning.style.display = "block"
    warning.innerHTML='Title , Price and Category can not be empty and maximum number of products is 250'
  }

  localStorage.setItem('localStorageProduct', JSON.stringify(arrProduct))
  console.log(arrProduct)


  showdata()

}

//clear data
function cleardata() {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  total.innerHTML = ''
  number.value = ''
  category.value = ''
}

//show fucking products in fucking page

function showdata() {
  getTotal()
  let table = ''
  for (let i = 0; i < arrProduct.length; i++) {

    table += `
    <tr>
    <td>${i + 1} -</td>
    <td>${arrProduct[i].title}</td>
    <td>${arrProduct[i].price}</td>
    <td>${arrProduct[i].taxes}</td>
    <td>${arrProduct[i].ads}</td>
    <td>${arrProduct[i].discount}</td>
    <td>${arrProduct[i].total}</td>
    <td>${arrProduct[i].category}</td>
    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
    <td><button onclick="deleteProduct(${i})" id="deleteoneproduct">Delete</button></td>
    </tr>`

  }
  deleteall.innerHTML = `Delete all ( ${arrProduct.length} )`

  document.getElementById('tbody').innerHTML = table

  if (arrProduct.length > 0) {
    document.getElementById('deleteall').style.display = "block"
  } else {
    document.getElementById('deleteall').style.display = "none"

  }

}

showdata()
//delet all
document.getElementById('deleteall').onclick = function (i) {
  arrProduct.splice(0)
  console.log(arrProduct)
  localStorage.localStorageProduct = JSON.stringify(arrProduct)
  showdata()
}

//delete one product
function deleteProduct(i) {
  arrProduct.splice(i, 1)
  localStorage.localStorageProduct = JSON.stringify(arrProduct)
  showdata()
}

//update products
function updateProduct(i) {
  title.value = arrProduct[i].title
  price.value = arrProduct[i].price
  taxes.value = arrProduct[i].taxes
  ads.value = arrProduct[i].ads
  discount.value = arrProduct[i].discount
  getTotal()
  category.value = arrProduct[i].category
  submit.innerHTML = 'Update'
  number.style.display = "none"
  mode = 'update'
  temp = i

  scroll({
    top: 0,
    behavior: 'smooth',
  })
}

//search
let searchmode = 'title'
function searchProductMode(id) {

  let search = document.getElementById('search')

  if (id === 'searchtitle') {
    searchmode = 'title'
    search.placeholder = 'Search by title'

  } else {
    searchmode = 'category'
    search.placeholder = "Search by category"
  }
  console.log(searchmode)
  search.focus()
  search.value=''
  showdata()

}

function searchProduct(value) {


let table = ''
  if (searchmode == 'title') {

    for (let i = 0; i < arrProduct.length; i++) {
      if(arrProduct[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i + 1} -</td>
        <td>${arrProduct[i].title}</td>
        <td>${arrProduct[i].price}</td>
        <td>${arrProduct[i].taxes}</td>
        <td>${arrProduct[i].ads}</td>
        <td>${arrProduct[i].discount}</td>
        <td>${arrProduct[i].total}</td>
        <td>${arrProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="deleteoneproduct">Delete</button></td>
        </tr>`
      }
    }

  }

  else {
    for (let i = 0; i < arrProduct.length; i++) {
      if(arrProduct[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i + 1} -</td>
        <td>${arrProduct[i].title}</td>
        <td>${arrProduct[i].price}</td>
        <td>${arrProduct[i].taxes}</td>
        <td>${arrProduct[i].ads}</td>
        <td>${arrProduct[i].discount}</td>
        <td>${arrProduct[i].total}</td>
        <td>${arrProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="deleteoneproduct">Delete</button></td>
        </tr>`
      }
    }
  }
  document.getElementById('tbody').innerHTML = table
  }



