import {StrictMode, Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in application:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-black text-red-500 font-mono min-h-screen">
          <h1 className="text-2xl font-bold mb-4">⚠️ Application Error Boundary</h1>
          <p className="text-white mb-4">A runtime error occurred that caused a blank screen. Details below:</p>
          <pre className="bg-neutral-900 p-4 rounded border border-neutral-800 text-xs overflow-auto max-w-full text-red-400">
            {this.state.error?.toString()}
          </pre>
          <pre className="bg-neutral-900 p-4 rounded border border-neutral-800 text-xs overflow-auto max-w-full text-neutral-400 mt-4">
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

