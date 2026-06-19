import feedparser
import json
import os
from datetime import datetime, timezone
import re

# Sources RSS officielles françaises — droit social, paie, RH
SOURCES = [
    {
        "url": "https://www.service-public.fr/rss/R14721.xml",
        "label": "Service-public.fr"
    },
    {
        "url": "https://travail-emploi.gouv.fr/spip.php?page=backend",
        "label": "Ministère du Travail"
    },
    {
        "url": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite.rss.html",
        "label": "URSSAF"
    },
    {
        "url": "https://www.legifrance.gouv.fr/feeds/jorf/",
        "label": "Journal Officiel"
    }
]

# Mots-clés filtre — thèmes du cabinet
MOTS_CLES = [
    "paie","salaire","bulletin","cotisation","urssaf","dsn",
    "recrutement","embauche","contrat","licenciement","rupture",
    "formation","cpf","opco","apprentissage",
    "droit social","code du travail","convention collective",
    "smic","indemnité","congé","arrêt","maladie",
    "rh","ressources humaines","entreprise",
    "silae","logiciel de paie"
]

# Catégories selon les mots-clés
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
    texte = (titre + " " + resume).lower()
    return any(mot in texte for mot in MOTS_CLES)

def nettoyer(texte):
    if not texte:
        return ""
    texte = re.sub(r'<[^>]+>', '', texte)
    texte = re.sub(r'\s+', ' ', texte).strip()
    return texte[:280] + ("..." if len(texte) > 280 else "")

def duree_lecture(texte):
    mots = len(texte.split())
    minutes = max(2, round(mots / 200))
    return f"{minutes} min de lecture"

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

ICONES = {"Paie": "📊", "Formation": "🎓", "RH": "📋", "Droit social": "⚖️", "Actualité": "📰"}

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
            articles.append({
                "titre": titre,
                "resume": resume or "Cliquez pour lire l'article complet.",
                "categorie": cat,
                "icone": ICONES.get(cat, "📰"),
                "date": formater_date(entry),
                "source": source["label"],
                "lien": lien,
                "lecture": duree_lecture(resume)
            })
    except Exception as e:
        print(f"Erreur source {source['label']}: {e}")

# Dédoublonnage par titre
vus = set()
uniques = []
for a in articles:
    cle = a['titre'][:60].lower()
    if cle not in vus:
        vus.add(cle)
        uniques.append(a)

# Si aucun article trouvé, garder les anciens
fichier = "articles.json"
if not uniques:
    print("Aucun article pertinent trouvé — conservation des anciens articles.")
    exit(0)

# Garder les 6 plus récents
uniques = uniques[:6]

data = {
    "mis_a_jour": datetime.now(timezone.utc).strftime("%d/%m/%Y à %Hh%M"),
    "articles": uniques
}

with open(fichier, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ {len(uniques)} articles sauvegardés dans {fichier}")
