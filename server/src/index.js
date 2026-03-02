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
    licenseKey: 'MWUzOGJhM2IzNGU4MzFiNTEzMzA4OWUyMGI5YWMyY2Q3ZjE0YWFiNjM3NDVkYzc0ZmZjNTA2NGVhNGZlNzg4Y2ZlMTQ5NDk5MTc1YmZjZWQxNTUyYzdiZmIxYzU2OGRkMjkzNjJlZDZlYjI0YjIxYjdjMDhmYzQwZjBlMDlhYWQsZXlKamJHbGxiblJKWkNJNklqTTFObUV4T1RKaU56a3hNMkl3TkdNMU5EVTNOR1F4T0dNeU9HUTBObVUyTXprMU5ESTRZV0lpTENKdVlXMWxJam9pVUdGMWJDQkliMlJsYkNJc0ltUmhkR1VpT2pFNE1ERXdNRGd3TURBc0ltUnZiV0ZwYmlJNld5SnFjMmhsYkd3dWJtVjBJaXdpWTNOaUxtRndjQ0lzSW1wemNISmxZV1J6YUdWbGRDNWpiMjBpTENKalpIQnVMbWx2SWl3aWFXNTBjbUZ6YUdWbGRITXVZMjl0SWl3aWMzUmhZMnRpYkdsMGVpNWpiMjBpTENKM1pXSmpiMjUwWVdsdVpYSXVhVzhpTENKM1pXSmpiMjUwWVdsdVpYSXVhVzhpTENKemRHRmphMkpzYVhSNkxtbHZJaXdpYzJaamIyUmxZbTkwTG1OdmJTSXNJbU5zWVhWa1pXMWpjR052Ym5SbGJuUXVZMjl0SWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXpOQ0lzSW5OamIzQmxJanBiSW5ZM0lpd2lkamdpTENKMk9TSXNJbll4TUNJc0luWXhNU0lzSW5ZeE1pSXNJbVp2Y20xMWJHRWlMQ0ptYjNKdGN5SXNJbkpsYm1SbGNpSXNJbkJoY25ObGNpSXNJbWx0Y0c5eWRHVnlJaXdpYzJWaGNtTm9JaXdpWTI5dGJXVnVkSE1pTENKMllXeHBaR0YwYVc5dWN5SXNJbU5vWVhKMGN5SXNJbkJ5YVc1MElpd2lZbUZ5SWl3aWMyaGxaWFJ6SWl3aWMyaGhjR1Z6SWl3aWMyVnlkbVZ5SWl3aVptOXliV0YwSWl3aWRHOXdiV1Z1ZFNJc0luQnBkbTkwSWl3aWFXNTBjbUZ6YUdWbGRITWlYWDA9'
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