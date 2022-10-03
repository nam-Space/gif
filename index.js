const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const nameInput = $('.key')
const numberInput = $('.number')
const searchInput = $('.search')
const deleteInput = $('.delete')
const images = $('.gif-wrapper')
let arrGif = []

function start() {
    let name = nameInput.value
    let number = numberInput.value
    let htmls = ''

    nameInput.onchange = function(e) {
        name = e.target.value
    }

    numberInput.onchange = function(e) {
        number = e.target.value
    }

    function searchGif() {
        searchInput.onclick = function() {
            axios.get(`http://api.giphy.com/v1/gifs/search?q=${name}&api_key=X80XrnDKNOTTLTS9Vp1iA8bJC5PMUksm`)
                .then((res) => {
                    for (let i = 0; i < Number(number); i++) {
                        arrGif.push(res.data.data[Math.floor(Math.random() * res.data.data.length)])
                    }
                    return arrGif
                })
                .then((arrGif) => {
                    arrGif.forEach(gif => {
                        htmls += `<img class='img-gif' src=${gif.images['fixed_height']['url']} alt=${name} />`
                    })
                    images.innerHTML = htmls
                    arrGif.splice(0)
                    htmls = ''
                })
        }
    }

    function deleteGif() {
        deleteInput.onclick = function() {
            images.innerHTML = ''
            nameInput.value = ''
            numberInput.value = ''
            nameInput.focus()
        }
    }

    searchGif()
    deleteGif()
}

start()