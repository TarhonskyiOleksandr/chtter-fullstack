import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetMe } from "@/entities";
import { useAvatarUpload } from "@/features";
import { settingsFormSchema, type SettingsFormSchema } from "./types";

const ProfilePage = () => {
  const { data } = useGetMe();
  const { uploadAvatar } = useAvatarUpload();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SettingsFormSchema>({
    resolver: zodResolver(settingsFormSchema),
  });

  const onHandleSubmit = (data: SettingsFormSchema) => {
    console.log(data)
    clearErrors('root');
    uploadAvatar(data, setError);
  };
  
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
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <label className="btn btn-primary btn-sm w-full mb-2">
              Change Avatar
              <input
                type="file"
                accept="image/jpeg"
                hidden
                {...register('file', {
                  setValueAs: (files: FileList) => files?.[0] || null,
                })}
              />
            </label>
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
            )}
            <button 
              className="btn btn-sm w-full"
              type="submit"
            >
              Edit Profile Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
