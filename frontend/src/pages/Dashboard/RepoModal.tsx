import React, { useState } from "react";
import ModalBtn from "../../components/common/ModalBtn";

function RepoModal({ content }: { content: string | React.ReactElement }) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const closeModal = () => {
    // Close the current modal by accessing the dialog element and calling close()
    const modal = document.getElementById('modal') as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-3">Crear Nuevo Proyecto</h2>
      <p className="text-gray-400 mb-4">
        Selecciona la fuente del código que deseas documentar. Puedes conectar
        directamente con un repositorio de GitHub o subir archivos desde tu ordenador.
      </p>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div 
          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-all ${
            selectedSource === 'github' ? 'border-purple-500 bg-purple-900 bg-opacity-10' : 'border-gray-700 hover:border-purple-500 hover:bg-purple-900 hover:bg-opacity-5'
          }`}
          onClick={() => setSelectedSource('github')}
        >
          <div className="text-3xl">📦</div>
          <div className="font-semibold text-center">Repositorio GitHub</div>
          <div className="text-xs text-center text-gray-400">
            Conecta y documenta cualquier repositorio público o privado
          </div>
        </div>

        <div 
          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-all ${
            selectedSource === 'local' ? 'border-purple-500 bg-purple-900 bg-opacity-10' : 'border-gray-700 hover:border-purple-500 hover:bg-purple-900 hover:bg-opacity-5'
          }`}
          onClick={() => setSelectedSource('local')}
        >
          <div className="text-3xl">💻</div>
          <div className="font-semibold text-center">Archivos Locales</div>
          <div className="text-xs text-center text-gray-400">
            Sube carpetas o archivos directamente desde tu computadora
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button 
          className="btn px-4 py-2 bg-transparent border border-gray-700 rounded text-gray-400 hover:bg-gray-800"
          onClick={closeModal}
        >
          Cancelar
        </button>
        
        {selectedSource && (
          <ModalBtn 
            btnText="Continuar" 
            content={selectedSource === 'github' ? content : "Content para subir archivos"} 
            id={selectedSource === 'github' ? "github-repo-modal" : "local-files-modal"} 
            title={selectedSource === 'github' ? "Conectar con GitHub" : "Subir archivos"}
          />
        )}
      </div>
    </div>
  );
}

export default RepoModal;