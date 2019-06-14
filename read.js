var requestURL = './word.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    var wordFile = request.response;
    looping(wordFile);
}

var currQuiz = 0;
var corWord = 0;
var wrongWord = 0;

function looping(wordfile){
    window.Quiz = wordfile['questions'];
    window.Words = wordfile['wordlist'];
    window.numOfQuiz = Quiz.length;
    setting();
}

function setting(){                
    var title = Quiz[currQuiz].q;
    document.getElementById('title').innerHTML = title;
    document.getElementById('question').innerHTML = currQuiz+1;
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
                if(Quiz[currQuiz].ans.includes(this.innerHTML)){
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
}

function correct(word){
    word.style.color = 'green';
    corWord++;
    document.getElementById('correct').innerHTML = corWord;
    word.onclick = '';
    if(corWord==3){
        $('.col-sm-1').attr('onclick', '');
        if(currQuiz==numOfQuiz-1){
            document.getElementById('questionP').innerHTML = 'Congratulations! You have finished all the quizes!';
        }
        else{
            document.getElementById('continue').innerHTML += ' Great! Click on the button to continue the quiz.'
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
    currQuiz += 1;
    document.getElementById('content').innerHTML = '<div id="button"><button id="nextButton" onclick="nextQuestion()" class="btn btn-secondary">Next Question</button></div>';
    corWord = 0;
    document.getElementById('correct').innerHTML = '';
    document.getElementById('continue').innerHTML = '';
    setting();
}