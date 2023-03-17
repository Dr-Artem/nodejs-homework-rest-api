const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const data = await listContacts();
        const dataId = data.find((contact) => contact.id === contactId);
        return dataId;
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async (contactId) => {
    try {
        const data = await listContacts();
        const dataId = data.find((contact) => contact.id === contactId);
        if (!dataId) {
            throw new Error("Not found");
        }
        const newData = data.filter((contact) => contact.id !== contactId);

        await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const addContact = async ({ body }, res) => {
    const data = await listContacts();
    const newContact = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        phone: body.phone,
    };

    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return data;
};

const updateContact = async (req, res) => {
    const data = await listContacts();
    const contactIndex = data.findIndex(
        (contact) => contact.id === req.params.contactId
    );
    if (contactIndex === -1) {
        return null;
    }

    data[contactIndex] = { ...data[contactIndex], ...req.body };
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
