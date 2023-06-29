const loading = document.querySelector('.loading')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close')
// const hidden = document.querySelector('.hidden');


// move mouset to click: https://www.kirupa.com/snippets/move_element_to_click_position.htm
// function moveBrainToMouseClick () {
//     var container = document.querySelector('.container');
//     container.addEventListener('click', getClickPosition, false);

//     function getClickPosition(e) {
//         var xPosition = e.clientX;
//         var yPosition = e.clientY;

//         var translate3dValue "translate3d(" + xPosition + "px," + yPosition + "px, 0)";
//         loading.style.transform = translate3DValue;
// }




function playPhilosopher(philosopher) {
    //sending the philosopher data and the prompt to chatGPT
    loading.classList.remove('hidden')

    //add content to modal
    const content = 'you clicked a philosopher'
    modalContent.innerHTML = `
        <h1>${philosopher}</h1>
        <p>${content}</p>
        <code>Well done!</code>
    `

    //show modal
    setTimeout(function () {
        modal.classList.remove('hidden')
        loading.classList.add('hidden')
    }, 2000)

    //hide loading screen
    modalClose.addEventListener('click', function () {
        modal.classList.add('hidden')
    })
    


}
function init(){
    const philosophers = document.querySelectorAll('.philosopher')
    console.log(philosophers)

    philosophers.forEach(element => {
        element.addEventListener('click', function () {
            console.log(element.dataset.philosopher)
            playPhilosopher(element.dataset.philosopher)
        })
    });
}

init()
moveBrainToMouseClick()