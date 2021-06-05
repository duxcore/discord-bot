import { expect } from 'chai'
import glob from 'glob'
import CommandExecutor from '../src/structures/CommandExecutor'
import path from 'path'

let commands: CommandExecutor[] = []

describe('Slash Commands', () => {
  before(() => {
    return new Promise((res, rej) => {
      glob(`./src/commands/cmd.*.ts`, (err, files) => {
        files.map(f => {
          f = path.join('../', f)
          const imported = require(f)
          if (!(imported.default instanceof CommandExecutor)) return

          commands.push(imported.default)
        })
        res(undefined)
      })
    })
  })

  describe('Command Limits', () => {
    // See https://discord.com/developers/docs/interactions/slash-commands#a-quick-note-on-limits

    it('Should have a maximum of 100 commands', () => {
      expect(commands.length).to.be.lessThanOrEqual(100)
    })

    it('Should have a maximum of 25 options per command', () => {
      commands.map(cmd => {
        expect(cmd.options.length).to.be.lessThanOrEqual(25)
      })
    })

    it('Should have a maximum of 25 choices per option per command', () => {
      commands.map(cmd => {
        cmd.options.forEach(arg => {
          if (!arg.choices) return
          expect(arg.choices.length).to.be.lessThanOrEqual(25)
        })
      })
    })

    it('Should be lower case and match \'^[\w-]{1,32}$\'', () => {
      commands.map(cmd => {
        expect(cmd.name).to.be.equal(cmd.name.toLowerCase()).and.to.match(/^[\w-]{1,32}$/)
      })
    })

    it ('Should contain a maximum of 4000 chars for combined name, desc & values per command', () => {
      commands.map(cmd => {
        let chars = cmd.name.length + cmd.desciption.length
        cmd.options.forEach(arg => {
          chars += arg.name.length + arg.description.length
          if (!arg.choices) return
          arg.choices.forEach(choice => {
            chars += choice.value.toString().length
          })
        })

        expect(chars).to.be.lessThanOrEqual(4000)
      })
    })
  })
})
