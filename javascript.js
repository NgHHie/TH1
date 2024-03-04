let availableQuesions = [];
let questions = [];
let jsonQuestions = 'cauhoi.json';

fetch(jsonQuestions)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });



startGame = () => {
    availableQuesions = [...questions];
    hiencauhoi();
};

hiencauhoi = () => {
    let cauhoi = document.getElementById('cauhoi');
    // console.log(cauhoi);
    // console.log("so cau hoi:", availableQuesions.length);
    for(let i=0; i<40; i++) {
        if(i % 10 == 0) {
            let loai = document.createElement('h2');
            loai.classList.add('loai');
            if(i == 0) {
                loai.textContent = 'Nhóm 1: Câu hỏi đúng/sai'
                loai.id = 'loai1';
            }
            else if(i == 10) {
                loai.textContent = 'Nhóm 2: Chọn 1 trong 4 đáp án'
                loai.id = 'loai2';
            }
            else if(i == 20) {
                loai.textContent = 'Nhóm 3: Chọn nhiều đáp án'
                loai.id = 'loai3';
            }
            else {
                loai.textContent = 'Nhóm 4: Tự luận'
                loai.id = 'loai4';
            }
            cauhoi.appendChild(loai);
        }
        let container_hoitrl = document.createElement('div');
        container_hoitrl.classList.add('container-hoitrl');
        container_hoitrl.id = '_' + i;

        let stt = document.createElement('div');
        stt.classList.add('stt');
        stt.textContent = 'Câu ' + (i+1);
        container_hoitrl.appendChild(stt);

        let container_cauhoi = document.createElement('div');
        container_cauhoi.textContent = availableQuesions[i].question;
        container_cauhoi.classList.add('container-cauhoi');
        container_hoitrl.appendChild(container_cauhoi);

        for(let j=1; j<=4; j++) {
            if((i < 10 && j > 2) || (i >= 30)) break;
            let container_choice = document.createElement('div');
            container_choice.classList.add('choice');
            if(i >= 20 && i < 30) {
                container_choice.classList.add('choice-3');
                let checkBox = document.createElement('i');
                // checkBox.id = 'checkBox-i';
                checkBox.classList.add('far', 'fa-square'); 
                container_choice.appendChild(checkBox);
                let textBox = document.createElement('div');
                textBox.textContent = availableQuesions[i]['choice' + j];
                container_choice.appendChild(textBox);
            }
            else {
                container_choice.textContent = availableQuesions[i]['choice' + j];
            }
            container_hoitrl.appendChild(container_choice);
        }
        if(i >= 30) {
            let container_choice = document.createElement('textarea');
            container_choice.classList.add('text-answer');
            container_choice.setAttribute('placeholder', 'Nhập câu trả lời...');
            container_hoitrl.appendChild(container_choice);
        }
        cauhoi.appendChild(container_hoitrl);
    }


    let trangthai = document.getElementById('trangthai');
    let blockDiv = document.createElement('div');
    blockDiv.id = 'blockDiv';
    for(let i=0; i<40; i++) {
        let block = document.createElement('span');
        block.classList.add('block');
        block.id = 'block' + (i+1);
        block.textContent = i + 1;
        block.style.background = 'white';
        blockDiv.appendChild(block);
    }
    trangthai.appendChild(blockDiv);

    let choice = Array.from(document.getElementsByClassName('choice'));
    // console.log('choice: ', choice);
    for(let i=0; i<choice.length; i++) {
        let x = choice[i];
        x.addEventListener('click', (e) => {
            let selectedChoice = e.target;
            let cauhoiId = parseInt(selectedChoice.parentElement.id.slice(1));
            let block = document.getElementById('block'+(cauhoiId+1));
            if(selectedChoice.classList.contains('pick')) {
                selectedChoice.classList.remove('pick');
                if(selectedChoice.classList.contains('choice-3')) {
                    selectedChoice.querySelector('i').classList.remove('fa-check-square');
                    selectedChoice.querySelector('i').classList.add('fa-square');
                }
                if(!selectedChoice.classList.contains('choice-3')) block.style.background = 'white';
                else {
                    let tmp = '#' + selectedChoice.parentElement.id + ' > div';
                    let child = document.querySelectorAll(tmp);
                    // console.log(child);
                    let pick = 0;
                    child.forEach((c) => {
                        if(c.classList.contains('pick')) pick = 1;
                    })
                    if(pick === 0) block.style.background = 'white';
                }
                // ansUser[parseInt(cauhoiId) + 1] = 0;
                return;
            }
            block.style.background = '#578fde';
            let selectedAnswer = i - cauhoiId * 4 + 1;
            // ansUser[parseInt(cauhoiId) + 1] = selectedAnswer;

            selectedChoice.classList.add('pick');
            if(selectedChoice.classList.contains('choice-3')) {
                selectedChoice.querySelector('i').classList.remove('fa-square');
                selectedChoice.querySelector('i').classList.add('fa-check-square');
            }
            
            choice.forEach((x) => {
                if(x != selectedChoice && x.classList.contains('pick') && x.parentElement.id == selectedChoice.parentElement.id
                    && !x.classList.contains('choice-3'))
                    x.classList.remove('pick');

            });

        });
    }
    let textanswer = Array.from(document.getElementsByClassName('text-answer'));
    // console.log(textanswer);
    for(let i=0; i<textanswer.length; i++) {
        let x = textanswer[i];
        x.addEventListener('input', (e) => {
            let cauhoiId = parseInt(x.parentElement.id.slice(1));
            let block = document.getElementById('block'+(cauhoiId+1));
            if(x.value.trim()) {  
                block.style.background = '#578fde';
            }
            else {
                block.style.background = 'white';
            }
        })
        
    }

    let arrBlocks = Array.from(document.getElementsByClassName('block'));
    arrBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            let target = document.getElementById('_'+(parseInt(block.textContent) - 1));
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
    })

}

