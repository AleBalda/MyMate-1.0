# mymate1.0-backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, timedelta
import json
import os

app = FastAPI()

# --- Configurazione CORS ---
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dati di Partenza per il Test ---
# Ad ogni riavvio del server, i dati ripartiranno da questo stato per facilitare i test.
INITIAL_DB_STATE = {
    "users": {
        "testuser": {
            "gems": 150,
            "streak": 1,
            "last_login_date": date.today().isoformat(),
            "daily_goals": [
                {"id": "daily_login", "text": "Effettua il login oggi", "completed": False},
                {"id": "pomodoro_1min", "text": "Completa 1 min di studio con il Pomodoro", "completed": False},
                {"id": "quiz_1", "text": "Termina un quiz", "completed": False}
            ]
        }
    }
}
# Usiamo una copia dello stato iniziale per non modificare l'originale
db_data = INITIAL_DB_STATE.copy()


# --- Centralina Eventi ---
GAMIFICATION_EVENTS = {
    'TEST_ADD_GEMS': 10,
    'COMPLETE_DAILY_GOAL': 5,
}

# --- Modelli Pydantic per le Richieste ---
class GamificationEventRequest(BaseModel):
    eventType: str


@app.on_event("startup")
async def startup_event():
    """Questa funzione si esegue all'avvio del server e resetta i dati."""
    global db_data
    db_data = INITIAL_DB_STATE.copy()
    print("Server avviato, dati di test resettati.")

@app.get("/api/user/{user_id}")
def get_user_data(user_id: str):
    """
    Endpoint per ottenere tutti i dati dell'utente.
    Completa automaticamente l'obiettivo di login se non è già stato fatto.
    """
    user = db_data["users"].get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utente non trovato")
    
    login_goal = next((g for g in user["daily_goals"] if g["id"] == "daily_login"), None)
    if login_goal and not login_goal["completed"]:
        login_goal["completed"] = True
        reward = GAMIFICATION_EVENTS.get('COMPLETE_DAILY_GOAL', 0)
        user["gems"] += reward
        print(f"Obiettivo 'daily_login' completato. Ricompensa: +{reward} gemme.")
            
    return user


@app.post("/api/gamify/trigger-event/{user_id}")
def trigger_gamification_event(user_id: str, request: GamificationEventRequest):
    """Endpoint generico per completare obiettivi tramite eventi."""
    global db_data
    user = db_data["users"].get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utente non trovato")

    event_to_goal_id = {
        'COMPLETE_POMODORO_1MIN': 'pomodoro_1min',
        'COMPLETE_QUIZ': 'quiz_1'
    }
    
    goal_id_to_complete = event_to_goal_id.get(request.eventType)
    if not goal_id_to_complete:
        raise HTTPException(status_code=400, detail=f"Evento '{request.eventType}' non mappato a un obiettivo.")

    goal_found = False
    for goal in user["daily_goals"]:
        if goal["id"] == goal_id_to_complete and not goal["completed"]:
            goal["completed"] = True
            goal_found = True
            
            reward = GAMIFICATION_EVENTS.get('COMPLETE_DAILY_GOAL', 0)
            user["gems"] += reward
            print(f"Obiettivo '{goal_id_to_complete}' completato da '{user_id}'. Ricompensa: +{reward} gemme.")
            
            return {
                "message": f"Obiettivo completato! Hai guadagnato {reward} gemme.",
                "updated_user_data": {
                    "gems": user["gems"],
                    "streak": user["streak"],
                    "daily_goals": user["daily_goals"]
                }
            }

    if not goal_found:
        raise HTTPException(status_code=400, detail="Obiettivo non trovato o già completato.")