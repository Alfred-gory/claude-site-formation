import feedparser
import json
import re
from datetime import datetime, timezone

SOURCES = [
    {"url": "https://www.service-public.fr/rss/R14721.xml", "label": "Service-public.fr"},
    {"url": "https://travail-emploi.gouv.fr/spip.php?page=backend", "label": "Ministère du Travail"},
    {"url": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite.rss.html", "label": "URSSAF"},
    {"url": "https://www.legifrance.gouv.fr/feeds/jorf/", "label": "Journal Officiel"}
]

MOTS_CLES = [
    "paie","salaire","bulletin","cotisation","urssaf","dsn",
    "recrutement","embauche","contrat","licenciement","rupture",
    "formation","cpf","opco","apprentissage",
    "droit social","code du travail","convention collective",
    "smic","indemnité","congé","arrêt","maladie",
    "rh","ressources humaines","entreprise","silae","logiciel de paie"
]

COULEURS = {
    "Paie":        {"bg": "linear-gradient(135deg,#1a2a1a,#0d1a0d)", "accent": "#4caf7a", "icone": "📊"},
    "Formation":   {"bg": "linear-gradient(135deg,#1a1a2a,#0d0d1a)", "accent": "#c9a84c", "icone": "🎓"},
    "RH":          {"bg": "linear-gradient(135deg,#2a1a1a,#1a0d0d)", "accent": "#e87c5a", "icone": "📋"},
    "Droit social":{"bg": "linear-gradient(135deg,#1a1a2a,#0d0d22)", "accent": "#7c8ee8", "icone": "⚖️"},
    "Actualité":   {"bg": "linear-gradient(135deg,#1c2333,#0d1117)", "accent": "#c9a84c", "icone": "📰"}
}

def categorie(titre, resume):
    texte = (titre + " " + resume).lower()
    if any(m in texte for m in ["paie","salaire","bulletin","cotisation","urssaf","dsn","smic","silae"]):
        return "Paie"
    if any(m in texte for m in ["formation","cpf","opco","apprentissage","compétence"]):
        return "Formation"
    if any(m in texte for m in ["recrutement","embauche","contrat","licenciement","rupture","congé","arrêt"]):
        return "RH"
    if any(m in texte for m in ["droit social","code du travail","convention","juridique","tribunal","prud"]):
        return "Droit social"
    return "Actualité"

def est_pertinent(titre, resume):
    return any(mot in (titre + " " + resume).lower() for mot in MOTS_CLES)

def nettoyer(texte):
    if not texte:
        return ""
    texte = re.sub(r'<[^>]+>', '', texte)
    texte = re.sub(r'\s+', ' ', texte).strip()
    return texte[:300] + ("..." if len(texte) > 300 else "")

def extraire_image(entry):
    """Cherche une image dans les métadonnées RSS de l'entrée."""
    # media:content ou media:thumbnail
    for attr in ['media_content', 'media_thumbnail']:
        val = getattr(entry, attr, None)
        if val and isinstance(val, list) and val[0].get('url'):
            return val[0]['url']
    # enclosure (podcast/image attachée)
    if hasattr(entry, 'enclosures') and entry.enclosures:
        for enc in entry.enclosures:
            if enc.get('type', '').startswith('image'):
                return enc.get('url', '')
    # image dans le HTML du résumé
    html = getattr(entry, 'summary', '') or getattr(entry, 'content', [{}])[0].get('value', '')
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    if match:
        url = match.group(1)
        if url.startswith('http'):
            return url
    return None

def formater_date(entry):
    for attr in ['published_parsed', 'updated_parsed']:
        t = getattr(entry, attr, None)
        if t:
            try:
                mois = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"]
                return f"{t.tm_mday} {mois[t.tm_mon-1]} {t.tm_year}"
            except:
                pass
    return datetime.now().strftime("%d/%m/%Y")

def duree_lecture(texte):
    mots = len(texte.split())
    minutes = max(2, round(mots / 200))
    return f"{minutes} min de lecture"

articles = []

for source in SOURCES:
    try:
        feed = feedparser.parse(source["url"])
        for entry in feed.entries[:15]:
            titre = nettoyer(getattr(entry, 'title', ''))
            resume = nettoyer(getattr(entry, 'summary', getattr(entry, 'description', '')))
            lien = getattr(entry, 'link', '')
            if not titre or not est_pertinent(titre, resume):
                continue
            cat = categorie(titre, resume)
            image = extraire_image(entry)
            articles.append({
                "titre": titre,
                "resume": resume or "Cliquez pour lire l'article complet.",
                "categorie": cat,
                "icone": COULEURS[cat]["icone"],
                "couleur_bg": COULEURS[cat]["bg"],
                "couleur_accent": COULEURS[cat]["accent"],
                "image": image,
                "date": formater_date(entry),
                "source": source["label"],
                "lien": lien,
                "lecture": duree_lecture(resume)
            })
    except Exception as e:
        print(f"Erreur source {source['label']}: {e}")

vus = set()
uniques = []
for a in articles:
    cle = a['titre'][:60].lower()
    if cle not in vus:
        vus.add(cle)
        uniques.append(a)

fichier = "articles.json"
if not uniques:
    print("Aucun article pertinent — conservation des anciens articles.")
    exit(0)

uniques = uniques[:6]

data = {
    "mis_a_jour": datetime.now(timezone.utc).strftime("%d/%m/%Y à %Hh%M"),
    "articles": uniques
}

with open(fichier, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ {len(uniques)} articles sauvegardés dans {fichier}")
