import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {

  const user = auth.currentUser;
  console.log('aaa user: ', user)
  if(user === null) {
    return <Navigate to='/login' />;
  }

  return children;
}
