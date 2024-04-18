import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import s from "../Phonebook.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addNewContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data, actions) => {
    dispatch(addNewContact({ ...data, id: nanoid() }));
    actions.resetForm();
  };

  const addSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Field must be more than 3")
      .max(50)
      .required("Required"),
    number: Yup.string()
      .min(3, "Field must be more than 3")
      .max(50, "Field must be less than 50")
      .required("Required"),
  });

  const intialValues = {
    name: "",
    number: "",
  };

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={handleSubmit}
      validationSchema={addSchema}
    >
      <Form className={s.form}>
        <label>
          Name
          <Field className={s.form_input} type="text" name="name" />
          <ErrorMessage component="span" className={s.error} name="name" />
        </label>
        <label>
          Number
          <Field className={s.form_input} type="text" name="number" />
          <ErrorMessage component="span" className={s.error} name="number" />
        </label>
        <button className={s.add_btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
