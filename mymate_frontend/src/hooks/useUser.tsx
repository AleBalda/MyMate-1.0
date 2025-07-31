// src/hooks/useUser.ts

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';
const USER_ID = 'testuser';

// --- TIPI DI DATI ---
export interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserData {
  gems: number;
  streak: number;
  daily_goals: Goal[];
}

interface EventResponse {
  message: string;
  updated_user_data: UserData;
}


export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Usiamo l'endpoint GET per il caricamento iniziale, che ora gestisce anche il login
  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<UserData>(`${API_URL}/api/user/${USER_ID}`);
      setUser(response.data);
    } catch (error) {
      console.error("Errore durante il fetch dei dati utente:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // La funzione per triggerare eventi viene stabilizzata con useCallback
  const triggerGamificationEvent = useCallback(async (eventType: string) => {
    console.log(`Tentativo di triggerare l'evento: ${eventType}`);
    try {
      const response = await axios.post<EventResponse>(
        `${API_URL}/api/gamify/trigger-event/${USER_ID}`,
        { eventType }
      );
      // Aggiorniamo lo stato con i dati di ritorno
      setUser(response.data.updated_user_data);
      // Usiamo l'alert per una notifica immediata
      alert(response.data.message);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Errore sconosciuto";
      alert(`Errore: ${errorMessage}`);
    }
  }, []);

  return { user, isLoading, triggerGamificationEvent, notification, setNotification };
}