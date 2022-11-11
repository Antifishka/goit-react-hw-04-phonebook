import { useState } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import { Global } from '@emotion/react' 
import { GlobalStyles, Container, TitlePhonebook, TitleContacts } from "./App.styled";
import ContactForm from "./ContactForm/ContactForm";
import { ContactlList } from "./ContactList/ContactList";
import { nanoid } from 'nanoid';
import { Filter } from "./Filter/Filter";

function Phonebook() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = name.toLowerCase();

    const checkByName = contacts.find(contact =>
      contact.name.toLowerCase() === normalizedName);

    if (checkByName) {
      return alert(`${name} is already in contacts`);
    };  

    setContacts(prevContacts => [contact, ...prevContacts]);

    console.log(contacts);
  };

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }

  return (
      <Container>
        <Global styles={GlobalStyles} />
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactForm onSubmit={addContact} />

        <TitleContacts>Contacts</TitleContacts>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactlList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
      </Container>
    );
}

// class OldPhonebook extends React.Component {
//   state = {
//     contacts: [],
//     filter: ''
//   };

//   componentDidMount = () => {
//     console.log('App componentDidMount');

//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate = (prevPropss, prevState) => {
//     console.log('App componentDidUpdate');

//     if (this.state.contacts !== prevState.contacts) {
//       console.log('Обновилось поле contacts, записываю contacts в хранилище');

//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = (name, number) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;

//     const normalizedName = name.toLowerCase();

//     const checkByName = contacts.find(contact =>
//       contact.name.toLowerCase() === normalizedName);

//     if (checkByName) {
//       return alert(`${name} is already in contacts`);
//     };  

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));

//     console.log(contacts);
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }))
//   }

//   changeFilter = (e) => {
//     this.setState({ filter: e.currentTarget.value })
//   }

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;

//     const normalizedFilter = filter.toLocaleLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizedFilter)
//     );
//   }
    
//   render() {
//     console.log('App render');

//     const { filter } = this.state;

//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <Global styles={GlobalStyles} />
//         <TitlePhonebook>Phonebook</TitlePhonebook>
//         <ContactForm onSubmit={this.addContact} />

//         <TitleContacts>Contacts</TitleContacts>
//         <Filter filter={filter} onChange={this.changeFilter} />
//         <ContactlList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
//       </Container>
//     );
//   }
// }

export default Phonebook;
