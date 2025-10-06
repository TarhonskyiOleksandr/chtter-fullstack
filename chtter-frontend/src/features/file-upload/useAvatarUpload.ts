import type { UseFormSetError } from 'react-hook-form';

import { client } from '@/shared/api/graphql';

interface AvatarUploadReq {
  file?: string | File | undefined;
}

export const useAvatarUpload = () => {
  const uploadAvatar = async (
    req: AvatarUploadReq,
    setError?: UseFormSetError<AvatarUploadReq>,
  ) => {
    try {
      const formData = new FormData();

      if (req.file instanceof File) formData.append('file', req.file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = 'Upload failed';
        try {
          const data = await res.json();
          if (data?.message) errorMessage = data.message;
        } catch (e) {
          console.error(e);
        }
        if (setError) {
          setError('root', { message: errorMessage });
        }
      }

      await client.refetchQueries({ include: 'active' });
    } catch (err) {
      console.error(err);
      if (setError) {
        setError('root', { message: 'Unexpected error occurred' });
      }
    }
  };

  return { uploadAvatar };
};
