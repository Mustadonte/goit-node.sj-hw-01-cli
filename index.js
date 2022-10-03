const { program } = require("commander");
const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContact();
      console.log(list);
      break;
    case "get":
      const oneContact = await contacts.getContactbyId(id);
      console.log(oneContact);
      break;
    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;
    case "remove":
      const removeContact = await contacts.removeContactById(id);
      console.log(removeContact);
      break;
    case "update":
      const updatedContact = await contacts.updateContactByID(id, {
        name,
        email,
        phone,
      });
      console.log(updatedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();

invokeAction(options);
