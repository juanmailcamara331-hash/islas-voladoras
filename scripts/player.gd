extends CharacterBody3D

@onready var pivot: Node3D = get_node_or_null("CameraPivot")
@onready var camera: Camera3D = get_node_or_null("CameraPivot/Camera3D")

var yaw: float = 0.0
var pitch: float = -0.22
var max_speed: float = 6.0
var acceleration: float = 7.0
var deceleration: float = 10.0
var gravity: float = 20.0

func _ready() -> void:
    # Reduce contact jitter on Web, especially on overlapping ramp/floor seams.
    safe_margin = 0.02
    floor_snap_length = 0.70
    floor_max_angle = deg_to_rad(58.0)
    floor_constant_speed = true
    floor_stop_on_slope = true
    if camera != null:
        camera.keep_aspect = Camera3D.KEEP_HEIGHT
    if not OS.has_feature("mobile"):
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseMotion:
        if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
            var mouse_event: InputEventMouseMotion = event as InputEventMouseMotion
            var sensitivity: float = 0.0010 if OS.has_feature("web") else 0.003
            _apply_look(mouse_event.relative * sensitivity)

func _physics_process(delta: float) -> void:
    var input_vector: Vector2 = Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    if has_meta("touch_move"):
        var mobile_vector: Vector2 = get_meta("touch_move")
        if OS.has_feature("mobile") or mobile_vector.length() > 0.01:
            input_vector = mobile_vector
    if has_meta("touch_look"):
        var mobile_look: Vector2 = get_meta("touch_look")
        if mobile_look.length() > 0.0:
            _apply_look(mobile_look * 0.0024)

    var basis: Basis = global_transform.basis
    if camera != null:
        basis = camera.global_transform.basis
    var forward: Vector3 = -basis.z
    var right: Vector3 = basis.x
    forward.y = 0.0
    right.y = 0.0
    forward = forward.normalized()
    right = right.normalized()

    var direction: Vector3 = right * input_vector.x + forward * input_vector.y
    if direction.length() > 1.0:
        direction = direction.normalized()

    var target_velocity: Vector3 = direction * max_speed
    var horizontal: Vector3 = Vector3(velocity.x, 0.0, velocity.z)
    var rate: float = acceleration if direction.length() > 0.01 else deceleration
    horizontal = horizontal.move_toward(Vector3(target_velocity.x, 0.0, target_velocity.z), rate * delta)
    velocity.x = horizontal.x
    velocity.z = horizontal.z

    if not is_on_floor():
        velocity.y -= gravity * delta
    else:
        velocity.y = min(velocity.y, 0.0)

    move_and_slide()

func _apply_look(amount: Vector2) -> void:
    yaw -= amount.x
    pitch = clamp(pitch - amount.y, -1.25, 0.75)
    rotation.y = yaw
    if pivot != null:
        pivot.rotation.x = pitch
