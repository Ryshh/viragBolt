const urlCategories = "https://viragbolt-backend.onrender.com/api/categories"
const urlFlowers = "https://viragbolt-backend.onrender.com/api/flowers"

getData(urlCategories, renderCategories)
getData(urlFlowers, renderCards)
let flowers = []

function getFlowers()
{
    getData("https://viragbolt-backend.onrender.com/api/flowers", fillFlower)    
}

function fillFlower(data)
{
    flowers = data
    //console.log(flowers);
}

function renderCategories(data) 
{
    //console.log(data);
    const category = document.querySelector(".category")

    data.forEach(obj => 
        {
            category.innerHTML += `<button type="button" onclick="selectCategory(this)" class="rounded m-[2px] px-4 py-2 text-sm font-medium text-gray-900 bg-orange-100 border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">${obj.nev}</button>`
        }); 
}

function selectCategory(domObj) 
{
    //console.log(domObj.innerText);
    renderCards(domObj.innerText)   
}

function renderCards(category) 
{
    let container = document.querySelector(".cards")
    container.innerHTML = ""

    //console.log(flowers);
    
    //console.log(data);
    flowers.filter((e) => {return e.kategoria_nev == category}).forEach(obj => {
        //console.log(obj);
        container.innerHTML += createCard(obj)
    }); 
}


function createCard(obj)
{
    return `
    <div class="max-w-sm bg-orange-100 border border-orange-100 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <button popovertarget="mypopover-${obj.id}" href="#">
            <img class="small_img rounded-t-lg" src="${obj.kepUrl}" alt="" />
        </button>
        <div class="p-5 flex content-center items-center">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${obj.nev}</h5>
            </a>
            <div class="popoverContent bg-orange-100 dark:bg-slate-800" id="mypopover-${obj.id}" popover>
                <div class="min-w-[250px] flex flex-col content-center items-center text-gray-900 dark:text-white">
                    <img class="popoverImage min-w-[250px]" src="${obj.kepUrl}">
                    <div class="flex flex-row items-center">
                        <h3 class="text-xl">${obj.ar}Ft</h3>  
                        <p class="m-3">-</p>
                        <h3 class="italic text-xs">(${obj.keszlet}db)</h3>
                    </div>
                    <p class="italic text-sm text-justify">${obj.leiras}</p>
                </div>
            </div>
        </div>
    </div>
    `
}

function searchCards(event) 
{
    event.preventDefault()

    let container = document.querySelector(".cards")
    container.innerHTML = ""

    let searchbar = document.getElementById("queryString")

    searchViragok(searchbar.value).forEach(obj => {
        container.innerHTML += createCard(obj)
    }); 
}

function searchViragok(search) 
{
    return flowers.filter((e) => 
        {
            let nev = e.nev.toLowerCase()
            let leiras = e.leiras.toLowerCase()
            let s = search.toLowerCase()
            return nev.includes(s) ||  leiras.includes(s)
        })
}


getFlowers()

