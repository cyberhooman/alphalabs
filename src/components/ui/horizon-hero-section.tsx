// HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MorphingSquare } from '@/components/ui/morphing-square';
import { HyperText } from '@/components/ui/hyper-text';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { Activity, Brain, TimerReset, Workflow } from 'lucide-react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const handleNavClick = (link: string) => {
    if (link === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      <FloatingNav onNavClick={handleNavClick} />

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
            text="Explore the Terminal!"
            className="mt-8 w-auto px-8 py-6 text-lg bg-[#FF6B6B] border-[#FF6B6B] hover:bg-[#FF5252]"
            onClick={() => navigate('/early-access')}
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
                    i === 0 ? 'mt-40 md:mt-48 lg:mt-56' : ''
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
                      <p className="subtitle-line text-center alpha-tagline">
                        Go beyond the surface.
                      </p>
                      <p className="subtitle-line text-center alpha-tagline">
                        Uncover hidden market trends with advanced analytics.
                      </p>
                    </>
                  ) : (
                    <>
                      {titles[i+1] === 'ALPHALABS' && (
                        <div className="alpha-subtitle-block">
                          <p className="subtitle-line alpha-tagline">
                            Go beyond the surface
                          </p>
                          <p className="subtitle-line alpha-tagline">
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
      </div>

      {/* Product Section */}
      <section id="product" className="content-section bg-gradient-to-b from-transparent to-black/50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="text-center space-y-3 mb-16">
            <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
              Our Products
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Professional Trading Terminals
            </h2>
            <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
              Choose the terminal that fits your trading style. Both powered by institutional-grade data feeds and advanced algorithms.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Crypto Terminal */}
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-lg hover:border-[#FF6B6B]/50 transition-all duration-300">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#FF6B6B]">
                  Futures Trading
                </p>
                <h3 className="mt-3 text-2xl font-bold">AlphaLabs Crypto Terminal</h3>
                <p className="mt-4 text-base text-zinc-300">
                  Real-time order flow, CVD, and market intelligence for crypto futures traders.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Real-time order flow and CVD analysis</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Open Interest and funding rate tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Liquidation heatmaps and whale alerts</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Multi-exchange aggregated data</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/early-access')}
                className="mt-4 rounded-full border-2 border-[#FF6B6B] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B6B] transition hover:bg-[#FF6B6B] hover:text-black"
              >
                Learn More
              </button>
            </div>

            {/* Data Trading Terminal */}
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-lg hover:border-[#FF6B6B]/50 transition-all duration-300">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#FF6B6B]">
                  Forex & Data
                </p>
                <h3 className="mt-3 text-2xl font-bold">AlphaLabs Data Trading Terminal</h3>
                <p className="mt-4 text-base text-zinc-300">
                  Advanced forex analytics with currency strength meter and institutional feeds.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Real-time currency strength meter</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">MarketMilk™ integration for market snapshots</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Professional trading journal with analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">FXCM institutional data feeds</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/early-access')}
                className="mt-4 rounded-full border-2 border-[#FF6B6B] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B6B] transition hover:bg-[#FF6B6B] hover:text-black"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="content-section bg-black/30">
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="text-center space-y-3 mb-16">
            <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
              Pricing
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Early Access Pricing
            </h2>
            <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
              Get exclusive access to AlphaLabs Market Flow Terminal.
              Lock in your price now before public launch.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Early Access</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-[#FF6B6B]">Contact Us</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">for custom pricing</p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Real-time OI Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">VDelta & CVD Indicators</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Market Flow Terminal</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Institutional Data Feeds</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Lifetime Updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-zinc-300">Priority Support</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/early-access')}
                className="mt-4 rounded-full bg-[#FF6B6B] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#ff5252]"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="content-section bg-gradient-to-b from-black/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="text-center space-y-3 mb-16">
            <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
              Connect With Us
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Join Our Community
            </h2>
            <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
              Follow us on social media for market insights, platform updates, and trading tips
              from professional traders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <a
              href="https://twitter.com/alphalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
            >
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <h3 className="text-xl font-semibold">Twitter</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Real-time market insights and platform updates
              </p>
            </a>

            <a
              href="https://discord.gg/alphalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
            >
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <h3 className="text-xl font-semibold">Discord</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Join our community of professional traders
              </p>
            </a>

            <a
              href="https://github.com/alphalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
            >
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <h3 className="text-xl font-semibold">GitHub</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Explore our open-source tools and contribute
              </p>
            </a>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8 text-center">
            <h3 className="text-2xl font-semibold">Stay Updated</h3>
            <p className="max-w-2xl text-sm text-zinc-400">
              Subscribe to our newsletter for exclusive trading insights, platform updates,
              and early access to new features.
            </p>
            <div className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF6B6B] focus:outline-none focus:ring-1 focus:ring-[#FF6B6B]"
              />
              <button className="rounded-full bg-[#FF6B6B] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ff5252]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


