import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useSelector } from 'react-redux';


interface addDept{
    opened: boolean
    close: () => void
}
export default function AddDeptModal({ opened, close }: addDept) {
    const user = useSelector((state: any) => state.auth.userInfo);
    
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add departments">
        {/* Modal content */}
      </Modal>

      
    </>
  );
}
