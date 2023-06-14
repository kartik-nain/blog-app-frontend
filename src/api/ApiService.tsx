import ApiClient from "./ApiClient";

export const loginApi = (email: string, password: string) =>
  ApiClient.post(`/signin`, { email, password });

export const signUpApi = (email: string, password: string) =>
  ApiClient.post(`/signup`, { email, password });

export const executeLogout = () => ApiClient.post(`/auth/logout`);

export const ListAllBlogsApi = () => ApiClient.get("blogs-all-user");

export const ListAParticularBlogApi = (id: string) =>
  ApiClient.get(`blog?id=${id}`);

export const GetUserProfileInfoApi = () => ApiClient.get(`get-profile-info`);

export const SaveProfile = (
  first: string,
  last: string,
  dob: Date
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ApiClient.post(`add-profile-info`, { first, last, dob })
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
