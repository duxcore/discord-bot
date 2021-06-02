import { expect } from 'chai'
import glob from 'glob'

describe('Slash Commands', () => {
  describe('Number of commands', () => {
    it('Should have a maximum of 100 commands', () => {
      glob(`./src/commands/cmd.*.ts`, (err, matches) => {
        if (err) throw err

        expect(matches.length).to.be.lessThanOrEqual(100)
      })
    })
  })
})
