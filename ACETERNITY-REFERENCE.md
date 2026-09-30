# Aceternity UI local preview

The client logo wall adapts the 3D Card Effect interaction by Manu Arora:

- Documentation: https://ui.aceternity.com/components/3d-card-effect
- Official source: https://ui.aceternity.com/registry/3d-card.json
- Linked license: https://ui.aceternity.com/licence

This is a project-specific React/CSS adaptation, not an installed Aceternity
package or a reusable plugin. No Pro template, media or demo content is included.
Do not describe the component as MIT licensed: the linked license is custom.

The original interaction uses CSS perspective, pointer-relative rotation and
translateZ layers. This adaptation keeps the existing client card markup and
content, caps rotation at four degrees, lifts the logo modestly, and adds
reduced-motion/coarse-pointer fallbacks and static keyboard focus styling.
It requires no additional dependencies and preserves the original client assets.

The trial is local only. No source push or deployment has been performed.
