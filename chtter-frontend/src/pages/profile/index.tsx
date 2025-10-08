import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetMe } from "@/entities";
import { useAvatarUpload } from "@/features";
import { settingsFormSchema, type SettingsFormSchema } from "./types";

const ProfilePage = () => {
  const { data } = useGetMe();
  const { uploadAvatar } = useAvatarUpload();
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SettingsFormSchema>({
    resolver: zodResolver(settingsFormSchema),
  });

  const onHandleSubmit = (data: SettingsFormSchema) => {
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
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <label className="btn btn-primary btn-sm w-full">
                  Change Avatar
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    hidden
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  />
                </label>
              )}
            />
            {errors.file?.message && (
              <p className="text-red-500 text-sm">{errors.file.message as string}</p>
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
