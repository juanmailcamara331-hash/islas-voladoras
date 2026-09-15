extends Node3D

const GOAL_POSITION := Vector3(6.0, 15.0, -62.0)
var ring: MeshInstance3D
var inner_ring: MeshInstance3D
var platform: MeshInstance3D
var ring_base_y: float = 4.7
var pulse_time: float = 0.0
var pillar_nodes: Array[MeshInstance3D] = []
var orbit_nodes: Array[MeshInstance3D] = []

func _ready() -> void:
	global_position = GOAL_POSITION
	_build_goal()

func _process(delta: float) -> void:
	if ring == null:
		return
	pulse_time += delta
	ring.rotation_degrees.z += delta * 18.0
	ring.position.y = ring_base_y + sin(pulse_time * 2.0) * 0.16
	var pulse: float = 1.0 + sin(pulse_time * 2.0) * 0.045
	ring.scale = Vector3.ONE * pulse
	if inner_ring != null:
		inner_ring.rotation_degrees.z -= delta * 28.0
		inner_ring.rotation_degrees.x = 90.0 + sin(pulse_time * 1.4) * 8.0
		inner_ring.position.y = ring_base_y + 0.15 + cos(pulse_time * 1.8) * 0.10
	for i in pillar_nodes.size():
		var pillar: MeshInstance3D = pillar_nodes[i]
		pillar.position.y = 2.25 + sin(pulse_time * 1.5 + float(i) * 1.57) * 0.06
	for i in orbit_nodes.size():
		var orbit: MeshInstance3D = orbit_nodes[i]
		var angle: float = pulse_time * 0.75 + float(i) * TAU / float(orbit_nodes.size())
		orbit.position = Vector3(cos(angle) * 2.7, 3.0 + sin(pulse_time * 1.2 + float(i)) * 0.35, sin(angle) * 2.7)
		orbit.rotation_degrees.y += delta * 90.0
	if platform != null:
		platform.scale.y = 1.0 + sin(pulse_time * 1.5) * 0.025

func _build_goal() -> void:
	platform = MeshInstance3D.new()
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
		pillar_nodes.append(pillar)

	ring = MeshInstance3D.new()
	var ring_mesh := TorusMesh.new()
	ring_mesh.inner_radius = 1.55
	ring_mesh.outer_radius = 1.85
	ring_mesh.rings = 32
	ring_mesh.ring_segments = 12
	ring.mesh = ring_mesh
	ring.position.y = ring_base_y
	ring.rotation_degrees.x = 90.0
	var ring_mat := StandardMaterial3D.new()
	ring_mat.albedo_color = Color("f4d36b")
	ring_mat.emission_enabled = true
	ring_mat.emission = Color("8f6f1d")
	ring_mat.emission_energy_multiplier = 1.4
	ring.material_override = ring_mat
	add_child(ring)

	inner_ring = MeshInstance3D.new()
	var inner_mesh := TorusMesh.new()
	inner_mesh.inner_radius = 0.72
	inner_mesh.outer_radius = 0.88
	inner_mesh.rings = 24
	inner_mesh.ring_segments = 10
	inner_ring.mesh = inner_mesh
	inner_ring.position.y = ring_base_y + 0.15
	inner_ring.rotation_degrees.x = 90.0
	var inner_mat := StandardMaterial3D.new()
	inner_mat.albedo_color = Color("fff0a8")
	inner_mat.emission_enabled = true
	inner_mat.emission = Color("d8aa32")
	inner_mat.emission_energy_multiplier = 1.0
	inner_ring.material_override = inner_mat
	add_child(inner_ring)

	for i in range(3):
		var orbit := MeshInstance3D.new()
		var orb_mesh := SphereMesh.new()
		orb_mesh.radius = 0.16
		orb_mesh.height = 0.32
		orbit.mesh = orb_mesh
		var orb_mat := StandardMaterial3D.new()
		orb_mat.albedo_color = Color("f7e7a0")
		orb_mat.emission_enabled = true
		orb_mat.emission = Color("b58a27")
		orb_mat.emission_energy_multiplier = 0.8
		orbit.material_override = orb_mat
		add_child(orbit)
		orbit_nodes.append(orbit)

	var light := OmniLight3D.new()
	light.position.y = 3.0
	light.omni_range = 10.0
	light.light_energy = 2.0
	add_child(light)
