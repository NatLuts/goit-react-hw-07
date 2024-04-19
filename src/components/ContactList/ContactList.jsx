import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "../Phonebook.module.css";

import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const filteredData = useSelector(selectFilteredContacts);

  if (!filteredData.length) {
    return <h2>No available contacts</h2>;
  }
  return (
    <ul className={s.contact_list}>
      {filteredData.map((contact) => (
        <Contact item={contact} key={contact.id} />
      ))}
    </ul>
  );
};

export default ContactList;
