export const generateBookingId = (): string => {
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `VP-2026-${randomChars}`;
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
