export const isLogin = (token, user) => {
  const loggedInUser = localStorage.getItem("loginUserEmail");

  const userData = JSON.parse(localStorage.getItem("userItem"));
  let isUserExist = [];
  if (userData && userData.length > 0) {
    isUserExist = userData.filter(function (user) {
      return user.email === loggedInUser;
    });
  }

  if (isUserExist.length > 0) {
    return true;
  } else {
    return false;
  }
};

//LogOut Current User
export const logOutUser = (property, order) => {
  localStorage.removeItem("loginUserEmail");
};
