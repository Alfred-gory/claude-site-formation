// Assistant IA — Cabinet Alfred Gory
(function() {

  var knowledge = [
    {
      tags: ['bonjour','salut','hello','bonsoir','bjr','coucou','hey'],
      rep: ["Bonjour et bienvenue chez Cabinet Alfred Gory. Je suis votre conseiller formation. Comment puis-je vous aider ?", "Bonjour ! Ravi de vous accueillir. Vous souhaitez des informations sur nos formations ?"]
    },
    {
      tags: ['formation','formations','catalogue','proposez','offre','avez'],
      rep: ["Nous proposons des formations professionnelles en :\n\n— Gestion de la paie (35h)\n— Maîtrise de Silae (21h)\n— Droit social pratique (21h)\n— Recrutement & RH (14h)\n\nToutes sont dispensables en ligne, en présentiel à Taverny ou en intra-entreprise. Laquelle vous intéresse ?"]
    },
    {
      tags: ['paie','bulletin','salaire','bulletins','paye'],
      rep: ["Notre formation **Gestion de la paie** (35h) couvre :\n\n— Droit du travail appliqué\n— Calcul des cotisations\n— Bulletins de paie\n— DSN\n\nÉligible CPF et finançable OPCO. Voulez-vous plus d'informations ?"]
    },
    {
      tags: ['silae','logiciel','mysilae','software'],
      rep: ["Notre formation **Maîtrise de Silae** (21h) vous rend autonome sur le logiciel n°1 de paie en France :\n\n— Paramétrage dossier\n— Gestion des salariés\n— Production des bulletins\n— DSN avec Silae\n\nÉligible CPF. Des questions ?"]
    },
    {
      tags: ['recrutement','rh','recruter','embauche','contrat','embaucher'],
      rep: ["Notre formation **Recrutement & RH** (14h) couvre :\n\n— Processus de recrutement\n— Rédaction des contrats\n— Gestion des absences\n— Entretiens professionnels\n\nParfaite pour les assistants RH et managers."]
    },
    {
      tags: ['droit','social','juridique','licenciement','prud','contentieux','rupture'],
      rep: ["Notre formation **Droit social pratique** (21h) sécurise vos pratiques :\n\n— Relations individuelles de travail\n— Rupture du contrat (licenciement, rupture conventionnelle)\n— Gestion des litiges\n— Veille réglementaire\n\nCette formation ne remplace pas un conseil juridique individualisé."]
    },
    {
      tags: ['cpf','financement','financer','prendre en charge','opco','pris en charge','gratuit','coût','cout','prix','tarif'],
      rep: ["Toutes nos formations sont :\n\n— Éligibles au CPF (Compte Personnel de Formation)\n— Finançables par votre OPCO\n— Éligibles au plan de développement des compétences\n\nContactez-nous pour vérifier votre éligibilité et obtenir un devis personnalisé."]
    },
    {
      tags: ['durée','duree','temps','heures','combien','long'],
      rep: ["Durées de nos formations :\n\n— Gestion de la paie : 35h\n— Maîtrise de Silae : 21h\n— Recrutement & RH : 14h\n— Droit social : 21h\n\nFormats disponibles : en ligne, présentiel (Taverny 95), intra-entreprise."]
    },
    {
      tags: ['ligne','distance','distanciel','télé','domicile','chez moi','online'],
      rep: ["Oui, toutes nos formations sont disponibles **en ligne** !\n\nVous suivez les cours :\n\n— Depuis chez vous, à votre rythme\n— Sur ordinateur, tablette ou mobile\n— Avec l'accompagnement d'un formateur expert\n\nNous proposons aussi des sessions en présentiel à Taverny (95) et en intra-entreprise."]
    },
    {
      tags: ['presentiel','présentiel','locaux','taverny','classe','salle'],
      rep: ["Nous proposons des formations **en présentiel** dans nos locaux à Taverny (Val-d'Oise, 95), en classe de 8 personnes maximum.\n\nCela garantit un suivi personnalisé et une interaction directe avec le formateur. Intéressé par le présentiel ?"]
    },
    {
      tags: ['intra','entreprise','sur site','chez nous','nos locaux'],
      rep: ["Nous intervenons également **en intra-entreprise** : le formateur se déplace dans vos locaux pour former vos équipes.\n\nIdéal pour les formations sur mesure adaptées à vos outils et pratiques internes. Contactez-nous pour un devis."]
    },
    {
      tags: ['prérequis','prerequis','niveau','débutant','débutante','départ','zéro','base'],
      rep: ["La plupart de nos formations sont accessibles aux débutants !\n\n— Gestion de la paie : niveau Bac, aucune expérience requise\n— Silae : notions de paie recommandées\n— Recrutement RH : aucune expérience requise\n\nQuelle formation vous intéresse ?"]
    },
    {
      tags: ['contact','contacter','joindre','appeler','email','mail','téléphone'],
      rep: ["Vous pouvez nous contacter par email : **formation@alfred-gory.fr**\n\nOu remplissez le formulaire de contact en bas de page — nous vous répondons sous 48h."]
    },
    {
      tags: ['inscrire','inscription','rejoindre','commencer','démarrer'],
      rep: ["Pour vous inscrire, c'est simple :\n\n1. Remplissez le formulaire de contact\n2. Nous vous rappelons sous 48h\n3. Nous identifions ensemble le meilleur financement\n4. La formation commence\n\nSouhaitez-vous accéder au formulaire ?"]
    },
    {
      tags: ['qualiopi','certification','certifié','agréé','qualité','reconnaissance'],
      rep: ["Cabinet Alfred Gory est **certifié Qualiopi**, le référentiel national qualité des organismes de formation, reconnu par le Ministère du Travail.\n\nNos formations sont réalisées conformément aux articles L.6311-1 et suivants du Code du travail."]
    },
    {
      tags: ['attestation','certificat','diplôme'],
      rep: ["À l'issue de chaque formation, une **attestation de formation** est délivrée conformément à l'article L.6353-1 du Code du travail.\n\nElle précise la nature, la durée, les objectifs et les résultats de la formation."]
    },
    {
      tags: ['merci','super','parfait','top','excellent','génial','cool','bravo'],
      rep: ["Merci ! N'hésitez pas si vous avez d'autres questions.", "Avec plaisir ! Je reste disponible pour toute information sur nos formations."]
    },
    {
      tags: ['au revoir','bye','bonne journée','bonne soirée','à bientôt','tchao'],
      rep: ["Au revoir et à bientôt ! Toute l'équipe Cabinet Alfred Gory reste à votre disposition.", "Bonne journée ! N'hésitez pas à revenir."]
    }
  ];

  var defaultRep = [
    "Je ne suis pas sûr de comprendre votre question. Pouvez-vous reformuler ?\n\nVous pouvez me demander par exemple : *'Quelles formations proposez-vous ?'* ou *'Comment financer ma formation ?'*\n\nPour toute autre question : **formation@alfred-gory.fr**",
    "Je n'ai pas bien compris votre demande. N'hésitez pas à reformuler !\n\nJe peux vous renseigner sur nos formations, les durées, les prérequis et le financement CPF/OPCO.\n\nContactez-nous directement : **formation@alfred-gory.fr**"
  ];

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

  function formatMsg(texte) {
    return texte
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  var svgSend = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  var svgAG = '<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" fill="rgba(201,168,76,0.9)"/><path d="M6 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="rgba(201,168,76,0.9)" stroke-width="2.5" stroke-linecap="round"/></svg>';
  var svgAGlg = '<svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="7" fill="#1e3a5f"/><path d="M6 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#1e3a5f" stroke-width="2.5" stroke-linecap="round"/></svg>';

  var css = `
    #ag-bubble {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 99999;
      display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;
      font-family: 'Inter', -apple-system, sans-serif;
    }
    #ag-avatar {
      width: 60px; height: 60px;
      background: linear-gradient(135deg, #c9a84c 0%, #e8d08a 60%, #c9a84c 100%);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(201,168,76,0.45), 0 0 0 0 rgba(201,168,76,0.4);
      animation: ag-pulse 3s ease-in-out infinite;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 2px solid rgba(255,255,255,0.25);
    }
    #ag-avatar:hover { transform: scale(1.07); box-shadow: 0 6px 28px rgba(201,168,76,0.55); }
    #ag-notif {
      position: absolute; top: -3px; right: -3px;
      width: 18px; height: 18px;
      background: #e74c3c; border-radius: 50%;
      border: 2px solid #fff;
      display: none; align-items: center; justify-content: center;
      font-size: 0.6rem; color: #fff; font-weight: 800;
    }
    @keyframes ag-pulse {
      0%,100% { box-shadow: 0 4px 20px rgba(201,168,76,0.4), 0 0 0 0 rgba(201,168,76,0.3); }
      50% { box-shadow: 0 4px 24px rgba(201,168,76,0.5), 0 0 0 10px rgba(201,168,76,0); }
    }
    #ag-box {
      width: 345px;
      background: rgba(13,17,23,0.97);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(201,168,76,0.22);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
      display: none;
      flex-direction: column;
      max-height: 520px;
      transform-origin: bottom right;
    }
    #ag-box.ouvert { display: flex; animation: ag-open 0.25s cubic-bezier(0.34,1.56,0.64,1); }
    @keyframes ag-open {
      from { opacity: 0; transform: scale(0.88) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    #ag-header {
      background: linear-gradient(135deg, #0a0f16 0%, #111827 100%);
      padding: 1rem 1.1rem 0.9rem;
      display: flex; align-items: center; gap: 0.75rem;
      border-bottom: 1px solid rgba(201,168,76,0.12);
      position: relative;
    }
    #ag-header::after {
      content: ''; position: absolute; bottom: 0; left: 1.1rem; right: 1.1rem;
      height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
    }
    #ag-header-avatar {
      width: 36px; height: 36px; flex-shrink: 0;
      background: linear-gradient(135deg, #c9a84c, #e8d08a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }
    #ag-header-info { flex: 1; min-width: 0; }
    #ag-header-info strong { display: block; font-size: 0.88rem; color: #e6edf3; font-weight: 600; letter-spacing: 0.01em; }
    #ag-status { display: flex; align-items: center; gap: 0.35rem; margin-top: 0.18rem; }
    #ag-status-dot { width: 6px; height: 6px; background: #2ecc71; border-radius: 50%; flex-shrink: 0; animation: ag-blink 2s ease-in-out infinite; }
    @keyframes ag-blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    #ag-status span { font-size: 0.68rem; color: #6e7681; }
    #ag-close {
      margin-left: auto; background: none; border: none; flex-shrink: 0;
      color: #6e7681; cursor: pointer; font-size: 1rem; padding: 0.25rem 0.3rem;
      border-radius: 6px; transition: color 0.2s, background 0.2s; line-height: 1;
    }
    #ag-close:hover { color: #c9a84c; background: rgba(201,168,76,0.08); }
    #ag-messages {
      flex: 1; overflow-y: auto; padding: 1rem;
      display: flex; flex-direction: column; gap: 0.75rem;
      scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.2) transparent;
    }
    #ag-messages::-webkit-scrollbar { width: 4px; }
    #ag-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 4px; }
    .ag-msg {
      max-width: 86%; padding: 0.65rem 0.95rem;
      border-radius: 14px; font-size: 0.83rem; line-height: 1.65;
      animation: ag-msg-in 0.2s ease;
    }
    @keyframes ag-msg-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
    .ag-bot {
      background: rgba(28,35,50,0.9); color: #d1d9e6;
      border: 1px solid rgba(201,168,76,0.08);
      align-self: flex-start; border-bottom-left-radius: 4px;
    }
    .ag-user {
      background: linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.1));
      color: #e6edf3; border: 1px solid rgba(201,168,76,0.18);
      align-self: flex-end; border-bottom-right-radius: 4px;
    }
    .ag-typing {
      display: flex; gap: 5px; align-items: center;
      padding: 0.7rem 1rem; background: rgba(28,35,50,0.9);
      border: 1px solid rgba(201,168,76,0.08);
      max-width: 70px; border-radius: 14px; border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .ag-typing span {
      width: 6px; height: 6px; background: rgba(201,168,76,0.7); border-radius: 50%;
      animation: ag-dot 1.3s ease-in-out infinite;
    }
    .ag-typing span:nth-child(2) { animation-delay: 0.18s; }
    .ag-typing span:nth-child(3) { animation-delay: 0.36s; }
    @keyframes ag-dot { 0%,100%{transform:translateY(0);opacity:0.35} 50%{transform:translateY(-5px);opacity:1} }
    #ag-suggestions {
      display: flex; flex-wrap: wrap; gap: 0.4rem;
      padding: 0.6rem 1rem 0.5rem;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .ag-sugg {
      background: transparent; border: 1px solid rgba(201,168,76,0.22);
      color: rgba(201,168,76,0.85); padding: 0.28rem 0.65rem;
      border-radius: 20px; font-size: 0.74rem; cursor: pointer;
      transition: all 0.18s; font-family: inherit;
    }
    .ag-sugg:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.45); color: #c9a84c; }
    #ag-input-zone {
      display: flex; gap: 0.5rem; padding: 0.75rem 1rem;
      border-top: 1px solid rgba(255,255,255,0.05);
      background: rgba(5,8,12,0.5);
    }
    #ag-input {
      flex: 1; background: rgba(28,35,50,0.8);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 10px; padding: 0.58rem 0.9rem;
      color: #e6edf3; font-size: 0.83rem;
      font-family: inherit; outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    #ag-input::placeholder { color: #4d5566; }
    #ag-input:focus { border-color: rgba(201,168,76,0.5); background: rgba(28,35,50,1); }
    #ag-send {
      background: linear-gradient(135deg, #c9a84c, #b8922e);
      border: none; border-radius: 10px;
      width: 36px; height: 36px; flex-shrink: 0;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #0d1117; transition: opacity 0.2s, transform 0.15s;
    }
    #ag-send:hover { opacity: 0.88; transform: scale(1.05); }
    #ag-send:active { transform: scale(0.96); }
    @media(max-width:640px) {
      #ag-bubble { right: 0.75rem; bottom: 0.75rem; }
      #ag-box { width: calc(100vw - 1.5rem); max-height: 72vh; border-radius: 16px; }
      #ag-avatar { width: 52px; height: 52px; }
      .ag-msg { font-size: 0.81rem; max-width: 90%; }
      #ag-suggestions { padding: 0.5rem 0.8rem; }
      .ag-sugg { font-size: 0.72rem; }
    }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var html = `
    <div id="ag-bubble">
      <div id="ag-box">
        <div id="ag-header">
          <div id="ag-header-avatar">${svgAGlg}</div>
          <div id="ag-header-info">
            <strong>Conseiller Cabinet Alfred Gory</strong>
            <div id="ag-status">
              <div id="ag-status-dot"></div>
              <span>En ligne — répond instantanément</span>
            </div>
          </div>
          <button id="ag-close" onclick="agToggle()" aria-label="Fermer">&#x2715;</button>
        </div>
        <div id="ag-messages"></div>
        <div id="ag-suggestions">
          <button class="ag-sugg" onclick="agSend('Quelles formations proposez-vous ?')">Formations</button>
          <button class="ag-sugg" onclick="agSend('Comment financer ma formation ?')">Financement CPF</button>
          <button class="ag-sugg" onclick="agSend('Présentiel ou en ligne ?')">Modalités</button>
          <button class="ag-sugg" onclick="agSend('Comment vous contacter ?')">Contact</button>
        </div>
        <div id="ag-input-zone">
          <input id="ag-input" type="text" placeholder="Posez votre question..." autocomplete="off" />
          <button id="ag-send" onclick="agEnvoyer()" aria-label="Envoyer">${svgSend}</button>
        </div>
      </div>
      <div id="ag-avatar" onclick="agToggle()" role="button" aria-label="Ouvrir le conseiller">
        ${svgAGlg}
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
          agAjouter('bot', 'Bonjour ! Je suis votre conseiller formation chez <strong>Cabinet Alfred Gory</strong>.<br><br>Je peux vous renseigner sur nos formations, les modalités (en ligne, présentiel, intra-entreprise), les financements CPF et OPCO, et bien plus.<br><br>Comment puis-je vous aider ?');
        }, 350);
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
    t.className = 'ag-typing';
    t.id = 'ag-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    var delay = 750 + Math.random() * 600;
    setTimeout(function() {
      var el = document.getElementById('ag-typing');
      if (el) el.remove();
      cb();
    }, delay);
  }

  window.agSend = function(msg) {
    if (!ouvert) agToggle();
    setTimeout(function() {
      document.getElementById('ag-input').value = msg;
      agEnvoyer();
    }, ouvert ? 0 : 400);
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

  document.addEventListener('DOMContentLoaded', function() {
    var inp = document.getElementById('ag-input');
    if (inp) inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') agEnvoyer();
    });
  });

  // Notification après 5 secondes si pas encore ouvert
  setTimeout(function() {
    if (!ouvert) {
      var notif = document.getElementById('ag-notif');
      if (notif) { notif.style.display = 'flex'; }
    }
  }, 5000);

})();
