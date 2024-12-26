
// saved/stored currently fetched data
let storedFetchedData = [];


const loadingSpinner = (show) => {
    const spinner = document.getElementById('loader');
    if (show) {
        spinner.classList.remove('hidden');
        document.getElementById('mainPetsContainer').innerHTML = '';
    }
    else {
        spinner.classList.add('hidden');
    }
}

// remove active button class

const removeActiveClasses = () => {
    const allBtns = document.querySelectorAll(".category-btn");
    // console.log(allBtns);
    for (const btn of allBtns) {
        btn.classList.remove('bg-teal-100', 'border', "border-teal-600", "rounded-2xl")
    }

}

// add active button class

const addActiveClasses = (category) => {
    const activeBtn = document.getElementById(`btn-${category}`);
    // console.log(activeBtn);
    activeBtn.classList.add('bg-teal-100', 'border', "border-teal-600", "rounded-2xl")
}


// handle sort data

const sort = () => {
    // console.log(storedFetchedData);
    loadingSpinner(true);
    const storedData = storedFetchedData.sort((a, b) => b.price - a.price)
    // console.log(storedData);
    setTimeout(() => {
        displayPets(storedData);
        loadingSpinner(false)
    }, 2000)
}