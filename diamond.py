#!/usr/bin/env python3
"""
diamond.py
Refactoring engine fully compatible with getArticleBySlug() and app/content/articles/
Standards: MarketCall 2026 / TCPA / IRC R908 / SEER2 / AIM Act
"""

import os
import re
from pathlib import Path

# ---------------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------------
ARTICLES_DIR = Path("app/content/articles")
EXTENSIONS = {".md", ".mdx", ".markdown"}

TITLE_MAP = {
    "roof": "2026 Roof Replacement Costs & the 25% IRC Rule: What Insurers Actually Pay After Hail",
    "hvac": "SEER2 & R-32 Transition 2026: Real Costs of Replacing Your R-410A System",
    "insurance": "ACV vs RCV Roof Settlements 2026: Why Older Roofs Leave Homeowners Short",
    "storm": "NOAA 2026 Hail & Storm Loss Report: When Partial Damage Triggers Full Roof Replacement",
    "code": "IRC R908 25% Threshold Explained: When a Repair Becomes a Mandatory Full Replacement",
    "cost": "2026 Asphalt Shingle Installed Costs ($425–$625/sq) + Labor Rate Spikes",
    "claim": "How Adjusters Use the 25% Rule & Depreciation Schedules on 2026 Roof Claims",
    "default": "2026 Home Services Reality Check: Material Inflation, Code Triggers & Insurance Gaps",
}

SCRUB_MAP = [
    (r"\bcheapest\b", "competitive standard market rates"),
    (r"\bbest\b", "professional-grade"),
    (r"\bfree roof\b", "full replacement guidance"),
    (r"\bfree inspection\b", "professional assessment"),
    (r"\bwe cover your deductible\b", "licensed independent contractors can discuss financing options"),
    (r"\bguaranteed coverage\b", "coverage subject to your specific policy terms"),
    (r"\bact now\b", "schedule a professional assessment"),
    (r"\broof repair near me\b", "local licensed roofing contractors"),
    (r"\bfree estimate\b", "no-obligation professional assessment"),
    (r"\blowest price\b", "competitive standard market rates"),
    (r"\bguaranteed approval\b", "subject to underwriting and policy terms"),
    (r"\blimited time offer\b", "current market conditions"),
    (r"\bcall today\b", "request a professional assessment"),
]

ARTIFACT_PATTERNS = [
    r":contentReference\[[^\]]*\]",
    r"\[oaicite[^\]]*\]",
    r"`{3,}",
    r"\[source\]\([^)]*\)",
    r"\[\d+\]",
]

DISCLAIMER = (
    "\n\n> **Publisher Notice (TCPA / MarketCall Compliant):** "
    "This content is provided by an independent publisher matching service. "
    "We connect homeowners with licensed independent contractors for professional assessments. "
    "We do not sell insurance, guarantee claim outcomes, or cover deductibles. "
    "Rates reflect competitive standard market conditions as of 2026 and vary by location, material, and code requirements (including the IRC R908 25% replacement threshold).\n\n"
)

# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def load_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def save_file(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")

def extract_frontmatter(content: str):
    """Return (frontmatter_str, body) or (None, content) if no YAML block exists."""
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def clean_body_from_leaked_metadata(body: str) -> str:
    """Removes orphan metadata lines leaking into the raw body text."""
    lines = body.splitlines()
    clean_lines = []
    for line in lines:
        # Първоначални редове или висящ текст като `title: ...`, `date: ...` в тялото се премахват
        if re.match(r"^(title|description|date|category|updated|readingTime|author)\s*:", line, re.IGNORECASE):
            continue
        clean_lines.append(line)
    return "\n".join(clean_lines)

def rebuild_frontmatter(fm: str, new_title: str) -> str:
    """Updates/Ensures title, date, category and description exist in Frontmatter."""
    if re.search(r"^title\s*:", fm, re.MULTILINE | re.IGNORECASE):
        fm = re.sub(
            r"^title\s*:.*$",
            f'title: "{new_title}"',
            fm,
            count=1,
            flags=re.MULTILINE | re.IGNORECASE,
        )
    else:
        fm = f'title: "{new_title}"\n' + fm

    if not re.search(r"^date\s*:", fm, re.MULTILINE | re.IGNORECASE):
        fm += '\ndate: "2026-09-01"'

    if not re.search(r"^category\s*:", fm, re.MULTILINE | re.IGNORECASE):
        fm += '\ncategory: "Roofing & Storm Claims"'

    if not re.search(r"^description\s*:", fm, re.MULTILINE | re.IGNORECASE):
        fm += '\ndescription: "2026 Market Analysis: Building codes, material price shifts, insurance thresholds, and contractor inspection standards."'

    return fm

