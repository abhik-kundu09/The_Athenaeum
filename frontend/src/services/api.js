const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.errors = data.errors || [];
    throw error;
  }
  return data;
}

export const bookApi = {
  async getAll(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);
    if (params.sort) searchParams.append('sort', params.sort);
    
    const response = await fetch(`${API_BASE_URL}/books?${searchParams.toString()}`);
    return handleResponse(response);
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse(response);
  },

  async create(bookData) {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  async update(id, bookData) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  async search(query, params = {}) {
    const searchParams = new URLSearchParams({ q: query });
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);
    
    const response = await fetch(`${API_BASE_URL}/books/search?${searchParams.toString()}`);
    return handleResponse(response);
  },

  async toggleFavorite(id) {
    const response = await fetch(`${API_BASE_URL}/books/${id}/favorite`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },
};