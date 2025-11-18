const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export const getAllContent = async () => {
  const [bio, social, skills, projects, certs, ach, timeline] = await Promise.all([
    apiGet('/bio'),
    apiGet('/social_links'),
    apiGet('/skills'),
    apiGet('/projects'),
    apiGet('/certifications'),
    apiGet('/achievements'),
    apiGet('/timeline'),
  ]);
  return { bio, social, skills, projects, certs, ach, timeline };
};
