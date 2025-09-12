'use client'

import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          style: {
            border: '1px solid #10b981',
            background: '#f0fdf4',
            color: '#065f46',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            border: '1px solid #ef4444',
            background: '#fef2f2',
            color: '#991b1b',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
        loading: {
          style: {
            border: '1px solid #3b82f6',
            background: '#eff6ff',
            color: '#1e40af',
          },
        },
      }}
    />
  )
}

export default ToastProvider
