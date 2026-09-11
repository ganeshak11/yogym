# YOGYM Frontend

The current YOGYM experience is a portable vanilla HTML, CSS and JavaScript frontend with all project images, SVG icons and animation code stored locally in this project.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

Open `http://localhost:4174`.

## Production build

```bash
npm run build
```

This writes a portable copy of the frontend to `dist/` without altering the source project.

## Notes

- The current visual scenes are local PNG/SVG assets animated with CSS 3D transforms and native JavaScript.
- There are no Three.js, React Three Fiber, GLB, GLTF, FBX, OBJ, HDR, texture-map, or other 3D model assets in the current project.
- The typography currently uses Google Fonts from `fonts.googleapis.com`; the site has normal fallback fonts if offline. External social, Maps, mail and WhatsApp links are intentional user-facing destinations.
