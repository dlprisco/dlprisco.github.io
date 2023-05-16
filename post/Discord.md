# Discord

<br />
<br />

- ### Currency Data Management (Feb 5, 2023)


Video about displaying currency price data in a discord chat by using `discord.py` and `coinmarketcap-api` where i think the main focused content is how the data is
procesed by using `request` to get a json formated string to be displayed on any chat by using a determined bot command, i mean the video could be resume to 
a couple of code statements like:

```
from coinmarketcap import CoinMarketCap
market = CoinMarketCap()
resp = market.coin_list()
{
	'data': [{
		'id': 1,
		'name': 'Bitcoin',
		'symbol': 'BTC',
		'website_slug': 'bitcoin'
	}, {
		'id': 2,
		'name': 'Litecoin',
		'symbol': 'LTC',
		'website_slug': 'litecoin'
	}//...
	],
	'metadata': {
		'timestamp': 1531038439,
		'num_cryptocurrencies': 1620,
		'error': None
	},
	'cached': False
}
...
```

and once we have a well formated string, send as a message

```
@bot.command(name='bot')
async def _bot(ctx):
    """Is the bot cool?"""
    await ctx.send('Yes, the bot is cool.')
```

for more information, please check the [repository](https://github.com/dlprisco/discord-bot/blob/main/bot/main.py) that i have made some coding bot practices and watch the [video tutorial](https://www.youtube.com/embed/lcVAy7zAubg).

<br />

- ### Client Setup and Message Handling (Jan 20, 2023)


Basic Discord bot

```
import discord

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

client.run('bot')
```

[video tutorial](https://www.youtube.com/watch?v=fVP4YHoNp18)
