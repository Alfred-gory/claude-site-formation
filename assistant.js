// Assistant IA — Cabinet Alfred Gory
(function() {

  // BASE DE CONNAISSANCES
  var knowledge = [
    {
      tags: ['bonjour','salut','hello','bonsoir','bjr','coucou','hey'],
      rep: ["Bonjour et bienvenue chez Cabinet Alfred Gory ! 😊 Je suis votre conseiller en formation. Comment puis-je vous aider ?", "Bonjour ! Ravi de vous accueillir. Vous souhaitez des informations sur nos formations ?"]
    },
    {
      tags: ['formation','formations','catalogue','proposez','offre','avez'],
      rep: ["Nous proposons 6 formations professionnelles :\n\n📊 Gestion de la paie\n💻 Maîtrise de Silae\n🏢 Gestion d'entreprise\n📋 Recrutement & RH\n🔢 Excel pour la paie\n⚖️ Droit social pratique\n\nLaquelle vous intéresse ?"]
    },
    {
      tags: ['paie','bulletin','salaire','bulletins','paye'],
      rep: ["Notre formation **Gestion de la paie** (35h) couvre :\n✓ Droit du travail appliqué\n✓ Calcul des cotisations\n✓ Bulletins de paie\n✓ DSN\n\nElle est éligible CPF et finançable OPCO. Voulez-vous vous inscrire ?"]
    },
    {
      tags: ['silae','logiciel','mysilae','software'],
      rep: ["Notre formation **Maîtrise de Silae** (21h) vous rend autonome sur le logiciel n°1 de paie en France :\n✓ Paramétrage dossier\n✓ Gestion des salariés\n✓ Production des bulletins\n✓ DSN avec Silae\n\nÉligible CPF. Des questions ?"]
    },
    {
      tags: ['entreprise','dirigeant','manager','gestion','piloter','tpe','pme'],
      rep: ["Notre formation **Gestion d'entreprise** (28h) est idéale pour les dirigeants :\n✓ Lecture des bilans\n✓ Obligations sociales\n✓ Tableaux de bord\n✓ Gestion de trésorerie\n\nFinançable AGEFICE ou OPCO pour les dirigeants."]
    },
    {
      tags: ['recrutement','rh','recruter','embauche','contrat','embaucher'],
      rep: ["Notre formation **Recrutement & RH** (14h) couvre :\n✓ Processus de recrutement\n✓ Rédaction des contrats\n✓ Gestion des absences\n✓ Entretiens professionnels\n\nParfaite pour les assistants RH et managers."]
    },
    {
      tags: ['excel','tableur','tableau','croisé','dynamique'],
      rep: ["Notre formation **Excel pour la paie** (14h) vous permet de :\n✓ Créer des tableaux de suivi automatisés\n✓ Calculer la paie sous Excel\n✓ Faire des tableaux croisés dynamiques\n✓ Disposer de modèles prêts à l'emploi\n\nLes fichiers sont fournis et conservés !"]
    },
    {
      tags: ['droit','social','juridique','licenciement','prud','contentieux','rupture'],
      rep: ["Notre formation **Droit social pratique** (21h) sécurise vos pratiques :\n✓ Relations individuelles de travail\n✓ Rupture du contrat (licenciement, rupture conventionnelle)\n✓ Gestion des litiges\n✓ Veille réglementaire\n\nCette formation ne remplace pas un conseil juridique individualisé."]
    },
    {
      tags: ['cpf','financement','financer','prendre en charge','opco','pris en charge','gratuit','coût','cout','prix','tarif'],
      rep: ["Toutes nos formations sont :\n✓ **Éligibles au CPF** (Compte Personnel de Formation)\n✓ **Finançables par votre OPCO**\n✓ Éligibles au plan de développement des compétences\n\nContactez-nous pour vérifier votre solde CPF et obtenir un devis personnalisé."]
    },
    {
      tags: ['durée','duree','temps','heures','combien','long'],
      rep: ["Durées de nos formations :\n⏱ Gestion de la paie : 35h\n⏱ Maîtrise de Silae : 21h\n⏱ Gestion d'entreprise : 28h\n⏱ Recrutement & RH : 14h\n⏱ Excel pour la paie : 14h\n⏱ Droit social : 21h\n\nToutes sont 100% en ligne, à votre rythme."]
    },
    {
      tags: ['ligne','distance','distanciel','télé','domicile','chez moi','online'],
      rep: ["Oui, toutes nos formations sont **100% en ligne** ! 🖥️\n\nVous suivez les cours :\n✓ Depuis chez vous\n✓ À votre propre rythme\n✓ Sur ordinateur, tablette ou téléphone\n✓ Avec l'accompagnement d'un formateur expert"]
    },
    {
      tags: ['prérequis','prerequis','niveau','débutant','débutante','départ','zéro','base'],
      rep: ["La plupart de nos formations sont accessibles aux débutants !\n\n✓ Gestion de la paie : niveau Bac, aucune expérience requise\n✓ Silae : notions de paie recommandées\n✓ Excel paie : maîtrise de base d'Excel souhaitée\n✓ Recrutement RH : aucune expérience requise\n\nQuelle formation vous intéresse ?"]
    },
    {
      tags: ['contact','contacter','joindre','appeler','email','mail','téléphone'],
      rep: ["Vous pouvez nous contacter ici :\n\n✉️ formation@alfred-gory.fr\n\nOu remplissez le formulaire de contact en bas de page — nous vous repondons sous 48h ! 😊"]
    },
    {
      tags: ['inscrire','inscription','inscrire','rejoindre','commencer','démarrer','démarrer'],
      rep: ["Pour vous inscrire, c'est simple :\n\n1️⃣ Remplissez le formulaire de contact\n2️⃣ On vous rappelle sous 48h\n3️⃣ On identifie ensemble le meilleur financement\n4️⃣ La formation commence !\n\nVoulez-vous que je vous redirige vers le formulaire ?"]
    },
    {
      tags: ['qualiopi','certification','certifié','agréé','qualité','reconnaissance'],
      rep: ["Cabinet Alfred Gory est en démarche de certification Qualiopi, le référentiel national qualité des organismes de formation.\n\nNos formations sont réalisées conformément aux articles L.6311-1 et suivants du Code du travail. 📋"]
    },
    {
      tags: ['merci','super','parfait','top','excellent','génial','cool','bravo'],
      rep: ["Merci, c'est très gentil ! 😊 N'hésitez pas si vous avez d'autres questions.", "Avec plaisir ! Je reste disponible si vous souhaitez plus d'informations sur nos formations. 🎓"]
    },
    {
      tags: ['au revoir','bye','bonne journée','bonne soirée','salut','à bientôt','tchao'],
      rep: ["Au revoir et à bientôt ! N'hésitez pas à revenir. 😊", "Bonne journée ! Toute l'équipe Cabinet Alfred Gory reste à votre disposition. 🎓"]
    }
  ];

  var defaultRep = [
    "Je ne suis pas sûr de comprendre votre question. Pouvez-vous reformuler ?\n\nVous pouvez me demander par exemple : *'Quelles formations proposez-vous ?'* ou *'Comment financer ma formation ?'*\n\nPour toute autre question : ✉️ formation@alfred-gory.fr 😊",
    "Je n'ai pas bien compris votre demande. N'hésitez pas à reformuler !\n\nJe peux vous renseigner sur nos formations, les durées, les prérequis et le financement CPF/OPCO.\n\nSinon, contactez-nous directement : ✉️ formation@alfred-gory.fr 🎓"
  ];

  // ALGORITHME DE COMPRÉHENSION
  function normaliser(texte) {
    return texte.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ');
  }

  function scores(msg) {
    var mots = normaliser(msg).split(/\s+/);
    var meilleur = null, meilleurScore = 0;

    knowledge.forEach(function(k) {
      var score = 0;
      k.tags.forEach(function(tag) {
        mots.forEach(function(mot) {
          if (mot === tag) score += 3;
          else if (mot.length > 3 && tag.includes(mot)) score += 1;
          else if (mot.length > 3 && mot.includes(tag)) score += 1;
        });
      });
      if (score > meilleurScore) { meilleurScore = score; meilleur = k; }
    });

    if (meilleurScore > 0) {
      var reps = meilleur.rep;
      return reps[Math.floor(Math.random() * reps.length)];
    }
    return defaultRep[Math.floor(Math.random() * defaultRep.length)];
  }

  // FORMATAGE MARKDOWN SIMPLE
  function formatMsg(texte) {
    return texte
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  // INTERFACE
  var css = `
    #ag-bubble {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
      display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;
    }
    #ag-avatar {
      width: 64px; height: 64px;
      background: linear-gradient(135deg, #c9a84c, #e8d08a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow: 0 0 0 0 rgba(201,168,76,0.5);
      animation: ag-pulse 2.5s infinite;
      position: relative;
      font-size: 1.8rem;
      transition: transform 0.2s;
      border: 3px solid rgba(201,168,76,0.3);
    }
    #ag-avatar:hover { transform: scale(1.08); }
    #ag-notif {
      position: absolute; top: -4px; right: -4px;
      width: 16px; height: 16px;
      background: #e74c3c; border-radius: 50%;
      border: 2px solid #0d1117;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.55rem; color: #fff; font-weight: 700;
    }
    @keyframes ag-pulse {
      0% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
      70% { box-shadow: 0 0 0 14px rgba(201,168,76,0); }
      100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    }
    #ag-box {
      width: 340px;
      background: #161b22;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      max-height: 500px;
    }
    #ag-box.ouvert { display: flex; animation: ag-open 0.3s ease; }
    @keyframes ag-open {
      from { opacity: 0; transform: scale(0.9) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    #ag-header {
      background: linear-gradient(135deg, #0d1117, #1c2333);
      padding: 1rem 1.2rem;
      display: flex; align-items: center; gap: 0.8rem;
      border-bottom: 1px solid rgba(201,168,76,0.15);
    }
    #ag-header-avatar {
      width: 38px; height: 38px;
      background: linear-gradient(135deg, #c9a84c, #e8d08a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
    }
    #ag-header-info strong { display: block; font-size: 0.9rem; color: #e6edf3; font-family: 'Playfair Display', serif; }
    #ag-header-info span { font-size: 0.72rem; color: #c9a84c; }
    #ag-status { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.2rem; }
    #ag-status-dot { width: 7px; height: 7px; background: #2ecc71; border-radius: 50%; animation: ag-blink 1.5s infinite; }
    @keyframes ag-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
    #ag-close {
      margin-left: auto; background: none; border: none;
      color: #8b949e; cursor: pointer; font-size: 1.1rem; padding: 0.2rem;
      transition: color 0.2s;
    }
    #ag-close:hover { color: #c9a84c; }
    #ag-messages {
      flex: 1; overflow-y: auto; padding: 1rem;
      display: flex; flex-direction: column; gap: 0.8rem;
      scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.3) transparent;
    }
    .ag-msg {
      max-width: 85%;
      padding: 0.7rem 1rem;
      border-radius: 12px;
      font-size: 0.84rem;
      line-height: 1.6;
      animation: ag-msg-in 0.2s ease;
    }
    @keyframes ag-msg-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .ag-bot {
      background: #1c2333;
      color: #e6edf3;
      border: 1px solid rgba(201,168,76,0.1);
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .ag-user {
      background: rgba(201,168,76,0.15);
      color: #e6edf3;
      border: 1px solid rgba(201,168,76,0.2);
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .ag-typing { display: flex; gap: 4px; align-items: center; padding: 0.7rem 1rem; }
    .ag-typing span {
      width: 7px; height: 7px; background: #c9a84c; border-radius: 50%;
      animation: ag-dot 1.2s infinite;
    }
    .ag-typing span:nth-child(2) { animation-delay: 0.2s; }
    .ag-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ag-dot { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-5px);opacity:1} }
    #ag-suggestions {
      display: flex; flex-wrap: wrap; gap: 0.4rem;
      padding: 0.5rem 1rem;
      border-top: 1px solid rgba(201,168,76,0.1);
    }
    .ag-sugg {
      background: transparent;
      border: 1px solid rgba(201,168,76,0.25);
      color: #c9a84c;
      padding: 0.3rem 0.7rem;
      border-radius: 20px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Inter', sans-serif;
    }
    .ag-sugg:hover { background: rgba(201,168,76,0.1); }
    #ag-input-zone {
      display: flex; gap: 0.5rem;
      padding: 0.8rem 1rem;
      border-top: 1px solid rgba(201,168,76,0.15);
      background: #0d1117;
    }
    #ag-input {
      flex: 1;
      background: #1c2333;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 8px;
      padding: 0.6rem 0.9rem;
      color: #e6edf3;
      font-size: 0.84rem;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }
    #ag-input:focus { border-color: #c9a84c; }
    #ag-send {
      background: #c9a84c;
      border: none;
      border-radius: 8px;
      width: 36px; height: 36px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    #ag-send:hover { background: #e8d08a; }
    @media(max-width:400px) {
      #ag-box { width: calc(100vw - 2rem); right: 1rem; }
      #ag-bubble { right: 1rem; }
    }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var html = `
    <div id="ag-bubble">
      <div id="ag-box">
        <div id="ag-header">
          <div id="ag-header-avatar">🎓</div>
          <div id="ag-header-info">
            <strong>Conseiller Alfred Gory</strong>
            <div id="ag-status">
              <div id="ag-status-dot"></div>
              <span style="font-size:0.7rem;color:#8b949e;">En ligne — répond instantanément</span>
            </div>
          </div>
          <button id="ag-close" onclick="agToggle()">✕</button>
        </div>
        <div id="ag-messages"></div>
        <div id="ag-suggestions">
          <button class="ag-sugg" onclick="agSend('Quelles formations proposez-vous ?')">Nos formations</button>
          <button class="ag-sugg" onclick="agSend('Comment financer ma formation ?')">Financement CPF</button>
          <button class="ag-sugg" onclick="agSend('Comment vous contacter ?')">Nous contacter</button>
        </div>
        <div id="ag-input-zone">
          <input id="ag-input" type="text" placeholder="Posez votre question..." />
          <button id="ag-send" onclick="agEnvoyer()">➤</button>
        </div>
      </div>
      <div id="ag-avatar" onclick="agToggle()">
        🎓
        <div id="ag-notif">1</div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  var ouvert = false;
  var premier = true;

  window.agToggle = function() {
    ouvert = !ouvert;
    var box = document.getElementById('ag-box');
    var notif = document.getElementById('ag-notif');
    if (ouvert) {
      box.classList.add('ouvert');
      notif.style.display = 'none';
      if (premier) {
        premier = false;
        setTimeout(function() {
          agAjouter('bot', 'Bonjour ! 👋 Je suis votre conseiller en formation chez <strong>Cabinet Alfred Gory</strong>.<br><br>Je peux vous renseigner sur nos formations, les financements CPF/OPCO, les prérequis et bien plus encore.<br><br>Comment puis-je vous aider ?');
        }, 400);
      }
    } else {
      box.classList.remove('ouvert');
    }
  };

  function agAjouter(type, texte) {
    var msgs = document.getElementById('ag-messages');
    var div = document.createElement('div');
    div.className = 'ag-msg ag-' + type;
    div.innerHTML = texte;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function agTyping(cb) {
    var msgs = document.getElementById('ag-messages');
    var t = document.createElement('div');
    t.className = 'ag-msg ag-bot ag-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    t.id = 'ag-typing';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    var delay = 800 + Math.random() * 700;
    setTimeout(function() {
      var el = document.getElementById('ag-typing');
      if (el) el.remove();
      cb();
    }, delay);
  }

  window.agSend = function(msg) {
    document.getElementById('ag-input').value = msg;
    agEnvoyer();
  };

  window.agEnvoyer = function() {
    var input = document.getElementById('ag-input');
    var msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    agAjouter('user', msg);
    agTyping(function() {
      var rep = scores(msg);
      agAjouter('bot', formatMsg(rep));
    });
  };

  document.getElementById('ag-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') agEnvoyer();
  });

  // Message d'accueil après 4 secondes
  setTimeout(function() {
    if (!ouvert) {
      var notif = document.getElementById('ag-notif');
      notif.style.display = 'flex';
    }
  }, 4000);

})();