def choose_title(filename: str) -> str:
    stem = filename.lower()
    for key, title in TITLE_MAP.items():
        if key in stem:
            return title
    return TITLE_MAP["default"]

def scrub_compliance(text: str) -> str:
    for pattern, replacement in SCRUB_MAP:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text

def clean_artifacts(text: str) -> str:
    for pat in ARTIFACT_PATTERNS:
        text = re.sub(pat, "", text, flags=re.MULTILINE)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text

def fix_markdown_tables(text: str) -> str:
    lines = text.splitlines()
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.count("|") >= 2 and not re.match(r"^\s*\|?\s*[-:]+", line):
            table_block = [line]
            j = i + 1
            while j < len(lines) and lines[j].count("|") >= 2:
                table_block.append(lines[j])
                j += 1

            normalized = []
            for row in table_block:
                row = re.sub(r"\$\s+(\d)", r"$\1", row)
                cells = [c.strip() for c in row.strip().strip("|").split("|")]
                normalized.append("| " + " | ".join(cells) + " |")

            if len(normalized) >= 1:
                header = normalized[0]
                col_count = header.count("|") - 1
                has_align = False
                if len(normalized) > 1:
                    second = normalized[1]
                    if re.match(r"^\|\s*[-:]+", second):
                        has_align = True
                if not has_align:
                    align = "| " + " | ".join(["---"] * col_count) + " |"
                    normalized.insert(1, align)

            out.extend(normalized)
            i = j
            continue
        out.append(line)
        i += 1
    return "\n".join(out)

def inject_disclaimer(body: str) -> str:
    paras = re.split(r"(\n\s*\n)", body)
    word_count = 0
    insert_at = None
    for idx, p in enumerate(paras):
        if p.strip() and not p.startswith(">"):
            words = len(re.findall(r"\w+", p))
            word_count += words
            if word_count >= 80:
                insert_at = idx + 1
                break
    if insert_at is None:
        for idx, p in enumerate(paras):
            if p.strip():
                insert_at = idx + 1
                break
    if insert_at is None:
        return DISCLAIMER + body

    if "Publisher Notice (TCPA" in body:
        return body

    new_paras = paras[:insert_at] + [DISCLAIMER] + paras[insert_at:]
    return "".join(new_paras)

def process_article(path: Path) -> bool:
    print(f"Processing: {path.name}")
    original = load_file(path)
    fm_str, body = extract_frontmatter(original)

    # 1. Почистваме изтекли метаданни в самата статия
    body = clean_body_from_leaked_metadata(body)

    # 2. Обновяваме frontmatter-а
    new_title = choose_title(path.stem)
    if fm_str is not None:
        fm_str = rebuild_frontmatter(fm_str, new_title)
    else:
        fm_str = f'title: "{new_title}"\ndate: "2026-09-01"\ncategory: "Roofing Guides"\ndescription: "2026 Guide and breakdown."'

    # 3. Прилагаме почистващите филтри върху тялото
    body = scrub_compliance(body)
    body = clean_artifacts(body)
    body = fix_markdown_tables(body)
    body = inject_disclaimer(body)

    # Сглобяване на чистия файл
    content = f"---\n{fm_str.strip()}\n---\n\n{body.lstrip()}"
    content = re.sub(r"\n{4,}", "\n\n\n", content)
    content = content.rstrip() + "\n"

    if content != original:
        save_file(path, content)
        print(f"  -> Cleaned and synchronized with MDX parser")
        return True
    print(f"  -> Already clean")
    return False

# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    if not ARTICLES_DIR.exists():
        print(f"ERROR: Directory not found: {ARTICLES_DIR.resolve()}")
        return

    files = sorted(
        p for p in ARTICLES_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in EXTENSIONS
    )

    if not files:
        print(f"No .md / .mdx files found in {ARTICLES_DIR}")
        return

    print(f"Found {len(files)} article(s). Running clean MDX refactor...\n")
    changed = 0
    for f in files:
        if process_article(f):
            changed += 1

    print(f"\nDone. {changed}/{len(files)} articles processed.")

if __name__ == "__main__":
    main()