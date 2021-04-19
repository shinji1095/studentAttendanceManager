speechRecognition = new webkitSpeechRecognition(); 
speechRecognition.onresult = console.log; 
speechRecognition.start();