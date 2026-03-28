function supportsReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function qualityProfile() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  if (isMobile || lowCpu) {
    return { particles: 140, segmentsX: 70, segmentsY: 40, pixelRatio: 1.25 };
  }
  return { particles: 260, segmentsX: 110, segmentsY: 70, pixelRatio: 1.6 };
}

const SCENE_PALETTES = {
  a: {
    roomColor: "#6f7fa8",
    ambientColor: "#8fa0c9",
    ambientIntensity: 0.72,
    warmColor: "#f4d8ac",
    warmIntensity: 1.4,
    coolColor: "#c4d8ff",
    coolIntensity: 1.15,
    particleColor: "#f8e5bf",
    particleOpacity: 0.24
  },
  b: {
    roomColor: "#a5a9cf",
    ambientColor: "#d2d5f2",
    ambientIntensity: 0.92,
    warmColor: "#f0c7a1",
    warmIntensity: 1.55,
    coolColor: "#e8d8f6",
    coolIntensity: 1.05,
    particleColor: "#f6d8b8",
    particleOpacity: 0.32
  }
};

function createFlowTexture(opacityA, opacityB) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.lineCap = "round";

  for (let i = 0; i < 7; i += 1) {
    const y = size * (0.16 + i * 0.11 + (Math.random() - 0.5) * 0.04);
    const gradient = ctx.createLinearGradient(0, y - 10, size, y + 10);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.2, `rgba(250, 241, 224, ${opacityA})`);
    gradient.addColorStop(0.6, `rgba(232, 240, 255, ${opacityB})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10 + Math.random() * 7;
    ctx.beginPath();
    ctx.moveTo(-10, y + Math.sin(i) * 8);
    ctx.bezierCurveTo(
      size * 0.25,
      y - 24 + Math.random() * 10,
      size * 0.72,
      y + 24 - Math.random() * 10,
      size + 10,
      y + Math.cos(i) * 8
    );
    ctx.stroke();
  }

  return canvas;
}

function createVeil(THREE, textureCanvas, width, height, z, speed, alpha) {
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: alpha,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), material);
  mesh.position.set(0, 0, z);
  return { mesh, speed };
}

function fitRoomToViewport(room, camera) {
  const distance = Math.abs(camera.position.z - room.position.z);
  const vFov = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
  const visibleWidth = visibleHeight * camera.aspect;
  room.scale.set(visibleWidth * 1.35, visibleHeight * 1.35, 1);
}

export async function initHomeScene(doc) {
  const host = doc.getElementById("scene-host");
  if (!host || supportsReducedMotion()) {
    return;
  }

  let THREE;
  try {
    THREE = await import("https://unpkg.com/three@0.161.0/build/three.module.js");
  } catch {
    return;
  }

  const profile = qualityProfile();
  const root = doc.documentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
  camera.position.set(0, 0, 10);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.pixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const roomGeometry = new THREE.PlaneGeometry(2, 2, profile.segmentsX, profile.segmentsY);
  const roomMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(SCENE_PALETTES.a.roomColor),
    roughness: 0.94,
    metalness: 0.04,
    transparent: true,
    opacity: 0.88
  });
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  room.position.z = -6;
  scene.add(room);

  const basePositions = roomGeometry.attributes.position.array.slice(0);

  const ambient = new THREE.AmbientLight(SCENE_PALETTES.a.ambientColor, SCENE_PALETTES.a.ambientIntensity);
  scene.add(ambient);

  const warmLight = new THREE.PointLight(SCENE_PALETTES.a.warmColor, SCENE_PALETTES.a.warmIntensity, 45, 2);
  warmLight.position.set(-3.4, 1.9, 3.2);
  scene.add(warmLight);

  const coolLight = new THREE.PointLight(SCENE_PALETTES.a.coolColor, SCENE_PALETTES.a.coolIntensity, 42, 2);
  coolLight.position.set(4.2, -1.2, 3);
  scene.add(coolLight);

  const veils = [];
  veils.push(createVeil(THREE, createFlowTexture(0.15, 0.13), 22, 11, -2.2, 0.22, 0.2));
  veils.push(createVeil(THREE, createFlowTexture(0.12, 0.1), 24, 12, -2.8, 0.18, 0.17));
  veils.push(createVeil(THREE, createFlowTexture(0.09, 0.07), 26, 13, -3.4, 0.13, 0.13));
  veils.forEach((item) => scene.add(item.mesh));

  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(profile.particles * 3);
  for (let i = 0; i < profile.particles; i += 1) {
    const idx = i * 3;
    particlePositions[idx] = (Math.random() - 0.5) * 17;
    particlePositions[idx + 1] = (Math.random() - 0.5) * 9.5;
    particlePositions[idx + 2] = -3 + Math.random() * 6;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: SCENE_PALETTES.a.particleColor,
    size: 0.03,
    transparent: true,
    opacity: SCENE_PALETTES.a.particleOpacity,
    depthWrite: false
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  let width = 0;
  let height = 0;
  const pointerTarget = new THREE.Vector2(0, 0);
  const pointerCurrent = new THREE.Vector2(0, 0);
  const clock = new THREE.Clock();
  const tempColor = new THREE.Color();
  let activePalette = root.dataset.artStyle === "b" ? SCENE_PALETTES.b : SCENE_PALETTES.a;
  let rafId = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    fitRoomToViewport(room, camera);
  }

  function onPointerMove(event) {
    const x = event.clientX / width;
    const y = event.clientY / height;
    pointerTarget.set((x - 0.5) * 0.9, (0.5 - y) * 0.55);
  }

  function animate() {
    rafId = window.requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    pointerCurrent.lerp(pointerTarget, 0.03);
    camera.position.x = pointerCurrent.x * 0.52;
    camera.position.y = pointerCurrent.y * 0.42;
    camera.lookAt(0, 0, -2.5);

    tempColor.set(activePalette.roomColor);
    roomMaterial.color.lerp(tempColor, 0.03);
    tempColor.set(activePalette.ambientColor);
    ambient.color.lerp(tempColor, 0.04);
    tempColor.set(activePalette.warmColor);
    warmLight.color.lerp(tempColor, 0.04);
    tempColor.set(activePalette.coolColor);
    coolLight.color.lerp(tempColor, 0.04);
    tempColor.set(activePalette.particleColor);
    particleMaterial.color.lerp(tempColor, 0.03);
    ambient.intensity += (activePalette.ambientIntensity - ambient.intensity) * 0.03;
    warmLight.intensity += (activePalette.warmIntensity - warmLight.intensity) * 0.03;
    coolLight.intensity += (activePalette.coolIntensity - coolLight.intensity) * 0.03;
    particleMaterial.opacity += (activePalette.particleOpacity - particleMaterial.opacity) * 0.03;

    warmLight.position.x = -3.4 + Math.sin(elapsed * 0.22) * 1.1 + pointerCurrent.x * 1.8;
    warmLight.position.y = 1.9 + Math.cos(elapsed * 0.18) * 0.8;
    coolLight.position.x = 4.2 + Math.cos(elapsed * 0.16) * 1.15 - pointerCurrent.x * 1.2;
    coolLight.position.y = -1.2 + Math.sin(elapsed * 0.17) * 0.75;

    const positions = roomGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const baseX = basePositions[i];
      const baseY = basePositions[i + 1];
      positions[i + 2] =
        basePositions[i + 2] +
        Math.sin(baseX * 0.45 + elapsed * 0.33) * 0.06 +
        Math.cos(baseY * 0.35 + elapsed * 0.28) * 0.05;
    }
    roomGeometry.attributes.position.needsUpdate = true;

    veils.forEach((item, idx) => {
      item.mesh.position.x = Math.sin(elapsed * item.speed + idx) * 0.64;
      item.mesh.position.y = Math.cos(elapsed * item.speed * 0.8 + idx * 0.4) * 0.4;
      item.mesh.rotation.z = Math.sin(elapsed * item.speed * 0.55 + idx) * 0.035;
    });

    particles.rotation.z = elapsed * 0.012;
    particles.position.x = Math.sin(elapsed * 0.1) * 0.2;
    particles.position.y = Math.cos(elapsed * 0.08) * 0.16;

    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  const observer = new MutationObserver(() => {
    activePalette = root.dataset.artStyle === "b" ? SCENE_PALETTES.b : SCENE_PALETTES.a;
  });
  observer.observe(root, { attributes: true, attributeFilter: ["data-art-style"] });

  doc.addEventListener("visibilitychange", () => {
    if (doc.hidden) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!rafId) {
      clock.start();
      animate();
    }
  });

  doc.documentElement.classList.add("has-webgl-scene");
  animate();
}
