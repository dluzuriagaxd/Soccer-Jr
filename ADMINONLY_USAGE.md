# AdminOnly Tag Usage Guide

## CRITICAL RULES ⚠️

### ✅ USE `<AdminOnly>` for:
1. **Video planning notes** - Descriptions of future videos (duration, content outline, elements needed)
2. **Simulator specifications** - Specs for simulators that DON'T exist yet (marked with "En una futura actualización")
3. **Admin planning notes** - Implementation notes, TODOs, design decisions

### ❌ DO NOT USE `<AdminOnly>` for:
1. **Implemented simulations** - Working iframes (ojo-matematico.html, pendulo-p.html, etc.)
2. **Educational content** - Concepts, examples, explanations meant for students
3. **Working features** - Any functionality that students should use

## Pattern Examples

### ✅ CORRECT - Hide planning note, show working simulation:

```mdx
{/* Planning note (HIDDEN from students) */}
<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Title**
> - Duración sugerida: X minutos
> - Contenido: ...
</AdminOnly>

{/* Working simulation (VISIBLE to all logged-in users) */}
<div style="width: 100%; height: 500px; ...">
  <iframe src="/simulations/working-sim.html" ...></iframe>
</div>
```

### ❌ WRONG - Hiding working simulations:

```mdx
{/* This HIDES the simulation from students! */}
<AdminOnly>
  <div style="width: 100%; height: 500px; ...">
    <iframe src="/simulations/working-sim.html" ...></iframe>
  </div>
</AdminOnly>
```

### ✅ CORRECT - Future simulator spec (hidden):

```mdx
<AdminOnly>
{/* ADMIN NOTE: Future simulator spec (hidden from students) */}
> [!TIP]
> **Título**: Simulador - Future Feature
> En una futura actualización, aquí se insertará un simulador interactivo.
> **Descripción funcional**: ...
</AdminOnly>
```

## Quick Check

Before wrapping content in `<AdminOnly>`:
1. **Is it implemented and working?** → DON'T hide it
2. **Is it a planning note about future content?** → Hide it
3. **Is it a specification for something that doesn't exist yet?** → Hide it
4. **Would students benefit from seeing this?** → DON'T hide it

## MDX Comments for Clarity

Always use MDX comments `{/* */}` (not HTML `<!-- -->`) to mark the purpose:

```mdx
{/* SIMULATION (Visible to all logged-in users) */}
<iframe src="..." ...></iframe>

<AdminOnly>
{/* ADMIN NOTE: Video planning (hidden from students) */}
> **🎥 SECCIÓN DE VIDEO**
</AdminOnly>

<AdminOnly>
{/* ADMIN NOTE: Future simulator spec (hidden from students) */}
> [!TIP] Simulator specification...
</AdminOnly>
```

These comments help prevent accidentally hiding content that should be visible.
