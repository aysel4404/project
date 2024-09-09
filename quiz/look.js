const quizdata=[
    {
        question:" A man walked 2 miles towards the north, then 3 miles to the east, and then 2 miles to the south. How far is he from the starting point?",
        options: [
            "1 mile",
            "2 mile",
            "3 mile",
            "4 mile",
        ],
        correct : 1,
    },
    {
        question:" If the price of 8 apples is the same as the price of 5 oranges, how many oranges can be bought for the price of 24 apples?",
        options: [ "10","15","20","12"],
        correct: 1,
    },
    {
       question :" If you rearrange the letters of the word ‘LISTEN’, you would get the name of" ,
       options:["An action","A country","A city","A profession"],
       correct: 0,
    },
    {
        question :"Today is Tuesday.After 68 days,it will be :",
        options:["Monday","Saturday","Sunday","Tuesday"],
        correct: 2,
    },
    {
        question:"On dividing 201098 a certain number ,the quotient is 67 and the remainder is 31.Find the divisor ",
        options:["3011","3001","3021","2991"],
        correct: 1,
    },
];


const quiz= document.querySelector("#quiz");
const answerElm= document.querySelectorAll(".answer");
const [questionElm, option_1, option_2, option_3, option_4]=document.querySelectorAll("#question, .option_1,.option_2,.option_3,.option_4");
const submitBtn=document.querySelector("#submit");
let score=0;
let currentQuiz=0;

//load quiz fun

const loadQuiz=()=>{
    const{question,options}=quizdata[currentQuiz];
    console.log(question);

    questionElm.innerText=`${currentQuiz+1}: ${question}`;

    options.forEach(
        (curOption,index) => (window[`option_${index+1}`].innerText=curOption)
    );
  
    };
    loadQuiz();
    //get selected answer
    const getSelectedOption=()=>{
        let answerElement=Array.from(answerElm);
        return answerElement.findIndex((curElem)=>curElem.checked);
    };

    const deselectedAnswers=()=>{
        answerElm.forEach((curElem)=>(curElem.checked=false));
    };
submitBtn.addEventListener("click",()=>{
    const selectedOptionIndex= getSelectedOption();
    console.log(selectedOptionIndex);

    if(selectedOptionIndex==quizdata[currentQuiz].correct){
        score=score+1;
    };
currentQuiz++;
    if(currentQuiz< quizdata.length){
        deselectedAnswers();
        loadQuiz();
    }
    else{
       quiz .innerHTML= `
       <div class= "result">
        <h2>Your Score:${score}/${quizdata.length} Correct Answer</h2>
        <p>Congratulations on completing the quiz!!🎉 </p>
        <button class="reload -button" onclick="location.reload()">Play Again 🔄</button>
        </div>
        ` ;
    }
    });

