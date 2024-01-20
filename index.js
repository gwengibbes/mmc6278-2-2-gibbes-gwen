const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {

    // To read and retrieve the file
    const fileContents = await fs.readFile(QUOTE_FILE, {encoding: 'utf8'});
    // There will be a single blank line contained within those lines that we will need to filter out.
    const quotes = fileContents.split('\n').filter(line => {
      return line !== '';
    });
    // Pull a random quote from the quotes.txt file
    const randomIndex = Math.floor(Math.random() * ((quotes.length-1) - 0) + 0);
    // Put quotes in an array amd splits quote and author
    const randomQuote = quotes[randomIndex].split('|');
    //Labelling the quote the first thing in the index and the author the second item
    // This can also be written as const [quote, author] = randomQuote; 
    const quote = randomQuote[0];
    const author = randomQuote[1];
    
    // console log the quote and author
    console.log(`${chalk.blue(quote)} by ${chalk.yellow(author)}`);  
    // You may style the text with chalk as you wish
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // If no author is provided, save the author as "Anonymous".
    if(!author) {
      author = 'Anonymous';
    }
    // Add the quote and author to the quotes.txt file and store both author and quote on the same line using a separator like pipe | and then using .split() when retrieving
    const quoteLine = `${quote}|${author}\n`;
    await fs.appendFile(QUOTE_FILE, quoteLine);
    // After the quote/author is saved, alert the user that the quote was added.
    console.log(`The quote ${chalk.green(quote)} by ${chalk.red(author)} was added.`);
    

    // You may style the text with chalk as you wish
   
  });

program.parse();
