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

    # CHECKPOINT R:
    # La topología crítica se define primero como una cinta caminable continua.
    # Cada pieza se solapa con la siguiente; el procedural decorativo nunca invade esta cinta.
    _organic_patch(Vector3(0.0, 0.0, 12.0), 19.0, 3.0, Color("56694d"))

    _route_floor(Vector3(0.0, 1.65, 3.0), Vector3(12.0, 0.6, 22.0), 0.0)
    _route_ramp(Vector3(0.0, 2.25, -11.0), Vector3(12.0, 0.6, 18.0), -4.0)
    _route_floor(Vector3(0.0, 2.88, -22.0), Vector3(14.0, 0.6, 10.0), 0.0)

    # Giro amplio: hace que el recorrido empiece a leer el volumen de la isla.
    _route_floor(Vector3(-5.0, 2.88, -27.0), Vector3(12.0, 0.6, 8.0), 0.0)
    _route_ramp(Vector3(-10.0, 3.50, -33.0), Vector3(10.0, 0.6, 17.0), -4.0)
    _route_floor(Vector3(-10.0, 4.12, -43.0), Vector3(14.0, 0.6, 10.0), 0.0)

    # Regreso hacia el centro en otro nivel: primer recorrido espacial real.
    _route_floor(Vector3(-4.0, 4.12, -48.0), Vector3(14.0, 0.6, 8.0), 0.0)
    _route_ramp(Vector3(2.0, 4.75, -53.0), Vector3(10.0, 0.6, 17.0), -4.0)
    _route_floor(Vector3(6.0, 5.38, -63.0), Vector3(17.0, 0.6, 13.0), 0.0)

    # Puntos de validación del corredor. No son UI ni objetivos visibles.
    route_points.append(Vector3(0.0, 2.5, 10.0))
    route_points.append(Vector3(0.0, 3.0, -10.0))
    route_points.append(Vector3(0.0, 3.6, -22.0))
    route_points.append(Vector3(-10.0, 4.2, -34.0))
    route_points.append(Vector3(-10.0, 4.8, -43.0))
    route_points.append(Vector3(2.0, 5.4, -54.0))
    route_points.append(Vector3(6.0, 6.0, -63.0))

    # Geografía orgánica NO crítica: alrededor y por debajo del corredor.
    _organic_patch(Vector3(-13.0, 0.25, 3.0), 11.0, 3.0, Color("52644a"))
    _organic_patch(Vector3(13.0, 0.35, 1.0), 11.5, 3.2, Color("5b704e"))
    _organic_patch(Vector3(-13.0, 1.0, -18.0), 10.0, 3.0, Color("586b4c"))
    _organic_patch(Vector3(12.0, 1.1, -20.0), 9.5, 3.0, Color("61734f"))
    _organic_patch(Vector3(-18.0, 2.0, -38.0), 10.5, 3.2, Color("5b6d4e"))
    _organic_patch(Vector3(8.0, 2.2, -42.0), 11.0, 3.2, Color("647653"))
    _organic_patch(Vector3(13.0, 3.3, -61.0), 12.0, 3.4, Color("697a56"))

    # Variación procedural segura: pequeños lóbulos exteriores.
    for i in range(9):
        var side: float = -1.0
        if i % 2 == 0:
            side = 1.0
        var px: float = side * rng.randf_range(16.0, 27.0)
        var pz: float = rng.randf_range(-58.0, 12.0)
        var pr: float = rng.randf_range(4.0, 7.0)
        _organic_patch(Vector3(px, rng.randf_range(-0.2, 2.0), pz), pr, rng.randf_range(2.4, 3.5), Color("56694d"))

    # Ruta lateral opcional al mismo nivel: sale, ofrece mirador y vuelve.
    _route_floor(Vector3(10.0, 2.88, -22.0), Vector3(11.0, 0.6, 5.0), 0.0)
    _organic_patch(Vector3(18.0, 1.35, -22.0), 7.5, 2.8, Color("5c704f"))
    _route_floor(Vector3(18.0, 2.88, -28.0), Vector3(5.0, 0.6, 12.0), 0.0)
    _route_floor(Vector3(12.0, 2.88, -33.0), Vector3(12.0, 0.6, 5.0), 0.0)

    # Landmark superior.
    _stone(Vector3(1.0, 9.4, -66.0), Vector3(1.1, 7.0, 1.1))
    _stone(Vector3(6.0, 8.3, -66.0), Vector3(1.1, 5.0, 1.1))
    _stone(Vector3(11.0, 7.4, -66.0), Vector3(1.1, 3.2, 1.1))

    # Primera pasada ambiental ligera y barata.
    _scatter_safe_scenery()
    _make_wind_markers()

    # Masa inferior continua: la isla se afila hacia el vacío.
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
    # ZG: red de navegación calculada por extremos exactos.
    # Las mesetas tienen una altura superior explícita y cada rampa se construye
    # entre dos puntos de esa superficie. No hay ángulos/alturas "a ojo".
    var thickness: float = 0.80

    _nav_floor_top(Vector3(0.0, 0.0, 8.0), Vector2(24.0, 26.0), 2.10, thickness)
    _nav_floor_top(Vector3(0.0, 0.0, -16.0), Vector2(24.0, 10.0), 3.00, thickness)
    _nav_floor_top(Vector3(-6.0, 0.0, -31.0), Vector2(24.0, 10.0), 4.00, thickness)
    _nav_floor_top(Vector3(-2.0, 0.0, -46.0), Vector2(26.0, 10.0), 5.00, thickness)
    _nav_floor_top(Vector3(6.0, 0.0, -62.0), Vector2(26.0, 14.0), 6.00, thickness)

    # Ruta principal. Cada extremo penetra 1 m en su meseta para eliminar juntas.
    _nav_connector(Vector3(0.0, 2.10, -4.0), Vector3(0.0, 3.00, -12.0), 12.0, thickness, 1.0)
    _nav_connector(Vector3(0.0, 3.00, -20.0), Vector3(-6.0, 4.00, -27.0), 12.0, thickness, 1.0)
    _nav_connector(Vector3(-6.0, 4.00, -35.0), Vector3(-2.0, 5.00, -42.0), 12.0, thickness, 1.0)
    _nav_connector(Vector3(-2.0, 5.00, -50.0), Vector3(6.0, 6.00, -56.0), 12.0, thickness, 1.0)

    # Plataformas laterales: también conectadas físicamente, nunca islas decorativas pisables aisladas.
    _nav_floor_top(Vector3(-18.0, 0.0, -10.0), Vector2(10.0, 10.0), 2.55, thickness)
    _nav_connector(Vector3(-10.0, 2.10, -8.0), Vector3(-14.0, 2.55, -10.0), 7.0, thickness, 1.0)

    _nav_floor_top(Vector3(18.0, 0.0, -25.0), Vector2(10.0, 10.0), 3.55, thickness)
    _nav_connector(Vector3(10.0, 3.00, -18.0), Vector3(14.0, 3.55, -23.0), 7.0, thickness, 1.0)

    _nav_floor_top(Vector3(-19.0, 0.0, -41.0), Vector2(10.0, 10.0), 4.55, thickness)
    _nav_connector(Vector3(-12.0, 4.00, -34.0), Vector3(-15.0, 4.55, -39.0), 7.0, thickness, 1.0)

    _nav_floor_top(Vector3(21.0, 0.0, -55.0), Vector2(10.0, 10.0), 5.55, thickness)
    _nav_connector(Vector3(10.0, 5.00, -48.0), Vector3(17.0, 5.55, -53.0), 7.0, thickness, 1.0)

