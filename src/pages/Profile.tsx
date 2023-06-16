import { useState, useEffect } from "react";
import { UpdateProfile, GetUserProfileInfoApi } from "../api/ApiService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);

  const navigate = useNavigate();

  const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setIsFormEdit(true);
  };

  const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setIsFormEdit(true);
    console.log("hello");
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeDob = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = new Date(dateString);
    setDob(date);
    setIsFormEdit(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateProfile(firstName, lastName, dob)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
    setDob(new Date());
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    GetUserProfileInfoApi()
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setDob(new Date(res.data.dob));
        setEmail(res.data.email);
      })
      .catch((err) => {
        if (err) {
          setFirstName("No data");
          setLastName("No Data");
          setDob(new Date());
        }
      });
  }, []);

  return (
    <div className="h-full bg-gray-50">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            PROFILE
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="first name"
                  onChange={changeFirstName}
                  value={firstName}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="last name"
                  onChange={changeLastName}
                  value={lastName}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 opacity-50 cursor-not-allowed"
                  placeholder="email"
                  onChange={changeEmail}
                  value={email}
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date of Birth"
                  onChange={changeDob}
                  value={dob ? dob.toISOString().split("T")[0] : ""}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 ${
                !isFormEdit &&
                "opacity-50 cursor-not-allowed pointer-events-none"
              } ${isFormEdit && "hover:bg-white hover:text-primary-700"}`}
              disabled={!isFormEdit}>
              Save
            </button>
            <button
              type="button"
              className="ml-10 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-primary-700 bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-700 hover:text-white"
              onClick={() => {
                navigate("/home");
              }}>
              Cancel
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
