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
	_recolor(get_parent())

func _color_distance(a: Color, b: Color) -> float:
	var dr := a.r - b.r
	var dg := a.g - b.g
	var db := a.b - b.b
	var da := a.a - b.a
	return sqrt(dr * dr + dg * dg + db * db + da * da)

func _recolor(node: Node) -> void:
	if node is MeshInstance3D:
		var mat: Material = node.material_override
		if mat is StandardMaterial3D:
			var standard_mat: StandardMaterial3D = mat
			var color: Color = standard_mat.albedo_color
			for old_color in PALETTE:
				if _color_distance(color, old_color) < 0.025:
					standard_mat.albedo_color = PALETTE[old_color]
					color = standard_mat.albedo_color
					break
			if color.r > color.g * 1.35 and color.r > color.b * 1.20 and color.r > 0.28:
				standard_mat.albedo_color = Color("405f5a")
	for child in node.get_children():
		_recolor(child)
