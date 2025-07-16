import type React from "react";

import { Modal, type ModalProps } from "@/shared/ui";

type CreateChatModalProps = Omit<ModalProps, 'children'>;

export const CreateChatModal: React.FC<CreateChatModalProps> = (props) => {
  return (
    <Modal {...props}>
      <p>test</p>
    </Modal>
  );
};
