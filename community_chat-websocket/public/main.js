const socket = io()
const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input') 
const messageForm = document.getElementById('message-form')

const messageInput = document.getElementById('message-input')
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

  sendMessage()
})
const messageTone = new Audio('./Voicy_Discord Message.mp3')
socket.on('clients-total', (total) => {
  clientsTotal.innerText =  `Online: ${total}`
})

function sendMessage(){
    if(messageInput.value == " " || messageInput.value == ""){
        return
    }
    console.log(messageInput.value) 
    
    const data = {
      name: nameInput.value,
      message: messageInput.value,
      dateTime: new Date()


    }
    
    socket.emit('message', data)
    addMessageToUI(true,data)
    messageInput.value = '' 
}

socket.on('chat-message', (data) => {
    messageTone.play()
    // console.log(data)
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data){
    clearFeedback()
   const element = `<li class="${isOwnMessage ? 'message-right' : 'message-left'}">
   <p class="message">${data.message}
       <span>${data.name} -${moment(data.dateTime).fromNow()}</span>
   </p>
</li>` 
messageContainer.innerHTML += element
scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{
        feedback:`${nameInput.value} started typing..`
    })
})
messageInput.addEventListener('keydown',(e)=>{
  socket.emit('feedback', {
    feedback: `${nameInput.value} is typing...`
  })
})

messageInput.addEventListener('blur',(e)=>{
  socket.emit('feedback', {
    feedback: ''
  })
})
socket.on('feedback', (data) => {
    clearFeedback()
  const element =
  `<li class="message-feedback"><p class="feedback" id="feedback">${data.feedback}</p></li>`

  messageContainer.innerHTML += element
})

function clearFeedback(){
  document.querySelectorAll('li.message-feedback').forEach(element => {
    element.parentNode.removeChild(element)
  })
}