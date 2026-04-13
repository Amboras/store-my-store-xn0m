// ─── Types ───────────────────────────────────────────────────────────────────

export type Bowl = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  memberCount: number;
  color: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  city: string;
  size: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
};

export type Post = {
  id: string;
  title: string;
  body: string;
  author: string;       // always anonymous alias
  company: string;
  companySlug: string;
  bowl: string;
  bowlSlug: string;
  likes: number;
  comments: number;
  views: number;
  timeAgo: string;
  tags: string[];
  isPinned?: boolean;
  isHot?: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  author: string;
  company: string;
  body: string;
  likes: number;
  timeAgo: string;
  replies?: Comment[];
};

export type SalaryEntry = {
  id: string;
  company: string;
  companySlug: string;
  title: string;
  level: string;
  city: string;
  yearsExp: number;
  baseSalary: number;   // en MAD/mois
  bonus: number;        // en MAD/an
  totalComp: number;    // en MAD/an
  currency: string;
  timeAgo: string;
};

// ─── Bowls (topics / catégories) ─────────────────────────────────────────────

export const BOWLS: Bowl[] = [
  {
    id: "b1",
    name: "Tech & Ingénierie",
    slug: "tech-ingenierie",
    icon: "💻",
    description: "Dev, DevOps, architecture, cloud…",
    memberCount: 12400,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "b2",
    name: "Finance & Banque",
    slug: "finance-banque",
    icon: "🏦",
    description: "Banking, fintech, marchés financiers",
    memberCount: 8700,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "b3",
    name: "Salaires & TC",
    slug: "salaires",
    icon: "💰",
    description: "Comp & Ben, négociation, benchmarks",
    memberCount: 22100,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "b4",
    name: "Offshoring & BPO",
    slug: "offshoring-bpo",
    icon: "🌐",
    description: "Centres d'appels, outsourcing, multinationales",
    memberCount: 15600,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "b5",
    name: "Startups & Entrepreneuriat",
    slug: "startups",
    icon: "🚀",
    description: "Ecosystème startup Maroc, levée de fonds",
    memberCount: 6300,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "b6",
    name: "Carrière & Recrutement",
    slug: "carriere-recrutement",
    icon: "📋",
    description: "CV, entretiens, promotions, licenciements",
    memberCount: 31000,
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "b7",
    name: "Vie au Bureau",
    slug: "vie-bureau",
    icon: "🏢",
    description: "Culture d'entreprise, management, RH",
    memberCount: 18900,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "b8",
    name: "Immigration & Expatriation",
    slug: "immigration-expat",
    icon: "✈️",
    description: "Visa, départ à l'étranger, retour au Maroc",
    memberCount: 9200,
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "b9",
    name: "Formation & Écoles",
    slug: "formation-ecoles",
    icon: "🎓",
    description: "Grandes écoles, universités, certifications",
    memberCount: 7800,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "b10",
    name: "Témoignages & Rants",
    slug: "temoignages",
    icon: "🔥",
    description: "Expériences vécues, coups de gueule anonymes",
    memberCount: 41500,
    color: "bg-red-100 text-red-700",
  },
];

// ─── Companies marocaines ─────────────────────────────────────────────────────

