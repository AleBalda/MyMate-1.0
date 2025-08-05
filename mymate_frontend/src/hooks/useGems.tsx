// src/hooks/useGems.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';
const USER_ID = 'testuser';

interface UseGemsReturn {
  gems: number;
  triggerGamificationEvent: (eventType: string) => Promise<void>; // Nome più generico
  isLoading: boolean;
}

// Interfaccia per la risposta del backend
interface GamificationResponse {
    gems: number;
    change: number;
}

export function useGems(): UseGemsReturn {
  const [gems, setGems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialGems = async () => {
      try {
        const response = await axios.get<{ gems: number }>(`${API_URL}/api/user/${USER_ID}/gems`);
        setGems(response.data.gems);
      } catch (error) {
        console.error("Errore nel recuperare le gemme iniziali:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialGems();
  }, []);

 
  const triggerGamificationEvent = async (eventType: string): Promise<void> => {
    console.log(`Tentativo di triggerare l'evento: ${eventType}`);
    try {
      const response = await axios.post<GamificationResponse>(
        `${API_URL}/api/gamify/trigger-event/${USER_ID}`, 
        { eventType: eventType } // Invia il nome dell'evento al backend
      );
      setGems(response.data.gems);
      alert(`Evento '${eventType}' completato! Variazione gemme: ${response.data.change}. Nuovo totale: ${response.data.gems}`);
    } catch (error: any) {
      // Gestisce gli errori, come "gemme insufficienti"
      const errorMessage = error.response?.data?.detail || "Errore sconosciuto";
      console.error(`Errore nell'evento '${eventType}':`, errorMessage);
      alert(`Errore: ${errorMessage}`);
    }
  };

  return { gems, triggerGamificationEvent, isLoading };
}