def on_button_pressed_a():
    if radioControl == 1:
        radio.send_string("a")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_tilt_left():
    if radioControl == 1:
        radio.send_string("l")
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def on_button_pressed_ab():
    if radioControl == 1:
        radio.send_string("mb")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    if radioControl == 0:
        if receivedString == "a":
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 50)
        elif receivedString == "b":
            Kitronik_Move_Motor.stop()
        elif receivedString == "l":
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
        elif receivedString == "r":
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
        elif receivedString == "mb":
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.REVERSE, 50)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    if radioControl == 1:
        radio.send_string("b")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    if radioControl == 1:
        radio.send_string("r")
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def on_logo_touched():
    global radioControl
    radioControl = 1
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

radioControl = 0
Kitronik_Move_Motor.set_ultrasonic_units(Kitronik_Move_Motor.Units.CENTIMETERS)
radioControl = 0
radio.set_group(55)

def on_forever():
    if Kitronik_Move_Motor.measure() > 5:
        basic.show_icon(IconNames.HAPPY)
    elif Kitronik_Move_Motor.measure() < 5:
        basic.show_icon(IconNames.SAD)
        Kitronik_Move_Motor.stop()
basic.forever(on_forever)