export const COMPANIES: Company[] = [
  {
    id: "c1",
    name: "OCP Group",
    slug: "ocp-group",
    logo: "🪨",
    industry: "Mines & Chimie",
    city: "Casablanca",
    size: "50 000+",
    rating: 3.8,
    reviewCount: 412,
    description: "Leader mondial du phosphate, fleuron de l'industrie marocaine.",
    tags: ["phosphate", "chimie", "industrie", "international"],
  },
  {
    id: "c2",
    name: "Maroc Telecom",
    slug: "maroc-telecom",
    logo: "📡",
    industry: "Télécommunications",
    city: "Rabat",
    size: "10 000+",
    rating: 3.5,
    reviewCount: 287,
    description: "Opérateur historique des télécommunications au Maroc.",
    tags: ["telecom", "4G", "IT", "réseau"],
  },
  {
    id: "c3",
    name: "Attijariwafa Bank",
    slug: "attijariwafa-bank",
    logo: "🏦",
    industry: "Banque & Finance",
    city: "Casablanca",
    size: "25 000+",
    rating: 3.7,
    reviewCount: 534,
    description: "Premier groupe bancaire du Maroc, présent dans 25 pays africains.",
    tags: ["banque", "finance", "afrique", "digital"],
  },
  {
    id: "c4",
    name: "CIH Bank",
    slug: "cih-bank",
    logo: "🏗️",
    industry: "Banque",
    city: "Casablanca",
    size: "5 000+",
    rating: 3.6,
    reviewCount: 198,
    description: "Banque orientée immobilier et digital au Maroc.",
    tags: ["banque", "immobilier", "digital", "fintech"],
  },
  {
    id: "c5",
    name: "Capgemini Maroc",
    slug: "capgemini-maroc",
    logo: "💼",
    industry: "Conseil & IT",
    city: "Casablanca",
    size: "3 000+",
    rating: 3.9,
    reviewCount: 321,
    description: "Centre offshore de Capgemini, axé sur les technologies digitales.",
    tags: ["offshore", "conseil", "IT", "digital"],
  },
  {
    id: "c6",
    name: "Intelcia",
    slug: "intelcia",
    logo: "🎧",
    industry: "BPO & Offshoring",
    city: "Casablanca",
    size: "20 000+",
    rating: 3.2,
    reviewCount: 876,
    description: "Leader africain de l'outsourcing et de l'expérience client.",
    tags: ["BPO", "call center", "outsourcing", "CRC"],
  },
  {
    id: "c7",
    name: "Société Générale Maroc",
    slug: "societe-generale-maroc",
    logo: "🔴",
    industry: "Banque",
    city: "Casablanca",
    size: "5 500+",
    rating: 3.4,
    reviewCount: 244,
    description: "Filiale du groupe français Société Générale au Maroc.",
    tags: ["banque", "france", "filiale", "corporate"],
  },
  {
    id: "c8",
    name: "OrangeMaroc",
    slug: "orange-maroc",
    logo: "🟠",
    industry: "Télécommunications",
    city: "Casablanca",
    size: "2 000+",
    rating: 3.6,
    reviewCount: 167,
    description: "Troisième opérateur télécom du Maroc.",
    tags: ["telecom", "mobile", "internet", "corporate"],
  },
  {
    id: "c9",
    name: "Lydec",
    slug: "lydec",
    logo: "⚡",
    industry: "Services & Utilities",
    city: "Casablanca",
    size: "4 500+",
    rating: 3.3,
    reviewCount: 155,
    description: "Délégataire des services d'eau, d'assainissement et d'électricité de Casablanca.",
    tags: ["utilities", "eau", "electricite", "service-public"],
  },
  {
    id: "c10",
    name: "BMCE Bank of Africa",
    slug: "bmce-bank",
    logo: "🌍",
    industry: "Banque",
    city: "Casablanca",
    size: "10 000+",
    rating: 3.5,
    reviewCount: 312,
    description: "Banque panafricaine avec une forte présence continentale.",
    tags: ["banque", "afrique", "international", "finance"],
  },
  {
    id: "c11",
    name: "Sofrecom Maroc",
    slug: "sofrecom-maroc",
    logo: "📶",
    industry: "Télécommunications & IT",
    city: "Casablanca",
    size: "800+",
    rating: 4.1,
    reviewCount: 89,
    description: "Filiale d'Orange dédiée au conseil en télécoms et digital.",
    tags: ["telecom", "conseil", "IT", "innovation"],
  },
  {
    id: "c12",
    name: "OBM (Offshoring Business in Morocco)",
    slug: "obm",
    logo: "🌐",
    industry: "BPO & IT",
    city: "Rabat",
    size: "500+",
    rating: 3.8,
    reviewCount: 72,
    description: "Centre offshore multiclients basé à Rabat Technopolis.",
    tags: ["offshore", "IT", "BPO", "technopolis"],
  },
];

// ─── Posts ────────────────────────────────────────────────────────────────────

