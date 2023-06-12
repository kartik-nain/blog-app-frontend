import ApiClient from "./ApiClient";

export const loginApi = (email:string, password:string) => ApiClient.post(`/signin`, { email, password })

// export const registrationApi = async (firstname, lastname, username, password) => {
//     try {
//         const response = await apiClient.post(`/auth/register`, { firstname, lastname, username, password });
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         if (error.response) {
//             console.log(error.response.data)
//             return error.response.data;
//         } else {
//             return error.message;
//         }
//     }
// };

export const executeLogout = () => ApiClient.post(`/auth/logout`)

export const ListAllBlogsApi = () => ApiClient.get('blogs-all-user')
export const ListAParticularBlogApi = (id:string) => ApiClient.get(`blog?id=${id}`)
export const GetUserProfileInfoApi = (email:string) => ApiClient.get(`get-profile-info`)