func _nav_floor_top(center_xz: Vector3, footprint: Vector2, top_y: float, thickness: float) -> void:
    var pos: Vector3 = Vector3(center_xz.x, top_y - thickness * 0.5, center_xz.z)
    _nav_piece(pos, Vector3(footprint.x, thickness, footprint.y), Vector3.ZERO)

func _nav_connector(a: Vector3, b: Vector3, width: float, thickness: float, overlap: float) -> void:
    var delta: Vector3 = b - a
    var horizontal: float = Vector2(delta.x, delta.z).length()
    if horizontal < 0.01:
        return
    var horizontal_dir: Vector3 = Vector3(delta.x, 0.0, delta.z).normalized()
    var slope_length: float = delta.length()
    var center: Vector3 = (a + b) * 0.5
    # El cuerpo se alarga en ambos extremos siguiendo exactamente la pendiente.
    var dir3: Vector3 = delta.normalized()
    center = center
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
    mat.albedo_color = Color("91a665")
    mat.roughness = 1.0
    mesh.material_override = mat
    body.add_child(mesh)


func _make_visual_house(pos: Vector3, s: float) -> void:
    var base: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = Vector3(4.0, 2.5, 3.4) * s
    base.mesh = box
    base.position = pos + Vector3(0.0, 1.25 * s, 0.0)
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("c7b58a")
    mat.roughness = 1.0
    base.material_override = mat
    world_root.add_child(base)

    var roof: MeshInstance3D = MeshInstance3D.new()
    var prism: PrismMesh = PrismMesh.new()
    prism.size = Vector3(4.8, 1.7, 4.0) * s
    roof.mesh = prism
    roof.position = pos + Vector3(0.0, 3.0 * s, 0.0)
    var rm: StandardMaterial3D = StandardMaterial3D.new()
    rm.albedo_color = Color("8d5547")
    rm.roughness = 1.0
    roof.material_override = rm
    world_root.add_child(roof)

