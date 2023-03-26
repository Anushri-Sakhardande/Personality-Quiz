
var questionState = 0
var quizActive = true
var userStats =	[
    0,//wizard
    0,//warrior
    0,//inventor
    0//bard
]

const questionText =	[		
    //question 1													
   {
    question:"Pick a quote", 	
    answers:[
        {text:'The aim of the wise is not to secure pleasure, but to avoid pain.', char:'wizard'},
        {text:'I criticize by creation, not by finding fault.', char:'inventor'},
        {text:'Do not go where the path may lead, go instead where there is no path and leave a trail', char:'warrior'},
        {text:'We know what we are but know not what we may be.', char:'bard'},
    ]  
   },
   //question 2
   {
    question:"Pick a fear", 	
    answers:[
        {text:'Never achieving something', char:'warrior'},
        {text:'Not being useful to society', char:'inventor'},
        {text:'Not being loved', char:'bard'},
        {text:'Ignorance', char:'wizard'},
    ]  
   },
   //question 3
   {
    question:"If you see a shadow approach you...",	
    answers:[
        {text:'Flee', char:'wizard'},
        {text:'Question it', char:'inventor'},
        {text:'Fight', char:'warrior'},
        {text:'Befriend it', char:'bard'},
    ]  
   },
   //question 4
   {
    question:"Who taught you guilt?", 	
    answers:[
        {text:'God', char:'bard'},
        {text:'Conscience', char:'wizard'},
        {text:'People', char:'warrior'},
        {text:'Consequence', char:'inventor'},
    ]  
   },  
   //question 5
   {
    question:"Rules are", 	
    answers:[
        
        {text:'Upto interpretation', char:'inventor'},
        {text:'Set in stone', char:'wizard'},
        {text:'Malleable', char:'warrior'},
        {text:'Meant to be broken', char:'bard'},
    ]  
    }
];

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')

    startButton.addEventListener('click',start)

    function start() {
        //start quiz
        startButton.classList.add('hide')
        questionContainer.classList.remove('hide')
        showQuestion()
    }

    
    function nextQuestion(){
        //update question
        questionState = questionState + 1
        showQuestion()
    }

    function showQuestion() {
        //display question 
        questionElement.innerText = questionText[questionState].question
        questionText[questionState].answers.forEach(answers=>{
            const button = document.createElement('button')
            button.innerText=answers.text
            button.classList.add('btn')
            button.dataset.char = answers.char
            button.addEventListener('click',selectAnswer)
            answerElement.appendChild(button)
        })
    }

    function reset(){
        //reset page after next clicked
        nextButton.classList.add('hide')
        while(answerElement.firstChild){
            answerElement.removeChild(answerElement.firstChild)
        }
        if(questionState < questionText.length-1){
            questionState = questionState +1
            showQuestion()
        }else{
            questionElement.classList.add('hide')
            findResult()
        }
    }

    function selectAnswer(e) {
        //find selected button
        const selectedButton = e.target
        const character = selectedButton.dataset.char
        setScore(character)
        selectedButton.classList.add('btn-selected')
        nextButton.classList.remove('hide')
        nextButton.addEventListener('click',reset)
    }
    
    function setScore(character){
        //update scores
        if(character == 'wizard'){
            userStats[0] = userStats[0] + 1
        }
        if(character == 'warrior'){
            userStats[1] = userStats[1] + 1
        }
        if(character == 'inventor'){
            userStats[2] = userStats[2] + 1
        }
        if(character == 'bard'){
            userStats[3] = userStats[3] + 1
        }
    }

    function findResult() {
        var highestStatPosition = 0;

		for (i = 1 ; i < userStats.length; i++) {
			
			if (userStats[i] > userStats[highestStatPosition]) {
				highestStatPosition = i;
			}
		}
        displayResult(highestStatPosition)
    }

    function displayResult(position){
        answerElement.classList.add('hide')
        if(position == 0)
            document.getElementById('wizard').classList.remove('hide')
        if(position == 1)
            document.getElementById('warrior').classList.remove('hide')
        if(position == 2)
            document.getElementById('inventor').classList.remove('hide')
        if(position == 3)
            document.getElementById('bard').classList.remove('hide')
    }

