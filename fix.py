import os
import re

# Resolve path to articles directory
possible_paths = [
    os.path.join(os.getcwd(), 'app', 'content', 'articles'),
    os.path.join(os.getcwd(), 'content', 'articles'),
    os.path.join(os.getcwd(), 'src', 'content', 'articles'),
]

articles_dir = None
for path in possible_paths:
    if os.path.exists(path):
        articles_dir = path
        break

if not articles_dir:
    articles_dir = os.path.join(os.getcwd(), 'app', 'content', 'articles')

def repair_article_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean ChatGPT citation artifacts
    content = re.sub(r':contentReference\[oaicite:\d+\]', '', content)

    # 2. Extract readingTime if present, or set fallback
    reading_time_match = re.search(r'readingTime:\s*"([^"]+)"', content)
    reading_time = reading_time_match.group(1) if reading_time_match else "10 min read"

    # Clean out stray readingTime and Executive Summary text lines from body
    content = re.sub(r'readingTime:\s*"[^"]+"', '', content)
    content = re.sub(r'Executive Summary\s*', '', content)

    # 3. Dynamic Frontmatter Extraction & Auto-Correction
    title_match = re.search(r'title:\s*"([^"]+)"', content)
    desc_match = re.search(r'description:\s*"([^"]+)"', content)
    date_match = re.search(r'date:\s*"([^"]+)"', content)
    cat_match = re.search(r'category:\s*"([^"]+)"', content)

    # Content-based classification for all 8 articles
    if "Homebuyer" in content or "pre-purchase" in content.lower():
        title = "Homebuyer Roof Inspection Checklist: Technical Evaluation & Repair Concessions"
        cat = "Homebuyer Guide"
        desc = "Comprehensive structural checklist for home buyers to evaluate roof condition, identify concealed attic leaks, and negotiate seller credits."
    elif "Insurance" in content or "adjuster" in content.lower() or "RCV" in content:
        title = "Roof Insurance Claim Process Explained: From Storm Documentation to Settlement"
        cat = "Insurance Guide"
        desc = "Step-by-step guide to navigating property insurance claims for storm damage, working with adjusters, and avoiding denials."
    elif "Spot Repair" in content or "25%" in content or "partial repair" in content.lower():
        title = "Spot Repairs vs. Full Roof Replacement: Technical & Financial Decision Guide"
        cat = "Roofing Repair Guide"
        desc = "Independent analysis evaluating roof degradation thresholds, the 25% building code rule, labor overlap, and repair viability."
    elif "HVAC" in content or "furnace" in content.lower():
        title = "HVAC System Replacement Cost Breakdown 2026: Equipment, Efficiency Ratings & Installation Fees"
        cat = "HVAC Cost Guide"
        desc = "Comprehensive 2026 HVAC replacement cost analysis covering SEER2 ratings, heat pumps, furnaces, ductwork, and labor fees."
    elif "Emergency" in content or "Leak Protocol" in content:
        title = "Emergency Roof Leak Protocol: Temporary Mitigation & Structural Prevention"
        cat = "Emergency Repair Guide"
        desc = "A technical homeowner guide for managing active roof leaks, temporary tarping procedures, and water containment."
    elif "Hail" in content or "Wind Damage" in content:
        title = "How to Identify Hail and Wind Damage on Your Roof: Visual & Technical Guide"
        cat = "Roof Inspection Guide"
        desc = "Comprehensive homeowner guide for recognizing subtle hail strikes, granule loss, lifted shingles, and severe wind uplift."
    elif "Material Comparison" in content or "Asphalt Shingles vs. Metal" in content:
        title = "Asphalt Shingles vs. Metal vs. Tile Roofing: 2026 Cost & Durability Comparison"
        cat = "Material Comparison Guide"
        desc = "Independent technical analysis comparing structural weight, hurricane ratings, thermal performance, and 30-year ROI."
    else:
        title = title_match.group(1) if title_match else "Roof Replacement & Inspection Technical Guide"
        cat = cat_match.group(1) if cat_match else "Roofing Guide"
        desc = desc_match.group(1) if desc_match else "Comprehensive roof damage assessment, technical inspection metrics, and cost guide."

    date = date_match.group(1) if date_match else "2026-01-15"

    # Remove leaked frontmatter strings from body content
    content = re.sub(r'title:\s*"[^"]+"', '', content)
    content = re.sub(r'description:\s*"[^"]+"', '', content)
    content = re.sub(r'date:\s*"[^"]+"', '', content)
    content = re.sub(r'category:\s*"[^"]+"', '', content)
    content = re.sub(r'^\s*---\s*[\s\S]*?---\s*', '', content)

    # 4. Cleanup broken pipes and inline dashes dynamically
    blocks = content.split('\n\n')
    cleaned_blocks = []

    for block in blocks:
        block_str = block.strip()
        if not block_str:
            continue

        lines = block_str.split('\n')
        has_pipes = any('|' in line for line in lines)

        if has_pipes:
            cells = []
            for line in lines:
                parts = re.split(r'\|', line)
                for p in parts:
                    clean_p = p.strip()
                    if clean_p and not re.match(r'^-+$', clean_p):
                        cells.append(clean_p)

            if len(cells) >= 2:
                header1 = cells[0]
                header2 = cells[1]
                data = cells[2:]

                table_lines = [
                    f"| {header1} | {header2} |",
                    "| --- | --- |"
                ]

                for i in range(0, len(data), 2):
                    col1 = data[i]
                    col2 = data[i+1] if i + 1 < len(data) else ""
                    table_lines.append(f"| {col1} | {col2} |")

                cleaned_blocks.append("\n".join(table_lines))
            else:
                cleaned_blocks.append(" ".join(cells))
        else:
            clean_paragraph = re.sub(r'(?<!\n)---(?!\n)', '', block_str).strip()
            cleaned_blocks.append(clean_paragraph)

    final_body = "\n\n".join(cleaned_blocks)
    final_body = re.sub(r'\n{3,}', '\n\n', final_body).strip()

    # Rebuild output with readingTime safely placed in YAML Frontmatter
    final_output = f"""---
title: "{title}"
description: "{desc}"
date: "{date}"
category: "{cat}"
readingTime: "{reading_time}"
---

{final_body}
"""

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_output)

    print(f"✅ Cleaned and updated: {os.path.basename(file_path)}")

# Run script for all 8 files
if os.path.exists(articles_dir):
    processed = 0
    for filename in os.listdir(articles_dir):
        if filename.endswith(('.md', '.mdx')):
            repair_article_content(os.path.join(articles_dir, filename))
            processed += 1
    print(f"\n🚀 DONE! All {processed} articles cleaned of stray text tags.")
else:
    print(f"Error: Directory {articles_dir} not found.")