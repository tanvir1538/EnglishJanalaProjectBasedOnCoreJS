function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const createElement = (arr) => {
    const htmlElements = arr.map((er => `<span class="btn">${er}</span>`))
    return (htmlElements.join(" "));

};
const loadFunction = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((json) => display(json.data))

}

//  spinner manage korar code

const manageSpiner =(status) => {
    if (status == true) {
        document.getElementById('spinerId').classList.remove('hidden');
        document.getElementById('wordContainer').classList.add('hidden');

    }
    else {
        document.getElementById('wordContainer').classList.remove('hidden');
        document.getElementById('spinerId').classList.add('hidden');
    }
}


const removeactive = () => {
    const lessonsButtons = document.querySelectorAll('.lesson-btn');
    // console.log(lessonsButtons);
    lessonsButtons.forEach(lesson => {
        lesson.classList.remove('active');

    })

}
// all word container 
const levelWordContainer = (id) => {
    manageSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    // now we do fetch for taking data 
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeactive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);


            // console.log(clickBtn);
            clickBtn.classList.add('active');
            displayAllWord(data.data)
        })
}


// display all words display in details function 

const LoadAllWorldDetails = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => DetailsAllWord(json.data))

}

//modal korea uporea niye aso and ar jonu kisu funtaionality add kortea hobea 


const DetailsAllWord = (word) => {
    console.log(word);

    const detailsBox = document.getElementById('detailsContainer');
    detailsBox.innerHTML = `<div>
                            <div>
                                <h2>${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>

                            </div>
                            <div>
                                <h3>Meaning</h3>
                                <h3>${word.meaning}</h3>
                            </div>
                            <div>
                                <h3>Example</h3>
                                <p>${word.sentence}</p>
                            </div>
                            <div>
                                <h2>synonyms</h2>
                                <div>${createElement(word.synonyms)}</div>

                            </div>


                        </div> `


    document.getElementById('Word_container').showModal();



}

// to show the displayall word functiona call and  adjust all things 
const displayAllWord = (words) => {
    console.log(words)
    // first container dereyea anyo 
    const Container = document.getElementById('wordContainer');
    Container.innerHTML = '';
    if (words.length == 0) {
        Container.innerHTML = `
     <div class="text-center  col-span-full rounded-xl p-10 ">
                  <img class="mx-auto" src="./assets/alert-error.png" alt="">   
                <p  class="font-bold text-xl mb-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bold  text-xl ">নেক্সট Lesson এ যান</h1>
            </div>

    `

    manageSpiner(false);
    return;
    }


    //  manageSpiner(false);
    // return;

   

    words.forEach(word => {

        // id: 5
        // level: 1
        // meaning: "আগ্রহী"
        // pronunciation: "ইগার"
        // word: "Eager"


        const card = document.createElement('div');
        card.innerHTML = `<div class="bg-white shadow-lg rounded-xl text-center py-10 px-5 space-y-5  ">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "অর্থ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
                <div class="font-medium text-2xl  font-bangla" >  ${word.pronunciation ? word.pronunciation : "pronctunation paya jauy naie "}</div>


                <div  class="flex justify-center items-center gap-5">
                    <button onclick="LoadAllWorldDetails(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]" ><i class="fa-solid fa-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF20]  hover:bg-[#1A91FF90]" ><i class="fa-solid fa-volume-high"></i></button>
                </div>


            </div>
        `

        Container.append(card);
    })

    manageSpiner(false);
}

const display = (lessons) => {
    // get the element and empty the container 
    // every element  nayo 
    // create element 
    // innerhtml
    // append child koro 

    const levelContainer = document.getElementById("level-Container");
    levelContainer.innerHTML = "";

    for (const lesson of lessons) {
        const div = document.createElement('div');
        div.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}" onclick="levelWordContainer(${lesson.level_no})" class="btn btn-soft btn-primary text-center  p-3 items-center lesson-btn  "><i class="fa-solid fa-book"></i> Lesson-${lesson.level_no}</button>
        `

        levelContainer.appendChild(div);
    }


}

loadFunction();


document.getElementById('btn-search').addEventListener('click',()=>{
    removeactive();
    const input=document.getElementById('inputId');
    const inputValue=input.value.trim().toLowerCase();
    console.log(inputValue);
    const url="https://openapi.programming-hero.com/api/words/all";
    fetch(url)
    .then(res => res.json())
    .then((data) => { const allwords=data.data;
        console.log(allwords);
    const inputValue=input.value.trim().toLowerCase();
        const filterWords=allwords.filter((word) => word.word.toLowerCase().includes(inputValue));
        displayAllWord(filterWords);

    }) 

})