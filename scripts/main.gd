extends Node3D

var world_root: Node3D
var player: CharacterBody3D
var island_seed: int = 74191
var rng: RandomNumberGenerator = RandomNumberGenerator.new()
var route_points: Array[Vector3] = []
var route_valid: bool = false

func _ready() -> void:
	_make_environment()
	_build_island_zero()
	_make_player()

func _make_environment() -> void:
	var env: WorldEnvironment = WorldEnvironment.new()
	var e: Environment = Environment.new()
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

	var sun: DirectionalLight3D = DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-52.0, -32.0, 0.0)
	sun.light_energy = 1.15
	sun.shadow_enabled = true
	add_child(sun)

func _build_island_zero() -> void:
	world_root = Node3D.new()
	world_root.name = "IslandZeroCheckpointZG"
	add_child(world_root)
	rng.seed = island_seed
	_make_navigation_terrain_zc()
	route_points.clear()

	# CHECKPOINT R: la topologia critica se define primero como una cinta caminable continua.
	_organic_patch(Vector3(0.0, 0.0, 12.0), 19.0, 3.0, Color("56694d"))

	_route_floor(Vector3(0.0, 1.65, 3.0), Vector3(12.0, 0.6, 22.0), 0.0)
	_route_ramp(Vector3(0.0, 2.25, -11.0), Vector3(12.0, 0.6, 18.0), -4.0)
	_route_floor(Vector3(0.0, 2.88, -22.0), Vector3(14.0, 0.6, 10.0), 0.0)
	_route_floor(Vector3(-5.0, 2.88, -27.0), Vector3(12.0, 0.6, 8.0), 0.0)
	_route_ramp(Vector3(-10.0, 3.50, -33.0), Vector3(10.0, 0.6, 17.0), -4.0)
	_route_floor(Vector3(-10.0, 4.12, -43.0), Vector3(14.0, 0.6, 10.0), 0.0)
	_route_floor(Vector3(-4.0, 4.12, -48.0), Vector3(14.0, 0.6, 8.0), 0.0)
	_route_ramp(Vector3(2.0, 4.75, -53.0), Vector3(10.0, 0.6, 17.0), -4.0)
	_route_floor(Vector3(6.0, 5.38, -63.0), Vector3(17.0, 0.6, 13.0), 0.0)

	route_points.append(Vector3(0.0, 2.5, 10.0))
	route_points.append(Vector3(0.0, 3.0, -10.0))
	route_points.append(Vector3(0.0, 3.6, -22.0))
	route_points.append(Vector3(-10.0, 4.2, -34.0))
	route_points.append(Vector3(-10.0, 4.8, -43.0))
	route_points.append(Vector3(2.0, 5.4, -54.0))
	route_points.append(Vector3(6.0, 6.0, -63.0))

	_organic_patch(Vector3(-13.0, 0.25, 3.0), 11.0, 3.0, Color("52644a"))
	_organic_patch(Vector3(13.0, 0.35, 1.0), 11.5, 3.2, Color("5b704e"))
	_organic_patch(Vector3(-13.0, 1.0, -18.0), 10.0, 3.0, Color("586b4c"))
	_organic_patch(Vector3(12.0, 1.1, -20.0), 9.5, 3.0, Color("61734f"))
	_organic_patch(Vector3(-18.0, 2.0, -38.0), 10.5, 3.2, Color("5b6d4e"))
	_organic_patch(Vector3(8.0, 2.2, -42.0), 11.0, 3.2, Color("647653"))
	_organic_patch(Vector3(13.0, 3.3, -61.0), 12.0, 3.4, Color("697a56"))

	for i in range(9):
		var side: float = -1.0 if i % 2 != 0 else 1.0
		var px: float = side * rng.randf_range(16.0, 27.0)
		var pz: float = rng.randf_range(-58.0, 12.0)
		var pr: float = rng.randf_range(4.0, 7.0)
		_organic_patch(Vector3(px, rng.randf_range(-0.2, 2.0), pz), pr, rng.randf_range(2.4, 3.5), Color("56694d"))

	_route_floor(Vector3(10.0, 2.88, -22.0), Vector3(11.0, 0.6, 5.0), 0.0)
	_organic_patch(Vector3(18.0, 1.35, -22.0), 7.5, 2.8, Color("5c704f"))
	_route_floor(Vector3(18.0, 2.88, -28.0), Vector3(5.0, 0.6, 12.0), 0.0)
	_route_floor(Vector3(12.0, 2.88, -33.0), Vector3(12.0, 0.6, 5.0), 0.0)

	_stone(Vector3(1.0, 9.4, -66.0), Vector3(1.1, 7.0, 1.1))
	_stone(Vector3(6.0, 8.3, -66.0), Vector3(1.1, 5.0, 1.1))
	_stone(Vector3(11.0, 7.4, -66.0), Vector3(1.1, 3.2, 1.1))
	_scatter_safe_scenery()
	_make_wind_markers()

	_organic_under(Vector3(0.0, -3.0, 5.0), 19.0, 6.0)
	_organic_under(Vector3(0.0, -6.0, -12.0), 16.0, 8.0)
	_organic_under(Vector3(-6.0, -9.0, -31.0), 14.0, 10.0)
	_organic_under(Vector3(-2.0, -12.0, -48.0), 11.0, 12.0)
	_organic_under(Vector3(6.0, -15.0, -63.0), 8.0, 14.0)
	_distant_organic(Vector3(-86.0, 16.0, -112.0), 19.0, 9.0)
	_distant_organic(Vector3(94.0, -4.0, -124.0), 23.0, 12.0)
	_distant_organic(Vector3(124.0, 31.0, -78.0), 15.0, 8.0)

	route_valid = _validate_route()
	print("ISLA CERO ZG | seed=", island_seed, " | route_valid=", route_valid)
	_add_landmarks()
	_build_identity_layer_za()