func _make_visual_waterfall(pos: Vector3, w: float, h: float) -> void:
    var water: MeshInstance3D = MeshInstance3D.new()
    var quad: QuadMesh = QuadMesh.new()
    quad.size = Vector2(w, h)
    water.mesh = quad
    water.position = pos - Vector3(0.0, h * 0.5, 0.0)
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color(0.50, 0.82, 0.94, 0.68)
    mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
    mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
    water.material_override = mat
    world_root.add_child(water)

func _build_identity_layer_za() -> void:
    # Aldea, agua y siluetas: todo visual, cero autoridad física.
    _make_visual_house(Vector3(-8.0, 1.6, -8.0), 0.70)
    _make_visual_house(Vector3(8.0, 1.6, -20.0), 0.78)
    _make_visual_house(Vector3(-8.0, 1.6, -34.0), 0.82)
    _make_visual_house(Vector3(8.0, 1.6, -49.0), 0.88)
    _make_visual_house(Vector3(-7.0, 1.6, -63.0), 0.94)
    _make_visual_waterfall(Vector3(-11.0, 1.0, -17.0), 2.6, 16.0)
    _make_visual_waterfall(Vector3(11.0, 1.0, -48.0), 3.2, 22.0)


func _connector_mesh(pos: Vector3, size: Vector3, rot_y: float = 0.0) -> void:
    # Conector VISUAL ancho. La física sigue siendo el suelo continuo de seguridad.
    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    mesh.position = pos
    mesh.rotation_degrees.y = rot_y
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("93a968")
    mat.roughness = 1.0
    mesh.material_override = mat
    world_root.add_child(mesh)

func _build_visible_connectors_zb() -> void:
    # Cada zona importante recibe una unión legible, ancha y sin salto.
    # Corredor longitudinal principal.
    _connector_mesh(Vector3(0.0, 2.05, 3.0), Vector3(13.0, 0.32, 24.0))
    _connector_mesh(Vector3(0.0, 2.05, -14.0), Vector3(13.0, 0.32, 16.0))
    _connector_mesh(Vector3(-4.0, 2.05, -25.0), Vector3(16.0, 0.32, 10.0))
    _connector_mesh(Vector3(-9.0, 2.05, -36.0), Vector3(13.0, 0.32, 16.0))
    _connector_mesh(Vector3(-4.0, 2.05, -47.0), Vector3(17.0, 0.32, 10.0))
    _connector_mesh(Vector3(3.0, 2.05, -56.0), Vector3(13.0, 0.32, 16.0))
    _connector_mesh(Vector3(6.0, 2.05, -64.0), Vector3(18.0, 0.32, 10.0))

    # Brazos laterales: las plataformas visibles ya no parecen islas inaccesibles.
    _connector_mesh(Vector3(-12.0, 2.05, -8.0), Vector3(12.0, 0.32, 5.0), 18.0)
    _connector_mesh(Vector3(12.0, 2.05, -20.0), Vector3(12.0, 0.32, 5.0), -18.0)
    _connector_mesh(Vector3(-14.0, 2.05, -38.0), Vector3(13.0, 0.32, 5.0), 15.0)
    _connector_mesh(Vector3(14.0, 2.05, -50.0), Vector3(13.0, 0.32, 5.0), -15.0)


func _route_floor(pos: Vector3, size: Vector3, angle_x: float) -> void:
    _route_piece(pos, size, angle_x)

func _route_ramp(pos: Vector3, size: Vector3, angle_x: float) -> void:
    _route_piece(pos, size, angle_x)

