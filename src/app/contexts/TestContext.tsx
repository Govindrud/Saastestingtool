import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';

interface Test {
  id: string;
  name: string;
  module: string;
  status: 'running' | 'passed' | 'failed' | 'pending';
  createdAt: string;
  duration?: string;
}

interface TestContextType {
  tests: Test[];
  runningTests: Test[];
  createTest: (test: Omit<Test, 'id' | 'createdAt' | 'status'>) => Promise<Test>;
  runTest: (testId: string, config: any) => Promise<void>;
  getTest: (testId: string) => Test | undefined;
  deleteTest: (testId: string) => Promise<void>;
  updateTest: (testId: string, updates: Partial<Test>) => Promise<void>;
  refreshTests: () => Promise<void>;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [tests, setTests] = useState<Test[]>([]);
  const [runningTests, setRunningTests] = useState<Test[]>([]);

  const createTest = useCallback(async (testData: Omit<Test, 'id' | 'createdAt' | 'status'>): Promise<Test> => {
    const newTest: Test = {
      ...testData,
      id: `test_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTests((prev) => [newTest, ...prev]);
    storage.addTestToHistory(newTest);

    return newTest;
  }, []);

  const runTest = useCallback(async (testId: string, config: any) => {
    const test = tests.find((t) => t.id === testId);
    if (!test) return;

    // Update test status to running
    setTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, status: 'running' as const } : t))
    );
    setRunningTests((prev) => [...prev, { ...test, status: 'running' }]);

    try {
      const response = await api.runTest(testId, config);

      // Simulate test completion after some time
      setTimeout(() => {
        const finalStatus = Math.random() > 0.2 ? 'passed' : 'failed';
        setTests((prev) =>
          prev.map((t) =>
            t.id === testId
              ? {
                  ...t,
                  status: finalStatus as 'passed' | 'failed',
                  duration: `${(Math.random() * 5 + 1).toFixed(1)}m`,
                }
              : t
          )
        );
        setRunningTests((prev) => prev.filter((t) => t.id !== testId));
      }, 3000);
    } catch (error) {
      setTests((prev) =>
        prev.map((t) => (t.id === testId ? { ...t, status: 'failed' as const } : t))
      );
      setRunningTests((prev) => prev.filter((t) => t.id !== testId));
    }
  }, [tests]);

  const getTest = useCallback((testId: string) => {
    return tests.find((t) => t.id === testId);
  }, [tests]);

  const deleteTest = useCallback(async (testId: string) => {
    setTests((prev) => prev.filter((t) => t.id !== testId));
  }, []);

  const updateTest = useCallback(async (testId: string, updates: Partial<Test>) => {
    setTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, ...updates } : t))
    );
  }, []);

  const refreshTests = useCallback(async () => {
    // In a real app, this would fetch from the backend
    const history = storage.getTestHistory();
    setTests(history);
  }, []);

  return (
    <TestContext.Provider
      value={{
        tests,
        runningTests,
        createTest,
        runTest,
        getTest,
        deleteTest,
        updateTest,
        refreshTests,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTests() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTests must be used within a TestProvider');
  }
  return context;
}
