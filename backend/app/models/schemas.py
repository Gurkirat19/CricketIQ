from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class TeamOut(BaseModel):
    id: Optional[int] = None
    name: str
    code: Optional[str] = None

class VenueOut(BaseModel):
    id: Optional[int] = None
    name: str
    city: Optional[str] = None
    country: Optional[str] = None

class MatchOut(BaseModel):
    id: Optional[int] = None
    match_date: Optional[str] = None
    format: Optional[str] = None
    venue_id: Optional[int] = None
    team_a_id: Optional[int] = None
    team_b_id: Optional[int] = None
    toss_winner_id: Optional[int] = None
    weather: Optional[str] = None
    pitch: Optional[str] = None
    team_a_score: Optional[int] = None
    team_b_score: Optional[int] = None
    winning_team_id: Optional[int] = None

class PredictInput(BaseModel):
    team_a: str
    team_b: str
    venue: Optional[str] = None
    format: str
    toss_winner: Optional[str] = None
    weather: Optional[str] = None
    pitch: Optional[str] = None

class PredictOutput(BaseModel):
    winning_team: str
    win_probability: float
    confidence: float
    explanation: List[str]

class SimulationInput(PredictInput):
    n_sims: int = Field(1000, ge=1, le=50000)

class SimulationOutput(BaseModel):
    distribution: Dict[str, int]
    histogram: List[Dict[str, Any]]

class CompareInput(BaseModel):
    team_a: str
    team_b: str

class CompareOutput(BaseModel):
    metrics: Dict[str, Dict[str, float]]

class AnalyticsInput(BaseModel):
    team: Optional[str] = None
    venue: Optional[str] = None
    format: Optional[str] = None

class AnalyticsOutput(BaseModel):
    overview: Dict[str, int]
    charts: Dict[str, Any]

class RagSearchRequest(BaseModel):
    question: str

class RagSearchResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]

class FeatureImportanceOut(BaseModel):
    features: List[Dict[str, float]]
