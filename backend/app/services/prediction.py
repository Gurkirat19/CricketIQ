from __future__ import annotations
from typing import Dict, List, Tuple
from math import exp
import random

TEAM_STRENGTH = {
    "India": 92,
    "Australia": 90,
    "England": 86,
    "Pakistan": 82,
    "South Africa": 84,
    "New Zealand": 83,
    "Sri Lanka": 74,
    "Bangladesh": 70,
    "Afghanistan": 69,
    "West Indies": 72,
}

FORMAT_FACTOR = {"T20": 1.0, "ODI": 1.0, "Test": 0.95}

WEATHER_IMPACT = {
    "Sunny": 1.0,
    "Cloudy": 0.98,
    "Overcast": 0.96,
    "Humid": 0.99,
    "Dry": 1.01,
}

PITCH_IMPACT = {
    "Flat": 1.02,
    "Batting": 1.02,
    "Bowling": 0.98,
    "Green": 0.97,
    "Turning": 0.99,
}

def _team_score(team: str) -> float:
    return TEAM_STRENGTH.get(team, 75)

def _adv_modifier(toss_winner: str | None, team_a: str, team_b: str) -> Tuple[float, float]:
    if toss_winner == team_a:
        return 1.02, 0.99
    if toss_winner == team_b:
        return 0.99, 1.02
    return 1.0, 1.0

def predict_proba(team_a: str, team_b: str, match_format: str, toss_winner: str | None, weather: str | None, pitch: str | None) -> Tuple[float, List[str]]:
    a = _team_score(team_a)
    b = _team_score(team_b)
    fa, fb = _adv_modifier(toss_winner, team_a, team_b)
    fmt = FORMAT_FACTOR.get(match_format or "T20", 1.0)
    w = WEATHER_IMPACT.get((weather or "Sunny"), 1.0)
    p = PITCH_IMPACT.get((pitch or "Flat"), 1.0)

    a_score = a * fa * fmt * w * p
    b_score = b * fb * fmt * w * p

    prob_a = 1.0 / (1.0 + exp(-(a_score - b_score) / 12.0))

    reasons: List[str] = []
    if a > b:
        reasons.append("Better recent form")
    else:
        reasons.append("Stronger opponent recent form")
    if fa > fb:
        reasons.append("Toss advantage")
    if p > 1.0:
        reasons.append("Favorable batting conditions")
    else:
        reasons.append("Bowling-friendly pitch conditions")
    if fmt < 1.0:
        reasons.append("Long-format variability")

    return float(prob_a), reasons

def simulate_outcomes(prob_a: float, n_sims: int) -> Dict[str, int]:
    a_wins = 0
    for _ in range(n_sims):
        if random.random() < prob_a:
            a_wins += 1
    b_wins = n_sims - a_wins
    return {"team_a": a_wins, "team_b": b_wins}
