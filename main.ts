input.onPinPressed(TouchPin.P0, function () {
    schudActie()
})
function populateList () {
    // maak de lijst leeg
    kieslijst = []
    for (let index = 0; index <= maximaalGetal - 1; index++) {
        kieslijst.push(index + 1)
    }
}
input.onButtonPressed(Button.A, function () {
    // zitten we in configMode? mode is 1
    if (mode == 1) {
        // is het maximale getal groter dan 2
        if (maximaalGetal > 2) {
            // haal 1 van het maximale getal af
            maximaalGetal += -1
        }
        // vul de lijst opnieuw
        populateList()
    }
})
function schudActie () {
    // alleen in playMode -> mode is 0 kunnen we shaken voor een getal
    if (mode == 0) {
        // zitten er nog getallen in de lijst
        if (kieslijst.length > 0) {
            // is er geschud na de minimale wachttijd tussen schudden
            if (control.millis() - shakeStart > shakeDelay) {
                // sla het moment van schudden op
                shakeStart = control.millis()
                // pak een willekeurig getal tussen 0 en de lengte van de lijst - 1 en sla op in gekozenPlekInLijst
                gekozenPlekInLijst = randint(0, kieslijst.length - 1)
                // speel geluidje in achtergrond
                music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
                // toon het nummer op plaats pickItem uit de lijst
                basic.showNumber(kieslijst[gekozenPlekInLijst])
                kieslijst.splice(gekozenPlekInLijst,1)
            }
        } else {
            // er zitten geen getallen meer in de lijst, toon een pictogram dat we klaar zijn
            basic.showIcon(IconNames.Yes)
            // vul de lijst opnieuw
            populateList()
        }
    }
}
input.onGesture(Gesture.Shake, function () {
    schudActie()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // zitten we in configuratie modus => mode = 1?
    if (mode == 1) {
        // toon wat het maximale nummer is
        basic.showNumber(maximaalGetal)
        // wacht 2 sec
        basic.pause(1000)
        // zet de mode terug naar playMode => mode =0
        mode = 0
        // toon een pictogram
        basic.showLeds(`
            . . . . .
            . # . # .
            # . . . #
            . # . # .
            . . . . .
            `)
    } else {
        // schakel nu configMode,  nu kunnen we met de A en B knoppen het maximale getal aanpassen
        mode = 1
        // toon pictogram
        basic.showIcon(IconNames.Target)
    }
})
input.onButtonPressed(Button.B, function () {
    // zitten we in configMode? mode is 1
    if (mode == 1) {
        // is het maximale getal onder de 60
        if (maximaalGetal < 60) {
            // tel 1 bij het maximale getal op
            maximaalGetal += 1
        }
        // vul de lijst opnieuw
        populateList()
    }
})
let mode = 0
let shakeStart = 0
let maximaalGetal = 0
let shakeDelay = 0
let kieslijst: number[] = []
let gekozenPlekInLijst = 0
// hoe lang wachten voor dat we weer kunnen schudden voor een nummer (in ms)
shakeDelay = 2000
// tot hoever tellen we
maximaalGetal = 10
// zet aan het begin het moment van schudden op 0
shakeStart = 0
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
// vul een lijst met nummers
populateList()
basic.showLeds(`
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    `)
// wacht 2 sec
basic.pause(1000)
basic.clearScreen()
// toon wat het maximale nummer is
basic.showNumber(maximaalGetal)
basic.showLeds(`
    . . . . .
    . # . # .
    # . . . #
    . # . # .
    . . . . .
    `)
