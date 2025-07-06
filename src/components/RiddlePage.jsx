import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import riddles from '../data/riddles';

export default function RiddlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const riddle = riddles.find(r => r.id === Number(id));

  const isTrivia = riddle?.id === 9;

  const [input, setInput] = useState(isTrivia ? Array(5).fill('') : '');
  const [error, setError] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [hintState, setHintState] = useState({
    easy: false,
    medium: false,
    answer: false,
  });

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedRiddles') || '[]');
    if (riddle) {
      setIsSolved(solved.includes(riddle.id));
    }
  }, [riddle?.id]);

  const handleSubmit = () => {
    if (!riddle) return;

    // Trivia logic (riddle 9)
    if (isTrivia) {
      const userAnswers = input.map(ans => ans.trim().toLowerCase());
      const correctAnswers = riddle.answer.map(ans => ans.toLowerCase());
      const allCorrect = userAnswers.every((ans, i) => ans === correctAnswers[i]);

      if (!allCorrect) {
        setError('יש לפחות תשובה אחת שגויה');
        return;
      }
    } else {
      const trimmed = input.trim().toLowerCase();
      const possibleAnswers = Array.isArray(riddle.answer)
        ? riddle.answer
        : [riddle.answer];
      const isCorrect = possibleAnswers.some(ans => trimmed === ans.toLowerCase());

      if (!isCorrect) {
        setError('לא, זה לא נכון...');
        return;
      }
    }

    const solved = JSON.parse(localStorage.getItem('solvedRiddles') || '[]');
    const digits = JSON.parse(localStorage.getItem('collectedDigits') || '[]');

    if (!solved.includes(riddle.id)) {
      localStorage.setItem('solvedRiddles', JSON.stringify([...solved, riddle.id]));

      if (riddle.isIntro) {
        navigate('/intro/step3');
        return;
      }

      localStorage.setItem('collectedDigits', JSON.stringify([...digits, riddle.digit]));
    }

    setIsSolved(true);
    setError('');
  };

  const unlockHint = (level) => {
    setHintState(prev => ({ ...prev, [level]: true }));

    if (level === 'answer' && !isSolved) {
      const solved = JSON.parse(localStorage.getItem('solvedRiddles') || '[]');
      const digits = JSON.parse(localStorage.getItem('collectedDigits') || '[]');
      if (!solved.includes(riddle.id)) {
        localStorage.setItem('solvedRiddles', JSON.stringify([...solved, riddle.id]));
        if (!riddle.isIntro) {
          localStorage.setItem('collectedDigits', JSON.stringify([...digits, riddle.digit]));
        }
      }
      setIsSolved(true);
      setError('');
    }
  };

  if (!riddle) return <div>Riddle not found.</div>;

  return (
    <div className="riddle">
      <div className="riddle-con">
        {!riddle.isIntro && (
          <button onClick={() => navigate('/map')} className="back-btn">למפה ←</button>
        )}

        <h2 className="riddle-title">{riddle.location}</h2>

        {isSolved ? (
          <>
            <p className="answer">
              <strong>תשובה:</strong>{' '}
              {Array.isArray(riddle.answer) ? riddle.answer[0] : riddle.answer}
            </p>

            {riddle.successText && (
              <div className="success-text">
                {Array.isArray(riddle.successText)
                  ? riddle.successText.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{riddle.successText}</p>}
              </div>
            )}

            {riddle.successImage && (
              <img
                src={riddle.successImage}
                alt="Riddle success"
                className="success-img"
              />
            )}
          </>
        ) : (
          <>
            <div className="riddle-container">
              <div className={`riddle-question ${riddle.image ? 'with-image' : 'full-width'}`}>
                {Array.isArray(riddle.question)
                  ? riddle.question.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{riddle.question}</p>}
              </div>

              {riddle.image && (
                <div className='riddle-img-conatiner'>
                  <img
                    src={riddle.image}
                    alt="Riddle"
                    className="riddle-img"
                  />
                </div>
              )}
            </div>

            <div className="riddle-submit-container">
              {isTrivia ? (
                <>
                  {input.map((val, i) => (
                    <input
                      key={i}
                      value={val}
                      onChange={e => {
                        const updated = [...input];
                        updated[i] = e.target.value;
                        setInput(updated);
                      }}
                      className="riddle-input"
                      placeholder={`שאלה ${i + 1}`}
                      style={{ display: 'block', marginBottom: '0.5rem' }}
                    />
                  ))}
                  <button onClick={handleSubmit} className="riddle-submit-btn">הגישו</button>
                </>
              ) : (
                <>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="riddle-input"
                    placeholder="תשובה"
                  />
                  <button onClick={handleSubmit} className="riddle-submit-btn">הגישו</button>
                </>
              )}
              {error && <p className="error">{error}</p>}
            </div>
          </>
        )}

        {!isSolved && (
          <div className="hints-container">
            <div className="hints-btns-container">
              <h3 className="hint-title">צריכים רמז?</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="hint-btn" onClick={() => unlockHint('easy')} disabled={hintState.easy}>
                  רמז 1
                </button>
                <button className="hint-btn" onClick={() => unlockHint('medium')} disabled={!hintState.easy || hintState.medium}>
                  רמז 2
                </button>
                <button className="hint-btn" onClick={() => unlockHint('answer')} disabled={!hintState.medium || hintState.answer}>
                  פתרון
                </button>
              </div>
            </div>

            <div className="hints-text">
              {hintState.easy && riddle.hints?.easy && <p><strong>רמז 1:</strong> {riddle.hints.easy}</p>}
              {hintState.medium && riddle.hints?.medium && <p><strong>רמז 2:</strong> {riddle.hints.medium}</p>}
              {hintState.answer && riddle.hints?.answer && <p><strong>פתרון:</strong> {riddle.hints.answer}</p>}
            </div>
          </div>
        )}

        {riddle.isIntro && isSolved && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="start-button" onClick={() => navigate('/map')}>למפה</button>
          </div>
        )}
      </div>
    </div>
  );
}
