import re

def extract_entities(text: str) -> dict:
    """
    Extract names, dates, and addresses from the input text.
    """
    # Names: Look for capitalized first + last names (simple heuristic)
    names = re.findall(r"\b[A-Z][a-z]+\s[A-Z][a-z]+\b", text)

    # Dates: Matches formats like 01/15/2023 or 15-01-23
    dates = re.findall(r"\b(?:\d{1,2}[/-])?\d{1,2}[/-]\d{2,4}\b", text)

    # Addresses: Look for lines that contain address keywords
    address_keywords = ['street', 'st.', 'road', 'sector', 'lane', 'avenue', 'block', 'colony', 'city', 'zip', 'code']
    addresses = []
    for line in text.splitlines():
        if any(keyword in line.lower() for keyword in address_keywords):
            addresses.append(line.strip())

    return {
        "names": list(set(names)),
        "dates": list(set(dates)),
        "addresses": list(set(addresses))
    }

def extract_table(text: str) -> dict | None:
    """
    Extract a simple table (headers + rows) from the text.
    Detects columns using whitespace/tab spacing.
    """
    lines = text.splitlines()
    table = []

    for line in lines:
        if re.search(r"\s{2,}|\t", line):  # Two or more spaces or tab
            columns = re.split(r"\s{2,}|\t", line.strip())
            if len(columns) >= 2:
                table.append(columns)

    if table:
        headers = table[0]
        rows = table[1:]
        return {
            "headers": headers,
            "rows": rows
        }

    return None

def extract_form_fields(text: str) -> dict:
    """
    Extract simple form fields with a 'Label: Value' structure.
    """
    fields = {}
    for line in text.splitlines():
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            value = parts[1].strip()
            if key and value:
                fields[key] = value
    return fields

def extract_structure(text: str) -> dict:
    """
    Identify headings and bullet points to reflect document hierarchy.
    """
    headings = []
    bullets = []

    for line in text.splitlines():
        # Headings: either ALL CAPS or ending in :
        if line.strip().isupper() or line.strip().endswith(':'):
            headings.append(line.strip())
        
        # Bullet points (common formats)
        if line.strip().startswith(("-", "*", "•")):
            bullets.append(line.strip())

    return {
        "headings": headings,
        "bullet_points": bullets
    }
