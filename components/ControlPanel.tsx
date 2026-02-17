import React, { useState } from 'react';
import { generateMelody } from '../services/geminiService';

interface ControlPanelProps {
  onMelodyReceived: (melody: { note: string; duration: number }[]) => void;
  isPlaying: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onMelodyReceived, isPlaying }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await generateMelody(prompt);
      onMelodyReceived(result.melody);
    } catch (err: any) {
      setError('Failed to generate melody. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-2xl w-full mx-auto mb-8 border border-white/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🎶 AI Maestro</h2>
      <p className="text-gray-600 mb-4 text-center">
        Ask the AI to compose a melody for you! Try "Twinkle Twinkle Little Star" or "A happy upbeat tune".
      </p>
      
      <form onSubmit={handleGenerate} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Play a sad melody in C major"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
          disabled={loading || isPlaying}
        />
        <button
          type="submit"
          disabled={loading || isPlaying || !prompt.trim()}
          className={`
            px-6 py-3 rounded-xl font-bold text-white transition-all
            ${loading || isPlaying 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg active:scale-95'}
          `}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Composing...
            </span>
          ) : 'Play'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
    </div>
  );
};
