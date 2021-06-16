/**
 * This is an example configuration file.  Please copy this file to a file named ".config.ts"
 * with the correct values to begin.
 */
export default {
  commands: {
    prefix: "/"
  },
  permissions: {
    moderator: [],
    administrator: []
  },
  rules: [],
  roles: {
    'Role 1': { color: 'RED', btnStyle: 1 }, // btnStyle is same as `ButtonStyle` attr
    'Role 2': {}
  },
  dividerRoles: [
        'START_ROLE_ID', 'END_ROLE_ID'
  ]
}
