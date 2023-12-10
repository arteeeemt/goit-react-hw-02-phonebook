import { UlItem, Button } from './ListItem.styled';

const Contact = ({ id, name, number, onClick }) => {
  return (
    <UlItem>
      <p>
        {name}: {number}
      </p>
      <Button
        type="button"
        onClick={() => {
          onClick(id);
        }}
      >
        Delete
      </Button>
    </UlItem>
  );
};
export default Contact;