func _route_piece(pos: Vector3, size: Vector3, angle_x: float) -> void:
    # Compatibilidad: la ruta antigua queda anulada en ZC.
    pass

func _validate_route() -> bool:
    # Validador geométrico inicial:
    # comprueba que cada punto crítico tiene suelo de la ruta inmediatamente debajo.
    # Más adelante evolucionará a navegación completa.
    var space_state: PhysicsDirectSpaceState3D = get_world_3d().direct_space_state
    for point in route_points:
        var query: PhysicsRayQueryParameters3D = PhysicsRayQueryParameters3D.create(
            point + Vector3(0.0, 2.0, 0.0),
            point + Vector3(0.0, -5.0, 0.0)
        )
        query.collide_with_areas = false
        query.collide_with_bodies = true
        var result: Dictionary = space_state.intersect_ray(query)
        if result.is_empty():
            return false
        var collider: Object = result.get("collider")
        if collider == null:
            return false
        if not collider.is_in_group("walkable_route"):
            return false
    return true

func _scatter_safe_scenery() -> void:
    # V: decoración con zona de exclusión enorme alrededor de TODO el recorrido.
    # Nunca genera colisión. Nunca se coloca sobre la cinta jugable.
    for i in range(24):
        var side: float = -1.0
        if i % 2 == 0:
            side = 1.0
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
    # Formas simples para dar profundidad/movimiento visual sin sistema pesado.
    for i in range(10):
        var mesh: MeshInstance3D = MeshInstance3D.new()
        var quad: QuadMesh = QuadMesh.new()
        quad.size = Vector2(rng.randf_range(1.5, 3.0), rng.randf_range(0.12, 0.25))
        mesh.mesh = quad
        mesh.position = Vector3(
            rng.randf_range(-35.0, 35.0),
            rng.randf_range(8.0, 18.0),
            rng.randf_range(-70.0, 15.0)
        )
        mesh.rotation_degrees = Vector3(0.0, rng.randf_range(0.0, 360.0), 0.0)
        var mat: StandardMaterial3D = StandardMaterial3D.new()
        mat.albedo_color = Color(0.9, 0.96, 0.95, 0.18)
        mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
        mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
        mesh.material_override = mat
        world_root.add_child(mesh)

func _route_clearance_valid() -> bool:
    # Segunda capa de validación: una cápsula virtual comprueba espacio libre
    # sobre cada punto crítico. Esto prepara la futura validación completa.
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
                # Geometría crítica invadiendo el volumen del jugador.
                return false
    return true


func _add_landmarks() -> void:
    # Siluetas ambientales sin colisión, alejadas de la ruta.
    for pos in [
        Vector3(-25.0, 5.0, -12.0),
        Vector3(25.0, 6.0, -35.0),
        Vector3(-26.0, 7.0, -55.0)
    ]:
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
    var body: StaticBody3D = StaticBody3D.new()
    body.position = pos
    world_root.add_child(body)

    var mesh: MeshInstance3D = MeshInstance3D.new()
    var cylinder: CylinderMesh = CylinderMesh.new()
    cylinder.top_radius = radius
    cylinder.bottom_radius = radius * 0.82
    cylinder.height = depth
    cylinder.radial_segments = 12
    mesh.mesh = cylinder

    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = color
    mat.roughness = 1.0
    mesh.material_override = mat
    body.add_child(mesh)

    var collision: CollisionShape3D = CollisionShape3D.new()
    var shape: CylinderShape3D = CylinderShape3D.new()
    shape.radius = radius * 0.96
    shape.height = depth
    collision.shape = shape
    body.add_child(collision)

    var cap: MeshInstance3D = MeshInstance3D.new()
    var cap_cylinder: CylinderMesh = CylinderMesh.new()
    cap_cylinder.top_radius = radius * 1.005
    cap_cylinder.bottom_radius = radius * 1.005
    cap_cylinder.height = 0.16
    cap_cylinder.radial_segments = 12
    cap.mesh = cap_cylinder
    cap.position.y = depth * 0.5 + 0.08
    var grass: StandardMaterial3D = StandardMaterial3D.new()
    grass.albedo_color = Color("9eb36a")
    grass.roughness = 1.0
    cap.material_override = grass
    body.add_child(cap)

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
    cylinder.bottom_radius = radius * 0.58
    cylinder.height = depth
    cylinder.radial_segments = 9
    mesh.mesh = cylinder
    mesh.position = pos
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("607a70")
    mat.roughness = 1.0
    mesh.material_override = mat
    world_root.add_child(mesh)

