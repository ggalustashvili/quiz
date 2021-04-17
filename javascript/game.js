let questions;
let shufflequestions;
let currentquestion = 0 ;
let i = 0 ;
function add(){
    document.getElementById("shadow").style.display="none"
}
function getQuestions(){
    if(quantity!=null && selectedcategory!=null && selecectedDifficulty!=null && quantity < 50){
        fetch(`https://opentdb.com/api.php?amount=${quantity}&category=${selectedcategory}&difficulty=${selecectedDifficulty}&type=multiple`)
        .then(Response => Response.json())
        .then(data=>questions = data.results)
        .then(function(){
            
            intro.remove();
            document.querySelector(".game").style.display="block";
            shufflequestions = [...questions[currentquestion]["incorrect_answers"],questions[currentquestion]["correct_answer"]].sort(() => Math.random() - 0.5);
            document.querySelector("user-card").shadowRoot.querySelector("#question").innerHTML=questions[currentquestion].question;
            document.querySelector("user-card").shadowRoot.querySelector(".input1").innerHTML=shufflequestions[0];
            document.querySelector("user-card").shadowRoot.querySelector(".input2").innerHTML=shufflequestions[1];
            document.querySelector("user-card").shadowRoot.querySelector(".input3").innerHTML=shufflequestions[2];
            document.querySelector("user-card").shadowRoot.querySelector(".input4").innerHTML=shufflequestions[3];
            document.querySelector("user-card").shadowRoot.querySelector("#quetion-count").innerHTML =currentquestion + 1  +"/" + questions.length;
            document.querySelector("user-card").shadowRoot.querySelector("#points").innerHTML = "points: " +  i;
        }
        )
    }

}

function newQuestion(){
        currentquestion++;
        shufflequestions = [...questions[currentquestion]["incorrect_answers"],questions[currentquestion]["correct_answer"]].sort(() => Math.random() - 0.5);
        document.querySelector("user-card").shadowRoot.querySelector("#question").innerHTML=questions[currentquestion].question;
        document.querySelector("user-card").shadowRoot.querySelector(".input1").innerHTML=shufflequestions[0];
        document.querySelector("user-card").shadowRoot.querySelector(".input2").innerHTML=shufflequestions[1];
        document.querySelector("user-card").shadowRoot.querySelector(".input3").innerHTML=shufflequestions[2];
        document.querySelector("user-card").shadowRoot.querySelector(".input4").innerHTML=shufflequestions[3];
        document.querySelector("user-card").shadowRoot.querySelector("#quetion-count").innerHTML = currentquestion+1  +"/" + questions.length;
        document.querySelector("user-card").shadowRoot.querySelector("#points").innerHTML = "points: " + i ;
}
function reset(){
    game.remove();
    location.reload();
    document.body.appendChild(intro);
}
function checkanswer(answer){
    if(currentquestion==questions.length-1){
        reset();
    }
    if(answer===questions[currentquestion]["correct_answer"]){
            i++;
    }
    newQuestion(); 
}

const template = document.createElement('template');
template.innerHTML= 
`
    <style>

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    h1{
        font-size:4rem;
        font-family:Righteous;
        padding-left:2rem;
    }

    .questionform{
        height:60%;
        margin:3rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        border:0px solid;
        border-radius:25px;
        background-color:rgba(182, 154, 209, 0.747);
        font-family:Righteous;  
        
    }
    section{
        width:95%;
        height:100%;
        align-self:center;
        font-size:2rem;
        margin:1rem 0 1rem 0;
        font-family:Luckiest Guy;
        color:white;
        border:0px solid;
        border-radius:10px;
        padding-left:1rem;
        background-color:rgba(182, 154, 209, 0.747);
        font-family:Righteous;  
    }
    label{
        width:100%;
        height:100%;
    }
    .answer:hover,label:hover{
        cursor:pointer;
        background-color:white;
        color:red;
    }

    input[type=radio]{
        display:none;
    }
    button {
        background: none;
        color: red;
        width: 180px;
        height:80px;
        border: 1px solid pink;
        font-size: 2rem;
        border-radius: 10px;
        transition: .6s;
        overflow: hidden;
        font-family:Luckiest Guy;
        margin:0 auto;
       }
       button:focus{
        outline:none;
        }
       
       button:hover {
           background: white;
        cursor:pointer;
        }
       
       button:hover:before {
          transform: translateX(300px) skewX(-15deg);
           opacity: .6;
           transition: .7s;
       }
       
       button:hover:after {
          transform: translateX(300px) skewX(-15deg);
           opacity: 1;
           transition: .7s;
       }
      .quetionnumer{
            font-size:3rem;
          self-align:flex-start;
          margin-left:3rem;
          color:red;
       }
       .points{
           font-size:3rem;
           margin-right:3rem;
           color:red;
       }
  
       .opt{
           display:flex;
           width:100%;
           font-family:Righteous;
       }
       @media only screen and (max-width: 768px) {
           .questionform{
           }
           #question{
               font-size:20px;
           }
           .opt{
                display:flex;
                flex-direction:column;
                width:100%;
                font-family:Righteous;
            }
       }
    </style>


    <div class="questionform">
        <div class="question-field">
            <h1 id="question"></h1>
            </div>
            <section onclick=checkanswer(this.querySelector(".input1").innerHTML) class="answer">
            <label   class="input1" for="radio"></label>
            </section>
            <section onclick=checkanswer(this.querySelector(".input2").innerHTML) class="answer">
            <label class="input2" for="radio1"></label>
            </section>
            <section onclick=checkanswer(this.querySelector(".input3").innerHTML) class="answer">
            <label class="input3" for="radio2"></label>
            </section>
            <section onclick=checkanswer(this.querySelector(".input4").innerHTML) class="answer">
            <label class="input4" for="radio3"></label>
            </section>
            <div class = "opt">
            <h4 class="quetionnumer" id="quetion-count"></h4>
            <button onclick=reset()> Restart </button>
            <h4 class="points" id="points" ></h4>
        </div>
    </div>
`
  ;
class UserCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
let x = window.customElements.define('user-card', UserCard);
