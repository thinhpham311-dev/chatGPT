'use client'
import React from 'react'
import { Sidebar, Context, Header, MessageList, Footer } from "@/components"
import tw, { styled, css, theme } from 'twin.macro'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '@/redux/reducers';

const store = createStore(reducers);

const Home = () => (
  <Provider store={store}>
    <Layout >
      <Sidebar />
      <Context>
        <Header />
        <MessageList />
        <Footer />
      </Context>
    </Layout>
  </Provider>
)

export default Home


const Layout = styled.section(() => [
  tw`flex h-dvh`
])