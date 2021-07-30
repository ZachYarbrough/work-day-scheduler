var currentDay = document.querySelector('#currentDay');
var containerEl = document.querySelector('.container');
currentDay.innerHTML = moment().format('dddd, MMMM DD');

for(var i = 0; i < 9; i++) {
    var time = moment().set({
        hour: 9 + i,
        minute: 0,
        second: 0,
        millisecond: 0
    });
    var blockEl = document.createElement('div');
    blockEl.classList = 'time-block row';
    var hourEl = document.createElement('div');
    hourEl.classList = 'hour col-2';
    var inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'textarea');
    var buttonEl = document.createElement('button');
    buttonEl.classList = 'saveBtn col-2';
    buttonEl.textContent = 'Save';
    hourEl.textContent = time.format('hA')

    if(time.isBefore(moment(), 'hour')) {
        inputEl.classList = 'past col-8 text-dark font-weight-bolder';
    } else if(time.isSame(moment(), 'hour')){
        inputEl.classList = 'present col-8 text-dark font-weight-bolder';
    } else {
        inputEl.classList = 'future col-8 text-dark font-weight-bolder';
    }
    inputEl.value = JSON.parse(localStorage.getItem(hourEl.textContent));
    if(!localStorage.getItem(hourEl.textContent)) {
        localStorage.setItem(hourEl.textContent, JSON.stringify(''));
    }
    blockEl.addEventListener('click', function(event){
        var target = event.target;
        if(target.classList.contains('saveBtn'))
            localStorage.setItem(this.children[0].textContent, JSON.stringify(this.children[1].value));
    });

    containerEl.append(blockEl);
    blockEl.append(hourEl);
    blockEl.append(inputEl);
    blockEl.append(buttonEl);
}