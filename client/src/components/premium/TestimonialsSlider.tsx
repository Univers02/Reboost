import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechStart",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Altus Finance Group a été un véritable partenaire dans notre développement. Processus rapide, conseillers à l'écoute, et des solutions vraiment adaptées à nos besoins."
  },
  {
    name: "Marc Dubois",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "J'ai pu concrétiser mon projet immobilier grâce à leur accompagnement personnalisé. L'interface digitale est moderne et le suivi est impeccable."
  },
  {
    name: "Isabelle Renaud",
    role: "Directrice Financière",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Nous avons consolidé nos dettes avec Altus. L'équipe a été très professionnelle, transparente et nous a proposé des conditions optimales."
  },
  {
    name: "Thomas Lefèvre",
    role: "Fondateur, GreenTech",
    image: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    text: "Excellent service ! Ils ont compris nos enjeux et nous ont accompagnés de A à Z. Je recommande vivement pour tout projet de financement professionnel."
  }
];

export default function TestimonialsSlider() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300" data-testid={`testimonial-${index}`}>
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="h-16 w-16 text-indigo-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-100"
                      />
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
