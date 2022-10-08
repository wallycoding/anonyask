import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import theme from "@/constants/theme";
import AppLayout from "./layout/AppLayout";
import Inbox from "./pages/Inbox";
import AuthProvider from "./providers/AuthProvider";
import SignIn from "./pages/SignUp";
import PrivateRoute from "./Secure/PrivateRoute";
import MessageForm from "./pages/MessageForm";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={extendTheme(theme)}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute redirect="/auth">
                  <AppLayout>
                    <Outlet />
                  </AppLayout>
                </PrivateRoute>
              }
            >
              <Route path="" element={<Inbox />} />
            </Route>
            <Route
              path="/auth"
              element={
                <PrivateRoute redirect="/" reverse>
                  <SignIn />
                </PrivateRoute>
              }
            />
            <Route path="/ask/:code" element={<MessageForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <ColorModeScript initialColorMode="dark" />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
