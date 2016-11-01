// First set up the pins
let Pins = require("pins");

Pins.configure({
    led: {
        require: "Digital", // use built-in digital BLL
        pins: {
            ground: { pin: 51, type: "Ground" },
            digital: { pin: 52, direction: "output" },
        }
    },
    ledtoilet: {
        require: "Digital", // use built-in digital BLL
        pins: {
            ground: { pin: 53, type: "Ground" },
            digital: { pin: 54, direction: "output" },
        }
    },
    ledmusic: {
        require: "Digital", // use built-in digital BLL
        pins: {
            ground: { pin: 55, type: "Ground" },
            digital: { pin: 56, direction: "output" },
        }
    },
   sensor: {
   		require: "Analog",
   		pins: {
   			analog: {pin: 60},
   			ground: {pin: 61, type: "Ground"},
   			power: {pin: 59, voltage: 3.3, type: "Power"}
   		}
   },
   sensorweight: {
   		require: "Analog",
   		pins: {
   			analog: {pin: 65},
   			ground: {pin: 66, type: "Ground"},
   			power: {pin: 64, voltage: 3.3, type: "Power"}
   		}
   },

}, function(success) {
   if (!success) trace("Failed to configure\n");
   Pins.share("ws", {zeroconf: true, name: "pins-share-led"});
});

// Make the interface
let orangeSkin = new Skin({ fill: 'orange' });
let blueSkin = new Skin({ fill: 'blue' });
let buttonStyle = new Style({font: '22px', color: 'white'});


let sensorButton = new Container({
	name: 'sensorButton',
	left: 80, right: 80, top: 20, bottom: 20, skin: blueSkin,
	contents: [
		new Label({ string: 'Sensor Value', style: buttonStyle })
	],
	active: true,
	behavior: Behavior ({
		onTouchEnded: function(content, id, x, y, ticks) {
			Pins.invoke("/sensorweight/read", function(result) {
		    		trace("the sensor 's value is "+result+"\n");
            //the code in line 43 is how you can change the value on the actual device.
//since we don't use the actual hardware in this programming3, whether or not to
//include this code makes no difference because we can't observe it.


			});
      // Pins.invoke("/sensor/write", 0);
      Pins.invoke("/ledmusic/read", function(result) {
		    		trace("the sensor 's value is "+result+"\n");
            if (result==0){
              Pins.invoke("/ledmusic/write", 1);
            }
            else{
              Pins.invoke("/ledmusic/write", 0);
            }


			});

		}
	})
});
let splashScreen = new Column({
	name: 'splashScreen',
	left: 0, right: 0, top: 0, bottom: 0, skin: orangeSkin,
	contents: [
	]
});

Handler.bind("/dispensingFood", Behavior({
    onInvoke: function(handler, message){
      let weightContainer = new Container({
        right:200, left:0, top:175,bottom:0, skin:blueSkin,
        contents:[new Label({
          string: "Dispensing Food", style: new Style({font: '22px', color: 'white'}),
        })]
      });

        // return JSON data to the invoker to indicate the current count
        application.add(weightContainer);
        message.status = 200;
    }
}));


application.add(splashScreen);
class ApplicationBehavior extends Behavior {
    onLaunch(application) {
        application.shared = true;
    }
    onQuit(application) {
        application.shared = false;
    }
}

application.behavior = new ApplicationBehavior();
