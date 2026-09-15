extends Node3D

const PALETTE := {
	Color("6f786d"): Color("71885b"),
	Color("46534c"): Color("4f654d"),
	Color("4d5c58"): Color("526b52"),
	Color("58615a"): Color("5f7554"),
	Color("7b3140"): Color("405f5a"),
}

func _ready() -> void:
	call_deferred("_apply")

func _apply() -> void:
	# Aplicar sobre toda la escena principal, no solo sobre la isla.
	# Así también desaparecen los materiales rojos de personajes y decoración.
	_recolor(get_parent())

func _recolor(node: Node) -> void:
	if node is MeshInstance3D:
		var mat := node.material_override
		if mat is StandardMaterial3D:
			var color := mat.albedo_color
			for old_color in PALETTE:
				if color.distance_to(old_color) < 0.025:
					mat.albedo_color = PALETTE[old_color]
					color = mat.albedo_color
					break
			# El rojo queda fuera de la paleta del mundo.
			if color.r > color.g * 1.35 and color.r > color.b * 1.20 and color.r > 0.28:
				mat.albedo_color = Color("405f5a")
	for child in node.get_children():
		_recolor(child)