nopbai = () => {
    openDialog();
    // let arrBlocks = Array.from(document.getElementsByClassName('block'));
    // for(let i=0; i<arrBlocks.length; i++) {
    //     let block = arrBlocks[i];
    //     if(block.style.background === 'white') {
    //         alert('Hãy trả lời hết các câu hỏi');
    //         return;
    //     }
    // }
    // openDialog();
}

document.addEventListener('scroll', () => {
    let rightDiv = document.getElementById('action');
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let leftDiv = document.getElementById('cauhoi');

    if(rightDiv.getBoundingClientRect().top < leftDiv.getBoundingClientRect().bottom) {
        rightDiv.style.top = (scrollTop-400) + 'px';
        if(rightDiv.style.top[0] == '-') rightDiv.style.top = '0px';
    }
    else {
        rightDiv.style.top = '0px';
    }
});


render = () => {
    let div = Array.from(document.getElementsByClassName('container'));
    div[0].style.display = 'flex';
}

var dialogOverlay = document.getElementById('dialogOverlay');
var dialogContent = document.getElementById('dialogContent');

// Hàm mở dialog
function openDialog() {
    dialogOverlay.style.display = 'block';
    dialogContent.style.display = 'block';
}

// Hàm đóng dialog
function closeDialog() {
    dialogOverlay.style.display = 'none';
    dialogContent.style.display = 'none';
    let inputElements = Array.from(document.getElementsByTagName('input'));
    for(let i=0; i<inputElements.length; i++) {
        inputElements[i].value = '';
    }
    let textElements = Array.from(document.getElementsByTagName('textarea'));
    for(let i=0; i<inputElements.length; i++) {
        textElements[i].value = '';
    }
    let choiceElements = Array.from(document.getElementsByClassName('pick'));
    for(let i=0; i<choiceElements.length; i++) {
        choiceElements[i].classList.remove('pick');
    }
    let blockElements = Array.from(document.getElementsByClassName('block'));
    for(let i=0; i<blockElements.length; i++) {
        blockElements[i].style.background = 'white';
    }
    let cauhoi = document.getElementsByClassName('container');
    cauhoi[0].style.display = 'none';
}
