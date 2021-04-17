let intro = document.querySelector(".wrap");
let game = document.querySelector(".game");
let categories = document.getElementById("Category");
// on selecting any options from select automatically changes value to selected option 

    let selectedcategory = document.getElementById('Category').addEventListener('change', function(e) {
    selectedcategory=e.target.options[e.target.selectedIndex].getAttribute('id');
});

// on selecting any options from select automatically changes value to selected option 

    let selecectedDifficulty = document.getElementById('SelectDifficulty').addEventListener('change', function(e) {
    selecectedDifficulty =e.target.options[e.target.selectedIndex].getAttribute('id');
});

// changing number in input changes value automatically
 let quantity = document.getElementById('QuestionsQuantity').addEventListener('change',function(e){
    quantity=e.target.value;
})

//fetch categories and to html async function

let category;
 fetch('https://opentdb.com/api_category.php')
 .then(response => response.json())
 .then(data=>category=data.trivia_categories)
 .then(function (){
    for(let i = 0 ;i < category.length; i++){
       let option  = document.createElement("option"); 
       option.text=category[i].name;
       option.setAttribute("id",category[i].id);
       categories.add(option);
    }
})

