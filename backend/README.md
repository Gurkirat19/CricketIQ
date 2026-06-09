# Backend Usage

Set one provider via env:

- CRICKETIQ_PROVIDER=cricapi with CRICAPI_KEY
- or CRICKETIQ_PROVIDER=sportmonks with SPORTMONKS_API_TOKEN

Endpoints:
- GET /teams, /venues, /matches (provider-backed; no scraping)
- POST /predict, /simulate (placeholder logic; to be replaced with XGBoost/LightGBM ensemble)
