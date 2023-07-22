import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const Content = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
        margin: '50px auto 300px',
      }}
    >
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};
export default Content;
