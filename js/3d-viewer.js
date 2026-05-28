import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function init3D() {
    const canvasContainer = document.getElementById('threeCanvas');
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.set(0, 150, 400);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.localClippingEnabled = true;
    canvasContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4af37, 0.8);
    dirLight.position.set(100, 200, 50);
    scene.add(dirLight);
    
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-100, 100, -50);
    scene.add(dirLight2);

    let rouletteMeshes = [];
    const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 200);
    
    let targetCameraPos = new THREE.Vector3(0, 150, 400);
    let targetCameraLookAt = new THREE.Vector3(0, 0, 0);
    let targetClippingConstant = 200; 
    let targetOpacity = 1.0;
    let isExploded = false;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let hoveredMesh = null;
    let selectedMesh = null;

    canvasContainer.addEventListener('mousemove', (event) => {
        const rect = canvasContainer.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    canvasContainer.addEventListener('click', () => {
        if (hoveredMesh) {
            selectedMesh = hoveredMesh;
            
            const pieceType = selectedMesh.userData.pieceType || "default";
            const pieceName = selectedMesh.name || "";
            
            let data = pieceData[pieceType];
            
            if (!data || pieceType === "default") {
                let cleanName = pieceName.toLowerCase().includes("circ") ? "Estructura Base" : "Pieza: " + pieceName;
                data = { ...pieceData.default, title: cleanName };
            }
            
            updateInfoCard(data);
            
        } else {
            selectedMesh = null;
        }
    });

    let ruletaModel = null;
    let ruletaVidrioModel = null;

    function processModel(object) {
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 200 / maxDim;
        
        object.scale.set(scale, scale, scale);
        object.position.sub(center.multiplyScalar(scale));
        
        object.updateMatrixWorld(true);
        
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x888888, metalness: 0.6, roughness: 0.3, envMapIntensity: 1.0,
                    clippingPlanes: [clippingPlane],
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 1.0
                });
                child.userData.originalPosition = child.position.clone();
                
                const childBox = new THREE.Box3().setFromObject(child);
                const childCenter = childBox.getCenter(new THREE.Vector3());
                const childSize = childBox.getSize(new THREE.Vector3());
                
                let pieceType = "default";
                const lowerName = (child.name || "").toLowerCase();
                
                if (lowerName.includes("vidrio") || lowerName.includes("glass")) {
                    pieceType = "glass";
                } else if (lowerName.includes("taza") || lowerName.includes("bowl") || lowerName.includes("base") || lowerName.includes("bottom")) {
                    pieceType = "bowl";
                } else if (lowerName.includes("eje") || lowerName.includes("shaft") || lowerName.includes("cylinder")) {
                    pieceType = "shaft";
                } else if (lowerName.includes("plato") || lowerName.includes("rotor") || lowerName.includes("separators") || lowerName.includes("torus")) {
                    pieceType = "separators";
                } else {
                    if (childSize.x > 160) {
                        if (childCenter.y > 10) pieceType = "glass";
                        else pieceType = "bowl";
                    } else if (childSize.x < 70) {
                        pieceType = "shaft";
                    } else {
                        pieceType = "separators";
                    }
                }
                child.userData.pieceType = pieceType;
                
                let dir = childCenter.clone();
                dir.y *= 1.5; 
                if (dir.lengthSq() < 0.0001) dir.set(0, 1, 0);
                dir.normalize();
                
                let distWorld = 45;
                if (childCenter.y > 20) {
                    distWorld += (childCenter.y - 20) * 2.5; 
                } else if (childCenter.y < -20) {
                    distWorld += (Math.abs(childCenter.y) - 20) * 2.5;
                }
                
                const explosionDistLocal = distWorld / scale;
                child.userData.explodedPosition = child.position.clone().add(dir.multiplyScalar(explosionDistLocal));
                
                rouletteMeshes.push(child);
            }
        });
        
        scene.add(object);
        return object;
    }

    // Load models async from assets folder
    const loader = new FBXLoader();
    loader.load('assets/ruleta.fbx', (object) => {
        ruletaModel = processModel(object);
    }, undefined, (e) => console.error("Error al cargar ruleta.fbx", e));

    loader.load('assets/ruleta vidrio.fbx', (object) => {
        ruletaVidrioModel = processModel(object);
        ruletaVidrioModel.visible = false;
        
        // Hide loading overlay once the second model loads
        setTimeout(() => {
            const ol = document.getElementById('loadingOverlay');
            if(ol) { ol.style.opacity = '0'; setTimeout(() => ol.style.display = 'none', 500); }
        }, 500);
    }, undefined, (e) => console.error("Error al cargar ruleta vidrio.fbx", e));

    window.addEventListener('resize', () => {
        const container = document.getElementById('threeCanvas');
        if (container && container.clientWidth > 0) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });

    let isAnimating = true;

    function animate() {
        if (!document.getElementById('threeCanvas')) {
            isAnimating = false;
            return; // Detener animación si el DOM ya no existe
        }
        
        if (!isAnimating) return;
        requestAnimationFrame(animate);
        
        // Only update if screen is visible
        if (document.getElementById('screen-3d') && document.getElementById('screen-3d').classList.contains('active')) {
            controls.update();
            
            camera.position.lerp(targetCameraPos, 0.05);
            controls.target.lerp(targetCameraLookAt, 0.05);
            
            clippingPlane.constant += (targetClippingConstant - clippingPlane.constant) * 0.1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(scene, true);
            const validIntersects = intersects.filter(i => i.object.isMesh && rouletteMeshes.includes(i.object) && i.object.parent.visible);
            
            if (validIntersects.length > 0) {
                if (hoveredMesh !== validIntersects[0].object) {
                    hoveredMesh = validIntersects[0].object;
                    canvasContainer.style.cursor = 'pointer';
                }
            } else {
                hoveredMesh = null;
                canvasContainer.style.cursor = 'default';
            }
            
            rouletteMeshes.forEach(mesh => {
                let currentTargetOpacity = targetOpacity;
                let targetEmissiveHex = 0x000000;
                
                if (mesh === selectedMesh) {
                    targetEmissiveHex = 0x666600; 
                    currentTargetOpacity = 1.0;
                } else if (mesh === hoveredMesh) {
                    targetEmissiveHex = 0x333333; 
                    currentTargetOpacity = Math.max(0.8, targetOpacity);
                }
                
                const targetE = new THREE.Color(targetEmissiveHex);
                mesh.material.emissive.lerp(targetE, 0.1);

                mesh.material.opacity += (currentTargetOpacity - mesh.material.opacity) * 0.05;
                mesh.material.depthWrite = mesh.material.opacity > 0.99;
                
                const targetPos = isExploded ? mesh.userData.explodedPosition : mesh.userData.originalPosition;
                if (targetPos) {
                    mesh.position.lerp(targetPos, 0.08);
                }
            });

            renderer.render(scene, camera);
        }
    }
    animate();

    const pieceData = {
        glass: { 
            title: "Vidrio superior", sub: "Cobertura Protectora", summary: "Cubierta de policarbonato que sella la zona de giro y evita manipulación.", 
            material: "Policarbonato", weight: "4.2 kg", function: "Protección y sellado.",
            icon: "shield-check", dur: 95, fric: 15, prec: 80 
        },
        bowl: { 
            title: "Taza Cóncava", sub: "Base Estructural", summary: "Estructura fija tallada que alberga el rotor y mantiene el equilibrio del sistema.", 
            material: "Madera y aluminio", weight: "35.5 kg", function: "Estabilizar el conjunto.",
            icon: "layers", dur: 90, fric: 40, prec: 95 
        },
        shaft: { 
            title: "Eje y Rodamientos", sub: "Mecanismo de Giro", summary: "Pivote central con rodamientos cerámicos que gobierna el giro con fricción casi nula.", 
            material: "Acero y cerámica", weight: "2.8 kg", function: "Rotación concéntrica.",
            icon: "settings", dur: 98, fric: 5, prec: 99 
        },
        separators: { 
            title: "Rotor y Separadores", sub: "Zona de Casillas", summary: "Sección móvil de aluminio que contiene los números y deflectores romboidales.", 
            material: "Aluminio fundido", weight: "18.2 kg", function: "Controlar caída de bola.",
            icon: "pie-chart", dur: 85, fric: 60, prec: 90 
        },
        default: {
            title: "Componente", sub: "Pieza Estructural", summary: "Parte del ensamblaje principal de la ruleta.",
            material: "Aleación estándar", weight: "-- kg", function: "Soporte estructural.",
            icon: "box", dur: 50, fric: 50, prec: 50
        }
    };

    function updateInfoCard(data) {
        document.getElementById("infoTitle").textContent = data.title;
        document.getElementById("infoSub").textContent = data.sub;
        document.getElementById("infoSummary").textContent = data.summary;
        document.getElementById("infoMaterial").textContent = data.material;
        document.getElementById("infoWeight").textContent = data.weight;
        document.getElementById("infoFunction").textContent = data.function;
        
        document.getElementById("statDurability").style.width = data.dur + "%";
        document.getElementById("statDurabilityVal").textContent = data.dur + "%";
        
        document.getElementById("statFriction").style.width = data.fric + "%";
        document.getElementById("statFrictionVal").textContent = data.fric + "%";
        
        document.getElementById("statPrecision").style.width = data.prec + "%";
        document.getElementById("statPrecisionVal").textContent = data.prec + "%";
        
        const iconEl = document.getElementById("infoIcon");
        if(iconEl && window.lucide) {
            const newIcon = document.createElement('i');
            newIcon.setAttribute("data-lucide", data.icon);
            newIcon.className = "info-card-icon";
            newIcon.id = "infoIcon";
            iconEl.parentNode.replaceChild(newIcon, iconEl);
            lucide.createIcons({ attrs: { class: "info-card-icon" } });
        }
    }

    const modeData = {
        general: { label: "VISTA GENERAL 3D", defaultPiece: "glass" },
        exploded: { label: "DESPIECE", defaultPiece: "bowl" },
        section: { label: "CORTE TRANSVERSAL", defaultPiece: "shaft" },
        transparency: { label: "TRANSPARENCIA", defaultPiece: "glass" },
        zoom: { label: "DETALLE PISTA", defaultPiece: "separators" }
    };

    function setMode(mode) {
        const config = modeData[mode];
        document.getElementById("appFrame").className = `viewport-panel mode-${mode}`;
        document.getElementById("stageTitle").textContent = config.label;
        document.getElementById("modeChip").textContent = `STATUS: [${config.label}]`;
        
        const piece = pieceData[config.defaultPiece];
        updateInfoCard(piece);

        document.querySelectorAll(".mode-btn, .control-mode-btn").forEach(btn => {
            btn.classList.toggle("is-active", btn.dataset.mode === mode);
        });
        
        if (mode === 'general') {
            setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
        }
        
        targetCameraPos.set(0, 150, 400);
        targetCameraLookAt.set(0, 0, 0);
        targetClippingConstant = 200;
        targetOpacity = 1.0;
        isExploded = false;

        if (mode === 'section') {
            targetClippingConstant = 0; 
        } else if (mode === 'exploded') {
            isExploded = true;
        } else if (mode === 'transparency') {
            targetOpacity = 0.25;
        } else if (mode === 'zoom') {
            targetCameraPos.set(0, 80, 150);
            targetCameraLookAt.set(0, -20, 50);
        }
        
        if (ruletaModel) ruletaModel.visible = (mode !== 'exploded');
        if (ruletaVidrioModel) ruletaVidrioModel.visible = (mode === 'exploded');
    }

    document.querySelectorAll(".mode-btn, .control-mode-btn").forEach(btn => {
        btn.addEventListener("click", () => setMode(btn.dataset.mode));
    });

    setMode("general");
}
