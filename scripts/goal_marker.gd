extends Node3D

const GOAL_POSITION := Vector3(6.0, 15.0, -62.0)

func _ready() -> void:
	global_position = GOAL_POSITION
	_build_goal()

func _build_goal() -> void:
	var platform := MeshInstance3D.new()
	var platform_mesh := CylinderMesh.new()
	platform_mesh.top_radius = 3.2
	platform_mesh.bottom_radius = 3.2
	platform_mesh.height = 0.5
	platform.mesh = platform_mesh
	platform.position.y = -0.25
	var platform_mat := StandardMaterial3D.new()
	platform_mat.albedo_color = Color("d7b85c")
	platform_mat.roughness = 0.75
	platform.material_override = platform_mat
	add_child(platform)

	for i in range(4):
		var pillar := MeshInstance3D.new()
		var pillar_mesh := CylinderMesh.new()
		pillar_mesh.top_radius = 0.28
		pillar_mesh.bottom_radius = 0.38
		pillar_mesh.height = 4.5
		pillar.mesh = pillar_mesh
		var angle := TAU * float(i) / 4.0
		pillar.position = Vector3(cos(angle) * 2.2, 2.25, sin(angle) * 2.2)
		var pillar_mat := StandardMaterial3D.new()
		pillar_mat.albedo_color = Color("eee2a8")
		pillar_mat.roughness = 0.6
		pillar.material_override = pillar_mat
		add_child(pillar)

	var ring := MeshInstance3D.new()
	var ring_mesh := TorusMesh.new()
	ring_mesh.inner_radius = 1.55
	ring_mesh.outer_radius = 1.85
	ring_mesh.rings = 32
	ring_mesh.ring_segments = 12
	ring.mesh = ring_mesh
	ring.position.y = 4.7
	ring.rotation_degrees.x = 90.0
	var ring_mat := StandardMaterial3D.new()
	ring_mat.albedo_color = Color("f4d36b")
	ring_mat.emission_enabled = true
	ring_mat.emission = Color("8f6f1d")
	ring_mat.emission_energy_multiplier = 1.4
	ring.material_override = ring_mat
	add_child(ring)

	var light := OmniLight3D.new()
	light.position.y = 3.0
	light.omni_range = 10.0
	light.light_energy = 2.0
	add_child(light)
