'use client';

import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

interface AntdConfigProviderProps {
  children: ReactNode;
}

export default function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Customize theme colors
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#1890ff',
          borderRadius: 8,
          // Add more customizations as needed
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 40,
          },
          Input: {
            borderRadius: 10,
            controlHeight: 40,
          },
          Card: {
            borderRadius: 20,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
