
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Owner, Zen Flow Studio",
    avatar: "SC",
    quote: "FlowTime transformed our booking process completely. We went from spending hours on scheduling to having everything automated. Our clients love the seamless booking experience, and we've seen a 40% increase in class attendance since switching.",
    location: "San Francisco, CA",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Director, Mindful Movement",
    avatar: "MR",
    quote: "The payment integration and package management features are game-changers. We can now offer flexible membership options and handle billing automatically. Our revenue has increased by 30% while reducing our admin workload significantly.",
    location: "Austin, TX",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Founder, Breathe Pilates",
    avatar: "ET",
    quote: "As someone who runs multiple locations, FlowTime's multi-studio support and staff management tools are essential. The mobile app keeps me connected to all my studios, and the analytics help me make better business decisions.",
    location: "Portland, OR",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-white" id="testimonials">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Studio Owners
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how FlowTime is helping wellness professionals grow their businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative group hover:-translate-y-1"
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-blue-600 font-medium text-sm">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4 border border-blue-100">
            <span className="text-gray-600 mr-2">Join</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              5,000+
            </span>
            <span className="text-gray-600 ml-2">happy studio owners worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
