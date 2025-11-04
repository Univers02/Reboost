import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'en' | 'es';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);

type TranslationKeys = {
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    trustIndicator: string;
  };
  nav: {
    home: string;
    products: string;
    howItWorks: string;
    resources: string;
    about: string;
    contact: string;
    dashboard: string;
    loans: string;
    transfers: string;
    history: string;
    settings: string;
    logout: string;
  };
  dashboard: {
    welcome: string;
    currentBalance: string;
    activeLoans: string;
    totalBorrowed: string;
    availableCredit: string;
    lastUpdated: string;
    borrowingCapacity: string;
    canBorrowUpTo: string;
    quickActions: string;
    newLoan: string;
    transferFunds: string;
    transactionHistory: string;
    fees: string;
    pendingTransfers: string;
    availableFunds: string;
    upcomingRepayments: string;
  };
  loan: {
    amount: string;
    interestRate: string;
    nextPayment: string;
    viewAll: string;
  };
  transfer: {
    requestSubmitted: string;
    documentVerification: string;
    complianceCheck: string;
    approvalPending: string;
    transferComplete: string;
    pending: string;
    inProgress: string;
    approved: string;
    rejected: string;
  };
  fee: {
    type: string;
    reason: string;
    amount: string;
    date: string;
    downloadStatement: string;
    loanFees: string;
    transferFees: string;
    accountFees: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionText: string;
    stats: {
      clients: string;
      loansProvided: string;
      successRate: string;
      yearsExperience: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  products: {
    title: string;
    subtitle: string;
    termLoans: string;
    termLoansDesc: string;
    lineOfCredit: string;
    lineOfCreditDesc: string;
    equipmentFinancing: string;
    equipmentFinancingDesc: string;
    invoiceFactoring: string;
    invoiceFactoringDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  resources: {
    title: string;
    subtitle: string;
    faqTitle: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  legal: {
    termsTitle: string;
    privacyTitle: string;
    lastUpdated: string;
    terms: {
      section1Title: string;
      section1Content: string;
      section2Title: string;
      section2Content: string;
      section3Title: string;
      section3Content: string;
      section4Title: string;
      section4Content: string;
      section5Title: string;
      section5Content: string;
      section6Title: string;
      section6Content: string;
    };
    privacy: {
      section1Title: string;
      section1Content: string;
      section2Title: string;
      section2Content: string;
      section2List: string[];
      section3Title: string;
      section3Content: string;
      section3List: string[];
      section4Title: string;
      section4Content: string;
      section5Title: string;
      section5Content: string;
      section6Title: string;
      section6Content: string;
      section7Title: string;
      section7Content: string;
    };
  };
  individualLoans: {
    title: string;
    subtitle: string;
    personalLoan: string;
    personalLoanDesc: string;
    mortgageLoan: string;
    mortgageLoanDesc: string;
    autoLoan: string;
    autoLoanDesc: string;
    studentLoan: string;
    studentLoanDesc: string;
    greenLoan: string;
    greenLoanDesc: string;
    renovationLoan: string;
    renovationLoanDesc: string;
    amount: string;
    rate: string;
    duration: string;
    rateDisclaimer: string;
    compareLoans: string;
  };
  features: {
    title: string;
    subtitle: string;
    security: string;
    securityDesc: string;
    fast: string;
    fastDesc: string;
    competitive: string;
    competitiveDesc: string;
    flexible: string;
    flexibleDesc: string;
  };
  stats: {
    clients: string;
    funded: string;
    satisfaction: string;
    years: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  fr: {
    hero: {
      title: 'Réalisez vos projets avec ProLoan',
      subtitle: 'Solutions de financement pour particuliers et professionnels - Taux compétitifs et processus transparent',
      cta1: 'Demander un prêt',
      cta2: 'Mon espace',
      trustIndicator: 'Plus de 15 000 clients satisfaits nous font confiance',
    },
    nav: {
      home: 'Accueil',
      products: 'Nos Prêts',
      howItWorks: 'Comment ça marche',
      resources: 'Ressources',
      about: 'À propos',
      contact: 'Contact',
      dashboard: 'Tableau de bord',
      loans: 'Prêts',
      transfers: 'Transferts',
      history: 'Historique',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    dashboard: {
      welcome: 'Bienvenue',
      currentBalance: 'Solde actuel',
      activeLoans: 'Prêts actifs',
      totalBorrowed: 'Total emprunté',
      availableCredit: 'Crédit disponible',
      lastUpdated: 'Dernière mise à jour',
      borrowingCapacity: 'Capacité d\'emprunt',
      canBorrowUpTo: 'Vous pouvez emprunter jusqu\'à',
      quickActions: 'Actions rapides',
      newLoan: 'Nouveau prêt',
      transferFunds: 'Transférer des fonds',
      transactionHistory: 'Historique des transactions',
      fees: 'Frais',
      pendingTransfers: 'Transferts en attente',
      availableFunds: 'Fonds disponibles',
      upcomingRepayments: 'Remboursements à venir',
    },
    loan: {
      amount: 'Montant',
      interestRate: 'Taux d\'intérêt',
      nextPayment: 'Prochain paiement',
      viewAll: 'Voir tout',
    },
    transfer: {
      requestSubmitted: 'Demande soumise',
      documentVerification: 'Vérification des documents',
      complianceCheck: 'Contrôle de conformité',
      approvalPending: 'Approbation en attente',
      transferComplete: 'Transfert terminé',
      pending: 'En attente',
      inProgress: 'En cours',
      approved: 'Approuvé',
      rejected: 'Rejeté',
    },
    fee: {
      type: 'Type de frais',
      reason: 'Motif',
      amount: 'Montant',
      date: 'Date',
      downloadStatement: 'Télécharger le relevé',
      loanFees: 'Frais de prêt',
      transferFees: 'Frais de transfert',
      accountFees: 'Frais de compte',
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
    },
    about: {
      title: 'À propos de ProLoan',
      subtitle: 'Votre partenaire de confiance pour le financement des particuliers et professionnels',
      mission: 'Notre Mission',
      missionText: 'Chez ProLoan, nous démocratisons l\'accès au financement pour tous. Que vous soyez un particulier avec un projet personnel ou une entreprise en développement, nous proposons des solutions de crédit modernes, transparentes et adaptées à vos besoins. Notre technologie de pointe nous permet d\'analyser rapidement votre situation et de vous proposer des offres personnalisées avec des taux compétitifs. Nous croyons en la transparence totale : pas de frais cachés, des conditions claires et un accompagnement à chaque étape.',
      stats: {
        clients: 'Clients actifs',
        loansProvided: 'Prêts accordés',
        successRate: 'Taux de satisfaction',
        yearsExperience: 'Années d\'expérience',
      },
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Un processus 100% digital en 4 étapes simples',
      step1Title: 'Demande en ligne - 4 minutes',
      step1Desc: 'Remplissez notre formulaire sécurisé avec vos informations personnelles ou professionnelles. Pas besoin de déplacement, tout se fait en ligne avec vérification d\'identité instantanée (KYC) et téléchargement de documents simplifié.',
      step2Title: 'Analyse automatisée - 24-48h',
      step2Desc: 'Notre technologie d\'évaluation de crédit analyse votre profil financier, vos revenus et votre historique. Grâce à nos algorithmes avancés et l\'intégration aux bureaux de crédit, nous vous donnons une réponse de principe sous 48h maximum.',
      step3Title: 'Offre personnalisée transparente',
      step3Desc: 'Recevez votre offre de prêt avec toutes les informations : montant, taux APR, mensualités, durée, coût total du crédit. Aucun frais caché, conditions claires et possibilité de simuler différents scénarios avant d\'accepter.',
      step4Title: 'Déblocage rapide - 2 à 5 jours',
      step4Desc: 'Signature électronique de votre contrat et transfert automatique des fonds sur votre compte bancaire. Pour les prêts professionnels, possibilité de mise en place d\'un échéancier personnalisé adapté à votre trésorerie.',
    },
    products: {
      title: 'Nos Solutions de Prêts',
      subtitle: 'Des produits adaptés à vos besoins - Particuliers et Professionnels',
      termLoans: 'Prêts à Terme Professionnels',
      termLoansDesc: 'Financement à moyen et long terme pour vos investissements stratégiques : développement, acquisition, expansion. De 10 000€ à 500 000€ sur 1 à 7 ans. Taux fixes de 3,5% à 8,5% APR selon profil. Remboursement anticipé sans pénalité.',
      lineOfCredit: 'Ligne de Crédit Renouvelable',
      lineOfCreditDesc: 'Crédit flexible pour gérer votre trésorerie et faire face aux imprévus. De 5 000€ à 100 000€. Taux de 4,0% à 9,0% APR. Ne payez des intérêts que sur les sommes utilisées. Reconstitution automatique du capital disponible.',
      equipmentFinancing: 'Financement d\'Équipement',
      equipmentFinancingDesc: 'Financez vos équipements professionnels, véhicules utilitaires, machines, outils. De 20 000€ à 300 000€ sur 2 à 5 ans. Taux de 3,9% à 7,5% APR. L\'équipement peut servir de garantie, facilitant l\'obtention du prêt.',
      invoiceFactoring: 'Affacturage / Cession de Créances',
      invoiceFactoringDesc: 'Transformez vos factures clients en liquidités immédiates pour améliorer votre cash-flow. Avance jusqu\'à 90% du montant des factures sous 24-48h. Frais de 1% à 3% selon volume et délai. Idéal pour les entreprises B2B.',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est à votre écoute',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      send: 'Envoyer',
      success: 'Message envoyé avec succès',
      error: 'Erreur lors de l\'envoi du message',
    },
    resources: {
      title: 'Ressources',
      subtitle: 'Toutes les informations pour vous accompagner dans votre projet',
      faqTitle: 'Questions Fréquentes',
      faqs: [
        {
          question: 'Quels documents sont nécessaires pour une demande de prêt ?',
          answer: 'Pour les particuliers : pièce d\'identité, justificatif de domicile, derniers bulletins de salaire (3 mois), avis d\'imposition. Pour les professionnels : Kbis de moins de 3 mois, bilans et comptes de résultat (2 derniers exercices), relevés bancaires professionnels (3-6 mois), pièce d\'identité du dirigeant. Tous les documents sont téléchargeables directement en ligne de manière sécurisée.',
        },
        {
          question: 'Combien de temps prend le processus d\'approbation ?',
          answer: 'Notre technologie d\'évaluation automatisée vous donne une réponse de principe en 15 secondes à 48 heures maximum. Une fois votre dossier validé et complet, les fonds sont transférés sous 2 à 5 jours ouvrables. Pour les montants importants (>100 000€), comptez 5 à 7 jours pour une analyse approfondie.',
        },
        {
          question: 'Quel est le montant minimum et maximum que je peux emprunter ?',
          answer: 'Prêts personnels : de 1 000€ à 75 000€. Prêts immobiliers : de 50 000€ à 500 000€. Prêts professionnels à terme : de 10 000€ à 500 000€. Lignes de crédit : de 5 000€ à 100 000€. Le montant exact dépend de votre capacité de remboursement calculée selon vos revenus, charges et historique de crédit.',
        },
        {
          question: 'Puis-je rembourser mon prêt par anticipation ?',
          answer: 'Oui, tous nos prêts permettent le remboursement anticipé sans pénalité ni frais cachés. Vous pouvez rembourser partiellement ou totalement votre crédit à tout moment depuis votre espace client. Cela réduit automatiquement le coût total des intérêts. Vous gardez ainsi le contrôle total sur votre crédit.',
        },
        {
          question: 'Quels sont les critères d\'éligibilité pour un prêt ?',
          answer: 'Particuliers : être majeur, résider en France, avoir des revenus réguliers et un taux d\'endettement <40%. Professionnels : entreprise active depuis 6+ mois, chiffre d\'affaires mensuel minimum de 15 000€, pas de défaut de paiement récent. Le score de crédit est vérifié automatiquement via les bureaux de crédit (Experian, Equifax). Les dossiers sont étudiés au cas par cas.',
        },
        {
          question: 'Comment sont calculés les taux d\'intérêt ?',
          answer: 'Nos taux sont calculés par un algorithme qui analyse plusieurs facteurs : votre score de crédit, la durée du prêt, le montant emprunté, vos revenus et charges, votre historique de remboursement et la santé financière (pour les entreprises). Les taux varient de 3,5% à 9,0% APR selon le profil. Nos taux sont parmi les plus compétitifs du marché grâce à notre réseau de partenaires financiers.',
        },
        {
          question: 'Y a-t-il des frais de dossier ou frais cachés ?',
          answer: 'Transparence totale : nous affichons tous les frais dès la simulation. Frais de dossier : 0€ à 150€ selon le type de prêt. Pas de frais de remboursement anticipé. Pas de frais mensuels de gestion. Le TAEG (Taux Annuel Effectif Global) inclut tous les coûts pour une comparaison facile avec d\'autres offres.',
        },
        {
          question: 'Comment calculer ma capacité d\'emprunt ?',
          answer: 'Votre capacité d\'emprunt dépend de votre taux d\'endettement qui ne doit pas dépasser 40% de vos revenus nets. Formule : (Revenus mensuels × 0,40) - Charges de crédit existantes = Mensualité maximale disponible. Notre simulateur en ligne calcule automatiquement votre capacité d\'emprunt et vous propose des montants adaptés. Vous pouvez ajuster la durée pour moduler les mensualités.',
        },
        {
          question: 'Puis-je obtenir un prêt avec un score de crédit faible ?',
          answer: 'Oui, nous acceptons des profils variés. Notre technologie d\'évaluation analyse aussi des données alternatives au-delà du simple score de crédit : stabilité professionnelle, revenus récurrents, épargne, historique bancaire. Scores acceptés dès 500-560 pour certains produits. Même avec un historique imparfait, vous pouvez obtenir un prêt, mais les taux seront ajustés au risque.',
        },
        {
          question: 'Que se passe-t-il si je ne peux pas rembourser une mensualité ?',
          answer: 'Contactez-nous immédiatement. Nous proposons plusieurs solutions : report de mensualité (franchise temporaire), modulation à la baisse des échéances, rééchelonnement du prêt. Des pénalités de retard peuvent s\'appliquer mais nous privilégions toujours le dialogue pour trouver une solution adaptée à votre situation. Un accompagnement personnalisé est disponible en cas de difficultés.',
        },
      ],
    },
    legal: {
      termsTitle: 'Conditions d\'Utilisation',
      privacyTitle: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Janvier 2025',
      terms: {
        section1Title: '1. Acceptation des Conditions',
        section1Content: 'En accédant et en utilisant les services de ProLoan, vous acceptez et acceptez d\'être lié par les termes et dispositions de cet accord.',
        section2Title: '2. Licence d\'Utilisation',
        section2Content: 'L\'autorisation est accordée pour accéder temporairement aux matériaux (informations ou logiciels) sur la plateforme de ProLoan pour une visualisation personnelle et non commerciale uniquement.',
        section3Title: '3. Contrat de Prêt',
        section3Content: 'Tous les prêts sont soumis à l\'approbation de crédit. Les termes et conditions seront fournis dans un contrat de prêt séparé lors de l\'approbation de votre demande.',
        section4Title: '4. Déclarations et Garanties',
        section4Content: 'Vous déclarez et garantissez que toutes les informations fournies dans votre demande de prêt sont exactes, complètes et à jour.',
        section5Title: '5. Limitation de Responsabilité',
        section5Content: 'En aucun cas ProLoan ou ses fournisseurs ne seront responsables de tout dommage découlant de l\'utilisation ou de l\'impossibilité d\'utiliser les matériaux sur la plateforme de ProLoan.',
        section6Title: '6. Modifications',
        section6Content: 'ProLoan peut réviser ces conditions d\'utilisation à tout moment sans préavis. En utilisant cette plateforme, vous acceptez d\'être lié par la version actuelle de ces conditions.',
      },
      privacy: {
        section1Title: '1. Informations que Nous Collectons',
        section1Content: 'Nous collectons les informations que vous nous fournissez directement lorsque vous créez un compte, demandez un prêt ou communiquez avec nous. Cela peut inclure votre nom, adresse e-mail, numéro de téléphone, informations commerciales et données financières.',
        section2Title: '2. Comment Nous Utilisons Vos Informations',
        section2Content: 'Nous utilisons les informations que nous collectons pour :',
        section2List: [
          'Traiter vos demandes de prêt',
          'Communiquer avec vous sur nos services',
          'Améliorer notre plateforme et nos services',
          'Se conformer aux exigences légales et réglementaires',
        ],
        section3Title: '3. Partage d\'Informations',
        section3Content: 'Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations avec :',
        section3List: [
          'Les bureaux de crédit pour l\'évaluation du crédit',
          'Les prestataires de services qui nous assistent dans nos opérations',
          'Les régulateurs et les forces de l\'ordre lorsque requis par la loi',
        ],
        section4Title: '4. Sécurité des Données',
        section4Content: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l\'accès, l\'altération, la divulgation ou la destruction non autorisés.',
        section5Title: '5. Vos Droits',
        section5Content: 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également vous opposer à certains traitements de vos données.',
        section6Title: '6. Cookies',
        section6Content: 'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience sur notre plateforme. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.',
        section7Title: '7. Nous Contacter',
        section7Content: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Prêts pour Particuliers',
      subtitle: 'Des solutions de financement adaptées à tous vos projets de vie',
      personalLoan: 'Prêt Personnel',
      personalLoanDesc: 'Financement flexible pour tous vos projets sans justificatif d\'utilisation : voyage, mariage, achat équipement. De 1 000€ à 75 000€ sur 12 à 84 mois. Taux TAEG de 2,9% à 7,9% selon profil. Réponse en 48h, fonds sous 5 jours.',
      mortgageLoan: 'Prêt Immobilier',
      mortgageLoanDesc: 'Financez votre résidence principale, secondaire ou investissement locatif. De 50 000€ à 500 000€ sur 10 à 25 ans. Taux fixes ou variables à partir de 1,5% TAEG. Jusqu\'à 110% d\'apport incluant frais de notaire. Simulation personnalisée gratuite.',
      autoLoan: 'Crédit Auto / Moto',
      autoLoanDesc: 'Financez votre véhicule neuf ou d\'occasion, auto ou moto. De 3 000€ à 75 000€ sur 12 à 84 mois. Taux TAEG de 1,9% à 5,9%. Possibilité d\'inclure l\'assurance et les accessoires. Réponse immédiate chez votre concessionnaire partenaire.',
      studentLoan: 'Prêt Étudiant',
      studentLoanDesc: 'Financez vos études supérieures, frais de scolarité, logement étudiant. De 1 000€ à 50 000€. Différé de remboursement total jusqu\'à la fin des études. Taux préférentiels dès 1,5% TAEG. Sans caution parentale sous conditions.',
      greenLoan: 'Prêt Vert / Éco-PTZ',
      greenLoanDesc: 'Financez travaux de rénovation énergétique : isolation, pompe à chaleur, panneaux solaires. De 7 000€ à 50 000€. Taux bonifiés dès 0,5% TAEG. Éligible aux aides d\'État MaPrimeRénov. Jusqu\'à 30 000€ sans apport.',
      renovationLoan: 'Prêt Travaux',
      renovationLoanDesc: 'Rénovez, agrandissez, embellissez votre logement. De 1 500€ à 75 000€ sur 12 à 120 mois. Taux TAEG de 2,5% à 6,9%. Sans garantie hypothécaire jusqu\'à 50 000€. Déblocage progressif selon avancement des travaux possible.',
      amount: 'Montant',
      rate: 'Taux TAEG',
      duration: 'Durée',
      rateDisclaimer: 'Taux indicatifs soumis à conditions d\'éligibilité. TAEG fixe. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.',
      compareLoans: 'Comparer tous les prêts',
    },
    features: {
      title: 'Pourquoi Choisir ProLoan ?',
      subtitle: 'Une plateforme de prêt moderne et transparente qui met vos besoins au centre',
      security: 'Sécurité Bancaire de Niveau Entreprise',
      securityDesc: 'Cryptage AES-256, conformité RGPD, certification SOC 2 Type II et ISO 27001. Vos données financières sont protégées avec les mêmes standards que les grandes banques. Authentification multi-facteurs et surveillance 24/7 contre la fraude.',
      fast: 'Réponse Ultra-Rapide 24-48h',
      fastDesc: 'Notre technologie d\'IA analyse votre dossier en temps réel. Réponse de principe en 15 secondes à 48h maximum. Fonds virés sous 2-5 jours. Interface 100% digitale, zéro paperasse, signature électronique. Gagnez du temps sur votre projet.',
      competitive: 'Taux Parmi Les Plus Bas du Marché',
      competitiveDesc: 'Grâce à notre réseau de 50+ partenaires financiers et notre technologie d\'évaluation optimisée, nous négocions pour vous les meilleurs taux : de 1,5% à 9,0% selon profil. Comparaison automatique pour vous garantir la meilleure offre.',
      flexible: 'Flexibilité Maximale Sans Pénalité',
      flexibleDesc: 'Remboursement anticipé gratuit à tout moment. Modulation des mensualités possible selon votre situation. Report de mensualités en cas de difficultés. Choix de la date de prélèvement. Vous gardez le contrôle total de votre crédit.',
    },
    stats: {
      clients: 'Clients Satisfaits',
      funded: 'Prêts Accordés',
      satisfaction: 'Taux de Satisfaction',
      years: 'Années d\'Expérience',
    },
  },
  en: {
    hero: {
      title: 'Make Your Projects a Reality with ProLoan',
      subtitle: 'Financing solutions for individuals and businesses - Competitive rates and transparent process',
      cta1: 'Request a Loan',
      cta2: 'My Account',
      trustIndicator: 'Trusted by 15,000+ satisfied clients',
    },
    nav: {
      home: 'Home',
      products: 'Our Loans',
      howItWorks: 'How It Works',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      dashboard: 'Dashboard',
      loans: 'Loans',
      transfers: 'Transfers',
      history: 'History',
      settings: 'Settings',
      logout: 'Logout',
    },
    dashboard: {
      welcome: 'Welcome',
      currentBalance: 'Current Balance',
      activeLoans: 'Active Loans',
      totalBorrowed: 'Total Borrowed',
      availableCredit: 'Available Credit',
      lastUpdated: 'Last Updated',
      borrowingCapacity: 'Borrowing Capacity',
      canBorrowUpTo: 'You can borrow up to',
      quickActions: 'Quick Actions',
      newLoan: 'New Loan',
      transferFunds: 'Transfer Funds',
      transactionHistory: 'Transaction History',
      fees: 'Fees',
      pendingTransfers: 'Pending Transfers',
      availableFunds: 'Available Funds',
      upcomingRepayments: 'Upcoming Repayments',
    },
    loan: {
      amount: 'Amount',
      interestRate: 'Interest Rate',
      nextPayment: 'Next Payment',
      viewAll: 'View All',
    },
    transfer: {
      requestSubmitted: 'Request Submitted',
      documentVerification: 'Document Verification',
      complianceCheck: 'Compliance Check',
      approvalPending: 'Approval Pending',
      transferComplete: 'Transfer Complete',
      pending: 'Pending',
      inProgress: 'In Progress',
      approved: 'Approved',
      rejected: 'Rejected',
    },
    fee: {
      type: 'Fee Type',
      reason: 'Reason',
      amount: 'Amount',
      date: 'Date',
      downloadStatement: 'Download Statement',
      loanFees: 'Loan Fees',
      transferFees: 'Transfer Fees',
      accountFees: 'Account Fees',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    about: {
      title: 'About ProLoan',
      subtitle: 'Your trusted partner for financing individuals and businesses',
      mission: 'Our Mission',
      missionText: 'At ProLoan, we democratize access to financing for everyone. Whether you\'re an individual with a personal project or a growing business, we offer modern, transparent credit solutions tailored to your needs. Our cutting-edge technology enables us to quickly analyze your situation and offer personalized deals with competitive rates. We believe in total transparency: no hidden fees, clear terms, and support at every step.',
      stats: {
        clients: 'Active clients',
        loansProvided: 'Loans provided',
        successRate: 'Satisfaction rate',
        yearsExperience: 'Years of experience',
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'A 100% digital process in 4 simple steps',
      step1Title: 'Online Application - 4 Minutes',
      step1Desc: 'Complete our secure form with your personal or business information. No need to travel, everything is done online with instant identity verification (KYC) and simplified document upload.',
      step2Title: 'Automated Analysis - 24-48h',
      step2Desc: 'Our credit assessment technology analyzes your financial profile, income, and history. Thanks to our advanced algorithms and credit bureau integration, we give you an approval response within 48 hours maximum.',
      step3Title: 'Transparent Personalized Offer',
      step3Desc: 'Receive your loan offer with all information: amount, APR rate, monthly payments, duration, total credit cost. No hidden fees, clear terms, and ability to simulate different scenarios before accepting.',
      step4Title: 'Fast Disbursement - 2 to 5 Days',
      step4Desc: 'Electronic signature of your contract and automatic transfer of funds to your bank account. For business loans, possibility of setting up a personalized payment schedule adapted to your cash flow.',
    },
    products: {
      title: 'Our Loan Solutions',
      subtitle: 'Products tailored to your needs - Individuals and Businesses',
      termLoans: 'Professional Term Loans',
      termLoansDesc: 'Medium and long-term financing for your strategic investments: development, acquisition, expansion. From €10,000 to €500,000 over 1 to 7 years. Fixed rates from 3.5% to 8.5% APR depending on profile. Early repayment without penalty.',
      lineOfCredit: 'Revolving Line of Credit',
      lineOfCreditDesc: 'Flexible credit to manage your cash flow and handle unexpected expenses. From €5,000 to €100,000. Rates from 4.0% to 9.0% APR. Pay interest only on amounts used. Automatic reconstitution of available capital.',
      equipmentFinancing: 'Equipment Financing',
      equipmentFinancingDesc: 'Finance your professional equipment, utility vehicles, machines, tools. From €20,000 to €300,000 over 2 to 5 years. Rates from 3.9% to 7.5% APR. Equipment can serve as collateral, facilitating loan approval.',
      invoiceFactoring: 'Invoice Factoring / Receivables',
      invoiceFactoringDesc: 'Turn your customer invoices into immediate cash to improve cash flow. Advance up to 90% of invoice amounts within 24-48h. Fees from 1% to 3% depending on volume and delay. Ideal for B2B companies.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Our team is here to help',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      success: 'Message sent successfully',
      error: 'Error sending message',
    },
    resources: {
      title: 'Resources',
      subtitle: 'All the information to support you in your project',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What documents are required for a loan application?',
          answer: 'For individuals: ID, proof of address, recent pay slips (3 months), tax notice. For businesses: company registration (<3 months), balance sheets and income statements (last 2 years), business bank statements (3-6 months), director\'s ID. All documents can be uploaded directly online securely.',
        },
        {
          question: 'How long does the approval process take?',
          answer: 'Our automated assessment technology gives you an approval response in 15 seconds to 48 hours maximum. Once your complete file is validated, funds are transferred within 2 to 5 business days. For larger amounts (>€100,000), allow 5 to 7 days for thorough analysis.',
        },
        {
          question: 'What is the minimum and maximum amount I can borrow?',
          answer: 'Personal loans: €1,000 to €75,000. Mortgage loans: €50,000 to €500,000. Business term loans: €10,000 to €500,000. Lines of credit: €5,000 to €100,000. The exact amount depends on your repayment capacity calculated based on income, expenses, and credit history.',
        },
        {
          question: 'Can I repay my loan early?',
          answer: 'Yes, all our loans allow early repayment without penalty or hidden fees. You can partially or fully repay your credit anytime from your customer area. This automatically reduces the total interest cost. You maintain full control over your credit.',
        },
        {
          question: 'What are the eligibility criteria for a loan?',
          answer: 'Individuals: be of legal age, reside in France, have regular income, and debt ratio <40%. Businesses: active for 6+ months, minimum monthly revenue of €15,000, no recent payment defaults. Credit score is automatically verified via credit bureaus (Experian, Equifax). Cases are reviewed individually.',
        },
        {
          question: 'How are interest rates calculated?',
          answer: 'Our rates are calculated by an algorithm that analyzes several factors: your credit score, loan duration, amount borrowed, income and expenses, repayment history, and financial health (for businesses). Rates range from 3.5% to 9.0% APR depending on profile. Our rates are among the most competitive on the market thanks to our network of financial partners.',
        },
        {
          question: 'Are there application fees or hidden charges?',
          answer: 'Total transparency: we display all fees from the simulation. Application fees: €0 to €150 depending on loan type. No early repayment fees. No monthly management fees. The APR (Annual Percentage Rate) includes all costs for easy comparison with other offers.',
        },
        {
          question: 'How to calculate my borrowing capacity?',
          answer: 'Your borrowing capacity depends on your debt ratio which must not exceed 40% of your net income. Formula: (Monthly income × 0.40) - Existing credit charges = Maximum available monthly payment. Our online simulator automatically calculates your borrowing capacity and suggests appropriate amounts. You can adjust the duration to modulate payments.',
        },
        {
          question: 'Can I get a loan with a low credit score?',
          answer: 'Yes, we accept various profiles. Our assessment technology also analyzes alternative data beyond the simple credit score: professional stability, recurring income, savings, banking history. Scores accepted from 500-560 for certain products. Even with imperfect history, you can get a loan, but rates will be adjusted to risk.',
        },
        {
          question: 'What happens if I cannot pay a monthly payment?',
          answer: 'Contact us immediately. We offer several solutions: payment deferral (temporary grace period), downward payment modulation, loan rescheduling. Late penalties may apply but we always favor dialogue to find a solution adapted to your situation. Personalized support is available in case of difficulties.',
        },
      ],
    },
    legal: {
      termsTitle: 'Terms of Service',
      privacyTitle: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      terms: {
        section1Title: '1. Acceptance of Terms',
        section1Content: 'By accessing and using ProLoan\'s services, you accept and agree to be bound by the terms and provision of this agreement.',
        section2Title: '2. Use License',
        section2Content: 'Permission is granted to temporarily access the materials (information or software) on ProLoan\'s platform for personal, non-commercial transitory viewing only.',
        section3Title: '3. Loan Agreement',
        section3Content: 'All loans are subject to credit approval. Terms and conditions will be provided in a separate loan agreement upon approval of your application.',
        section4Title: '4. Representations and Warranties',
        section4Content: 'You represent and warrant that all information provided in your loan application is accurate, complete, and current.',
        section5Title: '5. Limitation of Liability',
        section5Content: 'In no event shall ProLoan or its suppliers be liable for any damages arising out of the use or inability to use the materials on ProLoan\'s platform.',
        section6Title: '6. Modifications',
        section6Content: 'ProLoan may revise these terms of service at any time without notice. By using this platform, you agree to be bound by the current version of these terms.',
      },
      privacy: {
        section1Title: '1. Information We Collect',
        section1Content: 'We collect information you provide directly to us when you create an account, apply for a loan, or communicate with us. This may include your name, email address, phone number, business information, and financial data.',
        section2Title: '2. How We Use Your Information',
        section2Content: 'We use the information we collect to:',
        section2List: [
          'Process your loan applications',
          'Communicate with you about our services',
          'Improve our platform and services',
          'Comply with legal and regulatory requirements',
        ],
        section3Title: '3. Information Sharing',
        section3Content: 'We do not sell your personal information. We may share your information with:',
        section3List: [
          'Credit bureaus for credit assessment',
          'Service providers who assist in our operations',
          'Regulators and law enforcement when required by law',
        ],
        section4Title: '4. Data Security',
        section4Content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        section5Title: '5. Your Rights',
        section5Content: 'You have the right to access, correct, or delete your personal information. You may also object to certain processing of your data.',
        section6Title: '6. Cookies',
        section6Content: 'We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookies through your browser settings.',
        section7Title: '7. Contact Us',
        section7Content: 'If you have questions about this Privacy Policy, please contact us at privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Personal Loans',
      subtitle: 'Financing solutions tailored to all your life projects',
      personalLoan: 'Personal Loan',
      personalLoanDesc: 'Flexible financing for all your projects without proof of use: travel, wedding, equipment purchase. From €1,000 to €75,000 over 12 to 84 months. APR rates from 2.9% to 7.9% depending on profile. Response in 48h, funds within 5 days.',
      mortgageLoan: 'Mortgage Loan',
      mortgageLoanDesc: 'Finance your primary, secondary residence or rental investment. From €50,000 to €500,000 over 10 to 25 years. Fixed or variable rates from 1.5% APR. Up to 110% contribution including notary fees. Free personalized simulation.',
      autoLoan: 'Auto / Motorcycle Loan',
      autoLoanDesc: 'Finance your new or used vehicle, car or motorcycle. From €3,000 to €75,000 over 12 to 84 months. APR rates from 1.9% to 5.9%. Possibility to include insurance and accessories. Instant response at your partner dealership.',
      studentLoan: 'Student Loan',
      studentLoanDesc: 'Finance your higher education, tuition fees, student housing. From €1,000 to €50,000. Total repayment deferral until end of studies. Preferential rates from 1.5% APR. Without parental guarantee under conditions.',
      greenLoan: 'Green Loan / Eco-PTZ',
      greenLoanDesc: 'Finance energy renovation work: insulation, heat pump, solar panels. From €7,000 to €50,000. Subsidized rates from 0.5% APR. Eligible for state aid MaPrimeRénov. Up to €30,000 without contribution.',
      renovationLoan: 'Home Improvement Loan',
      renovationLoanDesc: 'Renovate, expand, beautify your home. From €1,500 to €75,000 over 12 to 120 months. APR rates from 2.5% to 6.9%. Without mortgage guarantee up to €50,000. Progressive release according to work progress possible.',
      amount: 'Amount',
      rate: 'APR Rate',
      duration: 'Duration',
      rateDisclaimer: 'Indicative rates subject to eligibility conditions. Fixed APR. Credit commits you and must be repaid. Check your repayment capacity before committing.',
      compareLoans: 'Compare all loans',
    },
    features: {
      title: 'Why Choose ProLoan?',
      subtitle: 'A modern and transparent lending platform that puts your needs first',
      security: 'Enterprise-Grade Banking Security',
      securityDesc: 'AES-256 encryption, GDPR compliance, SOC 2 Type II and ISO 27001 certification. Your financial data is protected with the same standards as major banks. Multi-factor authentication and 24/7 fraud monitoring.',
      fast: 'Ultra-Fast Response 24-48h',
      fastDesc: 'Our AI technology analyzes your file in real-time. Approval response in 15 seconds to 48h maximum. Funds transferred within 2-5 days. 100% digital interface, zero paperwork, electronic signature. Save time on your project.',
      competitive: 'Among The Lowest Rates on the Market',
      competitiveDesc: 'Thanks to our network of 50+ financial partners and optimized assessment technology, we negotiate the best rates for you: from 1.5% to 9.0% depending on profile. Automatic comparison to guarantee you the best offer.',
      flexible: 'Maximum Flexibility Without Penalty',
      flexibleDesc: 'Free early repayment anytime. Possible payment modulation according to your situation. Payment deferral in case of difficulties. Choice of debit date. You maintain total control of your credit.',
    },
    stats: {
      clients: 'Satisfied Clients',
      funded: 'Loans Provided',
      satisfaction: 'Satisfaction Rate',
      years: 'Years of Experience',
    },
  },
  es: {
    hero: {
      title: 'Haga Realidad sus Proyectos con ProLoan',
      subtitle: 'Soluciones de financiamiento para particulares y empresas - Tasas competitivas y proceso transparente',
      cta1: 'Solicitar Préstamo',
      cta2: 'Mi Cuenta',
      trustIndicator: 'Más de 15,000 clientes satisfechos confían en nosotros',
    },
    nav: {
      home: 'Inicio',
      products: 'Nuestros Préstamos',
      howItWorks: 'Cómo Funciona',
      resources: 'Recursos',
      about: 'Acerca de',
      contact: 'Contacto',
      dashboard: 'Panel',
      loans: 'Préstamos',
      transfers: 'Transferencias',
      history: 'Historial',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
    },
    dashboard: {
      welcome: 'Bienvenido',
      currentBalance: 'Saldo Actual',
      activeLoans: 'Préstamos Activos',
      totalBorrowed: 'Total Prestado',
      availableCredit: 'Crédito Disponible',
      lastUpdated: 'Última Actualización',
      borrowingCapacity: 'Capacidad de Préstamo',
      canBorrowUpTo: 'Puede pedir prestado hasta',
      quickActions: 'Acciones Rápidas',
      newLoan: 'Nuevo Préstamo',
      transferFunds: 'Transferir Fondos',
      transactionHistory: 'Historial de Transacciones',
      fees: 'Tarifas',
      pendingTransfers: 'Transferencias Pendientes',
      availableFunds: 'Fondos Disponibles',
      upcomingRepayments: 'Próximos Reembolsos',
    },
    loan: {
      amount: 'Cantidad',
      interestRate: 'Tasa de Interés',
      nextPayment: 'Próximo Pago',
      viewAll: 'Ver Todo',
    },
    transfer: {
      requestSubmitted: 'Solicitud Enviada',
      documentVerification: 'Verificación de Documentos',
      complianceCheck: 'Control de Cumplimiento',
      approvalPending: 'Aprobación Pendiente',
      transferComplete: 'Transferencia Completa',
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      approved: 'Aprobado',
      rejected: 'Rechazado',
    },
    fee: {
      type: 'Tipo de Tarifa',
      reason: 'Motivo',
      amount: 'Cantidad',
      date: 'Fecha',
      downloadStatement: 'Descargar Estado de Cuenta',
      loanFees: 'Tarifas de Préstamo',
      transferFees: 'Tarifas de Transferencia',
      accountFees: 'Tarifas de Cuenta',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
    about: {
      title: 'Acerca de ProLoan',
      subtitle: 'Su socio de confianza para financiar particulares y empresas',
      mission: 'Nuestra Misión',
      missionText: 'En ProLoan, democratizamos el acceso al financiamiento para todos. Ya sea que sea un particular con un proyecto personal o una empresa en desarrollo, ofrecemos soluciones de crédito modernas, transparentes y adaptadas a sus necesidades. Nuestra tecnología de vanguardia nos permite analizar rápidamente su situación y ofrecerle ofertas personalizadas con tasas competitivas. Creemos en la transparencia total: sin cargos ocultos, condiciones claras y acompañamiento en cada paso.',
      stats: {
        clients: 'Clientes activos',
        loansProvided: 'Préstamos otorgados',
        successRate: 'Tasa de satisfacción',
        yearsExperience: 'Años de experiencia',
      },
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle: 'Un proceso 100% digital en 4 pasos simples',
      step1Title: 'Solicitud en línea - 4 Minutos',
      step1Desc: 'Complete nuestro formulario seguro con su información personal o empresarial. No necesita desplazarse, todo se hace en línea con verificación de identidad instantánea (KYC) y carga de documentos simplificada.',
      step2Title: 'Análisis automatizado - 24-48h',
      step2Desc: 'Nuestra tecnología de evaluación crediticia analiza su perfil financiero, ingresos e historial. Gracias a nuestros algoritmos avanzados y la integración con burós de crédito, le damos una respuesta de principio en máximo 48h.',
      step3Title: 'Oferta personalizada transparente',
      step3Desc: 'Reciba su oferta de préstamo con toda la información: monto, tasa TAE, mensualidades, duración, costo total del crédito. Sin cargos ocultos, condiciones claras y posibilidad de simular diferentes escenarios antes de aceptar.',
      step4Title: 'Desembolso rápido - 2 a 5 días',
      step4Desc: 'Firma electrónica de su contrato y transferencia automática de fondos a su cuenta bancaria. Para préstamos empresariales, posibilidad de establecer un calendario de pagos personalizado adaptado a su flujo de caja.',
    },
    products: {
      title: 'Nuestras Soluciones de Préstamos',
      subtitle: 'Productos adaptados a sus necesidades - Particulares y Empresas',
      termLoans: 'Préstamos a Plazo Profesionales',
      termLoansDesc: 'Financiamiento a mediano y largo plazo para sus inversiones estratégicas: desarrollo, adquisición, expansión. De €10,000 a €500,000 de 1 a 7 años. Tasas fijas de 3.5% a 8.5% TAE según perfil. Pago anticipado sin penalización.',
      lineOfCredit: 'Línea de Crédito Renovable',
      lineOfCreditDesc: 'Crédito flexible para gestionar su flujo de caja y enfrentar gastos imprevistos. De €5,000 a €100,000. Tasas de 4.0% a 9.0% TAE. Pague intereses solo sobre las cantidades utilizadas. Reconstitución automática del capital disponible.',
      equipmentFinancing: 'Financiamiento de Equipos',
      equipmentFinancingDesc: 'Financie sus equipos profesionales, vehículos utilitarios, maquinaria, herramientas. De €20,000 a €300,000 de 2 a 5 años. Tasas de 3.9% a 7.5% TAE. El equipo puede servir como garantía, facilitando la aprobación del préstamo.',
      invoiceFactoring: 'Factoraje / Cesión de Créditos',
      invoiceFactoringDesc: 'Convierta sus facturas de clientes en efectivo inmediato para mejorar su flujo de caja. Anticipo hasta el 90% del monto de facturas en 24-48h. Tarifas del 1% al 3% según volumen y plazo. Ideal para empresas B2B.',
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Nuestro equipo está aquí para ayudar',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje',
    },
    resources: {
      title: 'Recursos',
      subtitle: 'Toda la información para apoyarlo en su proyecto',
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          question: '¿Qué documentos se requieren para una solicitud de préstamo?',
          answer: 'Para particulares: identificación, comprobante de domicilio, recibos de nómina recientes (3 meses), aviso de impuestos. Para empresas: registro mercantil (<3 meses), balances y estados de resultados (últimos 2 años), estados de cuenta bancarios comerciales (3-6 meses), identificación del director. Todos los documentos pueden cargarse directamente en línea de forma segura.',
        },
        {
          question: '¿Cuánto tiempo toma el proceso de aprobación?',
          answer: 'Nuestra tecnología de evaluación automatizada le da una respuesta de principio en 15 segundos a 48 horas máximo. Una vez validado y completo su expediente, los fondos se transfieren en 2 a 5 días hábiles. Para montos mayores (>€100,000), cuente con 5 a 7 días para un análisis exhaustivo.',
        },
        {
          question: '¿Cuál es el monto mínimo y máximo que puedo pedir prestado?',
          answer: 'Préstamos personales: €1,000 a €75,000. Préstamos hipotecarios: €50,000 a €500,000. Préstamos a plazo empresariales: €10,000 a €500,000. Líneas de crédito: €5,000 a €100,000. El monto exacto depende de su capacidad de pago calculada según ingresos, gastos e historial crediticio.',
        },
        {
          question: '¿Puedo pagar mi préstamo anticipadamente?',
          answer: 'Sí, todos nuestros préstamos permiten el pago anticipado sin penalización ni cargos ocultos. Puede reembolsar parcial o totalmente su crédito en cualquier momento desde su área de cliente. Esto reduce automáticamente el costo total de intereses. Mantiene control total de su crédito.',
        },
        {
          question: '¿Cuáles son los criterios de elegibilidad para un préstamo?',
          answer: 'Particulares: ser mayor de edad, residir en Francia, tener ingresos regulares y tasa de endeudamiento <40%. Empresas: activas por 6+ meses, ingresos mensuales mínimos de €15,000, sin incumplimientos de pago recientes. El puntaje crediticio se verifica automáticamente vía burós de crédito (Experian, Equifax). Los casos se estudian individualmente.',
        },
        {
          question: '¿Cómo se calculan las tasas de interés?',
          answer: 'Nuestras tasas se calculan mediante un algoritmo que analiza varios factores: su puntaje crediticio, duración del préstamo, monto prestado, ingresos y gastos, historial de pagos y salud financiera (para empresas). Las tasas varían de 3.5% a 9.0% TAE según perfil. Nuestras tasas están entre las más competitivas del mercado gracias a nuestra red de socios financieros.',
        },
        {
          question: '¿Hay cargos de solicitud o cargos ocultos?',
          answer: 'Transparencia total: mostramos todos los cargos desde la simulación. Cargos de solicitud: €0 a €150 según tipo de préstamo. Sin cargos por pago anticipado. Sin cargos mensuales de gestión. La TAE (Tasa Anual Equivalente) incluye todos los costos para comparación fácil con otras ofertas.',
        },
        {
          question: '¿Cómo calcular mi capacidad de préstamo?',
          answer: 'Su capacidad de préstamo depende de su tasa de endeudamiento que no debe superar el 40% de sus ingresos netos. Fórmula: (Ingresos mensuales × 0.40) - Cargos de crédito existentes = Pago mensual máximo disponible. Nuestro simulador en línea calcula automáticamente su capacidad de préstamo y sugiere montos apropiados. Puede ajustar la duración para modular los pagos.',
        },
        {
          question: '¿Puedo obtener un préstamo con un puntaje crediticio bajo?',
          answer: 'Sí, aceptamos varios perfiles. Nuestra tecnología de evaluación también analiza datos alternativos más allá del simple puntaje crediticio: estabilidad profesional, ingresos recurrentes, ahorros, historial bancario. Puntajes aceptados desde 500-560 para ciertos productos. Incluso con historial imperfecto, puede obtener un préstamo, pero las tasas se ajustarán al riesgo.',
        },
        {
          question: '¿Qué sucede si no puedo pagar una mensualidad?',
          answer: 'Contáctenos inmediatamente. Ofrecemos varias soluciones: aplazamiento de mensualidad (gracia temporal), modulación a la baja de cuotas, re-escalamiento del préstamo. Pueden aplicarse penalidades por retraso pero siempre privilegiamos el diálogo para encontrar una solución adaptada a su situación. Acompañamiento personalizado disponible en caso de dificultades.',
        },
      ],
    },
    legal: {
      termsTitle: 'Términos de Servicio',
      privacyTitle: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2025',
      terms: {
        section1Title: '1. Aceptación de Términos',
        section1Content: 'Al acceder y utilizar los servicios de ProLoan, acepta y está de acuerdo en estar sujeto a los términos y disposiciones de este acuerdo.',
        section2Title: '2. Licencia de Uso',
        section2Content: 'Se otorga permiso para acceder temporalmente a los materiales (información o software) en la plataforma de ProLoan solo para visualización personal y no comercial.',
        section3Title: '3. Contrato de Préstamo',
        section3Content: 'Todos los préstamos están sujetos a aprobación de crédito. Los términos y condiciones se proporcionarán en un contrato de préstamo separado al aprobar su solicitud.',
        section4Title: '4. Declaraciones y Garantías',
        section4Content: 'Usted declara y garantiza que toda la información proporcionada en su solicitud de préstamo es precisa, completa y actual.',
        section5Title: '5. Limitación de Responsabilidad',
        section5Content: 'En ningún caso ProLoan o sus proveedores serán responsables de cualquier daño que surja del uso o la imposibilidad de usar los materiales en la plataforma de ProLoan.',
        section6Title: '6. Modificaciones',
        section6Content: 'ProLoan puede revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar esta plataforma, acepta estar sujeto a la versión actual de estos términos.',
      },
      privacy: {
        section1Title: '1. Información que Recopilamos',
        section1Content: 'Recopilamos información que nos proporciona directamente cuando crea una cuenta, solicita un préstamo o se comunica con nosotros. Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono, información comercial y datos financieros.',
        section2Title: '2. Cómo Usamos su Información',
        section2Content: 'Usamos la información que recopilamos para:',
        section2List: [
          'Procesar sus solicitudes de préstamo',
          'Comunicarnos con usted sobre nuestros servicios',
          'Mejorar nuestra plataforma y servicios',
          'Cumplir con los requisitos legales y regulatorios',
        ],
        section3Title: '3. Compartir Información',
        section3Content: 'No vendemos su información personal. Podemos compartir su información con:',
        section3List: [
          'Burós de crédito para evaluación crediticia',
          'Proveedores de servicios que nos ayudan en nuestras operaciones',
          'Reguladores y fuerzas del orden cuando lo requiera la ley',
        ],
        section4Title: '4. Seguridad de Datos',
        section4Content: 'Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra el acceso, alteración, divulgación o destrucción no autorizados.',
        section5Title: '5. Sus Derechos',
        section5Content: 'Tiene derecho a acceder, corregir o eliminar su información personal. También puede oponerse a cierto procesamiento de sus datos.',
        section6Title: '6. Cookies',
        section6Content: 'Utilizamos cookies y tecnologías de seguimiento similares para mejorar su experiencia en nuestra plataforma. Puede controlar las cookies a través de la configuración de su navegador.',
        section7Title: '7. Contáctenos',
        section7Content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos en privacy@proloan.com',
      },
    },
    individualLoans: {
      title: 'Préstamos para Particulares',
      subtitle: 'Soluciones de financiamiento adaptadas a todos sus proyectos de vida',
      personalLoan: 'Préstamo Personal',
      personalLoanDesc: 'Financiamiento flexible para todos sus proyectos sin justificante de uso: viaje, boda, compra de equipo. De €1,000 a €75,000 de 12 a 84 meses. Tasas TAE de 2.9% a 7.9% según perfil. Respuesta en 48h, fondos en 5 días.',
      mortgageLoan: 'Préstamo Hipotecario',
      mortgageLoanDesc: 'Financie su residencia principal, secundaria o inversión de alquiler. De €50,000 a €500,000 de 10 a 25 años. Tasas fijas o variables desde 1.5% TAE. Hasta 110% de aporte incluyendo gastos notariales. Simulación personalizada gratuita.',
      autoLoan: 'Crédito Auto / Moto',
      autoLoanDesc: 'Financie su vehículo nuevo o usado, auto o moto. De €3,000 a €75,000 de 12 a 84 meses. Tasas TAE de 1.9% a 5.9%. Posibilidad de incluir seguro y accesorios. Respuesta inmediata en su concesionario asociado.',
      studentLoan: 'Préstamo Estudiantil',
      studentLoanDesc: 'Financie sus estudios superiores, matrícula, alojamiento estudiantil. De €1,000 a €50,000. Diferimiento de pago total hasta fin de estudios. Tasas preferenciales desde 1.5% TAE. Sin garantía parental bajo condiciones.',
      greenLoan: 'Préstamo Verde / Eco-PTZ',
      greenLoanDesc: 'Financie trabajos de renovación energética: aislamiento, bomba de calor, paneles solares. De €7,000 a €50,000. Tasas bonificadas desde 0.5% TAE. Elegible para ayudas estatales MaPrimeRénov. Hasta €30,000 sin aporte.',
      renovationLoan: 'Préstamo para Reformas',
      renovationLoanDesc: 'Renueve, amplíe, embellezca su vivienda. De €1,500 a €75,000 de 12 a 120 meses. Tasas TAE de 2.5% a 6.9%. Sin garantía hipotecaria hasta €50,000. Desembolso progresivo según avance de obras posible.',
      amount: 'Monto',
      rate: 'Tasa TAE',
      duration: 'Duración',
      rateDisclaimer: 'Tasas indicativas sujetas a condiciones de elegibilidad. TAE fija. Un crédito le compromete y debe ser reembolsado. Verifique sus capacidades de pago antes de comprometerse.',
      compareLoans: 'Comparar todos los préstamos',
    },
    features: {
      title: '¿Por Qué Elegir ProLoan?',
      subtitle: 'Una plataforma de préstamos moderna y transparente que prioriza sus necesidades',
      security: 'Seguridad Bancaria de Nivel Empresarial',
      securityDesc: 'Cifrado AES-256, cumplimiento RGPD, certificación SOC 2 Type II e ISO 27001. Sus datos financieros están protegidos con los mismos estándares que los grandes bancos. Autenticación multifactor y monitoreo 24/7 contra fraude.',
      fast: 'Respuesta Ultra-Rápida 24-48h',
      fastDesc: 'Nuestra tecnología de IA analiza su expediente en tiempo real. Respuesta de aprobación en 15 segundos a 48h máximo. Fondos transferidos en 2-5 días. Interfaz 100% digital, cero papeleo, firma electrónica. Ahorre tiempo en su proyecto.',
      competitive: 'Entre Las Tasas Más Bajas del Mercado',
      competitiveDesc: 'Gracias a nuestra red de 50+ socios financieros y tecnología de evaluación optimizada, negociamos para usted las mejores tasas: de 1.5% a 9.0% según perfil. Comparación automática para garantizarle la mejor oferta.',
      flexible: 'Flexibilidad Máxima Sin Penalización',
      flexibleDesc: 'Pago anticipado gratuito en cualquier momento. Posible modulación de mensualidades según su situación. Aplazamiento de mensualidades en caso de dificultades. Elección de fecha de débito. Mantiene control total de su crédito.',
    },
    stats: {
      clients: 'Clientes Satisfechos',
      funded: 'Préstamos Otorgados',
      satisfaction: 'Tasa de Satisfacción',
      years: 'Años de Experiencia',
    },
  },
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
