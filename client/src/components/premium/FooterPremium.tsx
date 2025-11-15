import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  solutions: [
    { label: "Financement professionnel", href: "/loans" },
    { label: "Financement personnel", href: "/loans" },
    { label: "Consolidation de dettes", href: "/loans" },
    { label: "Solutions innovantes", href: "/loans" }
  ],
  company: [
    { label: "À propos", href: "/about" },
    { label: "Notre équipe", href: "/about" },
    { label: "Carrières", href: "/contact" },
    { label: "Presse", href: "/contact" }
  ],
  resources: [
    { label: "Centre d'aide", href: "/contact" },
    { label: "Documentation", href: "/how-it-works" },
    { label: "Blog", href: "/" },
    { label: "FAQ", href: "/contact" }
  ],
  legal: [
    { label: "Mentions légales", href: "/" },
    { label: "Politique de confidentialité", href: "/" },
    { label: "CGU", href: "/" },
    { label: "Cookies", href: "/" }
  ]
};

export default function FooterPremium() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ALTUS Finance Group
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre partenaire de confiance pour tous vos projets de financement. 
              Excellence, innovation et accompagnement personnalisé depuis 2010.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-400" />
                <a href="mailto:contact@altus-finance.com" className="hover:text-white transition-colors" data-testid="link-footer-email">
                  contact@altus-finance.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-400" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors" data-testid="link-footer-phone">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-indigo-400 mt-0.5" />
                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" data-testid={`link-footer-solution-${index}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" data-testid={`link-footer-company-${index}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" data-testid={`link-footer-resource-${index}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-400">
            © 2025 Altus Finance Group. Tous droits réservés.
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Facebook" data-testid="link-facebook">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Twitter" data-testid="link-twitter">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="LinkedIn" data-testid="link-linkedin">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Instagram" data-testid="link-instagram">
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {footerLinks.legal.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className="text-gray-400 hover:text-white transition-colors" data-testid={`link-footer-legal-${index}`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
