var requestURL = './word.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var wordFile = request.response;
    looping(wordFile);
}

var currQuestion = 0;
var corWord = 0;
var wrongWord = 0;

function looping(wordfile){
    window.currQuiz = document.getElementsByTagName('title')[0].getAttribute('id');
    window.Quiz = wordfile['quiz'+currQuiz];
    window.Question = Quiz['questions'];
    window.Words = Quiz['wordlist'];
    window.numOfQuestion = Question.length;
    setting();
}

function setting(){                
    var title = Question[currQuestion].q;
    document.getElementById('title').innerHTML = title;
    document.getElementById('question').innerHTML = currQuestion+1;
    for(i=0;i<4;i++){
        var par = document.createElement('div');
        par.className = "row justify-content-around";
        var start, every;
        switch(i){
            case 0:
                start=0;
                every=4;
                break;
            case 1:
                start=4;
                every=5;
                break;
            case 2:
                start=9;
                every=4;
                break;
            case 3:
                start=13;
                every=5;
                break;
        }
        for(j=start;j<start+every;j++){
            var cld = document.createElement('div');
            cld.className = "col-sm-1"
            cld.textContent = Words[j].word;
            cld.onclick = function(){
                if(Question[currQuestion].ans.includes(this.innerHTML)){
                    correct(this);
                }
                else{
                    wrong(this);
                }
            }
            par.appendChild(cld);
        }
        var button = document.getElementById('button');
        document.getElementById('content').insertBefore(par, button);
    }
    document.getElementById('nextButton').disabled = true;
    document.getElementById('correct').innerHTML = corWord;
}

function correct(word){
    word.style.color = 'green';
    corWord++;
    document.getElementById('correct').innerHTML = corWord;
    word.onclick = '';
    if(corWord==3){
        $('.col-sm-1').attr('onclick', '');
        if(currQuestion==numOfQuestion-1){
            finish();
        }
        else{
            document.getElementById('continue').innerHTML += ' Great! Click on "Next Question" to continue.'
            document.getElementById('nextButton').disabled = false;
        }
    }
}

function wrong(word){
    word.style.color = 'red';
    wrongWord++;
    document.getElementById('wrong').innerHTML = wrongWord;
    word.onclick = '';
}

function nextQuestion(){
    $('.col-sm-1').css('color', 'black');
    currQuestion += 1;
    document.getElementById('content').innerHTML = '<div id="button"><button id="nextButton" onclick="nextQuestion()" class="btn btn-secondary">Next Question</button></div>';
    corWord = 0;
    document.getElementById('correct').innerHTML = '';
    document.getElementById('continue').innerHTML = '';
    setting();
}

function finish(){
    document.getElementById('questionP').innerHTML = 'Congratulations! You have finished all the questions of this chapter!';
    var score = Math.round(((numOfQuestion*3-0.5*wrongWord)/18)*100);
    var total_score = document.createElement('p');
    if(score <= 0) score = 0;
    total_score.textContent = `Total score: ${score}`;
    document.getElementById('result').appendChild(total_score);
    var backToMenu = document.createElement('form');
    backToMenu.action = './menu.html';
    var nextQuizButton = document.createElement('button');
    nextQuizButton.className = 'btn btn-info btn-block';
    nextQuizButton.textContent = "Back to menu";
    nextQuizButton.onclick = function(){
        currQuiz += 1;
    }
    backToMenu.appendChild(nextQuizButton);
    document.getElementById('result').appendChild(backToMenu);
    var current = 'ch'+currQuiz;
    console.log(current);
    localStorage.setItem(current, score);
}