export const POSTS: Post[] = [
  {
    id: "p1",
    title: "Ingénieur senior OCP vs Capgemini — lequel choisir ?",
    body: `Je reçois deux offres en même temps et je ne sais pas quoi choisir. OCP m'offre 18 000 MAD/mois avec des avantages en nature (logement, voiture), mais le poste est à Jorf Lasfar. Capgemini Casablanca propose 22 000 MAD mais c'est offshore, culture corporate, pas de bonus garanti. J'ai 5 ans d'exp en Java/Spring. \n\nQuelqu'un a de l'expérience dans l'une de ces boîtes ? Quelles sont les perspectives d'évolution ?`,
    author: "GoldenMine_Dev",
    company: "OCP Group",
    companySlug: "ocp-group",
    bowl: "Salaires & TC",
    bowlSlug: "salaires",
    likes: 142,
    comments: 67,
    views: 3200,
    timeAgo: "il y a 2h",
    tags: ["offre-emploi", "salaire", "OCP", "Capgemini"],
    isHot: true,
  },
  {
    id: "p2",
    title: "Licencié économiquement après 10 ans chez Intelcia — mon témoignage",
    body: `10 ans de bons et loyaux services, toujours bien évalué, jamais absent. Et un beau matin, RH m'appelle pour me dire que mon poste est supprimé dans le cadre d'une «restructuration». Indemnité légale uniquement, pas un MAD de plus. \n\nComment ils s'en tirent comme ça legalement ? Y'a-t-il des recours possibles ? Quelqu'un est passé par là ?`,
    author: "Anon_Intelcia_Vet",
    company: "Intelcia",
    companySlug: "intelcia",
    bowl: "Témoignages & Rants",
    bowlSlug: "temoignages",
    likes: 389,
    comments: 124,
    views: 8700,
    timeAgo: "il y a 5h",
    tags: ["licenciement", "droit-du-travail", "RH", "temoignage"],
    isHot: true,
    isPinned: true,
  },
  {
    id: "p3",
    title: "Salaire dev full-stack 3 ans d'exp à Casablanca — combien vous gagnez ?",
    body: `Je suis développeur full-stack React/Node, 3 ans d'exp, actuellement à 12 000 MAD brut. Mon manager dit que c'est «dans les normes du marché». Mais ça me semble low franchement.\n\nQuelqu'un peut partager son TC actuel ? Avec ou sans bonus ?`,
    author: "ReactDev_Casab",
    company: "Capgemini Maroc",
    companySlug: "capgemini-maroc",
    bowl: "Salaires & TC",
    bowlSlug: "salaires",
    likes: 276,
    comments: 98,
    views: 5600,
    timeAgo: "il y a 8h",
    tags: ["salaire", "dev", "React", "Node", "benchmark"],
    isHot: true,
  },
  {
    id: "p4",
    title: "Attijariwafa Digital — ambiance post-transformation digitale ?",
    body: `Ils recrutent pas mal en ce moment pour leur pôle digital. Quelqu'un a des infos sur la culture interne ? On entend beaucoup «transformation digitale» mais est-ce que c'est vraiment moderne en termes de stack technique et de méthodo de travail ?\n\nMerci pour vos retours honnêtes.`,
    author: "BankTech_Curious",
    company: "Attijariwafa Bank",
    companySlug: "attijariwafa-bank",
    bowl: "Tech & Ingénierie",
    bowlSlug: "tech-ingenierie",
    likes: 88,
    comments: 41,
    views: 2100,
    timeAgo: "il y a 1j",
    tags: ["attijariwafa", "digital", "banque", "stack"],
  },
  {
    id: "p5",
    title: "Comment négocier son salaire au Maroc sans se faire blacklister ?",
    body: `J'ai une offre à 15 000 MAD mais je veux demander 18 000. Le problème c'est que le milieu est petit, tout le monde se connait. \n\nComment vous gérez la négociation salariale au Maroc ? Des techniques qui ont marché pour vous ? Et comment éviter de brûler les ponts si la négo tourne mal ?`,
    author: "NegoPro_MA",
    company: "Maroc Telecom",
    companySlug: "maroc-telecom",
    bowl: "Carrière & Recrutement",
    bowlSlug: "carriere-recrutement",
    likes: 203,
    comments: 76,
    views: 4800,
    timeAgo: "il y a 1j",
    tags: ["négociation", "salaire", "recrutement", "conseils"],
  },
  {
    id: "p6",
    title: "Partir en France ou rester au Maroc ? Mon analyse après 2 offres",
    body: `J'ai une offre à Paris (fintech) à 45k€ brut/an et une offre à Casablanca (startup) à 25 000 MAD/mois. Après calcul du coût de la vie, pouvoir d'achat, qualité de vie… je suis plus aussi sûr que Paris soit la meilleure option.\n\nQuelqu'un a fait ce choix et peut me donner un retour d'expérience honnête ?`,
    author: "Dilemme_Casa_Paris",
    company: "Société Générale Maroc",
    companySlug: "societe-generale-maroc",
    bowl: "Immigration & Expatriation",
    bowlSlug: "immigration-expat",
    likes: 512,
    comments: 187,
    views: 14200,
    timeAgo: "il y a 2j",
    tags: ["expatriation", "France", "Maroc", "salaire", "qualité-de-vie"],
    isHot: true,
  },
  {
    id: "p7",
    title: "Mon manager s'attribue tout le travail en réunion — comment gérer ça ?",
    body: `Ça fait 6 mois que je livre des projets complexes et à chaque réunion avec la direction, mon manager présente tout comme si c'était son travail à lui. Quand je prends la parole pour préciser ma contribution, il me coupe. \n\nJ'ai pas envie de quitter la boîte (bonne ambiance avec les collègues, projet intéressant) mais cette situation me ronge. Des conseils ?`,
    author: "WorkerBee_Anonymous",
    company: "OCP Group",
    companySlug: "ocp-group",
    bowl: "Vie au Bureau",
    bowlSlug: "vie-bureau",
    likes: 334,
    comments: 92,
    views: 6300,
    timeAgo: "il y a 3j",
    tags: ["management", "toxique", "crédit", "carrière"],
  },
  {
    id: "p8",
    title: "Les grandes écoles marocaines vs universités françaises — le débat",
    body: `ENSA, EMI, ENSIAS vs Polytechnique, CentraleSupélec, INSA… En termes d'employabilité au Maroc, est-ce que l'école française vaut vraiment le coût et le sacrifice de quitter le pays ?\n\nJ'entends souvent que les boites marocaines préfèrent les diplômés locaux pour les top-postes. Votre avis ?`,
    author: "Ingenieur_Fier_MA",
    company: "Lydec",
    companySlug: "lydec",
    bowl: "Formation & Écoles",
    bowlSlug: "formation-ecoles",
    likes: 178,
    comments: 145,
    views: 7900,
    timeAgo: "il y a 4j",
    tags: ["grande-école", "diplôme", "ENSA", "France", "employabilité"],
  },
];

