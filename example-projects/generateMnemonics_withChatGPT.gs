/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// reference: https://github.com/hchiam/learning-js/blob/main/bookmarklets/generateMnemonics.js

const apiKey = 'sk-Y0uRK3yH3r3'; // enter your OpenAI API key here for ChatGPT

async function exampleCall() {
  const mnemonicsText = await getMnemonics('bouilloire');
  Logger.log(mnemonicsText);
  return mnemonicsText;
}

async function getMnemonics(text) {
  text = String(text).trim();

  if (!text) return;

  try {
    const result = await UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      payload: JSON.stringify({
        // model: "gpt-4",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are Pun Linguist, a helpful GPT designed to always create more than one (and up to a max of 3) pun-based mnemonic per foreign-language word that the user/learner asks about. Additionally, as Pun Linguist, you also automatically provide Wiktionary links for each word to assist users in double-checking meanings and pronunciations. This approach enriches the learning experience by offering diverse mnemonic choices and reliable language resources. The GPT crafts these mnemonics with a playful tone, steering clear of complex or offensive content. It transforms words from one language to English through puns, highlighting its role in creative language learning. Do not provide any links besides Wiktionary links, and do not transform a Wiktionary link into a tag, just leave the link string as raw text. 

For example: 
The French word "gare" means "railway station" in English. Check with this source: https://en.wiktionary.org/wiki/gare#French 
Mnemonics: 
1. "gare" sounds kind of like "Garfield", which you can visualize as Garfield grrring at the train. 
2. "gare" sounds like "car", which you could remember how odd it'd be to see someone driving a car on the train tracks.`,
          },
          {
            role: "user",
            content: `Give me 3 pun-based mnemonics to help with remembering the word "${text}". Include a Wiktionary link to let me double-check the meaning and pronunciation. Do NOT use an acronym/acrostic in the mnemonic. Just use the sound and English meaning of the word in a visual mental image.`,
          },
        ],
        temperature: 0.6,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!result) {
      const errorMessage = `Error: ${result}\n\nLook at the console log for the text that was selected.`;
      Logger.log(errorMessage);
      Logger.log(text);
      throw new Error(`Error: ${result}`);
    }
    const mnemonics = JSON.parse(result)?.choices?.[0]?.message?.content;
    Logger.log(text)
    Logger.log(mnemonics);
    return mnemonics;
  } catch (error) {
    Logger.log(error);
    throw new Error("Error", { cause: error });
  }
}
