export const registerUserService = async ({ username, email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(`The ${error.message}`);
  }
};

export const loginUserService = async ({ email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const activateUserService = async ({ token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/activate-account/${token}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};
