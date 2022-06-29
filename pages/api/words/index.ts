export default async function handler(req, res) {
  const index = Math.floor(Math.random() * 5) + 1;
  const wordList = (await import(`./wordList${index}`)).default;
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("words", word);
  res.status(200).json({ word: word });
}
