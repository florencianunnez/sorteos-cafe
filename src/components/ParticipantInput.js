import React, { useState } from 'react';
import Papa from 'papaparse';

function ParticipantInput({ participants, setParticipants }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddParticipant = () => {
    if (inputValue.trim() === '') return;

    const newName = inputValue.trim();
    
    // Validar duplicados
    if (participants.includes(newName)) {
      alert('⚠️ Este participante ya está en la lista');
      return;
    }

    setParticipants([...participants, newName]);
    setInputValue('');
  };

  const handlePasteFromExcel = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Parsear datos (pueden venir de Excel o CSV)
    const lines = pastedData.split('\n').map(line => line.trim()).filter(line => line);
    
    const uniqueLines = [...new Set(lines)]; // Eliminar duplicados
    const newParticipants = [...participants];
    
    uniqueLines.forEach(line => {
      if (line && !newParticipants.includes(line)) {
        newParticipants.push(line);
      }
    });

    setParticipants(newParticipants);
    setInputValue('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const names = results.data
          .flat()
          .map(name => String(name).trim())
          .filter(name => name && name !== '');
        
        const uniqueNames = [...new Set([...participants, ...names])];
        setParticipants(uniqueNames);
      },
      error: (error) => {
        alert('Error al leer el archivo: ' + error.message);
      }
    });
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleClearAll = () => {
    if (window.confirm('¿Seguro que quieres eliminar todos los participantes?')) {
      setParticipants([]);
      localStorage.removeItem('participants');
    }
  };

  return (
    <div className="card shadow mb-3">
      <div className="card-body">
        <h5 className="card-title">📝 Lista de Participantes</h5>
        
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un nombre o pega desde Excel"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPaste={handlePasteFromExcel}
            onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
          />
          <button 
            className="btn btn-outline-primary" 
            onClick={handleAddParticipant}
          >
            Agregar
          </button>
        </div>

        <div className="mb-3">
          <label className="btn btn-outline-secondary w-100">
            📄 Subir archivo CSV
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="participant-list">
          {participants.length === 0 ? (
            <p className="text-muted text-center">No hay participantes aún</p>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Total: {participants.length} participantes</small>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleClearAll}
                >
                  Limpiar todo
                </button>
              </div>
              <ul className="list-group">
                {participants.map((participant, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {participant}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveParticipant(index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParticipantInput;
