import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || '/api';
const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('inv_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers?.Authorization;
  }
  return config;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoriesAPI = {
  list:   ()           => api.get('/inv/categories'),
  get:    (id)         => api.get(`/inv/categories/${id}`),
  create: (data)       => api.post('/inv/categories', data),
  update: (id, data)   => api.put(`/inv/categories/${id}`, data),
  remove: (id)         => api.delete(`/inv/categories/${id}`),
};

// ─── Items ────────────────────────────────────────────────────────────────────
export const itemsAPI = {
  list:       (params)   => api.get('/inv/items', { params }),
  get:        (id)       => api.get(`/inv/items/${id}`),
  create:     (data)     => api.post('/inv/items', data),
  update:     (id, data) => api.put(`/inv/items/${id}`, data),
  deactivate: (id)       => api.delete(`/inv/items/${id}`),
};

// ─── Suppliers ────────────────────────────────────────────────────────────────
export const suppliersAPI = {
  list:       (params)   => api.get('/inv/suppliers', { params }),
  get:        (id)       => api.get(`/inv/suppliers/${id}`),
  create:     (data)     => api.post('/inv/suppliers', data),
  update:     (id, data) => api.put(`/inv/suppliers/${id}`, data),
  deactivate: (id)       => api.delete(`/inv/suppliers/${id}`),
};

// ─── Tax Classes ──────────────────────────────────────────────────────────────
export const taxClassesAPI = {
  list:       ()               => api.get('/inv/tax-classes'),
  get:        (id)             => api.get(`/inv/tax-classes/${id}`),
  create:     (data)           => api.post('/inv/tax-classes', data),
  update:     (id, data)       => api.put(`/inv/tax-classes/${id}`, data),
  remove:     (id)             => api.delete(`/inv/tax-classes/${id}`),
  addRate:    (id, data)       => api.post(`/inv/tax-classes/${id}/rates`, data),
  updateRate: (id, rId, data)  => api.put(`/inv/tax-classes/${id}/rates/${rId}`, data),
  deleteRate: (id, rId)        => api.delete(`/inv/tax-classes/${id}/rates/${rId}`),
};

// ─── Approval Levels ──────────────────────────────────────────────────────────
export const approvalLevelsAPI = {
  list:    (requestType) => api.get('/inv/approval-levels', requestType ? { params: { requestType } } : {}),
  get:     (id)          => api.get(`/inv/approval-levels/${id}`),
  create:  (data)        => api.post('/inv/approval-levels', data),
  update:  (id, data)    => api.put(`/inv/approval-levels/${id}`, data),
  remove:  (id)          => api.delete(`/inv/approval-levels/${id}`),
  reorder: (data)        => api.put('/inv/approval-levels/reorder/batch', data),
};

// ─── Departments ──────────────────────────────────────────────────────────────
export const departmentsAPI = {
  list:   (params)   => api.get('/inv/departments', { params }),
  create: (data)     => api.post('/inv/departments', data),
  update: (id, data) => api.put(`/inv/departments/${id}`, data),
};

// ─── Stores ───────────────────────────────────────────────────────────────────
export const storesAPI = {
  list:   (params)   => api.get('/inv/stores', { params }),
  create: (data)     => api.post('/inv/stores', data),
  update: (id, data) => api.put(`/inv/stores/${id}`, data),
};

// ─── Purchase Requests ────────────────────────────────────────────────────────
export const purchaseRequestsAPI = {
  list:    (params)   => api.get('/inv/purchase-requests', { params }),
  get:     (id)       => api.get(`/inv/purchase-requests/${id}`),
  create:  (data)     => api.post('/inv/purchase-requests', data),
  approve: (id, data) => api.post(`/inv/purchase-requests/${id}/approve`, data),
  reject:  (id, data) => api.post(`/inv/purchase-requests/${id}/reject`, data),
};

// ─── Quotations ───────────────────────────────────────────────────────────────
export const quotationsAPI = {
  list:   (params)   => api.get('/inv/quotations', { params }),
  get:    (id)       => api.get(`/inv/quotations/${id}`),
  create: (data)     => api.post('/inv/quotations', data),
  update: (id, data) => api.put(`/inv/quotations/${id}`, data),
};

// ─── Purchase Orders ──────────────────────────────────────────────────────────
export const purchaseOrdersAPI = {
  list:   (params) => api.get('/inv/purchase-orders', { params }),
  get:    (id)     => api.get(`/inv/purchase-orders/${id}`),
  create: (data)   => api.post('/inv/purchase-orders', data),
  cancel: (id, data) => api.put(`/inv/purchase-orders/${id}/cancel`, data),
};

// ─── GRN ──────────────────────────────────────────────────────────────────────
export const grnAPI = {
  list:    (params)   => api.get('/inv/grn', { params }),
  get:     (id)       => api.get(`/inv/grn/${id}`),
  create:  (data)     => api.post('/inv/grn', data),
  approve: (id, data) => api.post(`/inv/grn/${id}/approve`, data),
  reject:  (id, data) => api.post(`/inv/grn/${id}/reject`, data),
};

export default api;
