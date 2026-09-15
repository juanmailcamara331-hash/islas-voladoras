extends Node

enum Mode { TOUCH, KEYBOARD_MOUSE, GAMEPAD }
var mode: Mode = Mode.KEYBOARD_MOUSE
signal mode_changed(new_mode)

func _ready():
    _detect_initial()

func _detect_initial():
    if OS.has_feature("mobile") or OS.has_feature("web_android") or OS.has_feature("web_ios"):
        _set_mode(Mode.TOUCH)
    elif Input.get_connected_joypads().size() > 0:
        _set_mode(Mode.GAMEPAD)
    else:
        _set_mode(Mode.KEYBOARD_MOUSE)

func _input(event):
    if event is InputEventScreenTouch or event is InputEventScreenDrag:
        _set_mode(Mode.TOUCH)
    elif event is InputEventJoypadButton or event is InputEventJoypadMotion:
        _set_mode(Mode.GAMEPAD)
    elif event is InputEventKey or event is InputEventMouse:
        _set_mode(Mode.KEYBOARD_MOUSE)

func _set_mode(v):
    if mode != v:
        mode = v
        mode_changed.emit(v)

func mode_name() -> String:
    match mode:
        Mode.TOUCH: return "TOUCH"
        Mode.GAMEPAD: return "GAMEPAD"
        _: return "KEYBOARD_MOUSE"
