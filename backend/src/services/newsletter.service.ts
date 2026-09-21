import { validateEmail } from '../middleware/validateInput';
import { NewsletterSubscription } from '../types';

const subscriptions: NewsletterSubscription[] = [];

export const subscribe = (email: string): boolean => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  const existing = subscriptions.find(s => s.email === email);
  if (existing) {
    throw new Error('Email is already subscribed');
  }
  
  subscriptions.push({
    email,
    subscribedAt: new Date().toISOString()
  });
  
  return true;
};
