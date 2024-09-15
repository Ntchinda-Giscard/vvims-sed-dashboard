"use client"
import { Modal, Button } from '@mantine/core';


interface addAgency{
    opened: boolean,
    close: () => void
}
export default function AddAgencyModal({opened, close}: addAgency) {

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Agency">
        {/* Modal content */}
      </Modal>
    </>
  );
}