# Assets folder for 3D models

This folder is reserved for 3D assets (GLB/GLTF/DRACO-compressed models, textures, HDRI images).

How to add a model:
- Place your model at `assets/model.glb` or `assets/model.gltf`.
- If you use Draco compression, also include the decoder files and update the loader accordingly in `src/components/ModelLoader.tsx`.

Current setup:
- The React app will attempt to load `/assets/model.glb` at runtime. If the file is not present, the app falls back to the procedural hero shape (icosahedron).

Recommended workflow:
1. Add model files to this folder and commit to the `migration/react-three` branch.
2. Optionally replace `assets/placeholder.txt` with the real model or upload alongside it.

Notes on optimization:
- Compress GLTF with gltf-pipeline or gltfpack before committing for production.
- Use KTX2/ETC2/ASTC compressed textures when targeting mobile.
- Keep models under ~1-2MB for fast load; use LODs for large scenes.
