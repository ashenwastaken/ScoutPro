import React from 'react';

export default function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
      <div className="loading-overlay">
        <span className="spinner"></span>
      </div>
  );
}
