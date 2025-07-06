import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import riddles from '../data/riddles';
import checkImg from '../assets/v.png'; // solved
import xImg from '../assets/x.png';     // unsolved

export default function MapPage() {
  const navigate = useNavigate();
  const solved = JSON.parse(localStorage.getItem('solvedRiddles') || '[]');
  console.log("🚀 ~ MapPage ~ solved:", solved)
  const visibleRiddles = riddles.filter(r => r.position);
  console.log("🚀 ~ MapPage ~ visibleRiddles:", visibleRiddles)

  return (
    <div className="map-container">
      <div className="map-background" />

      <div className="map-content">
        <button
          className='map-page-button back'
          onClick={() => navigate('/')}
        >
          ← להתחלה
        </button>
        {solved.length-1 === visibleRiddles.length && (
          <motion.button
            className="map-page-button final"
            onClick={() => navigate('/final')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            סיום
          </motion.button>
        )}
        {/* Map Riddle Dots */}
        {visibleRiddles.map((r, index) => (
          <motion.div
            key={r.id}
            className={`map-dot ${solved.includes(r.id) ? 'solved' : ''}`}
            style={{
              top: r.position.top,
              left: r.position.left,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/riddle/${r.id}`)}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + Math.random() * 0.6, duration: 0.6 }}
          >
            <div className="dot-circle">
              <img
                src={solved.includes(r.id) ? checkImg : xImg}
                alt={solved.includes(r.id) ? 'Solved' : 'Not Solved'}
                className='dot-image'
              />
            </div>
            <div className="dot-label">{r.location}</div>
          </motion.div>
        ))}


      </div>
    </div>
  );
}