func _make_navigation_terrain_zc() -> void:
	var thickness: float = 0.80
	_nav_floor_top(Vector3(0.0, 0.0, 8.0), Vector2(24.0, 26.0), 2.10, thickness)
	_nav_floor_top(Vector3(0.0, 0.0, -16.0), Vector2(24.0, 10.0), 5.10, thickness)
	_nav_floor_top(Vector3(-6.0, 0.0, -31.0), Vector2(24.0, 10.0), 8.10, thickness)
	_nav_floor_top(Vector3(-2.0, 0.0, -46.0), Vector2(26.0, 10.0), 11.10, thickness)
	_nav_floor_top(Vector3(6.0, 0.0, -62.0), Vector2(26.0, 14.0), 14.10, thickness)
	_nav_connector(Vector3(0.0, 2.10, -4.0), Vector3(0.0, 5.10, -12.0), 9.0, thickness, 1.25)
	_nav_connector(Vector3(0.0, 5.10, -20.0), Vector3(-6.0, 8.10, -27.0), 9.0, thickness, 1.25)
	_nav_connector(Vector3(-6.0, 8.10, -35.0), Vector3(-2.0, 11.10, -42.0), 9.0, thickness, 1.25)
	_nav_connector(Vector3(-2.0, 11.10, -50.0), Vector3(6.0, 14.10, -56.0), 9.0, thickness, 1.25)
	_nav_floor_top(Vector3(-18.0, 0.0, -10.0), Vector2(10.0, 10.0), 3.60, thickness)
	_nav_connector(Vector3(-10.0, 2.10, -8.0), Vector3(-14.0, 3.60, -10.0), 6.0, thickness, 1.0)
	_nav_floor_top(Vector3(18.0, 0.0, -25.0), Vector2(10.0, 10.0), 6.60, thickness)
	_nav_connector(Vector3(10.0, 5.10, -18.0), Vector3(14.0, 6.60, -23.0), 6.0, thickness, 1.0)
	_nav_floor_top(Vector3(-19.0, 0.0, -41.0), Vector2(10.0, 10.0), 9.60, thickness)
	_nav_connector(Vector3(-12.0, 8.10, -34.0), Vector3(-15.0, 9.60, -39.0), 6.0, thickness, 1.0)
	_nav_floor_top(Vector3(21.0, 0.0, -55.0), Vector2(10.0, 10.0), 12.60, thickness)
	_nav_connector(Vector3(10.0, 11.10, -48.0), Vector3(17.0, 12.60, -53.0), 6.0, thickness, 1.0)

func _nav_floor_top(center_xz: Vector3, footprint: Vector2, top_y: float, thickness: float) -> void:
	var pos: Vector3 = Vector3(center_xz.x, top_y - thickness * 0.5, center_xz.z)
	_nav_piece(pos, Vector3(footprint.x, thickness, footprint.y), Vector3.ZERO)

func _nav_connector(a: Vector3, b: Vector3, width: float, thickness: float, overlap: float) -> void:
	var delta: Vector3 = b - a
	var horizontal: float = Vector2(delta.x, delta.z).length()
	if horizontal < 0.01:
		return
	var slope_length: float = delta.length()
	var center: Vector3 = (a + b) * 0.5
	var yaw: float = rad_to_deg(atan2(delta.x, delta.z))
	var pitch: float = -rad_to_deg(atan2(delta.y, horizontal))
	var size: Vector3 = Vector3(width, thickness, slope_length + overlap * 2.0)
	_nav_piece(center, size, Vector3(pitch, yaw, 0.0))

