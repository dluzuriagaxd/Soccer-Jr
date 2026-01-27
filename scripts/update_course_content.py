import os
import re

SOURCE_FILE = 'CURSO_COMPLETO.md'
OUTPUT_DIR = 'src/content/lessons'

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: {SOURCE_FILE} not found.")
        return

    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_lesson = {}
    content_lines = []
    
    # Regex to catch lesson headers
    # Example: ### Lección 4.1: Teoría de Control
    header_pattern = re.compile(r'^###\s+(Lección\s+[\d\.]+:?\s*.+)')
    
    for line in lines:
        header_match = header_pattern.match(line)
        
        if header_match:
            # Save previous lesson if exists
            if current_lesson and 'slug' in current_lesson:
                save_lesson(current_lesson, content_lines)
            
            # Start new lesson
            current_lesson = {
                'title': header_match.group(1).strip()
            }
            content_lines = []
            continue

        # Check for Metadata
        # **Order**: 9
        if line.strip().startswith('**Order**:'):
            order_val = line.split(':', 1)[1].strip()
            current_lesson['order'] = int(order_val)
            continue
            
        # **Slug**: `04-programacion/01-teoria-control`
        if line.strip().startswith('**Slug**:'):
            slug_val = line.split(':', 1)[1].strip().strip('`')
            current_lesson['slug'] = slug_val
            continue
            
        # Accumulate content
        if current_lesson:
            content_lines.append(line)

    # Save last lesson
    if current_lesson and 'slug' in current_lesson:
        save_lesson(current_lesson, content_lines)

def save_lesson(lesson, lines):
    slug = lesson.get('slug')
    if not slug:
        return

    # Ensure directory exists
    slug_parts = slug.split('/')
    if len(slug_parts) > 1:
        dir_path = os.path.join(OUTPUT_DIR, *slug_parts[:-1])
    else:
        dir_path = OUTPUT_DIR
        
    os.makedirs(dir_path, exist_ok=True)
    
    file_path = os.path.join(OUTPUT_DIR, slug + '.mdx')
    
    # Clean up leading/trailing dashes or blank lines from content if necessary
    # But usually we just dump it. 
    # Let's clean up key-value pairs if they were included in content by accident? 
    # (Our loop skips them, so valid)
    
    # Construct Frontmatter
    frontmatter = f"""---
title: "{lesson['title']}"
order: {lesson.get('order', 999)}
description: "{lesson['title']}"
---

"""
    
    content = "".join(lines)
    
    # Remove leading separators if present (e.g. --- lines right after headers)
    content = content.lstrip()
    if content.startswith('---'):
        content = content[3:].lstrip()
        
    full_content = frontmatter + content
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"Generated: {file_path}")

if __name__ == '__main__':
    main()
