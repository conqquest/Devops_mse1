export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (fields: Record<string, any>, required: string[]): string[] => {
  return required.filter(field => !fields[field] || String(fields[field]).trim() === '');
};

export const sanitizeString = (str: string): string => {
  if (!str) return '';
  return str.trim().replace(/[<>]/g, '');
};
