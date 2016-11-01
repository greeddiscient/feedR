let Pins = require("pins");

let textStyle = new Style({ font: "bold 50px", color: "white" });
let MainContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: $.backgroundColor }),
    contents: [
        Label($, {
            top: 70, bottom: 70, left: 70, right: 70,
            style: textStyle,  string: $.string
        }),
    ],
}));

class AppBehavior extends Behavior {
    onLaunch(application) {
        Pins.configure({
            led: {
                require: "Digital", // use built-in digital BLL
                pins: {
                    ground: { pin: 51, type: "Ground" },
                    digital: { pin: 52, direction: "output" },
                }
            },
        },  success => {
            if (success) {
                Pins.share("ws", {zeroconf: true, name: "pins-share-led"});
                application.add(new MainContainer({ string: "Ready!", backgroundColor: "#7DBF2E" }));
            } else {
                   application.add(new MainContainer({ string: "Error", backgroundColor: "red" }));
               };
        });
    }
}
application.behavior = new AppBehavior();
