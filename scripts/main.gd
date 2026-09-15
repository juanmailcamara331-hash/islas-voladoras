extends Node3D

var world_root: Node3D
var player: CharacterBody3D
var island_seed: int = 74191
var rng := RandomNumberGenerator.new()

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
	e.fog_enabled = true
	e.fog_light_color = Color("b7d2d5")
	e.fog_density = 0.006
	env.environment = e
	add_child(env)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-52.0, -32.0, 0.0)
	sun.light_energy = 1.15
	sun.shadow_enabled = true
	add_child(sun)

func _build_island_zero() -> void:
	world_root = Node3D.new()
	world_root.name = "IslandZeroCheckpointZG"
	add_child(world_root)
	rng.seed = island_seed

	# Ruta principal: niveles y rampas que forman la isla ascendente.
	_nav_floor(Vector3(0.0, 1.7, 8.0), Vector3(24.0, 0.8, 26.0))
	_nav_ramp(Vector3(0.0, 3.6, -4.0), Vector3(12.0, 0.8, 18.0), -4.8)
	_nav_floor(Vector3(0.0, 5.1, -16.0), Vector3(24.0, 0.8, 10.0))
	_nav_ramp(Vector3(-3.0, 6.6, -22.0), Vector3(12.0, 0.8, 12.0), -4.8)
	_nav_floor(Vector3(-6.0, 8.1, -31.0), Vector3(24.0, 0.8, 10.0))
	_nav_ramp(Vector3(-4.0, 9.6, -37.0), Vector3(12.0, 0.8, 12.0), -4.8)
	_nav_floor(Vector3(-2.0, 11.1, -46.0), Vector3(26.0, 0.8, 10.0))
	_nav_ramp(Vector3(2.0, 12.6, -52.0), Vector3(12.0, 0.8, 12.0), -4.8)
	_nav_floor(Vector3(6.0, 14.1, -62.0), Vector3(26.0, 0.8, 14.0))

	# Plataformas laterales y decoración orgánica.
	_organic_patch(Vector3(-13.0, 0.25, 3.0), 11.0, 3.0, Color("52644a"))
	_organic_patch(Vector3(13.0, 0.35, 1.0), 11.5, 3.2, Color("5b704e"))
	_organic_patch(Vector3(-13.0, 1.0, -18.0), 10.0, 3.0, Color("586b4c"))
	_organic_patch(Vector3(12.0, 1.1, -20.0), 9.5, 3.0, Color("61734f"))
	_organic_patch(Vector3(-18.0, 2.0, -38.0), 10.5, 3.2, Color("5b6d4e"))
	_organic_patch(Vector3(8.0, 2.2, -42.0), 11.0, 3.2, Color("647653"))
	_organic_patch(Vector3(13.0, 3.3, -61.0), 12.0, 3.4, Color("697a56"))

	for i in range(9):
		var side := -1.0 if i % 2 != 0 else 1.0
		var px := side * rng.randf_range(16.0, 27.0)
		var pz := rng.randf_range(-58.0, 12.0)
		_organic_patch(Vector3(px, rng.randf_range(-0.2, 2.0), pz), rng.randf_range(4.0, 7.0), rng.randf_range(2.4, 3.5), Color("56694d"))

	for data in [
		[Vector3(1.0, 9.4, -66.0), Vector3(1.1, 7.0, 1.1)],
		[Vector3(6.0, 8.3, -66.0), Vector3(1.1, 5.0, 1.1)],
		[Vector3(11.0, 7.4, -66.0), Vector3(1.1, 3.2, 1.1)]
	]:
		_make_stone(data[0], data[1])

	_make_scenery()
	_make_wind_markers()
	_make_under_islands()

func _nav_floor(pos: Vector3, size: Vector3) -> void:
	_nav_piece(pos, size, Vector3.ZERO, Color("91a665"))

func _nav_ramp(pos: Vector3, size: Vector3, angle_x: float) -> void:
	_nav_piece(pos, size, Vector3(angle_x, 0.0, 0.0), Color("d2b36f"))

func _nav_piece(pos: Vector3, size: Vector3, rot: Vector3, color: Color) -> void:
	var body := StaticBody3D.new()
	body.position = pos
	body.rotation_degrees = rot
	body.add_to_group("walkable_route")
	world_root.add_child(body)
	var collision := CollisionShape3D.new()
	var shape := BoxShape3D.new()
	shape.size = size
	collision.shape = shape
	body.add_child(collision)
	var mesh := MeshInstance3D.new()
	var box := BoxMesh.new()
	box.size = size
	mesh.mesh = box
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.92
	mesh.material_override = mat
	body.add_child(mesh)
	if rot != Vector3.ZERO:
		for side in [-1.0, 1.0]:
			var edge := MeshInstance3D.new()
			var edge_box := BoxMesh.new()
			edge_box.size = Vector3(0.24, 0.18, size.z)
			edge.mesh = edge_box
			edge.position = Vector3(side * (size.x * 0.5 - 0.18), size.y * 0.5 + 0.09, 0.0)
			var edge_mat := StandardMaterial3D.new()
			edge_mat.albedo_color = Color("66553f")
			edge_mat.roughness = 1.0
			edge.material_override = edge_mat
			body.add_child(edge)

