# DEPLOY_PR_INSTRUCTIONS

This branch (main) will receive the merged changes from migration/react-three that add an interactive avatar and fix canvas mounting issues.

Before merging, please ensure:

- public/assets/avatar.png exists and is the exact file you want to display.
- Netlify build settings are correct: `npm run build` and publish directory `dist`.

After merging, trigger a full build on Netlify and verify the live site.