// ─── Salaires ─────────────────────────────────────────────────────────────────

export const SALARIES: SalaryEntry[] = [
  {
    id: "s1",
    company: "OCP Group",
    companySlug: "ocp-group",
    title: "Ingénieur Process",
    level: "Senior",
    city: "Jorf Lasfar",
    yearsExp: 6,
    baseSalary: 22000,
    bonus: 44000,
    totalComp: 308000,
    currency: "MAD",
    timeAgo: "il y a 1 mois",
  },
  {
    id: "s2",
    company: "Capgemini Maroc",
    companySlug: "capgemini-maroc",
    title: "Développeur Full-Stack",
    level: "Mid",
    city: "Casablanca",
    yearsExp: 3,
    baseSalary: 14000,
    bonus: 20000,
    totalComp: 188000,
    currency: "MAD",
    timeAgo: "il y a 3 semaines",
  },
  {
    id: "s3",
    company: "Attijariwafa Bank",
    companySlug: "attijariwafa-bank",
    title: "Analyste Risques",
    level: "Junior",
    city: "Casablanca",
    yearsExp: 2,
    baseSalary: 11000,
    bonus: 15000,
    totalComp: 147000,
    currency: "MAD",
    timeAgo: "il y a 2 mois",
  },
  {
    id: "s4",
    company: "Maroc Telecom",
    companySlug: "maroc-telecom",
    title: "Chef de Projet IT",
    level: "Senior",
    city: "Rabat",
    yearsExp: 8,
    baseSalary: 28000,
    bonus: 60000,
    totalComp: 396000,
    currency: "MAD",
    timeAgo: "il y a 1 mois",
  },
  {
    id: "s5",
    company: "Intelcia",
    companySlug: "intelcia",
    title: "Superviseur CRC",
    level: "Mid",
    city: "Casablanca",
    yearsExp: 4,
    baseSalary: 9000,
    bonus: 12000,
    totalComp: 120000,
    currency: "MAD",
    timeAgo: "il y a 6 semaines",
  },
  {
    id: "s6",
    company: "Société Générale Maroc",
    companySlug: "societe-generale-maroc",
    title: "Chargé d'Affaires Corporate",
    level: "Senior",
    city: "Casablanca",
    yearsExp: 7,
    baseSalary: 25000,
    bonus: 50000,
    totalComp: 350000,
    currency: "MAD",
    timeAgo: "il y a 2 semaines",
  },
  {
    id: "s7",
    company: "Capgemini Maroc",
    companySlug: "capgemini-maroc",
    title: "Architecte Cloud",
    level: "Lead",
    city: "Casablanca",
    yearsExp: 10,
    baseSalary: 35000,
    bonus: 80000,
    totalComp: 500000,
    currency: "MAD",
    timeAgo: "il y a 1 mois",
  },
  {
    id: "s8",
    company: "OCP Group",
    companySlug: "ocp-group",
    title: "Responsable RH",
    level: "Mid",
    city: "Casablanca",
    yearsExp: 5,
    baseSalary: 18000,
    bonus: 30000,
    totalComp: 246000,
    currency: "MAD",
    timeAgo: "il y a 3 mois",
  },
  {
    id: "s9",
    company: "OrangeMaroc",
    companySlug: "orange-maroc",
    title: "Ingénieur Réseau",
    level: "Mid",
    city: "Casablanca",
    yearsExp: 4,
    baseSalary: 16000,
    bonus: 25000,
    totalComp: 217000,
    currency: "MAD",
    timeAgo: "il y a 3 semaines",
  },
  {
    id: "s10",
    company: "Attijariwafa Bank",
    companySlug: "attijariwafa-bank",
    title: "Directeur d'Agence",
    level: "Lead",
    city: "Marrakech",
    yearsExp: 12,
    baseSalary: 32000,
    bonus: 75000,
    totalComp: 459000,
    currency: "MAD",
    timeAgo: "il y a 1 mois",
  },
];

