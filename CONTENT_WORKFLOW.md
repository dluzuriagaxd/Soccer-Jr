# Course Content Workflow

## IMPORTANT: Source of Truth

**MDX files in `src/content/lessons/` are the SOURCE OF TRUTH.**

`CURSO_COMPLETO.md` is a GENERATED file for easy reading/reference only.

## Correct Workflow

### 1. Editing Content

**✅ DO THIS:**
```bash
# Edit MDX files directly
vim src/content/lessons/04-programacion/01-teoria-control.mdx

# Then regenerate CURSO_COMPLETO.md
python3 scripts/sync_to_completo.py
```

**❌ DON'T DO THIS:**
```bash
# DO NOT edit CURSO_COMPLETO.md and run update_course_content.py
# This will OVERWRITE your MDX files and may break AdminOnly tags!
```

### 2. When to Use Each Script

**`sync_to_completo.py`** (MDX → CURSO_COMPLETO.md)
- Run this ALWAYS after editing MDX files
- Keeps CURSO_COMPLETO.md synchronized
- Safe to run anytime

**`update_course_content.py`** (CURSO_COMPLETO.md → MDX)
- ⚠️ USE WITH EXTREME CAUTION
- Only use when bulk-importing new content
- May break AdminOnly tags if not formatted correctly
- Requires manual review after running

## AdminOnly Tag Safety

### Protected Pattern

All admin notes follow this pattern in MDX:

```mdx
<AdminOnly>
{/* ADMIN NOTE: [description] */}
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
> Content...
</AdminOnly>
```

### Verification

Run this to check for issues:

```bash
python3 -c "
import os, re
for root, dirs, files in os.walk('src/content/lessons'):
    for f in files:
        if f.endswith('.mdx'):
            path = os.path.join(root, f)
            content = open(path).read()
            if '🎥 SECCIÓN DE VIDEO' in content and not re.search(r'<AdminOnly>.*🎥 SECCIÓN DE VIDEO.*</AdminOnly>', content, re.DOTALL):
                print(f'⚠️ {path}: Video note may not be wrapped')
"
```

## Git Best Practices

### Before Committing

1. ✅ Verify all MDX files have correct AdminOnly tags
2. ✅ Run `sync_to_completo.py` to update CURSO_COMPLETO.md
3. ✅ Test in browser (student account)
4. ✅ Commit both MDX and CURSO_COMPLETO.md together

### .gitignore Considerations

**DO NOT** add `CURSO_COMPLETO.md` to .gitignore - it should be tracked to help others understand the course structure without reading individual MDX files.

## Emergency Recovery

If you accidentally run `update_course_content.py` and break tags:

```bash
# Restore MDX files from git
git checkout src/content/lessons/

# Or restore specific file
git checkout src/content/lessons/04-programacion/01-teoria-control.mdx

# Then regenerate CURSO_COMPLETO.md
python3 scripts/sync_to_completo.py
```

## Summary

1. **Edit MDX files** (source of truth)
2. **Run `sync_to_completo.py`** (sync to CURSO_COMPLETO.md)
3. **Never manually edit CURSO_COMPLETO.md**
4. **Verify AdminOnly tags** before committing
