import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { getAuth } from "firebase/auth";
import { app } from "@/constants/config/firebase";
import LoadScreen from "@/pages/LoadScreen";

interface PrivateRouteProps {
  redirect: string;
  reverse?: boolean;
  children: ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { user, userDB, authLoading: loading } = useAuth();

  console.log("Private Route!");
  if (user ? !userDB : loading) return <LoadScreen />;
  if (props.reverse ? user : !user) 
  return <Navigate to={props.redirect} />;

  return <>{props.children}</>;
};

export default PrivateRoute;
