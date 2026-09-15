extends Node3D

const PALETTE := {
	Color("6f786d"): Color("71885b"),
	Color("46534c"): Color("4f654d"),
	Color("4d5c58"): Color("526b52"),
	Color("58615a"): Color("5f7554"),
}

func _ready() -> void:
	call_deferred("_apply")

func _apply() -> void:
	var world := get_parent().get_node_or_null("IslandZeroCheckpointZG")
	if world == null:
		return
	_recolor(world)

func _recolor(node: Node) -> void:
	if node is MeshInstance3D:
		var mat := node.material_override
		if mat is StandardMaterial3D:
			for old_color in PALETTE:
				if mat.albedo_color.distance_to(old_color) < 0.025:
					mat.albedo_color = PALETTE[old_color]
					break
	for child in node.get_children():
		_recolor(child)
