#!/usr/bin/env python3
"""
Reverse sync: Generate CURSO_COMPLETO.md FROM the MDX lesson files
This keeps CURSO_COMPLETO.md in sync with the actual lesson content
"""

import os
import glob

# Path configuration
LESSONS_DIR = "src/content/lessons"
OUTPUT_FILE = "CURSO_COMPLETO.md"

def read_mdx_file(filepath):
    """Read MDX file and extract frontmatter + content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            body = parts[2].strip()
            return frontmatter, body
    
    return None, content

def parse_frontmatter(frontmatter):
    """Parse YAML frontmatter"""
    data = {}
    for line in frontmatter.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            data[key.strip()] = value.strip().strip('"')
    return data

def main():
    # Get all lesson files sorted
    lesson_files = sorted(glob.glob(f"{LESSONS_DIR}/**/*.mdx", recursive=True))
    
    output_lines = []
    output_lines.append("# Curso Completo: Seguidor de Línea Jr. - Telemetría Pro\n")
    output_lines.append("---\n\n")
    
    current_module = None
    
    for filepath in lesson_files:
        frontmatter_text, body = read_mdx_file(filepath)
        
        if not frontmatter_text:
            continue
            
        frontmatter = parse_frontmatter(frontmatter_text)
        title = frontmatter.get('title', '')
        order = frontmatter.get('order', '')
        description = frontmatter.get('description', '')
        
        # Extract module and lesson from path
        path_parts = filepath.split(os.sep)
        module_dir = path_parts[-2] if len(path_parts) > 1 else ''
        slug = f"{module_dir}/{path_parts[-1].replace('.mdx', '')}"
        
        # Check if we're starting a new module
        if module_dir != current_module:
            current_module = module_dir
            module_name = module_dir.split('-', 1)[1].title() if '-' in module_dir else module_dir.title()
            output_lines.append(f"\n## Módulo: {module_name}\n\n")
        
        # Add lesson header
        output_lines.append(f"### {title}\n")
        output_lines.append(f"**Order**: {order}  \n")
        output_lines.append(f"**Slug**: `{slug}`\n\n")
        output_lines.append("---\n\n")
        
        # Add lesson body
        output_lines.append(body)
        output_lines.append("\n\n---\n\n")
    
    # Write output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(''.join(output_lines))
    
    print(f"✅ Generated {OUTPUT_FILE} from {len(lesson_files)} lesson files")

if __name__ == "__main__":
    main()
