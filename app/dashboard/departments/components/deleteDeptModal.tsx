import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

interface delDept{
    opened: boolean
    close: () => void
}

export default function DeleteDeptModal({opened, close}: delDept) {


  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete department">
        {/* Modal content */}
      </Modal>
    </>
  );
}
