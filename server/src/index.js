const server = require('@jspreadsheet/server');
const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: 'redis',
        port: 6379
    },
});

// Connect to the server
client.connect();

// Jspreadsheet license
const license = {
    clientId: '356a192b7913b04c54574d18c28d46e6395428ab',
    licenseKey: 'MmIyMDhmYmY4NGI1ZDY1ODAwNThjMGZkOTVkNjg2MmQ1NzZmYTFhOTBmZWI3N2M3ZmQ1N2Q3YjMwNDNhMjRhYmViYmRkNGVjZjZlMmNkNDVhODJhYzg1ZmRiY2E3OTJhYjA1ODQzNTliZGZiMmYwNWM4YmRmMjAyZmUwODA1NmEsZXlKamJHbGxiblJKWkNJNklqTTFObUV4T1RKaU56a3hNMkl3TkdNMU5EVTNOR1F4T0dNeU9HUTBObVUyTXprMU5ESTRZV0lpTENKdVlXMWxJam9pU25Od2NtVmhaSE5vWldWMElpd2laR0YwWlNJNk1UYzBNak0wTWpRd01Dd2laRzl0WVdsdUlqcGJJbXB6YUdWc2JDNXVaWFFpTENKamMySXVZWEJ3SWl3aWFuTndjbVZoWkhOb1pXVjBMbU52YlNJc0luVmxMbU52YlM1aWNpSXNJbU5rY0c0dWFXOGlMQ0pwYm5SeVlYTm9aV1YwY3k1amIyMGlMQ0p6Wm1OdlpHVmliM1F1WTI5dElpd2lkMlZpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXpOQ0lzSW5OamIzQmxJanBiSW5ZM0lpd2lkamdpTENKMk9TSXNJbll4TUNJc0luWXhNU0lzSW1admNtMXpJaXdpWm05eWJYVnNZU0lzSW5KbGJtUmxjaUlzSW5CaGNuTmxjaUlzSW1sdGNHOXlkR1Z5SWl3aWRtRnNhV1JoZEdsdmJuTWlMQ0pqYjIxdFpXNTBjeUlzSW5ObFlYSmphQ0lzSW1Ob1lYSjBjeUlzSW5CeWFXNTBJaXdpWW1GeUlpd2ljMmhsWlhSeklpd2lZMnh2ZFdRaUxDSnRZWE5ySWl3aWMyaGxaWFJ6SWl3aWMyVnlkbVZ5SWl3aWFXNTBjbUZ6YUdWbGRITWlYWDA9'
}

server({
    port: 3000,
    // Socket.io server configuration
    config: {
        cors: {
            origin: "*"
        },
    },
    error: async function(e) {
        console.log(e);
        // Kill the thread
        process.exit(1);
    },
    load: async function(guid, auth) {
        let config = await client.get(guid);
        if (! config) {
            return false;
        }
        return config;
    },
    create: async function (guid, config, query) {
        const result = await client.exists(guid);
        if (! result) {
            if (typeof(config) === 'object') {
                config = JSON.stringify(config);
            }
            // Create a new spreadsheet
            await client.set(guid, config);
        }

        return guid;
    },
    destroy: async function(guid) {
        return await client.del(guid)
            .then(() => true)
            .catch(() => false);
    },
    change: async function (guid, changes) {
        // Get the configuration from the cache
        let config = changes.instance.getConfig();
        // Save that on the redis
        return await client.set(guid, JSON.stringify(config));
    },
    license: license,
});