const base = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function getTeams() {
  const res = await fetch(`${base}/teams`)
  return res.json()
}

export async function getVenues() {
  const res = await fetch(`${base}/venues`)
  return res.json()
}

export async function predict(payload: any) {
  const res = await fetch(`${base}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function simulate(payload: any) {
  const res = await fetch(`${base}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}
