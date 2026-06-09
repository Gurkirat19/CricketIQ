from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route
from .services import provider
from .services.prediction import predict_proba, simulate_outcomes

async def health(request: Request):
    return JSONResponse({"status": "ok"})

async def teams(request: Request):
    data = await provider.list_teams()
    return JSONResponse(data)

async def venues(request: Request):
    data = await provider.list_venues()
    return JSONResponse(data)

async def matches(request: Request):
    data = await provider.list_matches()
    return JSONResponse(data)

async def predict(request: Request):
    payload = await request.json()
    team_a = payload.get("team_a")
    team_b = payload.get("team_b")
    match_format = payload.get("format", "T20")
    toss_winner = payload.get("toss_winner")
    weather = payload.get("weather")
    pitch = payload.get("pitch")
    if not team_a or not team_b:
        return JSONResponse({"error": "team_a and team_b are required"}, status_code=400)
    prob_a, reasons = predict_proba(team_a, team_b, match_format, toss_winner, weather, pitch)
    winning_team = team_a if prob_a >= 0.5 else team_b
    win_prob = prob_a if winning_team == team_a else (1.0 - prob_a)
    return JSONResponse({
        "winning_team": winning_team,
        "win_probability": round(win_prob * 100, 2),
        "confidence": round(abs(prob_a - 0.5) * 200, 2),
        "explanation": reasons,
    })

async def simulate(request: Request):
    payload = await request.json()
    team_a = payload.get("team_a")
    team_b = payload.get("team_b")
    match_format = payload.get("format", "T20")
    toss_winner = payload.get("toss_winner")
    weather = payload.get("weather")
    pitch = payload.get("pitch")
    n_sims = int(payload.get("n_sims", 1000))
    prob_a, _ = predict_proba(team_a, team_b, match_format, toss_winner, weather, pitch)
    dist = simulate_outcomes(prob_a, n_sims)
    return JSONResponse({
        "teams": {"a": team_a, "b": team_b},
        "distribution": {"a": dist["team_a"], "b": dist["team_b"]},
        "histogram": [
            {"bucket": f"{team_a} wins", "count": dist["team_a"]},
            {"bucket": f"{team_b} wins", "count": dist["team_b"]},
        ],
    })

async def compare(request: Request):
    payload = await request.json() if request.method == "POST" else {}
    team_a = payload.get("team_a")
    team_b = payload.get("team_b")
    return JSONResponse({
        "metrics": {
            "Batting Strength": {team_a or "A": 0.0, team_b or "B": 0.0},
            "Bowling Strength": {team_a or "A": 0.0, team_b or "B": 0.0},
            "Fielding Strength": {team_a or "A": 0.0, team_b or "B": 0.0},
            "Recent Form": {team_a or "A": 0.0, team_b or "B": 0.0},
            "Home Record": {team_a or "A": 0.0, team_b or "B": 0.0},
            "Away Record": {team_a or "A": 0.0, team_b or "B": 0.0},
        }
    })

async def analytics(request: Request):
    return JSONResponse({
        "overview": {"total_matches": 0, "teams": 0, "venues": 0, "predictions": 0},
        "charts": {}
    })

async def rag_search(request: Request):
    payload = await request.json()
    question = payload.get("question", "")
    return JSONResponse({"answer": "", "sources": [], "question": question})

async def feature_importance(request: Request):
    return JSONResponse({"features": []})

routes = [
    Route("/health", health),
    Route("/teams", teams),
    Route("/venues", venues),
    Route("/matches", matches),
    Route("/predict", predict, methods=["POST"]),
    Route("/simulate", simulate, methods=["POST"]),
    Route("/compare", compare, methods=["POST"]),
    Route("/analytics", analytics, methods=["POST"]),
    Route("/rag-search", rag_search, methods=["POST"]),
    Route("/feature-importance", feature_importance),
]

app = Starlette(routes=routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
