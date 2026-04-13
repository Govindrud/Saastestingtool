// Mock API service for TestHub platform
// This simulates backend API calls with realistic delays and responses

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface TestRun {
  id: string;
  name: string;
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration: string;
  timestamp: string;
  module: string;
}

interface TestResult {
  testId: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  timestamp: Date;
}

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

class TestHubAPI {
  private baseUrl = 'https://api.testhub.com/v1';
  private authToken: string | null = null;

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    await delay(500);

    // Mock authentication
    const mockToken = `testhub_${btoa(email)}_${Date.now()}`;
    this.authToken = mockToken;

    return {
      data: {
        token: mockToken,
        user: {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'admin',
        }
      },
      status: 200,
      message: 'Login successful'
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    await delay(200);
    this.authToken = null;
    return {
      data: null,
      status: 200,
      message: 'Logout successful'
    };
  }

  // Test Execution
  async runTest(testId: string, config: any): Promise<ApiResponse<TestRun>> {
    await delay(1000);

    const testRun: TestRun = {
      id: `run_${Date.now()}`,
      name: `Test Run ${testId}`,
      status: 'running',
      duration: '0s',
      timestamp: new Date().toISOString(),
      module: config.module || 'automation'
    };

    // Simulate test execution
    setTimeout(() => {
      testRun.status = Math.random() > 0.1 ? 'passed' : 'failed';
      testRun.duration = `${(Math.random() * 5 + 1).toFixed(1)}m`;
    }, 3000);

    return {
      data: testRun,
      status: 200,
      message: 'Test started successfully'
    };
  }

  async getTestResults(testRunId: string): Promise<ApiResponse<TestResult>> {
    await delay(400);

    const total = Math.floor(Math.random() * 100) + 50;
    const failed = Math.floor(Math.random() * 10);
    const skipped = Math.floor(Math.random() * 5);
    const passed = total - failed - skipped;

    return {
      data: {
        testId: testRunId,
        passed,
        failed,
        skipped,
        duration: Math.random() * 300 + 60,
        timestamp: new Date()
      },
      status: 200,
      message: 'Results retrieved'
    };
  }

  // Analytics
  async getAnalytics(timeRange: string): Promise<ApiResponse<any>> {
    await delay(600);

    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const analytics = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tests: Math.floor(Math.random() * 500) + 200,
      passed: Math.floor(Math.random() * 450) + 180,
      failed: Math.floor(Math.random() * 50) + 5,
      duration: Math.random() * 300 + 60
    }));

    return {
      data: analytics,
      status: 200,
      message: 'Analytics retrieved'
    };
  }

  // CI/CD Integration
  async triggerPipeline(pipelineId: string, branch: string): Promise<ApiResponse<any>> {
    await delay(800);

    return {
      data: {
        pipelineId,
        buildNumber: Math.floor(Math.random() * 1000) + 1,
        status: 'queued',
        branch,
        triggeredBy: 'api',
        timestamp: new Date().toISOString()
      },
      status: 200,
      message: 'Pipeline triggered successfully'
    };
  }

  async getPipelineStatus(buildId: string): Promise<ApiResponse<any>> {
    await delay(300);

    const statuses = ['running', 'success', 'failed', 'cancelled'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      data: {
        buildId,
        status,
        duration: Math.random() * 600 + 120,
        testsRun: Math.floor(Math.random() * 500) + 100,
        testsPassed: Math.floor(Math.random() * 450) + 90,
        testsFailed: Math.floor(Math.random() * 20)
      },
      status: 200,
      message: 'Pipeline status retrieved'
    };
  }

  // Team Management
  async inviteTeamMember(email: string, role: string): Promise<ApiResponse<any>> {
    await delay(500);

    return {
      data: {
        inviteId: `invite_${Date.now()}`,
        email,
        role,
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      status: 200,
      message: 'Invitation sent successfully'
    };
  }

  async updateUserRole(userId: string, newRole: string): Promise<ApiResponse<any>> {
    await delay(400);

    return {
      data: { userId, role: newRole },
      status: 200,
      message: 'Role updated successfully'
    };
  }

  // Scheduling
  async createSchedule(schedule: any): Promise<ApiResponse<any>> {
    await delay(500);

    return {
      data: {
        scheduleId: `schedule_${Date.now()}`,
        ...schedule,
        status: 'active',
        createdAt: new Date().toISOString()
      },
      status: 201,
      message: 'Schedule created successfully'
    };
  }

  async updateSchedule(scheduleId: string, updates: any): Promise<ApiResponse<any>> {
    await delay(400);

    return {
      data: {
        scheduleId,
        ...updates,
        updatedAt: new Date().toISOString()
      },
      status: 200,
      message: 'Schedule updated successfully'
    };
  }

  async deleteSchedule(scheduleId: string): Promise<ApiResponse<null>> {
    await delay(300);

    return {
      data: null,
      status: 200,
      message: 'Schedule deleted successfully'
    };
  }

  // Reports
  async generateReport(config: any): Promise<ApiResponse<any>> {
    await delay(2000); // Report generation takes longer

    return {
      data: {
        reportId: `report_${Date.now()}`,
        name: config.name,
        format: config.format,
        status: 'ready',
        downloadUrl: `/api/reports/${Date.now()}/download`,
        createdAt: new Date().toISOString()
      },
      status: 200,
      message: 'Report generated successfully'
    };
  }

  // Mobile Testing
  async allocateDevice(deviceId: string): Promise<ApiResponse<any>> {
    await delay(500);

    return {
      data: {
        deviceId,
        status: 'allocated',
        sessionId: `session_${Date.now()}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      },
      status: 200,
      message: 'Device allocated successfully'
    };
  }

  async releaseDevice(sessionId: string): Promise<ApiResponse<null>> {
    await delay(300);

    return {
      data: null,
      status: 200,
      message: 'Device released successfully'
    };
  }

  // API Testing
  async testEndpoint(endpoint: string, method: string, config: any): Promise<ApiResponse<any>> {
    await delay(Math.random() * 1000 + 300);

    const success = Math.random() > 0.1;

    return {
      data: {
        endpoint,
        method,
        statusCode: success ? 200 : 500,
        responseTime: Math.random() * 200 + 50,
        success,
        timestamp: new Date().toISOString()
      },
      status: 200,
      message: success ? 'Endpoint test passed' : 'Endpoint test failed'
    };
  }

  // LLM Evaluation
  async evaluateModel(modelId: string, prompts: string[]): Promise<ApiResponse<any>> {
    await delay(3000);

    return {
      data: {
        modelId,
        accuracy: Math.random() * 10 + 90,
        coherence: Math.random() * 10 + 90,
        relevance: Math.random() * 10 + 90,
        safety: Math.random() * 10 + 90,
        avgLatency: Math.random() * 2000 + 500,
        totalPrompts: prompts.length,
        timestamp: new Date().toISOString()
      },
      status: 200,
      message: 'Model evaluation completed'
    };
  }
}

// Export singleton instance
export const api = new TestHubAPI();

// Export types
export type { ApiResponse, TestRun, TestResult };
