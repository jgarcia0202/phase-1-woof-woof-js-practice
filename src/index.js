const pupURL = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const mainContainer = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')

document.addEventListener('DOMContentLoaded', e => {
    fetchPups()
    filterButton.addEventListener('click', e => {
        if (filterButton.textContent == "Filter good dogs: OFF"){
            console.log("Filter good dogs: ON")
            fetchGoodPups()
            filterButton.textContent = 'Filter good dogs: ON'
        }
        else if("Filter good dogs: ON" ) {
            console.log("Filter good dogs: OFF")
            fetchPups()
            filterButton.textContent = 'Filter good dogs: OFF'
        }
    })
})

function fetchPups() {
    dogBar.innerHTML =' '
    fetch(pupURL)
    .then(response => response.json())
    .then(pups => pups.forEach(pup => AddDogBar(pup)))
}
function fetchGoodPups() {
    dogBar.innerHTML =' '
    fetch(pupURL)
    .then(response => response.json())
    .then(pups => {
        let goodPups = []
        pups.forEach(pup => getGoodDogs(pup, goodPups))
        console.log(goodPups)
        goodPups.forEach(dog => AddDogBar(dog))  
    })
}
const AddDogBar = (pup) => {
    let pupCard = document.createElement('span')
    pupCard.innerHTML = `
    ${pup.name}
    `
    dogBar.appendChild(pupCard)
    pupCard.addEventListener('click', e => {
        let goodDog = 'Good Dog!'
        let badDog = 'Bad Dog!'
        let howsDog
        if (pup.isGoodDog == true){
            howsDog = goodDog
        }
        else if (pup.isGoodDog == false){
            howsDog = badDog
        }
        let button = document.createElement('button')
        button.innerHTML = `${howsDog}`
        mainContainer.innerHTML = `
        <img src =${pup.image} />
        <h2>${pup.name}</h2>
        `
        mainContainer.appendChild(button)
        button.addEventListener('click', e => {
            if (pup.isGoodDog == true){
                pup.isGoodDog = false
                howsDog = badDog
            }
            else if (pup.isGoodDog == false){
                pup.isGoodDog = true
                howsDog = goodDog
            }
            button.innerHTML = howsDog
            fetch(pupURL+`/${pup.id}`, 
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    method: 'PATCH',
                    body: JSON.stringify(pup)
            })
            .then(response => response.json())
            .then(pups => console.log(pups))
        })
    })
}
function getGoodDogs(pup, array){
    if (pup.isGoodDog == true){
        array.push(pup)
    }
}