func _nav_piece(pos: Vector3, size: Vector3, rot: Vector3) -> void:
	var body: StaticBody3D = StaticBody3D.new()
	body.position = pos
	body.rotation_degrees = rot
	body.add_to_group("walkable_route")
	world_root.add_child(body)
	var collision: CollisionShape3D = CollisionShape3D.new()
	var shape: BoxShape3D = BoxShape3D.new()
	shape.size = size
	collision.shape = shape
	body.add_child(collision)
	var mesh: MeshInstance3D = MeshInstance3D.new()
	var box: BoxMesh = BoxMesh.new()
	box.size = size
	mesh.mesh = box
	var mat: StandardMaterial3D = StandardMaterial3D.new()
	var is_ramp: bool = rot != Vector3.ZERO
	mat.albedo_color = Color("d2b36f") if is_ramp else Color("91a665")
	mat.roughness = 0.92
	mesh.material_override = mat
	body.add_child(mesh)
	if is_ramp:
		for side in [-1.0, 1.0]:
			var edge: MeshInstance3D = MeshInstance3D.new()
			var edge_box: BoxMesh = BoxMesh.new()
			edge_box.size = Vector3(0.24, 0.18, size.z)
			edge.mesh = edge_box
			edge.position = Vector3(side * (size.x * 0.5 - 0.18), size.y * 0.5 + 0.09, 0.0)
			var edge_mat: StandardMaterial3D = StandardMaterial3D.new()
			edge_mat.albedo_color = Color("66553f")
			edge_mat.roughness = 1.0
			edge.material_override = edge_mat
			body.add_child(edge)

func _route_floor(pos: Vector3, size: Vector3, angle_x: float) -> void:
	pass

func _route_ramp(pos: Vector3, size: Vector3, angle_x: float) -> void:
	pass

func _validate_route() -> bool:
	var space_state: PhysicsDirectSpaceState3D = get_world_3d().direct_space_state
	for point in route_points:
		var query: PhysicsRayQueryParameters3D = PhysicsRayQueryParameters3D.create(point + Vector3(0.0, 2.0, 0.0), point + Vector3(0.0, -5.0, 0.0))
		query.collide_with_areas = false
		query.collide_with_bodies = true
		var result: Dictionary = space_state.intersect_ray(query)
		if result.is_empty():
			return false
		var collider: Object = result.get("collider")
		if collider == null or not collider.is_in_group("walkable_route"):
			return false
	return true

func _scatter_safe_scenery() -> void:
	for i in range(24):
		var side: float = -1.0 if i % 2 != 0 else 1.0
		var x: float = side * rng.randf_range(22.0, 34.0)
		var z: float = rng.randf_range(-66.0, 10.0)
		var mesh: MeshInstance3D = MeshInstance3D.new()
		var sphere: SphereMesh = SphereMesh.new()
		sphere.radius = rng.randf_range(0.25, 0.75)
		sphere.height = sphere.radius * 1.45
		mesh.mesh = sphere
		mesh.position = Vector3(x, rng.randf_range(0.8, 2.5), z)
		mesh.scale = Vector3(rng.randf_range(0.8, 1.5), rng.randf_range(0.55, 1.0), rng.randf_range(0.8, 1.5))
		var mat: StandardMaterial3D = StandardMaterial3D.new()
		mat.albedo_color = Color("6f786d")
		mat.roughness = 1.0
		mesh.material_override = mat
		world_root.add_child(mesh)

func _make_wind_markers() -> void:
	for i in range(10):
		var mesh: MeshInstance3D = MeshInstance3D.new()
		var quad: QuadMesh = QuadMesh.new()
		quad.size = Vector2(rng.randf_range(1.5, 3.0), rng.randf_range(0.12, 0.25))
		mesh.mesh = quad
		mesh.position = Vector3(rng.randf_range(-35.0, 35.0), rng.randf_range(8.0, 18.0), rng.randf_range(-70.0, 15.0))
		mesh.rotation_degrees = Vector3(0.0, rng.randf_range(0.0, 360.0), 0.0)
		var mat: StandardMaterial3D = StandardMaterial3D.new()
		mat.albedo_color = Color(0.9, 0.96, 0.95, 0.18)
		mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		mesh.material_override = mat
		world_root.add_child(mesh)

