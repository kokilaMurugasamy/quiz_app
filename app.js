function populate() {
	que =que+1;
    if(quiz.isEnded()) {
		document.getElementById("progress").remove();
		document.getElementById("next").remove();
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");		
        element.innerHTML = quiz.getQuestionIndex().text;
		
        // show options
        var choices = quiz.getQuestionIndex().choices;
		var qtype= quiz.getQuestionIndex().type;
		if(qtype == 1)
		showButtons();
		if(qtype == 2)
			showCheckBoxs();
		if(qtype == 3)
			showOneTextBoxs();
		if(qtype == 4)
			showTextBoxs();        
		
        showProgress();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    gameOverHTML += "<a href=restaurant.html> Select your favorite San Diego restaurant </a>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showButtons() {
	var choices = quiz.getQuestionIndex().choices;
	var gameOverHTML = "<div id='qus"+quiz.getQuestionIndex().index+"'>";
			for(var i=0; i < choices.length;i++) {
                gameOverHTML += "<div> <input type='radio' name ='q"+quiz.getQuestionIndex().index+"' value="+choices[i]+"><label>"+choices[i]+"</lable></div>";
			}
        gameOverHTML += "</div>";
		var element = document.getElementById("quiz");		
		element.innerHTML += gameOverHTML;
}

function showTextBoxs() {
	var choices = quiz.getQuestionIndex().choices;
	var gameOverHTML = "<div id='qus"+quiz.getQuestionIndex().index+"'>";
			for(var i=0; i < choices.length;i++) {
                gameOverHTML += "<div> <label>"+choices[i]+"</lable>   <input type='text' name ='q"+quiz.getQuestionIndex().index+i+"' id ='q"+quiz.getQuestionIndex().index+i+"'></div>";
			}
        gameOverHTML += "</div>";
		var element = document.getElementById("quiz");		
		element.innerHTML += gameOverHTML;
}

function showOneTextBoxs() {
	var choices = quiz.getQuestionIndex().choices;
	var gameOverHTML = "<div id='qus"+quiz.getQuestionIndex().index+"'>";
			    gameOverHTML += "<div> <label>"+choices[0]+"</lable>   <input type='text' name ='q"+quiz.getQuestionIndex().index+0+"' id ='q"+quiz.getQuestionIndex().index+0+"'></div>";
			   
		var element = document.getElementById("quiz");
		element.innerHTML += gameOverHTML;
}

function showCheckBoxs() {
	var choices = quiz.getQuestionIndex().choices;
	var gameOverHTML = "<div id='qus"+quiz.getQuestionIndex().index+"'>";
			for(var i=0; i < choices.length;i++) {
                gameOverHTML += "<div> <input type='checkbox' name ='q"+quiz.getQuestionIndex().index+"' value="+choices[i]+"><label>"+choices[i]+"</lable></div>";
			}
        gameOverHTML += "</div>";
		var element = document.getElementById("quiz");		
		element.innerHTML += gameOverHTML;
}

// create questions
var questions = [
    new Question(0,"How do you describe yourself as developer?", ["Hermit", "Sociable","Serious", "Grumpy","Dont know yet"], "Sociable",1),
    new Question(1,"Select the javascript based technologies", ["AngularJS", "Ember", "VueJS", "Java","C#"], ["AngularJS","VueJS"],2),
	new Question(2,"Ask the user for introducing a palindrome", ["Enter a palindrome sentence"], null,3),
	new Question(3,"Enter polyndrome question", ["Enter a sentence", "Enter same sentence in reverse"], "AngularJS",4)
   
      
];

// create quiz
var quiz = new Quiz(questions);
var que = 0;

function nextQus() {// display quiz
//handle to skip first question 
if(que != 0) {	
	var numberval = quiz.getQuestionIndex().index;
	quiz.checkAnswer(quiz.getQuestionIndex().index);
	var qusIndx= "qus"+numberval;
	document.getElementById(qusIndx).remove();
 
}
if(que == 0) {
	document.getElementById("start").remove();
}
populate();
}




