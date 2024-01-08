'use client';

import React, { useEffect } from "react"
import { Provider } from 'react-redux';
import { store } from './store'
import { SimpleLayout } from '@/components'



export function ReduxProvider({ children }: { children: React.ReactNode }) {

    return <Provider store={store}>
        <SimpleLayout>
            {children}
        </SimpleLayout>
    </Provider>
}