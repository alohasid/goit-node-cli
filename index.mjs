import { program } from 'commander';
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from './contacts.mjs';

program
    .option('-a, --action <type>', 'action to perform')
    .option('-i, --id <type>', 'contact id')
    .option('-n, --name <type>', 'contact name')
    .option('-e, --email <type>', 'contact email')
    .option('-p, --phone <type>', 'contact phone');

program.parse();

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const removed = await removeContact(id);
            console.log(removed);
            break;

        default:
            console.warn('\x1b[31m Unknown action type!\x1b[0m');
    }
}

invokeAction(argv);