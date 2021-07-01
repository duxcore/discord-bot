/**
 * This is an example configuration file.  Please copy this file to a file named ".config.ts"
 * with the correct values to begin.
 */
export default {
    commands: {
        prefix: "/"
    },
    qotd: {
        askEvery: 86400000, // in seconds
        askAt: {
            hours: 24,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        }
    },
    permissions: {
        moderator: [],
        administrator: []
    },
    rules: [
        {
            name: '0. Follow the Discord TOS',
            message: 'The Terms of Service can be found here: https://discord.com/terms'
        },
        {
            name: '1. No NSFW',
            message: 'This server is no place for inappropriate discussions'
        },
        {
            name: '2. No politics',
            message: 'Talking about politics usually leads to massive and pointless arguments'
        },
        {
            name: '3. Only English',
            message: 'Discussions in different languages are harder to join and sometimes are very racist'
        },
        {
            name: '4. No random pings',
            message: 'Random pings (@mentions) are annoying and can be reported to the moderators'
        },
        {
            name: '5. Respect other members',
            message: 'Racism, trolling and other forms of "bullying" are not allowed'
        },
        {
            name: '6. No advertising',
            message: 'Sending links unrelated to the current conversation is prohibited.'
        },
        {
            name: '7. Stay on topic',
            message: 'Conversations unrelated to the topic of their channel make navigating very hard'
        },
        {
            name: '8. No spamming',
            message: 'Sending the same message or messages with the same meaning multiple times in a row is also prohibited'
        }
    ],
    roles: {
        '🦀 Rusty 🦀': { color: 'RED', btnStyle: 4, type: 'cosmetic' },
        '☕ Strict Scripted Coffee ☕': { color: 'BLUE', btnStyle: 1, type: 'cosmetic' },
        '☕ Scripted Caffee ☕': { color: 'YELLOW', btnStyle: 2, type: 'cosmetic' },
        '🐍 Snek Lang 🐍': { color: 'GREEN', btnStyle: 3, type: 'cosmetic' }
    }

}