
import { Modal, Button } from '@mantine/core';

export default function AddAppoinmentModal({opened, close}: any) {

  return (
    <>
      <Modal opened={opened} onClose={close} title={<p style={{color: "#404040"}}>Add Appointment</p>}>
        {/* Modal content */}
      </Modal>

    </>
  );
}