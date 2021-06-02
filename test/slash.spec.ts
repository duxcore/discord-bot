import { expect } from 'chai'
import glob from 'glob'
import CommandExecutor from '../src/structures/CommandExecutor'
import path from 'path'

describe('Slash Commands', () => {
  describe('Command Limits', () => {
    it('Should have a maximum of 100 commands', () => {
      glob(`./src/commands/cmd.*.ts`, (err, matches) => {
        if (err) throw err

        expect(matches.length).to.be.lessThanOrEqual(100)
      })
    })

    it('Should have a maximum of 25 options per command', () => {
      glob(`./src/commands/cmd.*.ts`, (err, files) => {
        files.map(f => {
          f = path.join('../', f)
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;

          expect(cmd.args.length).to.be.lessThanOrEqual(25)
        });
      })
    })

    it('Should have a maximum of 25 choices per option per command', () => {
      glob(`./src/commands/cmd.*.ts`, (err, files) => {
        files.map(f => {
          f = path.join('../', f)
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;

          cmd.args.forEach(arg => {
            expect(arg.choices?.length ?? 0).to.be.lessThanOrEqual(25)
          })
        });
      })
    })

    it('Should be lower case and match ^[\w-]{1,32}$', () => {
      glob(`./src/commands/cmd.*.ts`, (err, files) => {
        files.map(f => {
          f = path.join('../', f)
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;

          expect(cmd.name).to.be.equal(cmd.name.toLowerCase()).and.to.match(/^[\w-]{1,32}$/)
        });
      })
    })
  })
})
