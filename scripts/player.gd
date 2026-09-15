extends CharacterBody3D

@onready var pivot: Node3D = get_node_or_null("CameraPivot")
@onready var camera: Camera3D = get_node_or_null("CameraPivot/Camera3D")

var yaw: float = 0.0
var pitch: float = -0.22
var max_speed: float = 7.2
var acceleration: float = 10.0
var deceleration: float = 13.0
var gravity: float = 20.0

func _ready() -> void:
    floor_snap_length = 1.2
    floor_max_angle = deg_to_rad(58.0)
    if camera != null:
        camera.keep_aspect = Camera3D.KEEP_HEIGHT
    if not OS.has_feature("mobile"):
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseMotion:
        if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
            var mouse_event: InputEventMouseMotion = event as InputEventMouseMotion
            var mouse_look_factor: float = 0.003
            if OS.has_feature("web"):
                mouse_look_factor = 0.0015
            _apply_look(mouse_event.relative * mouse_look_factor)

func _physics_process(delta: float) -> void:
    var input_vector: Vector2 = Input.get_vector(
        "move_left",
        "move_right",
        "move_forward",
        "move_back"
    )

    if has_meta("touch_move"):
        var mobile_vector: Vector2 = get_meta("touch_move")
        if OS.has_feature("mobile") or mobile_vector.length() > 0.01:
            input_vector = mobile_vector

    if has_meta("touch_look"):
        var mobile_look: Vector2 = get_meta("touch_look")
        if mobile_look.length() > 0.0:
            var touch_look_factor: float = 0.0036
            if OS.has_feature("web"):
                touch_look_factor = 0.0018
            _apply_look(mobile_look * touch_look_factor)

    # MOVIMIENTO RELATIVO A LA VISTA:
    # usamos la dirección horizontal REAL de la cámara en cada frame.
    var camera_forward: Vector3 = Vector3(0.0, 0.0, -1.0)
    var camera_right: Vector3 = Vector3(1.0, 0.0, 0.0)

    if camera != null:
        camera_forward = -camera.global_transform.basis.z
        camera_right = camera.global_transform.basis.x
    elif pivot != null:
        camera_forward = -pivot.global_transform.basis.z
        camera_right = pivot.global_transform.basis.x

    camera_forward.y = 0.0
    camera_right.y = 0.0

    if camera_forward.length() > 0.001:
        camera_forward = camera_forward.normalized()
    if camera_right.length() > 0.001:
        camera_right = camera_right.normalized()

    var strength: float = clampf(input_vector.length(), 0.0, 1.0)

    var desired_direction: Vector3 = (
        camera_right * input_vector.x
        + camera_forward * (-input_vector.y)
    )

    if desired_direction.length() > 0.001:
        desired_direction = desired_direction.normalized()

    var speed_factor: float = strength * strength * 0.72 + strength * 0.28
    var target_velocity: Vector3 = desired_direction * max_speed * speed_factor

    var horizontal_velocity: Vector3 = Vector3(velocity.x, 0.0, velocity.z)
    var change_rate: float = deceleration
    if strength > 0.01:
        change_rate = acceleration

    horizontal_velocity = horizontal_velocity.move_toward(
        target_velocity,
        change_rate * delta
    )

    velocity.x = horizontal_velocity.x
    velocity.z = horizontal_velocity.z

    if not is_on_floor():
        velocity.y -= gravity * delta
    else:
        if velocity.y < 0.0:
            velocity.y = -0.5

    move_and_slide()

    if global_position.y < -30.0:
        global_position = Vector3(0.0, 8.0, 0.0)
        velocity = Vector3.ZERO

func _apply_look(amount: Vector2) -> void:
    yaw -= amount.x
    pitch = clampf(pitch - amount.y, -1.15, 0.50)

    if pivot != null:
        pivot.rotation = Vector3(pitch, yaw, 0.0)
