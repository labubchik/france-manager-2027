var FM = (globalThis.FM = globalThis.FM || {});

// Pays avec dirigeant parodié. Le drapeau et le nom du pays sont toujours affichés.
FM.COUNTRIES = {
  US: { name: 'États-Unis', flag: '🇺🇸', leader: 'Donald Tromp', nuclear: true, startRelation: 10 },
  RU: { name: 'Russie', flag: '🇷🇺', leader: 'Vladimir Poutrine', nuclear: true, startRelation: -60 },
  CN: { name: 'Chine', flag: '🇨🇳', leader: 'Xi Jin-Ping-Pong', nuclear: true, startRelation: 0 },
  SA: { name: 'Arabie saoudite', flag: '🇸🇦', leader: 'Mohammed ben Salami', nuclear: false, startRelation: 30 },
  IR: { name: 'Iran', flag: '🇮🇷', leader: 'Ali Khamenouille', nuclear: false, startRelation: -50 },
  IL: { name: 'Israël', flag: '🇮🇱', leader: 'Benyamin Netanyahouuu', nuclear: true, startRelation: 0 },
  UA: { name: 'Ukraine', flag: '🇺🇦', leader: 'Volodymyr Zélenskeur', nuclear: false, startRelation: 50 },
  DE: { name: 'Allemagne', flag: '🇩🇪', leader: 'Friedrich Merzi-Beaucoup', nuclear: false, startRelation: 50 },
  IT: { name: 'Italie', flag: '🇮🇹', leader: 'Giorgia Melonade', nuclear: false, startRelation: 20 },
  GB: { name: 'Royaume-Uni', flag: '🇬🇧', leader: 'Keir Starmère', nuclear: true, startRelation: 30 },
  DZ: { name: 'Algérie', flag: '🇩🇿', leader: 'Abdelmadjid Tebboum', nuclear: false, startRelation: -30 },
  IN: { name: 'Inde', flag: '🇮🇳', leader: 'Narendra Modidi', nuclear: true, startRelation: 40 },
  PK: { name: 'Pakistan', flag: '🇵🇰', leader: 'Shehbaz Sharifou', nuclear: true, startRelation: 0 },
  KP: { name: 'Corée du Nord', flag: '🇰🇵', leader: 'Kim Jong-Hon', nuclear: true, startRelation: -40 }
};
