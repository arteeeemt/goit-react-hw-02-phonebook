import Contact from 'components/ListItem/ListItem';
import { Ul } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteBut }) => {
  return (
    <Ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            id={id}
            name={name}
            number={number}
            onClick={onDeleteBut}
          />
        );
      })}
    </Ul>
  );
};