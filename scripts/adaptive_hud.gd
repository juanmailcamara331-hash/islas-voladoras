extends CanvasLayer

var player = null
var move_touch_id: int = -1
var camera_touch_id: int = -1
var move_origin: Vector2 = Vector2.ZERO
var touch_move: Vector2 = Vector2.ZERO
var touch_look: Vector2 = Vector2.ZERO
var joystick_radius: float = 100.0

func _ready() -> void:
    player = get_parent().get_node_or_null("Player")

func _input(event: InputEvent) -> void:
    var viewport_size: Vector2 = get_viewport().get_visible_rect().size

    if event is InputEventScreenTouch:
        var touch: InputEventScreenTouch = event as InputEventScreenTouch
        if touch.pressed:
            if touch.position.x < viewport_size.x * 0.48:
                if move_touch_id == -1:
                    move_touch_id = touch.index
                    move_origin = touch.position
                    touch_move = Vector2.ZERO
            else:
                if camera_touch_id == -1:
                    camera_touch_id = touch.index
        else:
            if touch.index == move_touch_id:
                move_touch_id = -1
                touch_move = Vector2.ZERO
            if touch.index == camera_touch_id:
                camera_touch_id = -1

    if event is InputEventScreenDrag:
        var drag: InputEventScreenDrag = event as InputEventScreenDrag
        if drag.index == move_touch_id:
            var displacement: Vector2 = drag.position - move_origin
            var distance: float = displacement.length()
            if distance < 10.0:
                touch_move = Vector2.ZERO
            else:
                var limited_distance: float = minf(distance, joystick_radius)
                touch_move = displacement.normalized() * (limited_distance / joystick_radius)
        if drag.index == camera_touch_id:
            touch_look = touch_look + drag.relative

func _process(_delta: float) -> void:
    if player == null:
        player = get_parent().get_node_or_null("Player")
    if player != null:
        player.set_meta("touch_move", touch_move)
        player.set_meta("touch_look", touch_look)
    touch_look = Vector2.ZERO
