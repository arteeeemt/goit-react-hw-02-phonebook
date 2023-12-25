import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Form/Form';
import { Container, Section, Title, SectionTitle, Message } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDone() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    if (
      this.state.contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const filterLowCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filterLowCase)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <Section>
          <SectionTitle>Add contact</SectionTitle>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section>
          <SectionTitle>Contacts</SectionTitle>
          {this.state.contacts.length !== 0 ? (
            <>
              <Filter
                value={this.state.filter}
                onChange={this.filterContacts}
              />
              <ContactList
                contacts={filteredContacts}
                onDeleteBut={this.deleteContact}
              />
            </>
          ) : (
            <Message>
              There are no contacts in your phonebook. Please add your first
              contact!
            </Message>
          )}
        </Section>
      </Container>
    );
  }
}
