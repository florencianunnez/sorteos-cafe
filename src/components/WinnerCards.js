import React from 'react';
import Confetti from 'react-confetti';

function WinnerCards({ winners, showConfetti }) {
  const getMedal = (position) => {
    const medals = {
      1: '🥇',
      2: '🥈',
      3: '🥉',
      4: '🏅',
      5: '🏅',
      6: '🏅'
    };
    return medals[position] || '🏅';
  };

  const getPositionText = (position) => {
    const positions = {
      1: 'PRIMER LUGAR',
      2: 'SEGUNDO LUGAR',
      3: 'TERCER LUGAR',
      4: 'CUARTO LUGAR',
      5: 'QUINTO LUGAR',
      6: 'SEXTO LUGAR'
    };
    return positions[position] || `LUGAR ${position}`;
  };

  if (winners.length === 0) {
    return (
      <div className="text-center text-white-custom mt-5">
        <h3>🎲 Realiza un sorteo para ver los ganadores 🎲</h3>
      </div>
    );
  }

  return (
    <div className="winners-container">
      {showConfetti && winners.length > 0 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <h3 className="text-center text-white-custom mb-4">🎉 ¡GANADORES! 🎉</h3>

      {winners.map((winner) => (
        <div
          key={winner.position}
          className={`winner-card card shadow-lg mb-3 ${winner.position === 1 ? 'first-place' : ''}`}
        >
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span className="medal">{getMedal(winner.position)}</span>
              <div className="flex-grow-1 mx-3">
                <h6 className="position-text mb-1">{getPositionText(winner.position)}</h6>
                <h4 className={`winner-name mb-0 ${winner.position === 1 ? 'graffiti-animation' : ''}`}>
                  {winner.name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WinnerCards;
