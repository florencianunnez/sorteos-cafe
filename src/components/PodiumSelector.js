import React from 'react';

function PodiumSelector({ numPodiums, setNumPodiums }) {
  return (
    <div className="card shadow mb-3">
      <div className="card-body">
        <h5 className="card-title">🏆 Número de Podios</h5>
        <p className="text-muted">Selecciona cuántos ganadores quieres (máximo 6)</p>
        
        <div className="d-flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className={`btn ${numPodiums === num ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setNumPodiums(num)}
              style={{ flex: '1 0 30%' }}
            >
              {num} {num === 1 ? 'Podio' : 'Podios'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PodiumSelector;
