import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { TextField, Button } from '@mui/material';
import PlusIcon from 'images/PlusIcon';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubbmit = e => {
    e.preventDefault();
    const contactObj = {
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
      id: nanoid(),
    };

    const checkPhonebookName =
      Array.isArray(contacts) &&
      contacts?.find(contact => contact.name === contactObj.name);
    if (!checkPhonebookName) {
      dispatch(addContact(contactObj));
      e.target.reset();
    } else {
      window.alert(`${contactObj.name} is already in your contacts.`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubbmit}
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        Name
        <TextField
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          style={{ borderRadius: 15, padding: 5 }}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
        Number
        <TextField
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          style={{ borderRadius: 15, padding: 5 }}
          id="standard-basic"
          label="Number"
          variant="standard"
        />
        <Button
          type="submit"
          variant="contained"
          style={{ display: 'flex', gap: 10 }}
        >
          Add contact <PlusIcon />
        </Button>
      </form>
      <div
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 15,
          color: '#808080',
        }}
      >
        <p>
          <span style={{ color: '#ff0000', fontWeight: 'bold' }}>Remember</span>
          , don't do many contact operations at the same time.
        </p>
        <p>The server can respond with an error!</p>
      </div>
    </div>
  );
};

export default ContactForm;
