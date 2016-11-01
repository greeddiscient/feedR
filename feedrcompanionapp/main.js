let Pins = require("pins");

let whiteSkin = new Skin({ fill: 'white' });
let redSkin = new Skin({ fill: 'red' });
let greenSkin = new Skin({ fill: 'green' });
let brownSkin = new Skin({ fill: '#8B4513' });
let blackSkin = new Skin({ fill: 'black' });
let buttonStyle = new Style({font: '22px', color: 'white'});

let sensorButton = new Container({
	name: 'sensorButton',
	left: 100, right: 100, top: 0, bottom: 200, skin: redSkin,
	contents: [
		new Label({ string: 'ALERT DOG', style: buttonStyle })
	],
	active: true,
	behavior: Behavior ({
		onTouchEnded: function(content, id, x, y, ticks) {
		}
	})
});
let feedButton = new Container({
	name: 'feedButton',
	left: 220, right: 0, top: 0, bottom: 200, skin: greenSkin,
	contents: [
		new Label({ string: 'Feed :', style: buttonStyle })
	],
	active: true,
	behavior: Behavior ({
		onTouchEnded: function(content, id, x, y, ticks) {
		}
	})
});
let musicButton = new Container({
	name: 'musicButton',
	left: 0, right: 200, top: 0, bottom: 200, skin: greenSkin,
	contents: [
		new Label({ string: 'On', style: buttonStyle })
	],
	active: true,
	behavior: Behavior ({
		onTouchEnded: function(content, id, x, y, ticks) {
		}
	})
});
let splashScreen = new Column({
	name: 'splashScreen',
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
	contents: [
		sensorButton
	]
});
let musicStatusOn = new Container({
	name: 'musicButton',
	left: 50, right: 220, top: 0, bottom: 200, skin: blackSkin,
	contents: [
		new Label({ string: 'On', style: buttonStyle })
  ],
    active: true,
  	behavior: Behavior ({
  		onTouchEnded: function(content, id, x, y, ticks) {
        application.remove(musicStatusOn)
        application.add(musicStatusOff);
  		}
  	})
});
let musicStatusOff = new Container({
	name: 'musicButton',
	left: 50, right: 220, top: 0, bottom: 200, skin: blackSkin,
	contents: [
		new Label({ string: 'Off', style: buttonStyle })],
    active: true,
  	behavior: Behavior ({
  		onTouchEnded: function(content, id, x, y, ticks) {
        application.remove(musicStatusOff)
        application.add(musicStatusOn);
  		}
  	})
});
let feedrLabel= new Label({
  string: "FeedR", style: new Style({font: '22px', color: 'green'}), bottom:125, top:0, left:0,right:0
})
let feedContainer = new Container({
  left:220, right:0, top:0,bottom:145, skin:greenSkin
});
let meatPicture = new Picture({
	height: 50, width:50, left:220, bottom:150, url: "assets/meat.png", aspect: "fill"
})
let drinkPicture = new Picture({
	height: 50, width:50, left:275, bottom:150, url: "assets/water.png", aspect: "fill"
})
let dogPicture = new Picture({
	height: 125, width:125, url: "assets/dog.png", aspect: "fill"
})
let musicPicture = new Picture({
	height: 50, width:50, right:275, bottom:200, url: "assets/music.png", aspect: "fill"
})
let toiletContainer = new Container({
  right:0, left:210, top:175,bottom:0, skin:brownSkin,
  contents:[new Line({contents:[new Picture({
  	height: 50, width:50, url: "assets/toilet.png", aspect: "fill"
  }), new Column({contents:[new Label({
    string: "Go", style: new Style({font: '22px', color: 'white'}),
  }),new Label({
    string: "Toilet", style: new Style({font: '22px', color: 'white'}),
  })]})]})],
  active: true,
  behavior: Behavior ({
    onTouchEnded: function(content, id, x, y, ticks) {
      trace("pooping"+"\n")
    }
  })

});
application.add(splashScreen);
application.add(dogPicture);
application.add(feedContainer);
application.add(feedButton);
application.add(meatPicture);
application.add(drinkPicture);
application.add(musicPicture);
application.add(musicStatusOff);
application.add(feedrLabel);
application.add(toiletContainer);


let remotePins;
class AppBehavior extends Behavior {
    onLaunch(application) {
        trace("menatap"+"\n");
				let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
                }
            },
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Disconnected from remote pins\n");
                    remotePins = undefined;
                }
            },

        );
			}
}
application.behavior = new AppBehavior();