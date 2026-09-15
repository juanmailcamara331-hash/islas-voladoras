extends Node3D

var time := 0.0
var floaters: Array[Node3D] = []

func _ready() -> void:
	call_deferred("_build")

func _process(delta: float) -> void:
	time += delta
	for i in range(floaters.size()):
		var n := floaters[i]
		var phase := time * (0.18 + i * 0.025) + i * 1.7
		n.position.y += sin(phase) * delta * 0.22
		n.rotation.y += delta * (0.08 + i * 0.015)

func _build() -> void:
	_make_sky_particles()
	_make_floating_debris()
	_make_distant_islands()

func _make_sky_particles() -> void:
	var particles := GPUParticles3D.new()
	particles.amount = 80
	particles.lifetime = 8.0
	particles.visibility_aabb = AABB(Vector3(-90,-30,-150), Vector3(180,90,190))
	var process := ParticleProcessMaterial.new()
	process.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_BOX
	process.emission_box_extents = Vector3(70,35,80)
	process.direction = Vector3(0,0.12,0)
	process.spread = 180.0
	process.gravity = Vector3(0,0.02,0)
	process.initial_velocity_min = 0.08
	process.initial_velocity_max = 0.22
	process.scale_min = 0.015
	process.scale_max = 0.045
	particles.process_material = process
	var mesh := SphereMesh.new()
	mesh.radius = 0.06
	mesh.height = 0.12
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color("d9ead7")
	mat.emission_enabled = true
	mat.emission = Color("9fc7b5")
	mat.emission_energy_multiplier = 0.45
	mesh.material = mat
	particles.draw_pass_1 = mesh
	add_child(particles)
	particles.restart()

func _make_floating_debris() -> void:
	for i in range(14):
		var rock := MeshInstance3D.new()
		var mesh := BoxMesh.new()
		var s := 0.18 + float(i % 4) * 0.08
		mesh.size = Vector3(s, s * 0.65, s * 1.4)
		rock.mesh = mesh
		rock.position = Vector3(-45.0 + float(i) * 6.2, 5.0 + float(i % 5) * 3.2, -92.0 + float(i % 7) * 12.0)
		rock.rotation_degrees = Vector3(i * 17.0, i * 29.0, i * 11.0)
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color("536d55")
		mat.roughness = 1.0
		rock.material_override = mat
		add_child(rock)
		floaters.append(rock)

func _make_distant_islands() -> void:
	var positions := [Vector3(-72, 18, -105), Vector3(82, -2, -118), Vector3(112, 28, -76)]
	for p in positions:
		var island := MeshInstance3D.new()
		var mesh := SphereMesh.new()
		mesh.radius = 7.0
		mesh.height = 5.5
		island.mesh = mesh
		island.position = p
		island.scale = Vector3(1.7, 0.55, 1.25)
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color("607b60")
		mat.roughness = 1.0
		island.material_override = mat
		add_child(island)
