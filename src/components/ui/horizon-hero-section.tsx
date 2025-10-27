// HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MorphingSquare } from '@/components/ui/morphing-square';
import { HyperText } from '@/components/ui/hyper-text';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Activity, Brain, TimerReset, Workflow } from 'lucide-react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

// Camera position constant - all stars MUST be in front of this
const CAMERA_Z = 100;

const painPoints = [
  {
    title: 'Lagging Data',
    body: "Signals arrive seconds late, so you're reacting to the past instead of the next move.",
    icon: TimerReset
  },
  {
    title: 'Noisy Indicators',
    body: 'Stacks of conflicting indicators force you to guess which signal to trust.',
    icon: Activity
  },
  {
    title: 'Fragmented Workflow',
    body: 'You pivot between chats, charts, and sheets instead of executing on one command deck.',
    icon: Workflow
  },
  {
    title: 'Too Complex',
    body: 'Technical analysis feels like a maze of theories—hard to master, harder to execute fast.',
    icon: Brain
  }
];

// Utility function to create circular star texture for sprites
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

export const Component = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollProgressRef = useRef(null);
  

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const cameraVelocity = useRef({ x: 0, y: 0, z: 0 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;
  
  const threeRefs = useRef<any>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
    locations: []
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      
      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();
      
      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createStarField = () => {
      console.log('⭐ Creating sprite-based star field (GUARANTEED cross-device compatibility)...');

      const { current: refs } = threeRefs;
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

          // Store data for animation
          star.userData.layer = layer;
          star.userData.baseX = x;
          star.userData.baseY = y;
          star.userData.baseZ = z;
          star.userData.twinkleOffset = Math.random() * Math.PI * 2;

          refs.scene.add(star);
          refs.stars.push(star);
        }
      }

      console.log(`✅ Created ${refs.stars.length} sprite-based stars with validated positions`);
      console.log(`📍 Camera Z: ${CAMERA_Z}, Star Z range: -100 to -1900`);
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
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
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
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
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

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
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
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
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Animate sprites (rotation and twinkle)
      refs.stars.forEach((star) => {
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

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05; // Lower = smoother but slower
        
        // Calculate smooth position with easing
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
        
        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        // Apply final position
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
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
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        starField.material.dispose();
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        mountain.material.dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.mountains.forEach( (mountain: any, i: number) => {
      locations[i] = mountain.position.z
    })
    refs.locations = locations
  }

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;
    
    // Set initial states to prevent flash
    if (titleRef.current && subtitleRef.current && scrollProgressRef.current) {
      gsap.set([titleRef.current, subtitleRef.current, scrollProgressRef.current], {
        visibility: 'visible'
      });
    }

    const tl = gsap.timeline();

    // Animate title with split text
    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      if (titleChars.length > 0) {
        tl.from(titleChars, {
          y: 200,
          opacity: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "power4.out"
        }, "-=0.5");
      }
    }

    // Animate subtitle lines
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      if (subtitleLines.length > 0) {
        tl.from(subtitleLines, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.8");
      }
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
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
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      
      // Calculate smooth progress through all sections
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;
      
      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },    // Section 0 - HORIZON
        { x: 0, y: 40, z: -50 },     // Section 1 - COSMOS
        { x: 0, y: 50, z: -700 }       // Section 2 - INFINITY
      ];
      
      // Get current and next positions
      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] || currentPos;
      
      // Set target positions (actual smoothing happens in animate loop)
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      // Smooth parallax for mountains
      refs.mountains.forEach((mountain: any, i: number) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
        refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100
        
        // Use the same smoothing approach
        mountain.userData.targetZ = targetZ;
        const location = mountain.position.z
        if (progress > 0.7) {
          mountain.position.z = 600000;
        }
        if (progress < 0.7) {
          mountain.position.z = refs.locations[i]
        }
      });
      refs.nebula.position.z = refs.mountains[3].position.z
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);


  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      {!isReady && (
        <div className="hero-loading-overlay">
          <MorphingSquare
            className="bg-[#FF6B6B]"
            message="Preparing the cosmos"
            messagePlacement="bottom"
          />
        </div>
      )}
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* Main content */}
      <div className="hero-content cosmos-content">
        <div className="flex flex-col items-center w-full">
          <h1 ref={titleRef} className="hero-title">
            MARKET FLOW
          </h1>
          
          <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
            <p className="subtitle-line">
              Unlock real-time insights with OI, VDelta, and CVD.
            </p>
          </div>

          <InteractiveHoverButton
            text="Get Early Access"
            className="mt-8 w-auto px-8 py-6 text-lg bg-[#FF6B6B] border-[#FF6B6B] hover:bg-[#FF5252]"
          />
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Additional sections for scrolling */}
      <div className="scroll-sections">
        {[...Array(2)].map((_, i) => {
          const titles: Record<number, string> = {
            0: 'MARKET FLOW',
            1: 'ALPHALABS',
            2: 'PAIN POINT'
          };
          
          const subtitles: Record<number, { line1: string; line2: string }> = {
            0: {
              line1: 'Unlock real-time insights with OI, VDelta, and CVD.',
              line2: ''
            },
            1: {
              line1: 'Real-time analytics that give traders an edge!',
              line2: ''
            },
            2: {
              line1: 'Go beyond the surface',
              line2: 'Uncover hidden market trends with advanced analytics'
            }
          };

          const isAlphaSection = titles[i+1] === 'ALPHALABS';

          return (
            <section key={i} className="content-section">
              <div className="flex w-full flex-col items-center px-4">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <h1
                    className={`hero-title text-center w-full ${
                      isAlphaSection ? 'alpha-hero-title' : ''
                    }`}
                  >
                    {isAlphaSection ? (
                      <HyperText
                        text="ALPHALABS"
                        wrapperClassName="w-full justify-center"
                        animateOnLoad
                      />
                    ) : (
                      titles[i+1] || 'DEFAULT'
                    )}
                  </h1>
                </div>

                <div
                  className={`hero-subtitle cosmos-subtitle flex w-full flex-col items-center ${
                    i === 0 ? 'mt-48 md:mt-56 lg:mt-64' : ''
                  }`}
                >
                  {i === 0 ? (
                    <>
                      <TypingAnimation
                        text={subtitles[i+1].line1}
                        duration={35}
                        as="p"
                        className="subtitle-line subtitle-line--primary subtitle-line--dimmed text-center"
                      />
                      <p className="subtitle-line subtitle-line--primary text-center">
                        {subtitles[i+1].line2}
                      </p>
                      <p className="subtitle-line mt-2 text-center">
                        Go beyond the surface.
                      </p>
                      <p className="subtitle-line text-center">
                        Uncover hidden market trends with advanced analytics.
                      </p>
                    </>
                  ) : (
                    <>
                      {titles[i+1] === 'ALPHALABS' && (
                        <div className="alpha-subtitle-block">
                          <p className="subtitle-line">
                            Go beyond the surface
                          </p>
                          <p className="subtitle-line">
                            Uncover hidden market trends with advanced analytics
                          </p>
                        </div>
                      )}
                      <p className="pain-card-subtitle text-center">
                        Why trade with only technical analysis did not make you rich?
                      </p>
                      <div className="pain-card-grid">
                        {painPoints.map(({ title, body, icon: Icon }) => (
                          <div key={title} className="pain-card">
                            <div className="pain-card-icon">
                              <Icon className="h-6 w-6" />
                            </div>
                            <h4>{title}</h4>
                            <p>{body}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>\r\n\r\n    </div>
  );
};


