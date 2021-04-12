const eventController = require("./eventController");

function handleEvent(event) {
    try{
      switch(event.type) {
          case 'message':
            eventController.returnText(event);
            break
          case "postback":
            eventController.postback(event);
            break
          case 'follow':
            eventController.follow(event);
            break;
          case 'unfollow':
            eventController.unfollow(event);
            break;
          default:
              return Promise.resolve(null);
      }
    }catch(err){
      console.log(err)
    }
  }

exports.handleEvent = handleEvent;