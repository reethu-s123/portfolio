# Deployment / PR checklist for migration/react-three

This file contains the exact PR title + description and Netlify steps to deploy the branch as a preview or merge to main.

PR title (copy exactly):
Migrate site to React + TypeScript + react-three-fiber (initial scaffold + stylized interactive avatar)

PR description (copy/paste into the GitHub PR body):

Summary
- Migrate the static portfolio to a Vite + React + TypeScript app.
- Add a lightweight react-three-fiber hero with:
  - procedural icosahedron fallback
  - Interactive stylized avatar (pupil tracking, blink, subtle head rotation)
  - ModelLoader to load /assets/model.glb when provided
- Update global styles to a professional teal/indigo palette and ensure the Three.js canvas is visible in production.
- Placeholders: public/assets/placeholder.txt added; replace with real model at public/assets/model.glb to use your GLB.

What changed (high level)
- Config & tooling: package.json, tsconfig.json, vite.config.ts, .gitignore
- Public: public/index.html, public/assets/placeholder.txt
- App: src/main.tsx, src/App.tsx, src/styles/global.css
- Components: src/components/Layout.tsx, ThreeScene.tsx, ModelLoader.tsx, InteractiveHead.tsx
- Data: src/data/content.ts (bio & projects)

How to test locally
1. git fetch && git checkout migration/react-three
2. npm install
3. npm run dev (open http://localhost:5173) to test the dev server
4. npm run build && npm run preview to test a production-like build

Netlify settings (important)
- Build command: npm run build
- Publish directory: dist
- If builds fail due to Node version, set Node to 18.x in Netlify project settings or add "engines": { "node": "18.x" } to package.json

Notes and follow-ups
- To show a personal 3D model, add it to public/assets/model.glb. The loader will auto-detect and load it.
- Performance: optimize models (Draco, gltfpack) and use compressed textures (KTX2) for mobile.
- Accessibility: I can add prefers-reduced-motion support and keyboard fallbacks on request.

Reviewer checklist
- [ ] Run locally and confirm layout and 3D behavior
- [ ] Confirm no secrets or unwanted files were added
- [ ] Approve and merge when ready (or request changes)