// ─── Comments mock pour post p1 ───────────────────────────────────────────────

export const COMMENTS_P1: Comment[] = [
  {
    id: "cm1",
    postId: "p1",
    author: "PhosphateLife",
    company: "OCP Group",
    body: "J'ai fait 4 ans à Jorf Lasfar. Le salaire est correct mais l'isolement est réel. Si t'as une famille à Casa, c'est compliqué. Le logement de fonction compense un peu, mais la vie sociale est limitée.",
    likes: 48,
    timeAgo: "il y a 1h",
  },
  {
    id: "cm2",
    postId: "p1",
    author: "CapgeDev_Senior",
    company: "Capgemini Maroc",
    body: "Chez Capgemini tu peux facilement monter à 28k+ avec 5 ans d'exp si tu joues bien ta carte. Mais effectivement c'est offshore donc moins de visibility métier. Dépend de ton ambition long terme.",
    likes: 35,
    timeAgo: "il y a 45min",
    replies: [
      {
        id: "cm2r1",
        postId: "p1",
        author: "GoldenMine_Dev",
        company: "OCP Group",
        body: "C'est vrai qu'avec OCP j'aurais plus de visibility sur les process industriels. Merci pour le retour.",
        likes: 12,
        timeAgo: "il y a 30min",
      },
    ],
  },
  {
    id: "cm3",
    postId: "p1",
    author: "HRInsider_MA",
    company: "Attijariwafa Bank",
    body: "Compare aussi les avantages extra-salariaux : CNSS, assurance maladie complémentaire, transport, tickets resto. Chez OCP c'est souvent excellent sur ce plan.",
    likes: 29,
    timeAgo: "il y a 1h30",
  },
];

// ─── Stats de la communauté ───────────────────────────────────────────────────

export const COMMUNITY_STATS = {
  totalMembers: 48700,
  activeToday: 3200,
  postsThisWeek: 1840,
  companiesListed: 320,
};
