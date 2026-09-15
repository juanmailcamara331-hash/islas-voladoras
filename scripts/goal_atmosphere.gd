extends Node3D

var time := 0.0
var beacons: Array[MeshInstance3D] = []

func _ready() -> void:
	_build()

func _process(delta: float) -> void:
	time += delta
	for i in range(beacons.size()):
		var b := beacons[i]
		var a := time * (0.35 + float(i) * 0.08) + float(i) * TAU / float(beacons.size())
		b.position = Vector3(cos(a) * (3.8 + sin(time * 0.7 + i) * 0.35), 4.0 + sin(a * 1.7) * 0.8, sin(a) * (3.8 + sin(time * 0.7 + i) * 0.35))
		b.scale = Vector3.ONE * (0.75 + sin(time * 2.0 + i) * 0.15)

func _build() -> void:
	for i in range(6):
		var b := MeshInstance3D.new()
		var mesh := SphereMesh.new()
		mesh.radius = 0.10
		mesh.height = 0.20
		b.mesh = mesh
		var mat := StandardMaterial3D.new()
		mat.albedo_color = Color("fff1b0")
		mat.emission_enabled = true
		mat.emission = Color("c99d35")
		mat.emission_energy_multiplier = 1.2
		b.material_override = mat
		add_child(b)
		beacons.append(b)
