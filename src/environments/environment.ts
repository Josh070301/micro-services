export const environment = {
  production: import.meta.env?.MODE === 'production',
  apiUrl: import.meta.env['VITE_API_SERVICE_URL'] || 'https://saas-x39a.onrender.com'
};