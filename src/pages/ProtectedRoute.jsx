import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  // 사용자가 없거나, requireAdmin이 필요한데 사용자가 어드민 계정이 아니라면
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }

  // 사용자가 있거나, requireAdmin이 true + 사용자 어드민 권한이 있는 경우
  return children;
}
