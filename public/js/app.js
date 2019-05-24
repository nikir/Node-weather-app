console.log('Client side script file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')//target by name
const message = document.querySelector('#result-1')//target by class
const messageError = document.querySelector('#error-1')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()//prevet the action of user in searchbox

    const location = search.value
    //console.log('testing')

    message.textContent = 'Loading...'
    messageError.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageError.textContent = data.error    
        }
        else{
            message.textContent = data.location
            messageError.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
        }
    })

})
})