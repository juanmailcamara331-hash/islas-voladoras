extends Node3D

var world_root: Node3D
var player: CharacterBody3D

func _ready() -> void:
    _make_environment()
    _build_island_zero()
    _make_player()

func _make_environment() -> void:
    var env := WorldEnvironment.new()
    var e := Environment.new()
    e.background_mode = Environment.BG_COLOR
    e.background_color = Color("83b6ca")
    e.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
    e.ambient_light_color = Color("d8ece3")
    e.ambient_light_energy = 0.78
    env.environment = e
    add_child(env)
    var sun := DirectionalLight3D.new()
    sun.rotation_degrees = Vector3(-52.0, -32.0, 0.0)
    sun.light_energy = 1.15
    sun.shadow_enabled = true
    add_child(sun)

func _build_island_zero() -> void:
    world_root = Node3D.new()
    world_root.name = "IslandZeroZG_Ramps"
    add_child(world_root)
    var thickness := 0.8
    _floor(Vector3(0, 1.70, 8), Vector3(24, thickness, 26))
    _floor(Vector3(0, 2.60, -16), Vector3(24, thickness, 10))
    _floor(Vector3(-6, 3.60, -31), Vector3(24, thickness, 10))
    _floor(Vector3(-2, 4.60, -46), Vector3(26, thickness, 10))
    _floor(Vector3(6, 5.60, -62), Vector3(26, thickness, 14))
    _connector(Vector3(0,2.10,-4), Vector3(0,3.00,-12), 12, thickness, 1.0)
    _connector(Vector3(0,3.00,-20), Vector3(-6,4.00,-27), 12, thickness, 1.0)
    _connector(Vector3(-6,4.00,-35), Vector3(-2,5.00,-42), 12, thickness, 1.0)
    _connector(Vector3(-2,5.00,-50), Vector3(6,6.00,-56), 12, thickness, 1.0)

func _floor(pos: Vector3, size: Vector3) -> void:
    _piece(pos, size, Vector3.ZERO, Color("78945a"))

func _connector(a: Vector3, b: Vector3, width: float, thickness: float, overlap: float) -> void:
    var delta := b-a
    var horizontal := Vector2(delta.x,delta.z).length()
    if horizontal < 0.01: return
    var center := (a+b)*0.5
    var yaw := rad_to_deg(atan2(delta.x,delta.z))
    var pitch := -rad_to_deg(atan2(delta.y,horizontal))
    _piece(center, Vector3(width,thickness,delta.length()+overlap*2.0), Vector3(pitch,yaw,0), Color("c5a45d"))

func _piece(pos: Vector3, size: Vector3, rot: Vector3, color: Color) -> void:
    var body := StaticBody3D.new()
    body.position=pos
    body.rotation_degrees=rot
    world_root.add_child(body)
    var collision:=CollisionShape3D.new()
    var shape:=BoxShape3D.new()
    shape.size=size
    collision.shape=shape
    body.add_child(collision)
    var mesh:=MeshInstance3D.new()
    var box:=BoxMesh.new()
    box.size=size
    mesh.mesh=box
    var mat:=StandardMaterial3D.new()
    mat.albedo_color=color
    mat.roughness=1.0
    mesh.material_override=mat
    body.add_child(mesh)

func _make_player() -> void:
    player=CharacterBody3D.new()
    player.name="Player"
    player.position=Vector3(0,3,12)
    world_root.add_child(player)
    var collision:=CollisionShape3D.new()
    var capsule:=CapsuleShape3D.new()
    capsule.radius=0.45
    capsule.height=1.8
    collision.shape=capsule
    player.add_child(collision)
    var mesh:=MeshInstance3D.new()
    var capsule_mesh:=CapsuleMesh.new()
    capsule_mesh.radius=0.45
    capsule_mesh.height=1.8
    mesh.mesh=capsule_mesh
    player.add_child(mesh)
