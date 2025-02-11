import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Profile.module.css";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PROFILE_URL = `${process.env.REACT_APP_BASE_URL}/users/profile`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // id를 상위 범위에서 가져와서 사용
  const id = profile?.user_id;

  return (
    <div>
      <p className={classes.subtitle}>기본 정보</p>
      <div className={classes.account}>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30 5C16.1925 5 5 16.1925 5 30C5 43.8075 16.1925 55 30 55C43.8075 55 55 43.8075 55 30C55 16.1925 43.8075 5 30 5ZM21.25 23.75C21.25 22.6009 21.4763 21.4631 21.9161 20.4015C22.3558 19.3399 23.0003 18.3753 23.8128 17.5628C24.6253 16.7503 25.5899 16.1058 26.6515 15.6661C27.7131 15.2263 28.8509 15 30 15C31.1491 15 32.2869 15.2263 33.3485 15.6661C34.4101 16.1058 35.3747 16.7503 36.1872 17.5628C36.9997 18.3753 37.6442 19.3399 38.0839 20.4015C38.5237 21.4631 38.75 22.6009 38.75 23.75C38.75 26.0706 37.8281 28.2962 36.1872 29.9372C34.5462 31.5781 32.3206 32.5 30 32.5C27.6794 32.5 25.4538 31.5781 23.8128 29.9372C22.1719 28.2962 21.25 26.0706 21.25 23.75ZM45.645 42.46C43.7736 44.8141 41.3945 46.7149 38.6854 48.0205C35.9763 49.3261 33.0073 50.0028 30 50C26.9927 50.0028 24.0237 49.3261 21.3146 48.0205C18.6055 46.7149 16.2264 44.8141 14.355 42.46C18.4075 39.5525 23.9375 37.5 30 37.5C36.0625 37.5 41.5925 39.5525 45.645 42.46Z"
            fill="#959595"
          />
        </svg>
        <p className={classes.id}>{id}</p>
      </div>
    </div>
  );
}

export default Profile;
