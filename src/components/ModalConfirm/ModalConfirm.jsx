import { Modal } from "../ModalWindow/Modal";
import s from './ModalConfirm.module.css'
import confirmImg from '../../assets/sad-rick.png'

export const ModalConfirm = ({
  onClose,
  action,
}) => {
  return (
    <Modal onClose={onClose}>
      <img className={s.confirmImg} src={confirmImg} alt="sad cat" />
      <h2 className={s.confirmTitle}>Are you sure you want to quit?</h2>
      <div className={s.btnBox}>
        <button className={s.cancelBtn} onClick={onClose}>
          Cancel
        </button>
          <button className={s.actionBtn} onClick={action}>Quit</button>
      </div>
    </Modal>
  );
};
