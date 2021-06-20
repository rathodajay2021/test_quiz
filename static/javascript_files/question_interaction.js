window.onload = sendApiRequest

let questionList   //declaring global var to store all question from trivia so every function can access it
let count = 0      // declaring global var to change the question no and every function can access it
let rightAnswerNO   // we are changing the location of right answer time to time so this will store the position of right answer
let percentage = 0 // to calcluate the percentage you score in the quiz
let yourAnswer = [] //this array store all the answer you had selected
let correctIncorrect = []  // this will tell you in result that your answer was correct or not
let startTime
let endTime


async function sendApiRequest(){
    // fetching the data from trivia database
    let questions = await fetch(`https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple`)
    console.log(questions)
    let data = await questions.json()
    console.log(data)
    questionList = data
    startTime = new Date()
    useApiData()
}

function useApiData(){

    // creating random no so location of correct answer will change time to time
    let correct_anser_no = Math.floor((Math.random() * 5))
    if (correct_anser_no === 0){
        correct_anser_no = 1;
    }
    arr = [4,2,1,3]
    for( var i = 0; i < arr.length; i++){
        if ( arr[i] === correct_anser_no) {

            arr.splice(i, 1)
        }
    }
    rightAnswerNO = correct_anser_no;
    // to remove any extra style apply by answerReply function
    document.getElementById("1").className = "common_style"
    document.getElementById("2").className = "common_style"
    document.getElementById("3").className = "common_style"
    document.getElementById("4").className = "common_style"
    document.getElementById("result").className = "test_over"
    document.getElementById(`1`).setAttribute('onclick',"answerReply(this)")
    document.getElementById(`2`).setAttribute('onclick',"answerReply(this)")
    document.getElementById(`3`).setAttribute('onclick',"answerReply(this)")
    document.getElementById(`4`).setAttribute('onclick',"answerReply(this)")
    document.getElementById('next').setAttribute('onclick','fristSelectAnswer()')
    document.getElementById('error_message').className='test_over'

    // creating question and answer
    document.getElementById("category").innerHTML = `Category of question : ${questionList.results[count].category}`
    document.getElementById("difficulty").innerHTML = `Level of difficulty : ${questionList.results[count].difficulty}`
    document.getElementById("question").innerHTML = `Question ${count + 1} : ${questionList.results[count].question}`
    document.getElementById(`${rightAnswerNO}`).innerHTML = `${questionList.results[count].correct_answer}`
    document.getElementById(`${arr[0]}`).innerHTML = `${questionList.results[count].incorrect_answers[0]}`
    document.getElementById(`${arr[1]}`).innerHTML = `${questionList.results[count].incorrect_answers[1]}`
    document.getElementById(`${arr[2]}`).innerHTML = `${questionList.results[count].incorrect_answers[2]}`
    count += 1;
    // if 10 question is done then move to result
    if (count === 10){
        document.getElementById('submit_test').className = 'visible'
        document.getElementById('next').className = 'test_over'
    }
}

// check weather you selected option is correct or not
function answerReply(answer){
    document.getElementById('error_message').className='test_over'
    if (answer.id === `${rightAnswerNO}`){
        percentage += 10;
        answer.className = "common_style right_answer "
        document.getElementById("result").innerHTML = `${questionList.results[count-1].correct_answer} is correct answer`  //showing on the sport right answer
        document.getElementById('result').className = 'result'      //style the right answer
        yourAnswer.push(questionList.results[count-1].correct_answer)
        correctIncorrect.push(1)
        document.getElementById('next').setAttribute('onclick',"useApiData()" ) //making sure you can't go to next question without selecting the answer
        console.log(yourAnswer)
    }
    else{
        answer.className = "common_style wrong_answer"
        document.getElementById("result").innerHTML = `${questionList.results[count-1].correct_answer} is correct answer`   //showing on the sport right answer
        document.getElementById('result').className = 'result'   //style the right answer
        // getting the wrong answer you type
        if(answer.id == `${arr[0]}`){
            yourAnswer.push(questionList.results[count-1].incorrect_answers[0])
        }
        else if(answer.id == `${arr[1]}`){
            yourAnswer.push(questionList.results[count-1].incorrect_answers[1])
        }
        else{
            yourAnswer.push(questionList.results[count-1].incorrect_answers[2])
        }
        correctIncorrect.push(0)
        console.log(yourAnswer)
        document.getElementById('next').setAttribute('onclick',"useApiData()" )   //making sure you can't go to next question without selecting the answer
    }

    // to make sure you can't select another option after selecting one
    document.getElementById(`1`).removeAttribute('onclick')
    document.getElementById(`2`).removeAttribute('onclick')
    document.getElementById(`3`).removeAttribute('onclick')
    document.getElementById(`4`).removeAttribute('onclick')
}


//generating the result
function resultOutput(){
    endTime = new Date()
    let min =  endTime.getMinutes()-startTime.getMinutes()
    let sec = endTime.getSeconds()-startTime.getSeconds()
    document.getElementById('timeTaken').innerHTML = `You have taken ${min} minutes and ${sec} seconds to complete the test`
    document.getElementById('quiz_time').className = 'test_over'
    document.getElementById('submit_test').className = 'test_over'
    document.getElementById('result_time').className = 'visible'
    for (let question_no = 0; question_no < 10; question_no++) {
        console.log(correctIncorrect)
        if (correctIncorrect[question_no] == 1){
            document.getElementById(`question_${question_no+1}`).className = 'right_answer common_style'
            document.getElementById(`question_${question_no+1}`).innerHTML = `${questionList.results[question_no].question} || you answer was ${yourAnswer[question_no]}`;
        }
        else {
            document.getElementById(`question_${question_no+1}`).className = 'wrong_answer common_style'
            document.getElementById(`question_${question_no+1}`).innerHTML = `${questionList.results[question_no].question} || you answer was ${yourAnswer[question_no]} || correct answer was ${questionList.results[question_no].correct_answer}`;
        }
    }
    if (percentage>=70) {
        document.getElementById('quiz_score').innerHTML = `Congulation you pass the exam with score ${percentage}% in this quiz`
    }
    else {
        document.getElementById('quiz_score').innerHTML = `sorry you fail in this exam, you only score ${percentage}% in this quiz. Better luck next time`
    }


}

function fristSelectAnswer(){
    document.getElementById('error_message').className='visible result'
    document.getElementById('error_message').innerHTML= "Select the answer frist"
}
