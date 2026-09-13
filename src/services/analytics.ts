import { AnalyticsEvent } from '../types';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(eventName: string, params?: Record<string, string | number | boolean>) {
    const event: AnalyticsEvent = {
      event: eventName,
      params,
      timestamp: Date.now(),
    };
    this.events.push(event);

    // Also dispatch a browser custom event for integrations
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('goldpos_analytics', { detail: event })
      );
      // Helpful for development / preview verification
      console.log(`[Analytics Event] ${eventName}:`, params || {});
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

export const analytics = new AnalyticsService();
