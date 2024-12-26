// console.log("connected......")

const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/peddy/categories"
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.categories);
    displayCategories(data.categories);
}






const displayCategories = (categories) => {
    // console.log(categories);
    const btnContainer = document.getElementById('btn-container');
    categories.forEach(category => {
        // console.log(category);
        btnContainer.innerHTML += `
        <button id = "btn-${category.category}" onclick = "loadPetByCategory('${category.category}')" class="btn category-btn bg-transparent rounded-lg bg-white flex items-center"><img class = "w-4 h-4 object-cover" src = ${category.category_icon}/><span>${category.category}</span></button> 
        `
    });
}

const loadAllPets = async () => {
    loadingSpinner(true)
    const url = "https://openapi.programming-hero.com/api/peddy/pets";
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.pets);
    setTimeout(() => {
        displayPets(data.pets);
        storedFetchedData = data.pets;
        loadingSpinner(false);
    }, 2000)
}

const loadPetByCategory = async (category) => {

    // remove active button if exist
    removeActiveClasses();


    // show active button
    addActiveClasses(category);


    loadingSpinner(true)
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    setTimeout(() => {
        displayPets(data.data);
        storedFetchedData = data.data;
        loadingSpinner(false);
    }, 2000)
}

const loadPetDetails = async (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.petData);
    displayDetailsModal(data.petData);
}

const displayDetailsModal = (pet) => {
    console.log(pet);
    const detailsModal = document.getElementById('detailsModal');
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
     <div class="card mx-auto">
                    <figure class = "w-full">
                        <img class = "w-full mx-auto object-cover" src= ${pet.image}
                            alt="pet" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${pet?.pet_name || "Unknown"}</h2>
                        <div class="divider"></div>
                       <div class = "flex items-center gap-5">


                       <div>
                        <p class="space-x-2"><i class="fa-brands fa-figma"></i><span>Breed Name : ${pet.breed || "Unknown"}</span></p>
                        <p class="space-x-2"><i class="fa-solid fa-mercury"></i><span>Gender : ${pet.gender || "Unknown"}</span></p>
                        <p class="space-x-2"><i class="fa-solid fa-mercury"></i><span>Vaccinated Status : ${pet.vaccinated_status || "Unknown"}</span></p>
                       </div>


                       <div>
                       <p class="space-x-2"><i class="fa-solid fa-dollar-sign"></i><span>Price : ${pet.price || "sold"}</span></p>
                        
                        <p class="space-x-2"><i class="fa-solid fa-cake-candles"></i><span>Birth : ${pet.date_of_birth || "Not Available"}</span></p>
                       
                       </div>
                       
                       </div>
                       <div class="divider"></div>
                       <div>
                       <h1 class = "text-2xl font-bold text-gray-800">Details Information</h1>
                       <p class = "text-gray-600 font-light">${pet.pet_details}</p>
                       
                       </div>
                        
                        <div class="modal-action">
                <form class="w-full" method="dialog">
                    <!-- if there is a button, it will close the modal -->
                    <button class="btn w-full">Close</button>
                </form>
                        
                    </div>
                </div>
    
    
    
    `
    detailsModal.showModal();
}




const displayPets = (data) => {
    // console.log(data);
    const mainPetContainer = document.getElementById('mainPetsContainer');
    // mainPetContainer.innerHTML = '';
    if (data.length == 0) {
        mainPetContainer.classList.remove("grid");
        mainPetContainer.innerHTML = `
        <div class = "flex justify-center items-center h-full">
        <div class = "flex flex-col justify-center items-center">
        <img src = "./images/error.webp"/>
        <h1 class = "text-3xl font-bold text-gray-700">No Information is available</h1>
        
        </div>

        
        
        </div>
        `

    }
    else {
        mainPetContainer.classList.add("grid");
    }

    data.forEach(pet => {
        // console.log(pet);
        mainPetContainer.innerHTML += `
        <div class="card card-compact bg-base-100 w-full shadow-xl">
                    <figure>
                        <img src= ${pet.image}
                            alt="pet" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${pet?.pet_name || "Unknown"}</h2>
                        <p class="space-x-2"><i class="fa-brands fa-figma"></i><span>Breed Name : ${pet.breed || "Unknown"}</span></p>
                        <p class="space-x-2"><i class="fa-solid fa-cake-candles"></i><span>Birth : ${pet.date_of_birth || "Not Available"}</span></p>
                        <p class="space-x-2"><i class="fa-solid fa-mercury"></i><span>Gender : ${pet.gender || "Unknown"}</span></p>
                        <p class="space-x-2"><i class="fa-solid fa-dollar-sign"></i><span>Price : ${pet.price || "sold"}</span></p>
                        <div class="divider"></div>
                        <div class="grid grid-cols-3 gap-1">
                            <button onclick = "liked('${pet.image}')" class="btn btn-sm"><i class="fa-regular fa-heart"></i></button>
                            <button onclick = "adoptModal(this)" class="btn btn-sm text-green-950">Adopt</button>
                            <button onclick = "loadPetDetails('${pet.petId}')" class="btn btn-sm text-green-950">Details</button>
                        </div>
                    </div>
                </div>
        `
    })
}

const liked = (image) => {
    // console.log(image);
    const selectedPetsContainer = document.getElementById('selectedPetsContainer');
    // selectedPetsContainer.classList.remove('border')
    selectedPetsContainer.innerHTML += `
    
    <img class = "rounded-2xl" src = ${image}/>
    
    
    `
}

// adopt button functionality

const adoptModal = (event) => {
    // console.log(event);
    const counterContainer = document.getElementById('countdown-counter');
    let count = 3;
    counterContainer.innerText = count;
    my_modal_3.showModal();
    const interval = setInterval(() => {
        count--;
        counterContainer.innerText = count;
        if (count < 1) {
            clearInterval(interval);
            my_modal_3.close();
            event.textContent = "Adopted";
            event.disabled = true;
        }
    }, 1000)

}





loadCategories();
loadAllPets();