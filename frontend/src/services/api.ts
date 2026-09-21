import axios from 'axios';
import type { Event, Artist, Booking, BookingRequest, GalleryItem, TicketType, LineupDay } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Response unwrapper
const unwrap = <T>(response: { data: { success: boolean; data: T; message?: string } }): T => {
  if (!response.data.success) throw new Error(response.data.message || 'API Error');
  return response.data.data;
};

// Events
export const getEvents = async (params?: { search?: string; genre?: string; city?: string; sort?: string }): Promise<Event[]> => {
  const response = await api.get('/events', { params });
  return unwrap(response);
};

export const getEvent = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return unwrap(response);
};

export const getEventLineup = async (id: string): Promise<LineupDay[]> => {
  const response = await api.get(`/events/${id}/lineup`);
  return unwrap(response);
};

export const getEventTickets = async (id: string): Promise<TicketType[]> => {
  const response = await api.get(`/events/${id}/tickets`);
  return unwrap(response);
};

export const getEventGallery = async (id: string): Promise<GalleryItem[]> => {
  const response = await api.get(`/events/${id}/gallery`);
  return unwrap(response);
};

// Artists
export const getArtists = async (): Promise<Artist[]> => {
  const response = await api.get('/artists');
  return unwrap(response);
};

export const getArtist = async (id: string): Promise<Artist> => {
  const response = await api.get(`/artists/${id}`);
  return unwrap(response);
};

export const getArtistEvents = async (id: string): Promise<Event[]> => {
  const response = await api.get(`/artists/${id}/events`);
  return unwrap(response);
};

// Bookings
export const createBooking = async (data: BookingRequest): Promise<Booking> => {
  const response = await api.post('/bookings', data);
  return unwrap(response);
};

export const getBooking = async (id: string): Promise<Booking> => {
  const response = await api.get(`/bookings/${id}`);
  return unwrap(response);
};

// Newsletter
export const subscribeNewsletter = async (email: string): Promise<{ message: string }> => {
  const response = await api.post('/newsletter/subscribe', { email });
  return unwrap(response);
};

// Terraform (for admin dashboard)
export const getTerraformEnvironments = async () => {
  const response = await api.get('/terraform/environments');
  return unwrap(response);
};

export const getTerraformStatus = async (env: string) => {
  const response = await api.get(`/terraform/environments/${env}/status`);
  return unwrap(response);
};

export const terraformValidate = async (env: string) => {
  const response = await api.post(`/terraform/environments/${env}/validate`);
  return response.data;
};

export const terraformPlan = async (env: string) => {
  const response = await api.post(`/terraform/environments/${env}/plan`);
  return response.data;
};

export const terraformApply = async (env: string) => {
  const response = await api.post(`/terraform/environments/${env}/apply`);
  return response.data;
};

export const terraformTest = async (env: string) => {
  const response = await api.post(`/terraform/environments/${env}/test`);
  return response.data;
};
