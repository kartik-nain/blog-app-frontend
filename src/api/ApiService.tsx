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

export const ListAParticularBlogApi = async (id: string) => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return ApiClient.get(`blog?id=${id}`, { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const GetUserProfileInfoApi = () => {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  return ApiClient.get(`get-profile-info`, { headers })
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
