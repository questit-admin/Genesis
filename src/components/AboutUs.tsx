import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TiltCard } from './ui/TiltCard';

export default function AboutUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
    >
      {/* Sakura branch silhouette - gentle sway */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        animate={{
          rotate: [0, -3, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Branch */}
          <path
            d="M20 180 Q60 140, 80 100 Q100 60, 120 20"
            stroke="#C33B33"
            strokeWidth="3"
            fill="none"
          />
          {/* Small branches */}
          <path d="M60 140 L40 130" stroke="#C33B33" strokeWidth="2" />
          <path d="M80 100 L70 80" stroke="#C33B33" strokeWidth="2" />
          <path d="M100 60 L110 45" stroke="#C33B33" strokeWidth="2" />
          
          {/* Sakura blossoms */}
          <circle cx="40" cy="130" r="6" fill="#FFC6D0" opacity="0.8" />
          <circle cx="45" cy="128" r="5" fill="#E99AAA" opacity="0.7" />
          <circle cx="70" cy="80" r="7" fill="#FFC6D0" opacity="0.8" />
          <circle cx="75" cy="75" r="5" fill="#F2B9C3" opacity="0.7" />
          <circle cx="110" cy="45" r="6" fill="#E99AAA" opacity="0.8" />
          <circle cx="115" cy="42" r="5" fill="#FFC6D0" opacity="0.7" />
        </svg>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10 px-4 sm:px-0"
      >
        {/* About VESIT & Ruby Samurai */}
        <div className="relative">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TiltCard
              className="relative p-6 sm:p-8 backdrop-blur-xl border-l-4 bg-slate-900/60 rounded-lg z-20"
              style={{
                borderLeftColor: '#C33B33',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(195, 59, 51, 0.2)',
              }}
              rotateAmplitude={10}
            >
              <h3 className="text-2xl sm:text-3xl mb-4" style={{ color: '#C33B33' }}>
                About VESIT
              </h3>
              <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(237, 232, 224, 0.85)' }}>
                Vivekanand Education Society's Institute of Technology (VESIT) is a premier engineering institution in Mumbai, 
                known for academic excellence and innovation.
              </p>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(237, 232, 224, 0.85)' }}>
                With state-of-the-art facilities and a culture of fostering creativity, 
                VESIT empowers students to push boundaries and achieve remarkable milestones in technology and research.
              </p>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: 'linear-gradient(135deg, #C33B33, transparent)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
              />
            </TiltCard>
          </motion.div>
          {/* Ruby Samurai Image - Sourced from PUBLIC folder */}
          <motion.img
            src={`${import.meta.env.BASE_URL}RubySamurai.png`}
            alt="Ruby Samurai"
            className="absolute w-48 h-auto hidden md:block"
            style={{
              top: '70%',
              left: '-120px',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>

        {/* About Quest-IT & Jade Samurai */}
        <div className="relative">
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TiltCard
              className="relative p-6 sm:p-8 backdrop-blur-xl border-l-4 bg-slate-900/60 rounded-lg z-20"
              style={{
                borderLeftColor: '#4D8B86',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(77, 139, 134, 0.2)',
              }}
              rotateAmplitude={10}
            >
              <h3 className="text-2xl sm:text-3xl mb-4" style={{ color: '#4D8B86' }}>
                About Quest-IT
              </h3>
              <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(237, 232, 224, 0.85)' }}>
                Quest-IT is the Information Technology Department's technical committee at VESIT, 
                dedicated to organizing innovative events that challenge and inspire students.
              </p>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(237, 232, 224, 0.85)' }}>
                From hackathons to workshops, Quest-IT creates platforms where brilliant minds collaborate, 
                learn, and build solutions that shape the future of technology.
              </p>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: 'linear-gradient(135deg, #4D8B86, transparent)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
              />
            </TiltCard>
          </motion.div>
          {/* Jade Samurai Image - Sourced from PUBLIC folder */}
          <motion.img
            src={`${import.meta.env.BASE_URL}JadeSamurai.png`}
            alt="Jade Samurai"
            className="absolute w-48 h-auto hidden md:block"
            style={{
              top: '70%',
              right: '-120px',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>

      {/* Parallax sakura petals drifting from hero */}
      <motion.div
        className="absolute top-20 left-1/4 w-3 h-3 rounded-full pointer-events-none"
        style={{ backgroundColor: '#FFC6D0', opacity: 0.6 }}
        animate={{
          y: [0, 300],
          x: [0, 50],
          rotate: [0, 360],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute top-40 right-1/3 w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: '#E99AAA', opacity: 0.5 }}
        animate={{
          y: [0, 400],
          x: [0, -30],
          rotate: [0, -360],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
      />
    </section>
  );
}