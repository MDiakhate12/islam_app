#!/usr/bin/env python3
"""Télécharge le Coran (FR) et affiche les versets dont le texte arabe contient la séquence « سلم »."""

import json
import ssl
import unicodedata
import urllib.request

URL = "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_fr.json"
NEEDLE = "سلم"


def arabic_letters_only(text: str) -> str:
    """Retire les diacritiques arabes pour pouvoir chercher une racine/une séquence dans le texte Uthmani."""
    decomposed = unicodedata.normalize("NFD", text)
    return "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")


def main() -> None:
    ctx = ssl.create_default_context()
    req = urllib.request.Request(URL, headers={"User-Agent": "get_ayat/1.0"})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
        data = json.load(resp)

    for surah in data:
        sid = surah["id"]
        sname = surah["name"]
        for v in surah["verses"]:
            text = v["text"]
            if NEEDLE not in arabic_letters_only(text):
                continue
            vid = v["id"]
            trans = v.get("translation", "")
            print(f"{sid}:{vid} — {sname}")
            print(f"  {text}")
            if trans:
                print(f"  ({trans})")
            print()


if __name__ == "__main__":
    import sys

    try:
        main()
    except BrokenPipeError:
        sys.exit(0)
