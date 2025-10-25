import React from 'react';
import { HorizonHeroSection3D } from '../components/ui/HorizonHeroSection3D';

/**
 * Test page for the 3D Hero Section component
 *
 * Features being tested:
 * - Sprite-based star rendering (guaranteed cross-device compatibility)
 * - Animated nebula background
 * - Layered mountain silhouettes with parallax
 * - Atmospheric glow effects
 * - Post-processing bloom
 * - GSAP text animations
 * - Smooth camera transitions across 3 sections
 * - Scroll-based interactions
 */
const TestHero3D: React.FC = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#000' }}>
      <HorizonHeroSection3D />
    </div>
  );
};

export default TestHero3D;
