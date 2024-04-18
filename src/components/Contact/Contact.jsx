import s from "../Phonebook.module.css";
import { FaUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ item }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  const { id, name, number } = item;
  return (
    <li className={s.list_item}>
      <div>
        <div className={s.contact_wrap}>
          <FaUser />
          <h3>{name}</h3>
        </div>
        <div className={s.contact_wrap}>
          <BsFillTelephoneFill />
          <p>{number}</p>
        </div>
      </div>

      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
};

export default Contact;
