'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore, store } from '../store';
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
