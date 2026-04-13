import { useEffect, useCallback } from 'react';
import { websocket } from '../services/websocket';

export function useWebSocket() {
  useEffect(() => {
    websocket.connect();

    return () => {
      // Don't disconnect on unmount as it's a singleton
      // and other components might be using it
    };
  }, []);

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    websocket.on(event, callback);

    return () => {
      websocket.off(event, callback);
    };
  }, []);

  const send = useCallback((event: string, data: any) => {
    websocket.send(event, data);
  }, []);

  return {
    subscribe,
    send,
    status: websocket.getConnectionStatus(),
  };
}

// Specialized hooks for specific events
export function useTestUpdates(callback: (data: any) => void) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('test:completed', callback);
    return unsubscribe;
  }, [subscribe, callback]);
}

export function usePipelineUpdates(callback: (data: any) => void) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('pipeline:status', callback);
    return unsubscribe;
  }, [subscribe, callback]);
}

export function useDeviceUpdates(callback: (data: any) => void) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('device:status', callback);
    return unsubscribe;
  }, [subscribe, callback]);
}

export function useTeamUpdates(callback: (data: any) => void) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('team:activity', callback);
    return unsubscribe;
  }, [subscribe, callback]);
}
