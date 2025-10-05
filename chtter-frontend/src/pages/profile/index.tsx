import { useGetMe } from "@/entities";

const ProfilePage = () => {
  const { data } = useGetMe();
  
  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="card w-full max-w-sm bg-base-200 shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://placehold.co/150x150/png"
                alt="User avatar"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">
            {data?.me.name}
          </h2>
          <p className="text-sm opacity-70 mb-4">
            {data?.me.email}
          </p>

          <button className="btn btn-primary btn-sm w-full mb-2">
            Change Avatar
          </button>

          <button className="btn btn-sm w-full">
            Edit Profile Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
