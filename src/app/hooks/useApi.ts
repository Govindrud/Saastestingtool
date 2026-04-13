import { useState, useCallback } from 'react';
import { api, ApiResponse } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await apiFunction(...args);

        if (response.status >= 200 && response.status < 300) {
          setState({ data: response.data, loading: false, error: null });
          return response.data;
        } else {
          setState({ data: null, loading: false, error: response.message });
          return null;
        }
      } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for common operations
export function useTestExecution() {
  return useApi((testId: string, config: any) => api.runTest(testId, config));
}

export function useAnalytics() {
  return useApi((timeRange: string) => api.getAnalytics(timeRange));
}

export function usePipelineTrigger() {
  return useApi((pipelineId: string, branch: string) => api.triggerPipeline(pipelineId, branch));
}

export function useTeamInvite() {
  return useApi((email: string, role: string) => api.inviteTeamMember(email, role));
}

export function useReportGeneration() {
  return useApi((config: any) => api.generateReport(config));
}

export function useScheduleCreation() {
  return useApi((schedule: any) => api.createSchedule(schedule));
}

export function useDeviceAllocation() {
  return useApi((deviceId: string) => api.allocateDevice(deviceId));
}

export function useEndpointTest() {
  return useApi((endpoint: string, method: string, config: any) =>
    api.testEndpoint(endpoint, method, config)
  );
}

export function useModelEvaluation() {
  return useApi((modelId: string, prompts: string[]) =>
    api.evaluateModel(modelId, prompts)
  );
}
