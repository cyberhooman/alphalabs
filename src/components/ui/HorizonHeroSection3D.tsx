import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import '../../styles/horizon-hero-3d.css';

gsap.registerPlugin(ScrollTrigger);

// Camera position constant - all stars MUST be in front of this
const CAMERA_Z = 100;

// Utility function to create circular star texture
const createStarTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Create radial gradient for soft glow
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Sprite[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  atmosphere: THREE.Mesh | null;
  horizonOrb: THREE.Mesh | null;
  horizonGlow: THREE.Mesh | null;
  horizonLight: THREE.PointLight | null;
  animationId: number | null;
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  mountainBasePositions: number[];
}

export const HorizonHeroSection3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    atmosphere: null,
    horizonOrb: null,
    horizonGlow: null,
    horizonLight: null,
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 300,
    mountainBasePositions: []
  });

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: refs } = threeRefs;

    console.log('🚀 Initializing 3D Hero Section...');

    // Scene setup
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    // Camera setup
    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    refs.camera.position.set(0, 30, CAMERA_Z);
    refs.targetCameraZ = 300;

    // Renderer setup
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    // Post-processing setup
    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    refs.composer.addPass(bloomPass);

    // Create scene elements
    createStarField();
    createNebula();
    createMountains();
    createAtmosphere();
    createHorizonOrb();

    // Start animation loop
    animate();

    // Mark as ready
    setIsReady(true);
    console.log('✅ 3D Scene initialized successfully');

    // Create star field using individual sprites (GUARANTEED to work on all devices)
    function createStarField() {
      console.log('⭐ Creating sprite-based star field...');

      const starTexture = createStarTexture();
      const starCount = 4000;

      // Create stars in 3 depth layers for parallax
      for (let layer = 0; layer < 3; layer++) {
        const starsInLayer = Math.floor(starCount / 3);

        for (let i = 0; i < starsInLayer; i++) {
          // Determine position distribution method
          const useSpherical = Math.random() > 0.3;

          let x: number, y: number, z: number;

          if (useSpherical) {
            // Spherical distribution for natural star field
            const radius = 400 + Math.random() * 1200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            x = radius * Math.sin(phi) * Math.cos(theta);
            y = radius * Math.sin(phi) * Math.sin(theta);

            // CRITICAL: Ensure Z is always BEHIND camera (negative relative to camera)
            // Camera is at Z=100, so stars must be at Z < 100
            const sphereZ = radius * Math.cos(phi);
            z = CAMERA_Z - 300 - Math.abs(sphereZ); // Range: -200 to -1600
          } else {
            // Rectangular distribution for even viewport coverage
            x = (Math.random() - 0.5) * 2500;
            y = (Math.random() - 0.5) * 1800;

            // CRITICAL: Mathematical guarantee stars are in front of camera
            z = CAMERA_Z - (200 + Math.random() * 1800); // Range: -100 to -1900
          }

          // Validate position (failsafe)
          if (z >= CAMERA_Z - 100) {
            console.warn(`⚠️ Star position corrected: z=${z} -> ${CAMERA_Z - 200}`);
            z = CAMERA_Z - 200;
          }

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();

          if (colorChoice < 0.7) {
            // White stars
            color.setHSL(0, 0, 0.85 + Math.random() * 0.15);
          } else if (colorChoice < 0.9) {
            // Warm orange stars
            color.setHSL(0.08, 0.6, 0.85);
          } else {
            // Cool blue stars
            color.setHSL(0.6, 0.5, 0.85);
          }

          // Size variation based on distance
          const distance = Math.abs(z - CAMERA_Z);
          const baseSize = 0.5 + Math.random() * 2.5;
          const size = baseSize * (1 + distance / 1000);

          // Create sprite material
          const material = new THREE.SpriteMaterial({
            map: starTexture,
            color: color,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.8 + Math.random() * 0.2
          });

          // Create sprite
          const star = new THREE.Sprite(material);
          star.position.set(x, y, z);
          star.scale.set(size, size, 1);

          // Store layer info for animation
          star.userData.layer = layer;
          star.userData.baseX = x;
          star.userData.baseY = y;
          star.userData.baseZ = z;
          star.userData.twinkleOffset = Math.random() * Math.PI * 2;

          refs.scene!.add(star);
          refs.stars.push(star);
        }
      }

      console.log(`✅ Created ${refs.stars.length} sprite-based stars with validated positions`);
      console.log(`📍 Camera Z: ${CAMERA_Z}, Star Z range: -100 to -1900`);
    }

    // Create animated nebula background
    function createNebula() {
      const geometry = new THREE.PlaneGeometry(6000, 3000, 80, 80);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.25 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;

            float elevation = sin(pos.x * 0.01 + time * 0.5) * cos(pos.y * 0.01 + time * 0.5) * 30.0;
            pos.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixFactor = sin(vUv.x * 8.0 + time * 0.3) * cos(vUv.y * 8.0 + time * 0.2);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);

            float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.5);
            alpha *= 1.0 + vElevation * 0.01;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1500;
      nebula.rotation.x = 0;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    }

    // Create layered mountain silhouettes
    function createMountains() {
      const layers = [
        { distance: -50, height: 80, color: 0x1a1a2e, opacity: 1.0 },
        { distance: -120, height: 100, color: 0x16213e, opacity: 0.85 },
        { distance: -200, height: 130, color: 0x0f3460, opacity: 0.7 },
        { distance: -300, height: 160, color: 0x0a4668, opacity: 0.55 }
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 60;

        // Generate procedural mountain peaks
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1200;
          const y =
            Math.sin(i * 0.08) * layer.height +
            Math.sin(i * 0.03) * layer.height * 0.6 +
            Math.sin(i * 0.15) * layer.height * 0.3 +
            Math.random() * layer.height * 0.15 - 120;
          points.push(new THREE.Vector2(x, y));
        }

        // Close the shape
        points.push(new THREE.Vector2(6000, -400));
        points.push(new THREE.Vector2(-6000, -400));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = 0;
        mountain.userData.baseZ = layer.distance;
        mountain.userData.index = index;

        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
        refs.mountainBasePositions.push(layer.distance);
      });
    }

    // Create atmospheric glow effect
    function createAtmosphere() {
      const geometry = new THREE.SphereGeometry(700, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;

          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;

            float pulse = sin(time * 1.5) * 0.15 + 0.85;
            atmosphere *= pulse;

            gl_FragColor = vec4(atmosphere, intensity * 0.2);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      atmosphere.position.set(0, 0, -500);
      refs.scene!.add(atmosphere);
      refs.atmosphere = atmosphere;
    }

    // Create horizon diffuse light effect (no solid core, only atmospheric glow)
    function createHorizonOrb() {
      console.log('💡 Creating diffuse horizon light effect...');

      // Position BEHIND all mountains at horizon line
      const lightPosition = { x: 0, y: -80, z: -350 };

      // Layer 1: Inner bright core (small, intense)
      const innerGeometry = new THREE.SphereGeometry(60, 32, 32);
      const innerMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            // Radial gradient from center
            vec2 center = vec2(0.5, 0.5);
            float dist = length(vUv - center);

            // Very bright white center with smooth falloff
            float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
            intensity = pow(intensity, 2.0);

            // Subtle pulsing
            float pulse = sin(time * 0.6) * 0.1 + 0.9;
            intensity *= pulse;

            vec3 lightColor = vec3(1.0, 1.0, 1.0) * intensity * 2.0;
            float alpha = intensity * 0.8;

            gl_FragColor = vec4(lightColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const innerGlow = new THREE.Mesh(innerGeometry, innerMaterial);
      innerGlow.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      innerGlow.renderOrder = -3; // Render first (behind everything)
      refs.scene!.add(innerGlow);
      refs.horizonOrb = innerGlow;

      // Layer 2: Medium atmospheric glow
      const midGeometry = new THREE.SphereGeometry(150, 32, 32);
      const midMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = length(vUv - center);

            // Softer falloff for atmospheric effect
            float intensity = 1.0 - smoothstep(0.0, 0.8, dist);
            intensity = pow(intensity, 3.0);

            // White with slight blue tint
            vec3 lightColor = mix(vec3(1.0, 1.0, 1.0), vec3(0.9, 0.95, 1.0), 0.3);
            lightColor *= intensity * 1.5;

            float alpha = intensity * 0.5;

            gl_FragColor = vec4(lightColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const midGlow = new THREE.Mesh(midGeometry, midMaterial);
      midGlow.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      midGlow.renderOrder = -2; // Render second
      refs.scene!.add(midGlow);
      refs.horizonGlow = midGlow;

      // Layer 3: Large diffuse corona (very soft, atmospheric)
      const outerGeometry = new THREE.SphereGeometry(300, 32, 32);
      const outerMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = length(vUv - center);

            // Very soft, barely visible atmospheric halo
            float intensity = 1.0 - smoothstep(0.0, 1.0, dist);
            intensity = pow(intensity, 4.0);

            // Subtle color variation
            vec3 lightColor = vec3(0.8, 0.9, 1.0) * intensity * 0.8;
            float alpha = intensity * 0.3;

            gl_FragColor = vec4(lightColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const outerGlow = new THREE.Mesh(outerGeometry, outerMaterial);
      outerGlow.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      outerGlow.renderOrder = -1; // Render last (still behind mountains)
      refs.scene!.add(outerGlow);

      // Point light for scene illumination
      const pointLight = new THREE.PointLight(
        0xffffff, // Pure white
        3.0,      // Strong intensity
        1000,     // Large range
        2         // Decay
      );
      pointLight.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      refs.scene!.add(pointLight);
      refs.horizonLight = pointLight;

      console.log(`✅ Diffuse horizon light created at (${lightPosition.x}, ${lightPosition.y}, ${lightPosition.z})`);
      console.log(`   Position is BEHIND all mountains (z: -350)`);
    }

    // Animation loop
    function animate() {
      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate stars (subtle twinkle and rotation)
      refs.stars.forEach((star, index) => {
        const layer = star.userData.layer;

        // Gentle rotation based on layer
        const rotationSpeed = 0.02 * (1 - layer * 0.3);
        const angle = time * rotationSpeed;
        const radius = Math.sqrt(star.userData.baseX ** 2 + star.userData.baseY ** 2);
        const currentAngle = Math.atan2(star.userData.baseY, star.userData.baseX);

        star.position.x = radius * Math.cos(currentAngle + angle);
        star.position.y = radius * Math.sin(currentAngle + angle);

        // Subtle twinkle effect
        const twinkle = Math.sin(time * 2 + star.userData.twinkleOffset) * 0.15 + 0.85;
        star.material.opacity = twinkle * 0.9;
      });

      // Animate nebula
      if (refs.nebula && refs.nebula.material instanceof THREE.ShaderMaterial) {
        refs.nebula.material.uniforms.time.value = time;
      }

      // Animate atmosphere
      if (refs.atmosphere && refs.atmosphere.material instanceof THREE.ShaderMaterial) {
        refs.atmosphere.material.uniforms.time.value = time;
      }

      // Animate horizon diffuse light (all shader layers)
      if (refs.horizonOrb && refs.horizonGlow) {
        // Animate inner glow shader (brightest core)
        if (refs.horizonOrb.material instanceof THREE.ShaderMaterial) {
          refs.horizonOrb.material.uniforms.time.value = time;
        }

        // Animate middle glow shader
        if (refs.horizonGlow.material instanceof THREE.ShaderMaterial) {
          refs.horizonGlow.material.uniforms.time.value = time;
        }

        // Pulsing light intensity
        if (refs.horizonLight) {
          refs.horizonLight.intensity = 3.0 + Math.sin(time * 0.5) * 0.5;
        }
      }

      // Smooth camera movement with easing
      if (refs.camera) {
        const smoothingFactor = 0.05;

        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

        // Add gentle floating motion
        const floatX = Math.sin(time * 0.1) * 3;
        const floatY = Math.cos(time * 0.15) * 2;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 0, -500);
      }

      // Animate mountains with subtle movement
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.08) * 3 * parallaxFactor;
      });

      // Render scene
      if (refs.composer) {
        refs.composer.render();
      }
    }

    // Handle window resize
    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.stars.forEach(star => {
        star.material.dispose();
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }

      if (refs.atmosphere) {
        refs.atmosphere.geometry.dispose();
        (refs.atmosphere.material as THREE.Material).dispose();
      }

      if (refs.horizonOrb) {
        refs.horizonOrb.geometry.dispose();
        (refs.horizonOrb.material as THREE.Material).dispose();
      }

      if (refs.horizonGlow) {
        refs.horizonGlow.geometry.dispose();
        (refs.horizonGlow.material as THREE.Material).dispose();
      }

      if (refs.horizonLight) {
        refs.horizonLight.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }

      if (refs.composer) {
        refs.composer.dispose();
      }
    };
  }, []);

  // GSAP animations (run after scene is ready)
  useEffect(() => {
    if (!isReady) return;

    console.log('🎬 Starting GSAP animations...');

    // Set initial visibility
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    // Animate menu
    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // Animate title characters
    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      tl.from(titleChars, {
        y: 200,
        opacity: 0,
        rotationX: -90,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power4.out'
      }, '-=0.5');
    }

    // Animate subtitle
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.8');
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5');
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      setScrollProgress(progress);

      const { current: refs } = threeRefs;

      // Calculate current section
      const totalProgress = progress * totalSections;
      const newSection = Math.min(Math.floor(totalProgress), totalSections);
      setCurrentSection(newSection);
      const sectionProgress = totalProgress % 1;

      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },      // Section 0: HORIZON - wide establishing shot
        { x: 0, y: 40, z: -50 },      // Section 1: COSMOS - moving through stars
        { x: 0, y: 50, z: -700 }      // Section 2: INFINITY - deep space
      ];

      // Interpolate between current and next position
      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[Math.min(newSection + 1, cameraPositions.length - 1)] || currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      // Parallax mountains
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.6;
        const baseZ = refs.mountainBasePositions[i];

        // Fade out mountains as we move past them
        if (progress > 0.6) {
          mountain.visible = false;
        } else {
          mountain.visible = true;
          mountain.position.z = baseZ + scrollY * speed * 0.3;
        }
      });

      // Move nebula with scroll
      if (refs.nebula) {
        refs.nebula.position.z = -1500 + scrollY * 0.5;
      }

      // Fade horizon diffuse light based on scroll progress
      if (refs.horizonOrb && refs.horizonGlow && refs.horizonLight) {
        // Visible in section 0 (HORIZON), fade out in section 1
        let lightOpacity = 1.0;

        if (progress < 0.3) {
          // Full visibility in first section
          lightOpacity = 1.0;
        } else if (progress < 0.6) {
          // Fade out gradually as we move to COSMOS
          lightOpacity = 1.0 - ((progress - 0.3) / 0.3);
        } else {
          // Completely hidden in INFINITY section
          lightOpacity = 0;
        }

        // Fade all shader-based glow layers
        if (refs.horizonOrb.material instanceof THREE.ShaderMaterial) {
          refs.horizonOrb.material.opacity = lightOpacity * 0.9;
        }

        if (refs.horizonGlow.material instanceof THREE.ShaderMaterial) {
          refs.horizonGlow.material.opacity = lightOpacity * 0.7;
        }

        // Fade the point light intensity
        refs.horizonLight.intensity = 3.0 * lightOpacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  // Split title into individual characters for animation
  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const sectionContent = [
    {
      title: 'HORIZON',
      subtitle1: 'Where vision meets reality,',
      subtitle2: 'we shape the future of tomorrow'
    },
    {
      title: 'COSMOS',
      subtitle1: 'Beyond the boundaries of imagination,',
      subtitle2: 'lies the universe of possibilities'
    },
    {
      title: 'INFINITY',
      subtitle1: 'In the space between thought and creation,',
      subtitle2: 'we find the essence of true innovation'
    }
  ];

  return (
    <div ref={containerRef} className="hero-container-3d">
      <canvas ref={canvasRef} className="hero-canvas-3d" />

      {/* Side menu */}
      <div ref={menuRef} className="side-menu-3d" style={{ visibility: 'hidden' }}>
        <div className="menu-icon-3d">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text-3d">EXPLORE</div>
      </div>

      {/* Main content */}
      <div className="hero-content-3d">
        <h1 ref={titleRef} className="hero-title-3d" style={{ visibility: 'hidden' }}>
          {splitTitle(sectionContent[0].title)}
        </h1>

        <div ref={subtitleRef} className="hero-subtitle-3d" style={{ visibility: 'hidden' }}>
          <p className="subtitle-line">{sectionContent[0].subtitle1}</p>
          <p className="subtitle-line">{sectionContent[0].subtitle2}</p>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="scroll-progress-3d" style={{ visibility: 'hidden' }}>
        <div className="scroll-text-3d">SCROLL</div>
        <div className="progress-track-3d">
          <div
            className="progress-fill-3d"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter-3d">
          {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      {/* Additional scroll sections */}
      <div className="scroll-sections-3d">
        {sectionContent.slice(1).map((content, i) => (
          <section key={i} className="content-section-3d">
            <h1 className="hero-title-3d section-title-3d">
              {splitTitle(content.title)}
            </h1>

            <div className="hero-subtitle-3d">
              <p className="subtitle-line">{content.subtitle1}</p>
              <p className="subtitle-line">{content.subtitle2}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HorizonHeroSection3D;
