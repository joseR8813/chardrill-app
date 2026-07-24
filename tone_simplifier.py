"""
tone_simplifier.py
Converts toned pinyin into toneless "plain" pinyin for search matching,
e.g. nǐ -> ni, měiguórén -> meiguoren, lǜ -> lu, nǚ'ér -> nu'er.

Used by app.py (search_cards, add_card) and by the one-off backfill script.
"""

import unicodedata


def strip_tones(py: str) -> str:
    if not py:
        return py
    decomposed = unicodedata.normalize("NFD", py)
    return "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")