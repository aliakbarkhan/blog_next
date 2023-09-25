'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  //higher order component to wrap all session activities
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;