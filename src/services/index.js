export const registerUserService = async ({ username, email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
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

    return json.message;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updataUserService = async ({ data, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDataUserService = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "GET",

        headers: {
          Authorization: token,
        },
      }
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

export const updataUserEmailService = async ({ email, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/email/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
          Authorization: token,
        },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updataUserPasswordService = async ({ password, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSingleTripService = async ({ id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/recommendation/${id}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.recommendation;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userCommentService = async (id, comment, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/recommendations/comments/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json.commentId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const tripCommentsService = async ({ id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/recommendations/${id}/comments`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json.comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCommentService = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/comments/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const voteTripUserService = async (id, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/votes/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.votes;
  } catch (error) {
    throw new Error(error.message);
  }
};
