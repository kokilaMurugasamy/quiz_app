function Question(index,text, choices, answer, type) {
	this.index = index;
    this.text = text;
    this.choices = choices;
    this.answer = answer;
	this.type = type;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}