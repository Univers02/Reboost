export const seoConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5000',
  siteName: 'Solventus Group',
  defaultTitle: 'Solventus Group - Professional Loan Solutions | Business Financing',
  defaultDescription: 'Solventus Group offers professional loan solutions tailored to your business. Quickly access funds with competitive rates and a transparent approval process.',
  defaultKeywords: 'business loan, enterprise financing, professional loan, quick loan, competitive rate, SME financing, business credit, financing solution, personal loan, car loan, mortgage, student loan, consumer credit, renovation loan, revolving credit, no doc loan, professional financing, enterprise funding',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@solventusgroup',
  themeColor: '#0066cc',
  locale: 'en_US',
  alternateLangs: ['fr', 'es', 'pt', 'it', 'de'],
  organization: {
    name: 'Solventus Group',
    logo: '/logo.png',
    telephone: '+352-40-63-48',
    address: {
      streetAddress: '19 Rue Sigismond',
      addressLocality: 'Luxembourg',
      postalCode: 'L-2537',
      addressCountry: 'LU'
    },
    geo: {
      latitude: 49.6117,
      longitude: 6.1319
    },
    sameAs: [
      'https://www.facebook.com/solventusgroup',
      'https://www.linkedin.com/company/solventusgroup',
      'https://twitter.com/solventusgroup'
    ]
  }
} as const;
