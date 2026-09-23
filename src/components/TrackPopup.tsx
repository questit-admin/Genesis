import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TrackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  track: {
    name: string;
    color: string;
    description: string;
    psDescription?: string;
    problemStatements?: { id: string; title: string; url: string; }[];
  };
}

// === WINNERS DATA STRUCTURE ===
const winners: { [key: string]: string[] } = {
  'AI': [
    'Debt First Search',
    'Griffin Coders',
    'Smurfs'
  ],
  'Sustainability': [
    'Byte Blazers',
    'Dev Dominators',
    'Javings'
  ],
  'CyreneAI': [
    'Attack on Syntax',
    'Marlbros',
    'ABCC',
    'Bot Army'
  ]
};

export function TrackPopup({ isOpen, onClose, track }: TrackPopupProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  // Ensure these images exist in your /public/backgrounds/ folder
  const backgroundImages: { [key: string]: string } = {
    'AI': `${import.meta.env.BASE_URL}backgrounds/ai-bg.jpg`,
    'Sustainability': `${import.meta.env.BASE_URL}backgrounds/fintech-bg.jpg`,
    'CyreneAI': `${import.meta.env.BASE_URL}backgrounds/blockchain-bg.jpg`
  };

  const bgUrl = backgroundImages[track.name];

  const popupStyle = {
    // Using simpler string concatenation for safety
    backgroundImage: bgUrl ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${bgUrl}')` : 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Get winners for current track
  const teams = winners[track.name] || [];
  
  // Determine if this is the CyreneAI track (unranked winners)
  const isCyreneAI = track.name === 'CyreneAI';
  
  // Medal/Trophy configuration
  const getRankingStyle = (index: number) => {
    if (isCyreneAI) {
      // All CyreneAI winners get trophy and gold styling
      return {
        emoji: '🏆',
        color: '#D4A84B',
        bgColor: 'rgba(212, 168, 75, 0.2)',
        label: 'Winner'
      };
    }
    
    // Ranked winners for AI and Sustainability
    switch (index) {
      case 0: // 1st place
        return {
          emoji: '🥇',
          color: '#D4A84B',
          bgColor: 'rgba(212, 168, 75, 0.2)',
          label: '1st'
        };
      case 1: // 2nd place
        return {
          emoji: '🥈',
          color: '#C0C0C0',
          bgColor: 'rgba(192, 192, 192, 0.2)',
          label: '2nd'
        };
      case 2: // 3rd place
        return {
          emoji: '🥉',
          color: '#CD7F32',
          bgColor: 'rgba(205, 127, 50, 0.2)',
          label: '3rd'
        };
      default:
        return {
          emoji: '',
          color: '#D4A84B',
          bgColor: 'rgba(212, 168, 75, 0.2)',
          label: (index + 1).toString()
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl"
            style={{
              ...popupStyle,
              border: `2px solid ${track.color}`,
              color: '#EDE8E0'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Flexbox Header for Title and Close Button */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl md:text-4xl font-bold pr-4" style={{ color: track.color }}>
                {track.name} Track
              </h2>

              <button
                onClick={onClose}
                className="p-2 -mt-2 -mr-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg">{track.description}</p>

                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">PS:</h3>
                  <p className="italic">
                    {track.psDescription || `This is the ${track.name} track. More details coming soon.`}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-4 items-center">
                  {/* Got it button */}
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-3 rounded-lg font-medium outline-none"
                    style={{
                      backgroundColor: '#D4A84B',
                      color: '#0E0E0E',
                      border: '2px solid #D4A84B',
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: "brightness(1.1)",
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    Got it!
                  </motion.button>

                  {/* Download PS Dropdown */}
                  {track.problemStatements && track.problemStatements.length > 0 && (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <motion.button
                        className="px-6 py-3 rounded-lg font-medium outline-none flex items-center gap-2"
                        style={{
                          backgroundColor: '#D4A84B',
                          color: '#0E0E0E',
                          border: '2px solid #D4A84B',
                        }}
                        whileHover={{
                          scale: 1.05,
                          filter: 'brightness(0.95)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Download PS
                        <motion.span
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▼
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-full mr-3 bottom-0 w-72 rounded-xl overflow-hidden shadow-2xl z-50"
                            style={{
                              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 10, 0.98))',
                              border: '1px solid rgba(212, 168, 75, 0.3)',
                              backdropFilter: 'blur(20px)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <div className="p-2">
                              <div className="text-xs uppercase tracking-wider px-3 py-2 text-gray-400 font-semibold">
                                Problem Statements
                              </div>
                              {track.problemStatements.map((ps, index) => (
                                <button
                                  key={ps.id}
                                  className="w-full text-left px-3 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group"
                                  style={{
                                    marginTop: index > 0 ? '4px' : '0',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(212, 168, 75, 0.15)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                  }}
                                  onClick={() => {
                                    window.open(ps.url, '_blank');
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                                    style={{
                                      backgroundColor: 'rgba(212, 168, 75, 0.2)',
                                      color: '#D4A84B',
                                    }}
                                  >
                                    {ps.id}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-white">{ps.title}</span>
                                    <span className="text-xs text-gray-400">Click to download</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* === UPDATED: Show Winners Button === */}
                  {teams.length > 0 && (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsTeamsOpen(true)}
                      onMouseLeave={() => setIsTeamsOpen(false)}
                    >
                      <motion.button
                        className="px-6 py-3 rounded-lg font-medium outline-none flex items-center gap-2"
                        style={{
                          backgroundColor: '#D4A84B',
                          color: '#0E0E0E',
                          border: '2px solid #D4A84B',
                        }}
                        whileHover={{
                          scale: 1.05,
                          filter: 'brightness(0.95)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                      >
                        Show Winners
                        <motion.span
                          animate={{ rotate: isTeamsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▼
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {isTeamsOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-[60]" 
                              onClick={() => setIsTeamsOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute right-full mr-3 bottom-0 w-80 rounded-xl shadow-2xl z-[70]"
                              style={{
                                background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 10, 0.98))',
                                border: '1px solid rgba(212, 168, 75, 0.3)',
                                backdropFilter: 'blur(20px)',
                                maxHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="text-xs uppercase tracking-wider px-8 py-3 text-gray-400 font-semibold border-b border-white/10">
                                {isCyreneAI ? 'Winners' : 'Top 3 Winners'}
                              </div>
                              <div 
                                className="overflow-y-auto p-2"
                                style={{
                                  flex: '1 1 auto',
                                  minHeight: 0
                                }}
                              >
                                {teams.map((team, index) => {
                                  const rankStyle = getRankingStyle(index);
                                  return (
                                    <div
                                      key={index}
                                      className="px-3 py-3 rounded-lg transition-all duration-200"
                                      style={{
                                        marginTop: index > 0 ? '4px' : '0',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(212, 168, 75, 0.15)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                      }}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                                          style={{
                                            backgroundColor: rankStyle.bgColor,
                                            color: rankStyle.color,
                                          }}
                                        >
                                          {rankStyle.emoji}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                          <span 
                                            className="font-bold text-sm mb-0.5"
                                            style={{ color: rankStyle.color }}
                                          >
                                            {!isCyreneAI && `${rankStyle.label} Place`}
                                            {isCyreneAI && 'Winner'}
                                          </span>
                                          <span className="font-medium text-white text-sm truncate">{team}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
