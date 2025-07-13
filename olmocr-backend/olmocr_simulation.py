# olmocr_simulation.py

from extraction_utils import (
    extract_entities,
    extract_table,
    extract_form_fields,
    extract_structure,
)

class OlmOCR:
    def extract(self, text: str) -> dict:
        return {
            "entities": extract_entities(text),
            "table": extract_table(text),
            "form_fields": extract_form_fields(text),
            "structure": extract_structure(text)
        }
