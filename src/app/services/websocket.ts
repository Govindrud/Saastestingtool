// WebSocket service for real-time updates and notifications

type EventCallback = (data: any) => void;

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private isConnecting = false;

  connect(token?: string): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    // In a real app, this would connect to your WebSocket server
    // For now, we'll simulate WebSocket behavior
    this.simulateConnection();
  }

  private simulateConnection(): void {
    // Simulate successful connection
    setTimeout(() => {
      this.isConnecting = false;
      this.reconnectAttempts = 0;
      this.emit('connected', { status: 'connected' });

      // Start simulating real-time updates
      this.startSimulation();
    }, 500);
  }

  private startSimulation(): void {
    // Simulate test completion events
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.emit('test:completed', {
          testId: `test_${Date.now()}`,
          status: Math.random() > 0.2 ? 'passed' : 'failed',
          duration: `${(Math.random() * 5 + 1).toFixed(1)}m`,
          timestamp: new Date().toISOString()
        });
      }
    }, 15000);

    // Simulate pipeline events
    setInterval(() => {
      if (Math.random() > 0.8) {
        this.emit('pipeline:status', {
          pipelineId: `pipeline_${Math.floor(Math.random() * 10)}`,
          status: ['running', 'success', 'failed'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString()
        });
      }
    }, 20000);

    // Simulate device status updates
    setInterval(() => {
      if (Math.random() > 0.6) {
        this.emit('device:status', {
          deviceId: `device_${Math.floor(Math.random() * 20)}`,
          status: ['available', 'in-use', 'maintenance'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString()
        });
      }
    }, 25000);

    // Simulate team activity
    setInterval(() => {
      if (Math.random() > 0.75) {
        const actions = [
          'created a new test suite',
          'updated configuration',
          'ran test suite',
          'generated report',
          'invited team member'
        ];
        this.emit('team:activity', {
          user: `user_${Math.floor(Math.random() * 5)}`,
          action: actions[Math.floor(Math.random() * actions.length)],
          timestamp: new Date().toISOString()
        });
      }
    }, 30000);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnecting = false;
    this.emit('disconnected', { status: 'disconnected' });
  }

  on(event: string, callback: EventCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket event callback:', error);
        }
      });
    }
  }

  send(event: string, data: any): void {
    // In a real app, this would send data through WebSocket
    // For now, we'll just log it
    console.log('WebSocket send:', { event, data });
  }

  // Convenience methods for specific events
  onTestCompleted(callback: EventCallback): void {
    this.on('test:completed', callback);
  }

  onPipelineStatus(callback: EventCallback): void {
    this.on('pipeline:status', callback);
  }

  onDeviceStatus(callback: EventCallback): void {
    this.on('device:status', callback);
  }

  onTeamActivity(callback: EventCallback): void {
    this.on('team:activity', callback);
  }

  getConnectionStatus(): 'connected' | 'disconnected' | 'connecting' {
    if (this.isConnecting) return 'connecting';
    if (this.ws?.readyState === WebSocket.OPEN) return 'connected';
    return 'disconnected';
  }
}

// Export singleton instance
export const websocket = new WebSocketService();
