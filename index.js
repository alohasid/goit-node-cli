const { program } = require('commander');
const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts');

program
    .option('-a, --action <type>', 'action to perform')
    .option('-i, --id <type>', 'contact id')
    .option('-n, --name <type>', 'contact name')
    .option('-e, --email <type>', 'contact email')
    .option('-p, --phone <type>', 'contact phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contact = await getContactById(id);
            console.log(contact || 'Contact not found');
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log('Contact added:', newContact);
            break;

        case 'remove':
            const removed = await removeContact(id);
            console.log(removed || 'Contact not found');
            break;

        default:
            console.warn('Unknown action type!');
    }
}

invokeAction(argv);