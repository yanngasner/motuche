import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const word = await getWord();
  const game = await prisma.game.create({
    data: {
      word: word,
    },
  });
  res.status(200).json({ game: game });
}

async function getWord() {
  const index = Math.floor(Math.random() * 5) + 1;
  const wordList = (await import(`./words/wordList${index}`)).default;
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  return word;
}
