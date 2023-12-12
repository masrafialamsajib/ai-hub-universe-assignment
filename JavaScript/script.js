//------Spinner-------

const toggleSpinner = (isSpinning) => {
    const spinnerSection = document.getElementById('spinner');
    if(isSpinning === true){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}
// -----------Load Cards---------------
const loadCards = async(cardLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayCards(data.data.tools, cardLimit);
}

//----------- Display Cards------------
const displayCards = (cards, cardLimit) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerText ="";


    // --------display six cards only--------
    const seeMore = document.getElementById('see-more-btn');
    if(cardLimit && cards.length > 6) {
        cards = cards.slice(0, 6);
        seeMore.classList.remove('d-none');
    }
    else{
        seeMore.classList.add('d-none');
    }

    //--------Creating cards-----------
    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");
        cardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${card.image ? card.image : 'Not found'}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text my-0"> ${card.features[0] ? card.features[0] : ""}</p>
                <p class="card-text my-0"> ${card.features[1] ? card.features[1] : ""}</p>
                <p class="card-text my-0"> ${card.features[2] ? card.features[2] : ""}</p>
                <p class="card-text my-0"> ${card.features[3] ? card.features[3] : ""}</p>
            </div>
            <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                <div>
                    <h5>${card.name}</h5>
                    <p class="mb-0"><i class="fa-solid fa-calendar-days"></i> ${card.published_in}</p>
                </div>
                <button onclick="loadModalDetails('${card.id}')" type="button" class="btn rounded-circle" style="background-color: #FEF7F7; color: red;" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    });

    //---------- Spinner stop---------
    toggleSpinner(false);
};
//---------See More button handler---------
document.getElementById("see-more-btn").addEventListener("click", function () {
    loadCards();
})

// --------------Load modal Details---------------
const loadModalDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data);
}
// ---------Display Modal Details--------------
const displayModalDetails = (data) => {
    // ----------Card description----------------
    const cardDescription = document.getElementById("card-description");
    cardDescription.innerText = `${data.description ? data.description : "No data found"}`;
    // ---------------Pricing--------------
    const pricing1 = document.getElementById("price1");
    pricing1.innerText = `${data.pricing ? data.pricing[0].price : "Free of cost/"}`;
    const pricing2 = document.getElementById("price2");
    pricing2.innerText = `${data.pricing  ? data.pricing[1].price : "Free of cost/"}`;
    const pricing3 = document.getElementById("price3");
    pricing3.innerText = `${data.pricing ? data.pricing[2].price : "Free of cost/"}`;
    // ----------Pricing plans-------------
    const plan1 = document.getElementById("plan1");
    plan1.innerText = `${data.pricing ? data.pricing[0].plan : "Free"}`;
    const plan2 = document.getElementById("plan2");
    plan2.innerText = `${data.pricing ? data.pricing[1].plan : "Free"}`;
    const plan3 = document.getElementById("plan3");
    plan3.innerText = `${data.pricing ? data.pricing[2].plan : "Free"}`;
    // -----------Features name----------
    const name1 = document.getElementById("name1");
    name1.innerHTML = `${data.features[1].feature_name ? data.features[1].feature_name : "No data found"}`;
    const name2 = document.getElementById("name2");
    name2.innerHTML = `${data.features[2].feature_name ? data.features[2].feature_name : "No data found"}`;
    const name3 = document.getElementById("name3");
    name3.innerHTML = `${data.features[3].feature_name ? data.features[3].feature_name : "No data found"}`;

    // -------------Integrations-------------
    const integ1 = document.getElementById("integ1");
    integ1.innerHTML = `${data.integrations ? data.integrations[0] : "No data found"}`;
    const integ2 = document.getElementById("integ2");
    integ2.innerHTML = `${data.integrations ? data.integrations[1] : ""}`;
    if (integ2.innerText == "" || integ2.innerText == "undefined") {
        integ2.style.display = "none";
    }
    const integ3 = document.getElementById("integ3");
    integ3.innerHTML = `${data.integrations ? data.integrations[2] : ""}`;
    if (integ3.innerText == "" || integ3.innerText == "undefined") {
        integ3.style.display = "none";
    }

    //--------- Accuracy button-------------
    const accuracyBtn = document.getElementById("accuracy-btn");
    const accuracyPercentage = document.getElementById("accuracy-percentage");
    accuracyPercentage.innerHTML = `${data.accuracy.score ? data.accuracy.score*100 : 0}`;

    if (accuracyPercentage.innerText === "0") {
        accuracyBtn.classList.add("d-none");
        accuracyBtn.classList.remove("d-block");
    }
    else{
        accuracyBtn.classList.add("d-block");
        accuracyBtn.classList.remove("d-none");  
    }
    //---------- Modal img--------------
    const modalImg = document.getElementById("modal-img");
    modalImg.setAttribute("src", `${data.image_link && data.image_link[0]}`);
    // ----------input output examples-----------
    const inputExample = document.getElementById("input-example");
    inputExample.innerText = `${data.input_output_examples ? data.input_output_examples[0].input : "No data found"}`;
    const outputExample = document.getElementById("output-example");
    outputExample.innerText = `${data.input_output_examples ? data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}`;
}

// ----------Calling cards function-------
loadCards(6);

