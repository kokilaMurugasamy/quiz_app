function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;	
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.checkAnswer =function(index) {
	var qus = "q"+index;	
	var questype = this.questions[this.questionIndex].type;
	if(questype == 1) {
		var a3 = document.getElementsByName(qus);
		var ans = this.questions[this.questionIndex].answer;
		for(i = 0; i < a3.length; i++) {
		  if(a3[i].checked) {
			 if(a3[i].value == ans) {
				this.score++;				
				break;
			 }
		  }
	   }
	}
	
	if(questype == 2) {
		var a4 = document.getElementsByName(qus);
			var a4answers = new Array();
		   var a4right = new Array('AngularJS','VueJS');
		   var a4bool = true;
		 
		   for(i = 0; i < a4.length; i++) {
			  if(a4[i].checked) {
				 a4answers.push(a4[i].value);
			  }
		   }
		   a4answers.sort();
		   a4right.sort();		   
		   if(a4answers.length == a4right.length) {
			  for(i = 0; i < a4answers.length; i++) {				 
				 if(a4answers[i] != a4right[i]) {
					a4bool = false;
					break;
				 }
			  }
		   }
		   else {			   
			  a4bool = false;
		   }
		   if(a4bool) {
			   this.score++;			   
		   }
	}
	
	if(questype == 3) {		
		var str = document.getElementById(qus+0).value;		
		 if(fastestIsPalindrome(str)) {
			  this.score++;			  
		 }
	}
	
	if(questype == 4) {
		var words = document.getElementById(qus+0).value;	
		var reversewords = document.getElementById(qus+1).value;	
		if(Array.from(words).toString() === Array.from(reversewords).reverse().toString()) {
			this.score++;			
		}
	}
	
    this.questionIndex++;
	}

function fastestIsPalindrome(str) {  
  str = str.toLocaleLowerCase();
  return Array.from(str).toString() === Array.from(str).reverse().toString();
  
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}