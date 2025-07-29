export const environment = {
  production: import.meta.env?.MODE === 'production',
  // Provide a direct fallback that will be used during build time
  apiUrl: typeof import.meta.env !== 'undefined' && import.meta.env['VITE_API_SERVICE_URL'] 
    ? import.meta.env['VITE_API_SERVICE_URL'] 
    : 'https://saas-x39a.onrender.com'
};