import type { DeezerTrack } from "./types";

export async function create(selection: DeezerTrack) {
  const response = await fetch('/api/create', {
    method: 'POST',
    body: JSON.stringify({ selection }),
    headers: {
      'content-type': 'application/json'
    }
  })

  return await response.json();
}

export async function search(q: string) {
  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({ q }),
    headers: {
      'content-type': 'application/json'
    }
  })

  return await response.json();
}
