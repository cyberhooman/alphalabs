(Get-Content src\components\ui\horizon-hero-section.tsx -Raw).Replace('const painPoints = [\r\nconst painPoints = [', 'const painPoints = [') | Set-Content src\components\ui\horizon-hero-section.tsx
