"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="min-h-screen flex items-center justify-center px-6"
            style={{ backgroundColor: "var(--color-cream)" }}
          >
            <div className="text-center max-w-md">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(212,148,15,0.1)" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4940F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h1
                className="text-2xl mb-4"
                style={{
                  color: "#0F0F0F",
                  fontFamily: "Tenor Sans, Georgia, serif",
                }}
              >
                Something went wrong
              </h1>
              <p className="mb-6" style={{ color: "#6A6A6A" }}>
                We&apos;re sorry, but something unexpected happened. Please try
                refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#D4940F",
                  color: "white",
                }}
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
