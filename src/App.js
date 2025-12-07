import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ParticipantInput from './components/ParticipantInput';
import PodiumSelector from './components/PodiumSelector';
import WinnerCards from './components/WinnerCards';

function App() {
  const [participants, setParticipants] = useState([]);
  const [numPodiums, setNumPodiums] = useState(1);
  const [winners, setWinners] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Cargar participantes desde localStorage
  useEffect(() => {
    const savedParticipants = localStorage.getItem('participants');
    if (savedParticipants) {
      setParticipants(JSON.parse(savedParticipants));
    }
  }, []);

  // Guardar participantes en localStorage
  useEffect(() => {
    if (participants.length > 0) {
      localStorage.setItem('participants', JSON.stringify(participants));
    }
  }, [participants]);

  const handleSorteo = () => {
    if (participants.length < numPodiums) {
      alert(`Necesitas al menos ${numPodiums} participantes para ${numPodiums} podios`);
      return;
    }

    // Algoritmo de sorteo aleatorio sin repetición
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const selectedWinners = shuffled.slice(0, numPodiums).map((name, index) => ({
      position: index + 1,
      name: name
    }));

    setWinners(selectedWinners);
    setShowConfetti(true);

    // Guardar resultados en localStorage
    localStorage.setItem('lastWinners', JSON.stringify({
      date: new Date().toISOString(),
      winners: selectedWinners
    }));

    // Detener confeti después de 5 segundos
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="App">
      <Navbar />
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ParticipantInput 
              participants={participants}
              setParticipants={setParticipants}
            />
            
            <PodiumSelector 
              numPodiums={numPodiums}
              setNumPodiums={setNumPodiums}
            />

            <button 
              className="btn btn-primary btn-lg w-100 mt-3"
              onClick={handleSorteo}
              disabled={participants.length === 0}
            >
              🎲 ¡REALIZAR SORTEO! 🎲
            </button>
          </div>

          <div className="col-md-6">
            <WinnerCards 
              winners={winners}
              showConfetti={showConfetti}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
