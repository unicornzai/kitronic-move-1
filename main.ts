input.onButtonPressed(Button.A, function () {
    if (radioControl == 1) {
        radio.sendString("a")
        images.arrowImage(ArrowNames.North).showImage(0)
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (radioControl == 1) {
        radio.sendString("l")
        images.arrowImage(ArrowNames.West).showImage(0)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (radioControl == 1) {
        radio.sendString("mb")
        basic.showIcon(IconNames.Sword)
    }
})
radio.onReceivedString(function (receivedString) {
    if (radioControl == 0) {
        if (receivedString == "a") {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (receivedString == "b") {
            Kitronik_Move_Motor.stop()
        } else if (receivedString == "l") {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (receivedString == "r") {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 50)
            basic.pause(500)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
        } else if (receivedString == "mb") {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (radioControl == 1) {
        radio.sendString("b")
        basic.showIcon(IconNames.No)
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (radioControl == 1) {
        radio.sendString("r")
        images.arrowImage(ArrowNames.East).showImage(0)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    radioControl = 1
    basic.showLeds(`
        # # # # #
        # # . # #
        # . # . #
        # # . # #
        # # # # #
        `)
})
let radioControl = 0
basic.showIcon(IconNames.House)
Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
radioControl = 0
radio.setGroup(55)
basic.forever(function () {
    if (radioControl == 0) {
        if (Kitronik_Move_Motor.measure() > 5) {
            basic.showIcon(IconNames.Happy)
        } else if (Kitronik_Move_Motor.measure() < 5) {
            basic.showIcon(IconNames.Sad)
            Kitronik_Move_Motor.stop()
        }
    }
})
