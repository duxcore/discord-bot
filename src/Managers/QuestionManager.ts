import { TextChannel } from "discord.js"
import { DuxcoreBot } from "../Bot"

export class QuestionManager {
  private questions: string[] = []
  client: DuxcoreBot

  constructor(client: DuxcoreBot) {
    this.client = client
    const postTime = new Date()
    postTime.setHours(
      client.cfg.qotd.askAt.hours,
      client.cfg.qotd.askAt.minutes,
      client.cfg.qotd.askAt.seconds,
      client.cfg.qotd.askAt.milliseconds
    )
    const now = new Date()
    const t = postTime.getTime() - now.getTime()
    setTimeout(() => {
      setInterval(() => this.post(), client.cfg.qotd.askEvery)
      this.post()
    }, t)
  }

  getAll() {
    return this.questions
  }

  clear() {
    this.questions = []
  }

  post(channel?: TextChannel) {
    this.client.bot.guilds.cache.forEach(guild => {
      if (!channel) channel = guild.channels.cache.find(ch => ch.name === 'question-of-the-day') as TextChannel
      const question = this.getQuestion()
      if (!question) return
      const embed = this.client.embeds.get('qotd', {qotd: question})
      if (typeof embed === 'string') return
      channel.send({
        embed
      })
    })
  }

  askQuestion(question: string) {
    this.questions.push(question)
  }

  getQuestion() {
    const question = this.questions.splice(0, 1)[0]
    if (this.questions.length === 0) this.client.bot.guilds.cache.forEach(guild => {
      const channel = guild.channels.cache.find(ch => ch.name === 'staff')
      if (!channel?.isText()) return
      channel.send('Oh no! I\'ve run out of questions for QOTD! Please give some suggestions with `/ask`')
    })
    return question
  }
}
