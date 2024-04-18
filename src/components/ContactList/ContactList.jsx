import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "../Phonebook.module.css";
import { selectFilter } from "../../redux/filterSlice";
import { selectContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const getFilteredContacts = () => {
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts();

  if (!filteredContacts.length) {
    return <h2>No available contacts</h2>;
  }
  return (
    <ul className={s.contact_list}>
      {filteredContacts.map((contact) => (
        <Contact item={contact} key={contact.id} />
      ))}
    </ul>
  );
};

export default ContactList;
