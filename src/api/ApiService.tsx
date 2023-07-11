import ApiClient from "./ApiClient";

export const loginApi = (email: string, password: string) =>
  ApiClient.post(`/signin`, { email, password });

export const signUpApi = (email: string, password: string) =>
  ApiClient.post(`/signup`, { email, password });

export const ListAllBlogsApi = async () => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.get("blogs-all-user", { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const ListUserBlogApi = async () => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.get("blogs-by-user", { headers })
    .then((resposne) => {
      return resposne;
    })
    .catch((error) => {
      throw error;
    });
};

export const ListAParticularBlogApi = async (id: string) => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.get(`blog?id=${id}`, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const setFavoriteApi = async (_id: string) => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };
  return await ApiClient.put("set-favorite-blog", { _id }, { headers });
};

export const GetUserProfileInfoApi = async () => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.get(`get-profile-info`, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const UpdateProfile = (
  first: string,
  last: string,
  dob: Date
): Promise<void> => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return new Promise((resolve, reject) => {
    ApiClient.put(`update-profile-info`, { first, last, dob }, { headers })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const PostBlog = async (
  title: string,
  content: string,
  category: string
) => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.post(
    `add-blog`,
    { title, content, category },
    { headers }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const DeletUserApi = async () => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return await ApiClient.delete(`delete-profile-info`, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
