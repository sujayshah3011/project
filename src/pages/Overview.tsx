import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Palette, Shield, Code, Sparkles, ArrowRight, Users, Trophy, Star } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Overview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Components",
      description: "Reusable UI components with consistent design patterns and modern interactions.",
      count: "12+",
      color: "from-purple-500 to-pink-500",
      delay: "0ms"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Tokens",
      description: "Colors, typography, and spacing tokens for consistent theming across platforms.",
      count: "50+",
      color: "from-blue-500 to-cyan-500",
      delay: "100ms"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Accessibility",
      description: "WCAG 2.1 AA compliant components with full keyboard support and screen readers.",
      count: "100%",
      color: "from-emerald-500 to-teal-500",
      delay: "200ms"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description: "Optimized components with minimal bundle size and lightning-fast rendering.",
      count: "99%",
      color: "from-orange-500 to-red-500",
      delay: "300ms"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teams",
      description: "Built for collaboration with design-to-code workflows and documentation.",
      count: "∞",
      color: "from-indigo-500 to-purple-500",
      delay: "400ms"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Quality",
      description: "Battle-tested components used in production by leading design teams.",
      count: "5★",
      color: "from-yellow-500 to-orange-500",
      delay: "500ms"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", change: "+23%" },
    { label: "Components Built", value: "250+", change: "+15%" },
    { label: "Design Systems", value: "50+", change: "+8%" },
    { label: "Countries", value: "25+", change: "+12%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Version 2.0 Coming soon</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6 leading-tight">
            Injala Design <br />
            
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Bible</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            A comprehensive design system for building consistent, accessible, and beautiful user interfaces that scale with your team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2" onClick={() => navigate('/buttons')}>
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/buttons')} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 " >
              View Components
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: feature.delay }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Floating icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className={`text-4xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.count}
                </div>
                <ChevronRight className={`w-6 h-6 text-gray-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all duration-300 ${activeCard === index ? 'scale-110' : ''}`} />
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Star className="w-12 h-12 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of designers and developers who are building better products with our design system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
              Start Free Trial
              <Sparkles className="w-5 h-5" />
            </button> */}
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:-translate-y-1 transition-all duration-200 " onClick={() => navigate('/buttons')}>
              View Documentation
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Overview;