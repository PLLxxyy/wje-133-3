import React from 'react';

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('全局 ErrorBoundary 捕获异常', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="grid min-h-screen place-items-center bg-[color:var(--app-bg)] p-8">
          <section className="panel max-w-xl p-6">
            <p className="text-sm font-semibold text-[color:var(--danger)]">运行异常</p>
            <h1 className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
              查看器已进入保护状态
            </h1>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              {this.state.error.message}
            </p>
            <button
              className="primary-button mt-5"
              onClick={() => window.location.reload()}
              type="button"
            >
              重新加载
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
