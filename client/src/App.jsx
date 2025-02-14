import React from 'react'
import Routing from "./components/routes/routes";
import Header from './components/header/Header';
import MessageToast from './components/toasts/messageToast';


export default function App() {
  return (
    <>
      <Header />
      <MessageToast />      
      <Routing />
    </>
  )
}
