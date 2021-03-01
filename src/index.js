const tableBody = document.querySelector('#table-body');
const form = document.querySelector('#dog-form');
let editId = null;

document.addEventListener('DOMContentLoaded', () => {
    getDogs()

    form.addEventListener('submit', updateDog)
})

const getDogs = () => {
    axios.get('http://localhost:3000/dogs')
        .then(res => {
            for (let dog of res.data) createDogRow(dog)
        })
        .catch(err => console.log(err))
}

const updateDog = e => {
    e.preventDefault()
    if (editId) {
        const tr = document.getElementById(editId)
        axios.patch(`http://localhost:3000/dogs/${editId}`, {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        })
            .then(res => {
                const name = tr.querySelector('td.name')
                const breed = tr.querySelector('td.breed')
                const sex = tr.querySelector('td.sex')
                name.innerText = e.target.name.value
                breed.innerText = e.target.breed.value
                sex.innerText = e.target.sex.value
                clearInput()
            })
    }
}

const createDogRow = dog => {
    const tr = document.createElement('tr')
    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const btnTd = document.createElement('td')
    const btn = document.createElement('button')

    tr.id = dog.id
    tr.setAttribute('dog-name', dog.name)
    name.innerText = dog.name
    name.className = 'name'
    breed.innerText = dog.breed
    breed.className = 'breed'
    sex.innerText = dog.sex
    sex.className = 'sex'
    btn.innerText = "Edit Dog"

    btn.addEventListener('click', () => handleEdit(dog))

    btnTd.appendChild(btn)
    tr.append(name, breed, sex, btnTd)
    tableBody.appendChild(tr)
}

const handleEdit = dog => {
    const name = document.querySelector('input[name="name"]')
    const breed = document.querySelector('input[name="breed"]')
    const sex = document.querySelector('input[name="sex"]')
    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex

    editId = dog.id
}

const clearInput = () => {
    const name = document.querySelector('input[name="name"]')
    const breed = document.querySelector('input[name="breed"]')
    const sex = document.querySelector('input[name="sex"]')
    name.value = ""
    breed.value = ""
    sex.value = ""
    editId = null;
}