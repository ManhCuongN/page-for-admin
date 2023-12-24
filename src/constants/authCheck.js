export const hasPermission = (requiredRole, userRoles) => {
    // Kiểm tra xem user có quyền cần thiết hay không
    return userRoles.includes(requiredRole);
  };