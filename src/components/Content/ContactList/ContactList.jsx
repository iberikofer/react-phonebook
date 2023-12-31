import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  loadingStatus,
  errorMesage,
} from 'redux/contacts/selectors';
import { fetchContacts, deleteContact } from 'redux/contacts/operations';
import Loader from 'components/Loader/Loader';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(loadingStatus);
  const error = useSelector(errorMesage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const buildMarkup = () => {
    const onDelete = contactId => {
      dispatch(deleteContact(contactId));
    };

    const filteredContacts =
      contacts.length > 0
        ? filter
          ? contacts.filter(contact => contact.name.includes(filter))
          : contacts
        : [];

    return isLoading ? (
      <Loader />
    ) : error ? (
      <p>{error}</p>
    ) : filteredContacts.length > 0 ? (
      filteredContacts.map(contact => (
        <li
          key={contact.id}
          style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
        >
          {contact.name}: {contact.number}{' '}
          <Button
            onClick={() => onDelete(contact.id)}
            variant="contained"
            style={{ display: 'flex', gap: 5 }}
          >
            Delete {<DeleteIcon />}
          </Button>
        </li>
      ))
    ) : filteredContacts.length === 0 && contacts.length > 0 ? (
      <p>No matches for your filter {':('}</p>
    ) : (
      <p>There are no contacts in your phonebook {'=('}</p>
    );
  };

  return <ul style={{ padding: 0, textAlign: 'center' }}>{buildMarkup()}</ul>;
};

export default ContactList;
