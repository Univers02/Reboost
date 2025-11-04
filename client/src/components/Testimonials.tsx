import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Chef d\'entreprise',
      company: 'Boutique Bio Paris',
      avatar: 'SM',
      rating: 5,
      text: 'Altus Group m\'a permis d\'obtenir un financement rapide pour développer mon commerce. Le processus était simple et transparent, j\'ai reçu les fonds en moins d\'une semaine.',
    },
    {
      name: 'Thomas Dubois',
      role: 'Particulier',
      company: 'Propriétaire',
      avatar: 'TD',
      rating: 5,
      text: 'Excellent service pour mon prêt immobilier. Les conseillers sont à l\'écoute et m\'ont trouvé le meilleur taux. Je recommande vivement leurs services.',
    },
    {
      name: 'Marie Laurent',
      role: 'Directrice Financière',
      company: 'Tech Solutions SARL',
      avatar: 'ML',
      rating: 5,
      text: 'Grâce à Altus Group, nous avons pu financer l\'achat de nouveaux équipements. La flexibilité de remboursement et le taux compétitif ont fait la différence.',
    },
    {
      name: 'Pierre Moreau',
      role: 'Artisan',
      company: 'Boulangerie Traditionnelle',
      avatar: 'PM',
      rating: 5,
      text: 'Un service professionnel et efficace. J\'ai obtenu mon prêt travaux sans complications. L\'équipe m\'a accompagné à chaque étape.',
    },
    {
      name: 'Isabelle Rousseau',
      role: 'Commerçante',
      company: 'Mode & Accessoires',
      avatar: 'IR',
      rating: 5,
      text: 'Je suis très satisfaite du financement obtenu pour l\'expansion de ma boutique. Altus Group comprend vraiment les besoins des entrepreneurs.',
    },
    {
      name: 'Jean Petit',
      role: 'Particulier',
      company: 'Père de famille',
      avatar: 'JP',
      rating: 5,
      text: 'Mon crédit auto a été approuvé rapidement avec un excellent taux. Le simulateur en ligne m\'a permis de comparer facilement les offres.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-muted-foreground">
            Plus de 15 000 particuliers et professionnels nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 relative" data-testid={`card-testimonial-${index}`}>
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {['AB', 'CD', 'EF', 'GH'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-background"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">98% de satisfaction</span>
              <span className="text-muted-foreground"> • 15 000+ clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
