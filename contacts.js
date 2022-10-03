const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "./db/contacts.json");
updateContacts = async (contacts) =>
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

async function listContact() {
  const result = await fs.readFile(contactPath);
  return JSON.parse(result);
}

async function getContactbyId(contactId) {
  const contacts = await listContact();
  const oneContact = contacts.find((contact) => (contact.id = contactId));
  return oneContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContact();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContactByID(id, data) {
  const contacts = await listContact();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], id, ...data };
  await updateContacts(contacts);
  return contacts[index];
}

async function removeContactById(id) {
  const contacts = await listContact();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return [result];
}

module.exports = {
  listContact,
  getContactbyId,
  updateContactByID,
  addContact,
  removeContactById,
};
