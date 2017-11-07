var url='ws://' +window.location.host+'/websocket/marco';
var socket=new WebSocket(url);

socket.onOpen=function(){
	console.log('Opening');
	sayMarco();
};

socket.onmessage=function(){
	console.log('Received message:',e.data);
	setTimeout(function(){sayMarco()},2000);
};

socket.onclose=function(){
	console.log('Closing');
}

function sayMarco(){
	console.log('Sending Marco!');
	socket.send("Marco!");
}