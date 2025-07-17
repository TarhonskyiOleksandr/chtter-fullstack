import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, type ModalProps, FormField } from '@/shared/ui';
import { useCreateChat } from '../hooks/useCreateChat';
import { createChatSchema, type CreateChatFormData } from '../types';

type CreateChatModalProps = Omit<ModalProps, "children">;

export const CreateChatModal: React.FC<CreateChatModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<CreateChatFormData>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      isPrivate: false,
      name: '',
    },
  });

  const [createChat] = useCreateChat();

  const onSubmit = async (data: CreateChatFormData) => {
    clearErrors('root');
    try {
      await createChat({
        variables: {
          createChatInput: data,
        },
      });
      props.onClose();
    } catch (err) {
      console.log(err);
      setError("root", { message: 'Failed to create chat' });
    }
  };

  return (
    <Modal {...props} title="Create Chat">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <div className="alert alert-error">
            <span>{errors.root.message}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              className="checkbox"
              {...register("isPrivate")}
            />
            <span className="label-text">Private chat</span>
          </label>
        </div>

        <FormField error={errors.name?.message}>
          <input
            placeholder="Chat name"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            {...register("name")}
          />
        </FormField>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          Create Chat
        </button>
      </form>
    </Modal>
  );
};
