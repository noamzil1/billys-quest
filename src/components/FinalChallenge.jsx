import { useState } from 'react';
import finalImg from '../assets/11.png';

export default function FinalChallenge() {
  const [input, setInput] = useState('');
  const [success, setSuccess] = useState(false);
  const correctAnswer = '0549795810';

  return (
    <div className="final" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
      {!success ? (
        <div>
          <>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              השלמתם את כל הנקודות על המפה ופיסות המידע מתחילות להרכיב את הסיפור השלם של המסע שלי.
              <br />
              הגיע הזמן לחשוף בפניכם את הדף האחרון ביומן:
            </p>

            <img src={finalImg} alt="Final Page" style={{ width: '100%', maxWidth: '500px', margin: '1rem 0' }} />

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="הכניסו את המספר"
              style={{ padding: '0.5rem 1rem', fontSize: '1rem', width: '100%', maxWidth: '300px' }}
            />

            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => setSuccess(input === correctAnswer)}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#7b4f09',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                שלח
              </button>
            </div>
          </>
        </div>
      ) : (
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          <p>אם הגעתם עד לכאן, כנראה שאתם הראויים ביותר לשמוע איך הסיפור שלי נגמר.</p>
          <p>
            תשלחו הודעה עם הטקסט "<strong>בילי, אנחנו מוכנים</strong>" למספר הזה:
            <br />
            <strong>{correctAnswer}</strong>
          </p>
          <p>מבטיח לספר הכל.<br />עד אז,<br />אהוי!</p>
        </div>
      )}
    </div>
  );
}