func _route_clearance_valid() -> bool:
	var space_state: PhysicsDirectSpaceState3D = get_world_3d().direct_space_state
	for point in route_points:
		var shape: SphereShape3D = SphereShape3D.new()
		shape.radius = 0.75
		var params: PhysicsShapeQueryParameters3D = PhysicsShapeQueryParameters3D.new()
		params.shape = shape
		params.transform = Transform3D(Basis.IDENTITY, point + Vector3(0.0, 1.25, 0.0))
		params.collision_mask = 1
		params.collide_with_bodies = true
		params.collide_with_areas = false
		var hits: Array[Dictionary] = space_state.intersect_shape(params, 8)
		for hit in hits:
			var collider: Object = hit.get("collider")
			if collider != null and not collider.is_in_group("walkable_route"):
				return false
	return true

func _add_landmarks() -> void:
	for pos in [Vector3(-25.0, 5.0, -12.0), Vector3(25.0, 6.0, -35.0), Vector3(-26.0, 7.0, -55.0)]:
		var trunk: MeshInstance3D = MeshInstance3D.new()
		var cyl: CylinderMesh = CylinderMesh.new()
		cyl.top_radius = 0.18
		cyl.bottom_radius = 0.32
		cyl.height = 4.5
		cyl.radial_segments = 7
		trunk.mesh = cyl
		trunk.position = pos
		var tm: StandardMaterial3D = StandardMaterial3D.new()
		tm.albedo_color = Color("465044")
		tm.roughness = 1.0
		trunk.material_override = tm
		world_root.add_child(trunk)
		var crown: MeshInstance3D = MeshInstance3D.new()
		var sph: SphereMesh = SphereMesh.new()
		sph.radius = 1.6
		sph.height = 2.2
		crown.mesh = sph
		crown.position = pos + Vector3(0.0, 2.7, 0.0)
		crown.scale = Vector3(1.3, 0.75, 1.0)
		var cm: StandardMaterial3D = StandardMaterial3D.new()
		cm.albedo_color = Color("71845a")
		cm.roughness = 1.0
		crown.material_override = cm
		world_root.add_child(crown)

func _organic_patch(pos: Vector3, radius: float, depth: float, color: Color) -> void:
	# Decoracion visual solamente. La ruta critica es la unica autoridad fisica.
	# Evita colisiones superpuestas que provocaban microtirones en las uniones.
	var mesh: MeshInstance3D = MeshInstance3D.new()
	var cylinder: CylinderMesh = CylinderMesh.new()
	cylinder.top_radius = radius
	cylinder.bottom_radius = radius * 0.82
	cylinder.height = depth
	cylinder.radial_segments = 12
	mesh.mesh = cylinder
	mesh.position = pos
	var mat: StandardMaterial3D = StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 1.0
	mesh.material_override = mat
	world_root.add_child(mesh)
	var cap: MeshInstance3D = MeshInstance3D.new()
	var cap_cylinder: CylinderMesh = CylinderMesh.new()
	cap_cylinder.top_radius = radius * 1.005
	cap_cylinder.bottom_radius = radius * 1.005
	cap_cylinder.height = 0.16
	cap_cylinder.radial_segments = 12
	cap.mesh = cap_cylinder
	cap.position = pos + Vector3(0.0, depth * 0.5 + 0.08, 0.0)
	var grass: StandardMaterial3D = StandardMaterial3D.new()
	grass.albedo_color = Color("9eb36a")
	grass.roughness = 1.0
	cap.material_override = grass
	world_root.add_child(cap)

func _organic_under(pos: Vector3, radius: float, depth: float) -> void:
	var mesh: MeshInstance3D = MeshInstance3D.new()
	var cylinder: CylinderMesh = CylinderMesh.new()
	cylinder.top_radius = radius
	cylinder.bottom_radius = radius * 0.42
	cylinder.height = depth
	cylinder.radial_segments = 10
	mesh.mesh = cylinder
	mesh.position = pos
	var mat: StandardMaterial3D = StandardMaterial3D.new()
	mat.albedo_color = Color("46534c")
	mat.roughness = 1.0
	mesh.material_override = mat
	world_root.add_child(mesh)

func _distant_organic(pos: Vector3, radius: float, depth: float) -> void:
	var mesh: MeshInstance3D = MeshInstance3D.new()
	var cylinder: CylinderMesh = CylinderMesh.new()
	cylinder.top_radius = radius
	cylinder.bottom_radius = radius * 0.52
	cylinder.height = depth
	cylinder.radial_segments = 10
	mesh.mesh = cylinder
	mesh.position = pos
	var mat: StandardMaterial3D = StandardMaterial3D.new()
	mat.albedo_color = Color("4d5c58")
	mat.roughness = 1.0
	mesh.material_override = mat
	world_root.add_child(mesh)