func _organic_patch(pos: Vector3, radius: float, depth: float, color: Color) -> void:
	var mesh := MeshInstance3D.new()
	var cylinder := CylinderMesh.new()
	cylinder.top_radius = radius
	cylinder.bottom_radius = radius * 0.82
	cylinder.height = depth
	cylinder.radial_segments = 12
	mesh.mesh = cylinder
	mesh.position = pos
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 1.0
	mesh.material_override = mat
	world_root.add_child(mesh)
	var cap := MeshInstance3D.new()
	var cap_cylinder := CylinderMesh.new()
	cap_cylinder.top_radius = radius * 1.005
	cap_cylinder.bottom_radius = radius * 1.005
	cap_cylinder.height = 0.16
	cap_cylinder.radial_segments = 12
	cap.mesh = cap_cylinder
	cap.position = pos + Vector3(0.0, depth * 0.5 + 0.08, 0.0)
	var grass := StandardMaterial3D.new()
	grass.albedo_color = Color("9eb36a")
	grass.roughness = 1.0
	cap.material_override = grass
	world_root.add_child(cap)

func _make_stone(pos: Vector3, size: Vector3) -> void:
	var mesh := MeshInstance3D.new()
	var box := BoxMesh.new()
	box.size = size
	mesh.mesh = box
	mesh.position = pos
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color("465044")
	mat.roughness = 1.0
	mesh.material_override = mat
	world_root.add_child(mesh)

func _make_scenery() -> void:
	for i in range(24):
		var side := -1.0 if i % 2 != 0 else 1.0
		var mesh := MeshInstance3D.new()
		var sphere := SphereMesh.new()
		sphere.radius = rng.randf_range(0.25, 0.75)
		sphere.height = sphere.radius * 1.45
		mesh.mesh = sphere
		mesh.position = Vector3(side * rng.randf_range(22.0, 34.0), rng.randf_range(0.8, 5.5), rng.randf_range(-66.0, 10.0))
		mesh.scale = Vector3(rng.randf_range(0.8, 1.5), rng.randf_range(0.55, 1.0), rng.randf_range(0.8, 1.5))
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color("6f786d")
		mat.roughness = 1.0
		mesh.material_override = mat
		world_root.add_child(mesh)

func _make_wind_markers() -> void:
	for i in range(10):
		var mesh := MeshInstance3D.new()
		var quad := QuadMesh.new()
		quad.size = Vector2(rng.randf_range(1.5, 3.0), rng.randf_range(0.12, 0.25))
		mesh.mesh = quad
		mesh.position = Vector3(rng.randf_range(-35.0, 35.0), rng.randf_range(8.0, 18.0), rng.randf_range(-70.0, 15.0))
		mesh.rotation_degrees.y = rng.randf_range(0.0, 360.0)
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color(0.9, 0.96, 0.95, 0.18)
		mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		mesh.material_override = mat
		world_root.add_child(mesh)

func _make_under_islands() -> void:
	for data in [
		[Vector3(0.0, -3.0, 5.0), 19.0, 6.0],
		[Vector3(0.0, -6.0, -12.0), 16.0, 8.0],
		[Vector3(-6.0, -9.0, -31.0), 14.0, 10.0],
		[Vector3(-2.0, -12.0, -48.0), 11.0, 12.0],
		[Vector3(6.0, -15.0, -63.0), 8.0, 14.0]
	]:
		var mesh := MeshInstance3D.new()
		var cylinder := CylinderMesh.new()
		cylinder.top_radius = data[1]
		cylinder.bottom_radius = data[1] * 0.42
		cylinder.height = data[2]
		cylinder.radial_segments = 10
		mesh.mesh = cylinder
		mesh.position = data[0]
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color("46534c")
		mat.roughness = 1.0
		mesh.material_override = mat
		world_root.add_child(mesh)

func _make_player() -> void:
	player = CharacterBody3D.new()
	player.name = "Player"
	player.position = Vector3(0.0, 3.1, 8.0)
	player.set_script(load("res://scripts/player.gd"))
	add_child(player)

	var collision := CollisionShape3D.new()
	var capsule := CapsuleShape3D.new()
	capsule.radius = 0.42
	capsule.height = 1.8
	collision.shape = capsule
	collision.position.y = 0.9
	player.add_child(collision)

	var pivot := Node3D.new()
	pivot.name = "CameraPivot"
	pivot.position = Vector3(0.0, 1.55, 0.0)
	player.add_child(pivot)

	var camera := Camera3D.new()
	camera.name = "Camera3D"
	camera.position = Vector3(0.0, 0.0, 0.15)
	camera.current = true
	camera.fov = 72.0
	pivot.add_child(camera)

func _process(_delta: float) -> void:
	# La camara queda garantizada como activa en Web aunque el navegador cambie el viewport.
	if player != null:
		var camera := player.get_node_or_null("CameraPivot/Camera3D") as Camera3D
		if camera != null and not camera.current:
			camera.current = true
