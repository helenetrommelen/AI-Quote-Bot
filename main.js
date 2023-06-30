
const loading = document.querySelector('.loading')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close')



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

// get action for chatGPT
function getRandomAction(){
    const actions = [
        'tell us how you determine whether something is true or not',
        'what is your most important message for future generations',
        'tell us what your main area of study is',
        'what is good scientific work',
        'what is your driving principle',
        'write your linkedin bio'
    ]
    const randomIndex = Math.floor(Math.random() * actions.length)
    return actions[randomIndex]
}

// Create a function that will run when we click on a character
async function playPhilosopher(philosopher) {
    // Remove the hidden class from the loading image so it shows on screen
    loading.classList.remove('hidden');

    // Define some content to display in the modal. We'll switch this out with AI dialog later!
    const content = 'You clicked a character!'
    // Get a random action by running the function we created
    const action = getRandomAction();

    // Send a prompt to ChatGPT
    const response = await fetch(_CONFIG_.API_BASE_URL + '/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${_CONFIG_.API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
            model: _CONFIG_.GPT_MODEL,
            messages: [
                {
                    role: 'user',
                    content: `You are ${philosopher} and should ${action} in a maximum of 100 characters without breaking character`
                },
            ]
        })
    })

// async function playPhilosopher(philosopher) {
//     loading.classList.remove('hidden')

//     //sending the philosopher data and the prompt to chatGPT
//     const action = getRandomAction()

//     const response = await fetch(_CONFIG_.API_BASE_URL + '/chat/completions', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer${_CONFIG_.API_KEY}`
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             model: _CONFIG_.GPT_MODEL,
//             messages: [
//                 {
//                     role: 'user',
//                     content: `You are the philosopher ${philosopher} and should ${action} in a maximum of 100 characters without breaking character`
//                 }
//             ]
//         })
//     })

    const jsonData = await response.json()
    console.log(jsonData);


    
    

    //add content to modal
    // const content = 'you clicked a philosopher'
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
// moveBrainToMouseClick()