func _land(pos: Vector3, size: Vector3, color: Color) -> void:
    var body: StaticBody3D = StaticBody3D.new()
    body.position = pos
    world_root.add_child(body)

    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = color
    mat.roughness = 1.0
    mesh.material_override = mat
    body.add_child(mesh)

    var collision: CollisionShape3D = CollisionShape3D.new()
    var shape: BoxShape3D = BoxShape3D.new()
    shape.size = size
    collision.shape = shape
    body.add_child(collision)

    var cap: MeshInstance3D = MeshInstance3D.new()
    var cap_box: BoxMesh = BoxMesh.new()
    cap_box.size = Vector3(size.x + 0.12, 0.18, size.z + 0.12)
    cap.mesh = cap_box
    cap.position.y = size.y * 0.5 + 0.09
    var grass: StandardMaterial3D = StandardMaterial3D.new()
    grass.albedo_color = Color("9eb36a")
    grass.roughness = 1.0
    cap.material_override = grass
    body.add_child(cap)

func _ramp(pos: Vector3, size: Vector3, angle_x: float) -> void:
    var body: StaticBody3D = StaticBody3D.new()
    body.position = pos
    body.rotation_degrees.x = angle_x
    world_root.add_child(body)

    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("91a663")
    mat.roughness = 1.0
    mesh.material_override = mat
    body.add_child(mesh)

    var collision: CollisionShape3D = CollisionShape3D.new()
    var shape: BoxShape3D = BoxShape3D.new()
    shape.size = size
    collision.shape = shape
    body.add_child(collision)

func _stone(pos: Vector3, size: Vector3) -> void:
    var body: StaticBody3D = StaticBody3D.new()
    body.position = pos
    world_root.add_child(body)
    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("74796d")
    mat.roughness = 1.0
    mesh.material_override = mat
    body.add_child(mesh)
    var collision: CollisionShape3D = CollisionShape3D.new()
    var shape: BoxShape3D = BoxShape3D.new()
    shape.size = size
    collision.shape = shape
    body.add_child(collision)

func _under_rock(pos: Vector3, size: Vector3) -> void:
    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    mesh.position = pos
    mesh.rotation_degrees = Vector3(8.0, 12.0, 9.0)
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("48544d")
    mat.roughness = 1.0
    mesh.material_override = mat
    world_root.add_child(mesh)

func _distant(pos: Vector3, size: Vector3) -> void:
    var mesh: MeshInstance3D = MeshInstance3D.new()
    var box: BoxMesh = BoxMesh.new()
    box.size = size
    mesh.mesh = box
    mesh.position = pos
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("607a70")
    mat.roughness = 1.0
    mesh.material_override = mat
    world_root.add_child(mesh)

func _make_player() -> void:
    player = CharacterBody3D.new()
    player.name = "Player"
    player.position = Vector3(0.0, 4.5, 7.0)

    var collision: CollisionShape3D = CollisionShape3D.new()
    var capsule: CapsuleShape3D = CapsuleShape3D.new()
    capsule.radius = 0.55
    capsule.height = 1.8
    collision.shape = capsule
    player.add_child(collision)

    var mesh: MeshInstance3D = MeshInstance3D.new()
    var capsule_mesh: CapsuleMesh = CapsuleMesh.new()
    capsule_mesh.radius = 0.55
    capsule_mesh.height = 1.8
    mesh.mesh = capsule_mesh
    var mat: StandardMaterial3D = StandardMaterial3D.new()
    mat.albedo_color = Color("7b3140")
    mesh.material_override = mat
    player.add_child(mesh)

    var pivot: Node3D = Node3D.new()
    pivot.name = "CameraPivot"
    pivot.position = Vector3(0.0, 1.2, 0.0)
    player.add_child(pivot)

    var cam: Camera3D = Camera3D.new()
    cam.position = Vector3(0.0, 2.6, 7.5)
    cam.current = true
    pivot.add_child(cam)

    player.set_script(load("res://scripts/player.gd"))
    add_child(player)

    var hud: CanvasLayer = CanvasLayer.new()
    hud.name = "AdaptiveHUD"
    hud.set_script(load("res://scripts/adaptive_hud.gd"))
    add_child(hud)
