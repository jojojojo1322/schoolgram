//인증기능

export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("로그인을 해주세요.");
  }
  return;
};
