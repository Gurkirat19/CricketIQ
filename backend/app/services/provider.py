from __future__ import annotations
import os
from typing import List, Dict, Any
import httpx
def _provider_name() -> str:
    return (os.getenv("CRICKETIQ_PROVIDER") or "cricapi").lower()

async def _fetch_cricapi(endpoint: str, params: Dict[str, Any] | None = None) -> Dict[str, Any]:
    key = os.getenv("CRICAPI_KEY")
    if not key:
        return {"status": "error", "error": "missing_key"}
    url = f"https://api.cricapi.com/v1/{endpoint}"
    q = {"apikey": key}
    if params:
        q.update(params)
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(url, params=q)
        r.raise_for_status()
        return r.json()

async def _fetch_sportmonks(path: str, params: Dict[str, Any] | None = None) -> Dict[str, Any]:
    token = os.getenv("SPORTMONKS_API_TOKEN")
    if not token:
        return {"status": "error", "error": "missing_token"}
    base = "https://cricket.sportmonks.com/api/v2.0"
    q = {"api_token": token}
    if params:
        q.update(params)
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(f"{base}/{path.lstrip('/')}", params=q)
        r.raise_for_status()
        return r.json()

async def list_teams() -> List[Dict[str, Any]]:
    provider = _provider_name()
    try:
        if provider == "cricapi":
            data = await _fetch_cricapi("countries")
            if isinstance(data, dict) and data.get("status") == "success":
                items = data.get("data", [])
                teams = [
                    {"name": it.get("name"), "code": it.get("id")}
                    for it in items if it.get("name")
                ]
                return teams
        elif provider == "sportmonks":
            data = await _fetch_sportmonks("teams", {"per_page": 200})
            items = data.get("data", []) if isinstance(data, dict) else []
            teams = [
                {"name": it.get("name"), "code": (it.get("code") or it.get("id"))}
                for it in items if it.get("name")
            ]
            return teams
    except Exception:
        return []
    return []

async def list_venues() -> List[Dict[str, Any]]:
    provider = _provider_name()
    try:
        if provider == "sportmonks":
            data = await _fetch_sportmonks("venues", {"per_page": 200})
            items = data.get("data", []) if isinstance(data, dict) else []
            venues = [
                {
                    "name": it.get("name"),
                    "city": it.get("city"),
                    "country": it.get("country"),
                }
                for it in items if it.get("name")
            ]
            return venues
        # CricAPI venue endpoint coverage varies; not all data available in v1
    except Exception:
        return []
    return []

async def list_matches(limit: int = 50) -> List[Dict[str, Any]]:
    provider = _provider_name()
    try:
        if provider == "cricapi":
            data = await _fetch_cricapi("matches", {"offset": 0})
            items = data.get("data", []) if isinstance(data, dict) else []
            out = []
            for it in items[:limit]:
                out.append({
                    "match_date": it.get("date"),
                    "format": it.get("matchType"),
                    "team_a": it.get("teams", [None, None])[0],
                    "team_b": it.get("teams", [None, None])[1],
                    "venue": it.get("venue"),
                })
            return out
        elif provider == "sportmonks":
            data = await _fetch_sportmonks(
                "fixtures",
                {"per_page": limit, "include": "localteam,visitorteam,venue"},
            )
            items = data.get("data", []) if isinstance(data, dict) else []
            out = []
            for it in items:
                out.append({
                    "match_date": it.get("starting_at"),
                    "format": it.get("type"),
                    "team_a": ((it.get("localteam") or {}) or {}).get("name"),
                    "team_b": ((it.get("visitorteam") or {}) or {}).get("name"),
                    "venue": ((it.get("venue") or {}) or {}).get("name"),
                })
            return out
    except Exception:
        return []
    return []
