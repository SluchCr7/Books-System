let BookName = document.getElementById("BookName"),
    AuthorName = document.getElementById("AuthorName"),
    Price = document.getElementById("Price"),
    Quantity = document.getElementById("Quantity"),
    btnAdd = document.getElementById("btnAdd")    
let tbody = document.getElementById("tbody")
let deleteBtn = document.getElementById("delete")
let DeleteAll = document.getElementById("DeleteAll")
let NotifyText = document.getElementById("NotifyText")
let updateData = document.getElementById("Update")

let temp;

// Creat Book
let dataArr;
if (localStorage.Data != null) {
    dataArr = JSON.parse(localStorage.getItem("Data"))
}
else {
    dataArr = []
}



btnAdd.addEventListener("click", () => {
    console.log(!Number.isNaN(BookName.value))
    if (BookName.value == "" || AuthorName.value == "" || Price.value == "") {
        NotifyText.classList.remove("noneView")
        NotifyText.innerHTML = "Please Enter All Data"
        setTimeout(() => {
            NotifyText.classList.add("noneView")
        } , 1000)
    }
    else if (Quantity.value >= 500) {
        NotifyText.classList.remove("noneView")
        NotifyText.innerHTML = "This is a large Quantity"
        setTimeout(() => {
            NotifyText.classList.add("noneView")
        } , 1000)
    }
    else if (!Number.isNaN(AuthorName.value)) {
        let card = {
            BookName: BookName.value,
            AuthorName: AuthorName.value,
            PriceCont: Price.value >= 100 && Price.value < 200 ? Price.value -= 20 : Price.value >= 200 ? Price.value -= 50 : Price.value,
            QuantityCont : Quantity.value || 1
        }
        if (btnAdd.innerHTML == "Update") {
            dataArr[temp] = card
            btnAdd.innerHTML = "Add"
            localStorage.setItem("Data", JSON.stringify(dataArr))
            BookName.value = ""
            AuthorName.value = ""
            Price.value = ""
            Quantity.value = ""
            NotifyText.classList.remove("noneView")
            NotifyText.innerHTML = "Updated Successfully"
            setTimeout(() => {
                NotifyText.classList.add("noneView")
            } , 1000)
        }
        else{
            dataArr.push(card)
            // console.log(dataArr)
            localStorage.setItem("Data", JSON.stringify(dataArr))
            NotifyText.classList.remove("noneView")
            NotifyText.innerHTML = "Added Successfully"
            setTimeout(() => {
                NotifyText.classList.add("noneView")
            }, 1000)
            BookName.value = ""
            AuthorName.value = ""
            Price.value = ""
            Quantity.value = ""
            // creatCard()
        }
    }
})


// Read

function creatCard() {
    for (let i = 0; i < dataArr.length; i++) {
        tbody.innerHTML += `
            <tr class="t_row">
                <td class="t_ceil">${i + 1}</td>
                <td class="t_ceil">${dataArr[i].BookName}</td>
                <td class="t_ceil">${dataArr[i].AuthorName}</td>
                <td class="t_ceil">${dataArr[i].PriceCont} $</td>
                <td class="t_ceil">${dataArr[i].QuantityCont}</td>
                <td class="t_ceil">
                <div class="icons">
                    <i class="fa-solid fa-trash-can deleteIcon" onclick="deleteData(${i})" id="delete"></i>
                    <i class="fa-solid fa-pen updateIcon" onclick="UpdateData(${i})" id="update"></i>
                    <i class="fa-solid fa-xmark deleteAllIcon" onclick="DeleteItemAll(${i})" id="DeleAllItem"></i>
                </div>
                </td>
            </tr>
        `
    }
}


// Delete
function deleteData(i) {
    dataArr[i].QuantityCont = dataArr[i].QuantityCont - 1
    localStorage.setItem("Data", JSON.stringify(dataArr))
    tbody.innerHTML = ""
    creatCard()
    if (dataArr[i].QuantityCont == 0) {
        dataArr.splice(i, 1)
        localStorage.setItem("Data", JSON.stringify(dataArr))
        tbody.innerHTML = ""
        creatCard()
        NotifyText.classList.remove("noneView")
        NotifyText.textContent = "Deleted Successfully"
        setTimeout(() => {
            NotifyText.classList.add("noneView")
        } , 1000)
    }
}



// Delete All
DeleteAll.addEventListener("click", () => {
    if (dataArr.length > 0) {
        dataArr = []
        localStorage.setItem("Data", JSON.stringify(dataArr))
        tbody.innerHTML = ""
        creatCard()
        NotifyText.classList.remove("noneView")
        NotifyText.textContent = "Deleted Successfully"
        DeleteAll.classList.add("colorClick")
    }
    else {
        NotifyText.classList.remove("noneView")
        NotifyText.textContent = "Nothing To Delete"
        DeleteAll.classList.add("colorClick")
        setTimeout(() => {
            NotifyText.classList.add("noneView")
        } , 1000)
    }
})


let search = document.getElementById("search")
let waterIcon = document.getElementById("waterIcon")


let isClassicMode = localStorage.getItem("ClassicMode") == "true"

if (isClassicMode) {
    enableClassicMode()
}

function enableClassicMode() {
    document.body.classList.add("ClassicMode")
    localStorage.setItem("ClassicMode", "true")
}

function disableClassicMode() {
    document.body.classList.remove("ClassicMode")
    localStorage.setItem("ClassicMode", null)
}

waterIcon.addEventListener("click", () => {
    if (document.body.classList.contains("ClassicMode")) {
        disableClassicMode()
    }
    else {
        enableClassicMode()
    }
})

// Update
function UpdateData(i) {
    // console.log(i)
    BookName.value = dataArr[i].BookName
    AuthorName.value = dataArr[i].AuthorName
    Price.value = dataArr[i].PriceCont >= 100 && dataArr[i].PriceCont < 200 ? dataArr[i].PriceCont += 20 : dataArr[i].PriceCont >= 200 ? dataArr[i].PriceCont += 50 : dataArr[i].PriceCont
    Quantity.value = dataArr[i].QuantityCont
    btnAdd.innerHTML = "Update"
    temp = i
}

function DeleteItemAll(i) {
    dataArr.splice(i, 1)
    localStorage.setItem("Data", JSON.stringify(dataArr))
    tbody.innerHTML = ""
    creatCard()
}


creatCard()