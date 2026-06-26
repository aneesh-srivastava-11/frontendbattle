'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion (do not mount/animate)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    // 2. Setup Three.js scene
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 800;

    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;
    camera.position.y = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Create particles (Wave grid pattern)
    const count = 45;
    const spacing = 15;
    const totalParticles = count * count;

    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);

    // Theme Accent Colors: #FFC801 (accent) and #FF9932 (accent-secondary)
    const colorAccent = new THREE.Color('#FFC801');
    const colorSecondary = new THREE.Color('#FF9932');

    let i = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Center the grid around origin
        const posX = (x - count / 2) * spacing;
        const posZ = (z - count / 2) * spacing;

        positions[i] = posX;
        positions[i + 1] = 0; // Will be animated in loop
        positions[i + 2] = posZ;

        // Color interpolation based on position
        const ratio = x / count;
        const mixedColor = new THREE.Color().lerpColors(colorAccent, colorSecondary, ratio);
        
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material or simple points material with vertex colors
    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Rotate the grid slightly for dynamic perspective
    particles.rotation.x = Math.PI / 4.5;

    // 4. Animation loop
    let animationFrameId: number;
    let countTime = 0;

    const animate = () => {
      countTime += 0.015;

      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const positionsArray = posAttribute.array as Float32Array;

      // Update particle heights based on sine wave logic to simulate "flow"
      let idx = 0;
      for (let x = 0; x < count; x++) {
        for (let z = 0; z < count; z++) {
          // Calculate wave heights
          const wave1 = Math.sin(x * 0.15 + countTime) * 15;
          const wave2 = Math.cos(z * 0.15 + countTime) * 15;
          
          positionsArray[idx + 1] = wave1 + wave2;
          idx += 3;
        }
      }
      posAttribute.needsUpdate = true;

      // Slow ambient rotation
      particles.rotation.y = countTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 5. Handle container resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none"
      aria-hidden="true"
    />
  );
}
