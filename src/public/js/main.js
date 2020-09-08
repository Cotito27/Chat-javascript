$(function () {
  
  // socket.io client side connection
  const socket = io.connect();

  // obtaining DOM elements from the Chat Interface
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  // obtaining DOM elements from the NicknameForm Interface
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  // obtaining the usernames container DOM
  const $users = $('#usernames');

    if(sessionStorage.username!=""&&sessionStorage.username!=undefined
    &&sessionStorage.username!=null){
      $('#nickWrap').hide();
      $('#contentWrap').show();
      $('#message').focus();
      addUsers(sessionStorage.username);
    }

  $nickForm.submit(e => {
    e.preventDefault();
    sessionStorage.username=$nickname.val();
    addUsers(sessionStorage.username);
    $nickname.val('');
  });
  function addUsers(user) {
    socket.emit('new user', user, data => {
      if(data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
        $('#message').focus();
      } else {
        $nickError.html(`
          <div class="alert alert-danger">
            That username already Exists.
          </div>
        `);
      }
    });
  }

  // events
  $messageForm.submit( e => {
    e.preventDefault();
    if($messageBox.val() !== ""){
      socket.emit('send message', $messageBox.val(), data => {
        $chat.append(`<p class="error">${data}</p>`);
      });
      setTimeout(function(){
        $chat.scrollTop($chat.prop('scrollHeight'));
      },100);
      $messageBox.val('');
    }
    $messageBox.focus();
  });

  socket.on('new message', data => {
    displayMsg(data);
    if($chat.scrollTop()+$chat.outerHeight()+40 >= $chat.prop('scrollHeight')){
      $chat.scrollTop($chat.prop('scrollHeight'));
    }
  });

  socket.on('usernames', data => {
    let html = '';
    for(i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`; 
    }
    $users.html(html);
  });
  
  socket.on('whisper', data => {
    $chat.append(`<p class="whisper"><b>${data.nick}</b>: ${data.msg}</p>`);
  });

  socket.on('load old msgs', msgs => {
    for(let i = msgs.length -1; i >=0 ; i--) {
      displayMsg(msgs[i]);
    }
  });

  function displayMsg(data) {
    $chat.append(`<p class="msg"><b>${data.nick}</b>: ${data.msg}</p>`);
  }

});