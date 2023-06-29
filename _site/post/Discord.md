# Discord

<br />
<br />

<ul>
    <li>
	    <details>
		    <summary>
				<a href="#fortnite-bot"></a><h3 style="display:inline;" name="fortnite-bot">How to make a Fortnite bot (Jun 29, 2023)</h3>
			</summary>
			<br>
			<h4>How to create a <code><b>discord-bot</b></code> using a <code><b>python</b></code> Fortnite-API wrapper</h4>
			<p>
				&nbsp;You could check main page of documentation straight from <a href="https://github.com/Fortnite-API">github-repo</a> and <a href="https://fortnite-api.com/">Fortnite-API</a>
			</p>
			<p>
				The first thing that you should do is to create a virtual environment to work with the necessary libraries
			</p>
			<p>
				Go to the console and type the following:
			</p>
			<code>
				<pre>python -m pip install upgrade</pre>
				<pre>pip install virtualenv</pre>
				
			</code>
			<code>
				  <pre>python -m venv fortnite-bot</pre>
				  <pre>cd fortnite-bot</pre>
			</code>
			
			<p> If you are on LINUX you can use <code><b>activate</b></code> or Windows go to the folder
			<b>Scripts</b> and find the <u><b><code>activate</code></b></u> file to activate your virtual environment.
			</p>
			
			<p>
				Now install <code><b>discord.py, py-wrapper</b></code><br>
			    <code><pre>pip install discord.py fortnite-api</pre></code><br>
			</p>
			
			<p>
				These are the necessary things to get our bot working on a discord server, a bot basic structure should be something like this:
				<code>
					<pre>import discord
from discord.ext import commands

import fortnite_api

api = fortnite_api.FortniteAPI("YOUR-API-KEY")

intents = discord.Intents.default()
intents.members = True
intents.message_content = True

bot = commands.Bot(command_prefix='/', description=description, intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user} (ID: {bot.user.id})')
    print('------')

@bot.command(name='bot')
async def _bot(ctx):
    """Is the bot cool?"""
    await ctx.send('Yes, the bot is cool.')

bot.run('token')</pre>
				</code>
				to start you could override command method to create a new coroutine command
				by ordering as the <a href="https://github.com/Fortnite-API/py-wrapper">docs</a>.<br><br>
				Example:<br>
				<code>
					<pre>@bot.command()
async def cosmetics(ctx):
"""Shows info about cosmetics"""
	await ctx.send('Fortnite Cosmetics')</pre>
				</code>
				<br>
				to get cosmetics data we could use <b><code>cosmetics.fetch_all()</code></b> and it will return an array of cosmetics objects
				<code><pre>>>> cosmetics = api.cosmetics.fetch_all()
>>> print(type(cosmetics), type(cosmetics[0]))
>>> <class 'list'> <class 'fortnite_api.cosmetics.BrCosmetic'>
>>> cosmetics[0]
>>> <fortnite_api.cosmetics.BrCosmetic object at 0x000002912FE39EA0></pre>
				</code><br>
				but, what really means <code><i>'fortnite_api.cosmetics.BrCosmetic'</i></code>?, well this could be some confusing 
				at first look because you probably don't know how to handle this item. What i have do it (because all request returns objects like this) is
				just go to the repo and open the file corresponding to the class name <code><u>cosmetics.py</u></code> in <a href="https://github.com/Fortnite-API/py-wrapper/blob/master/fortnite_api/cosmetics.py">https://github.com/Fortnite-API/py-wrapper/blob/master/fortnite_api/cosmetics.py</a>
				and you will find all the class methods and attributes that are available for the python wrapper.
				<code>
					<pre>class BrCosmetic:
	def __init__(self, data):
		self.id = data.get('id')
		self.name = data.get('name')
		self.description = data.get('description')
		self.exclusive_description = data.get('exclusiveDescription')
		self.unlock_requirements = data.get('unlockRequirements')
		self.custom_exclusive_callout = data.get('customExclusiveCallout')</pre>
				</code>
				
				now that you know the name of the variables you could access to it:
				<code><pre>>>> cosmetics[0].name
>>> "Cazadora Wings"</pre>
				</code>
				this is a simple way to get information about the class you want to request,
				but if you have some experience handling object oriented programming you 
				could try to iterate over class attributes by using a loop and methods like <code><b>dir, getattr and callable</b></code><br><br>
				example:
				<code>
					<pre># add a function after declare fortnite-api
def iter_obj(req_class):
	"""Iterate over an object and print each attribute"""
	for variable in dir(req_class):
		if not variable.startswith('__'):
		    print("{}: {}".format(variable, getattr(req_class, variable)))</pre>
				</code>
				when calling the first object in <b><code>cosmetics</code></b>
				
				<code>
					<pre>>>> iter_obt(cosmetics[0])
added: 2023-06-12 21:47:52+00:00
appearances: 0
backend_introduction: 25
backend_rarity: EFortRarity::Epic
backend_series: None
backend_set: WhizLucha
backend_type: AthenaBackpack
background: None
built_in_emote_ids: None
coverart: None
custom_exclusive_callout: None
decal: None
definition_path: None
description: The hunt is always with you.
display_asset_path: None
display_type: Back Bling
dynamic_pak_id: None
exclusive_description: None
featured: None
first_appearance: None
gameplay_tags: ['Cosmetics.LimitedTimeReward', 'Cosmetics.UserFacingFlags.HasUpgradeQuests', 'Cosmetics.Set.WhizLucha', 'Cosmetics.Filter.Season.25']
icon: https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/icon.png
id: Backpack_AgentSherbert
introduction_chapter: 4
introduction_season: 3
introduction_text: Introduced in Chapter 4, Season 3.
item_preview_hero_path: None
last_appearance: None
meta_tags: None
name: Cazadora Wings
path: FortniteGame/Content/Athena/Items/Cosmetics/Backpacks/Backpack_AgentSherbert
rarity: BrCosmeticRarity.EPIC
rarity_text: Epic
raw_data: {'id': 'Backpack_AgentSherbert', 'name': 'Cazadora Wings', 'description': 'The hunt is always with you.', 'type': {'value': 'backpack', 'displayValue': 'Back Bling', 'backendValue': 'AthenaBackpack'}, 'rarity': {'value': 'epic', 'displayValue': 'Epic', 'backendValue': 'EFortRarity::Epic'}, 'series': None, 'set': {'value': 'Dynamo Voladora', 'text': 'Part of the Dynamo Voladora set.', 'backendValue': 'WhizLucha'}, 'introduction': {'chapter': '4', 'season': '3', 'text': 'Introduced in Chapter 4, Season 3.', 'backendValue': 25}, 'images': {'smallIcon': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/smallicon.png', 'icon': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/icon.png', 'featured': None, 'other': None}, 'variants': [{'channel': 'Progressive', 'type': 'style', 'options': [{'tag': 'Stage1', 'name': 'Cazadora Wings', 'image': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/variants/progressive/stage1.png'}, {'tag': 'Stage2', 'name': 'Midnight', 'image': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/variants/progressive/stage2.png'}]}], 'searchTags': None, 'gameplayTags': ['Cosmetics.LimitedTimeReward', 'Cosmetics.UserFacingFlags.HasUpgradeQuests', 'Cosmetics.Set.WhizLucha', 'Cosmetics.Filter.Season.25'], 'metaTags': None, 'showcaseVideo': None, 'dynamicPakId': None, 'displayAssetPath': None, 'definitionPath': None, 'path': 'FortniteGame/Content/Athena/Items/Cosmetics/Backpacks/Backpack_AgentSherbert', 'added': '2023-06-12T21:47:52Z', 'shopHistory': None}
search_tags: None
series: None
series_image: None
set: Dynamo Voladora
set_text: Part of the Dynamo Voladora set.
shop_history: []
showcase_video_url: None
small_icon: https://fortnite-api.com/images/cosmetics/br/backpack_agentsherbert/smallicon.png
type: BrCosmeticType.BACKPACK
unlock_requirements: None
unseen_for: None
variants: [<fortnite_api.cosmetics.BrCosmeticVariant object at 0x000002912FE3AB00>]
					</pre>
				</code>
				if you are not good when dealing with english you could set your favorite language
				as indicate the documentation
				<code></code>
				
				<code>
					<pre>>>> from fortnite_api.enums import GameLanguage
>>> german = GameLanguage.GERMAN
>>> cosmetics = api.cosmetics.fetch_all(german)</pre>
				</code>
				<br>
				<br>
				Example:
				<code>
					<pre>>>> it_obj(cosmetics[1]) # second item
added: 2023-04-11 10:06:45+00:00
appearances: 0
backend_introduction: 24
backend_rarity: EFortRarity::Epic
backend_series: None
backend_set: FishPalace
backend_type: AthenaBackpack
background: None
built_in_emote_ids: None
coverart: None
custom_exclusive_callout: None
decal: None
definition_path: None
description: Das Meer hungert nach den Wagemutigen, die es überqueren.
display_asset_path: None
display_type: Rücken-Accessoire
dynamic_pak_id: None
exclusive_description: None
featured: None
first_appearance: None
gameplay_tags: ['Cosmetics.Source.ItemShop', 'Cosmetics.Filter.Season.24', 'Cosmetics.Set.FishPalace']
icon: https://fortnite-api.com/images/cosmetics/br/backpack_agentxkoi/icon.png
id: Backpack_AgentXKoi
introduction_chapter: 4
introduction_season: 2
introduction_text: Wurde in Kapitel 4, Saison 2 eingeführt.
item_preview_hero_path: FortniteGame/Content/Athena/Items/Cosmetics/Characters/Character_AgentXKoi
last_appearance: None
meta_tags: None
name: Starke Strömung
path: FortniteGame/Content/Athena/Items/Cosmetics/Backpacks/Backpack_AgentXKoi
rarity: BrCosmeticRarity.EPIC
rarity_text: Episch
raw_data: {'id': 'Backpack_AgentXKoi', 'name': 'Starke Strömung', 'description': 'Das Meer hungert nach den Wagemutigen, die es überqueren.', 'type': {'value': 'backpack', 'displayValue': 'Rücken-Accessoire', 'backendValue': 'AthenaBackpack'}, 'rarity': {'value': 'epic', 'displayValue': 'Episch', 'backendValue': 'EFortRarity::Epic'}, 'series': None, 'set': {'value': 'Koi-Königreich', 'text': 'Teil des „Koi-Königreich“-Sets.', 'backendValue': 'FishPalace'}, 'introduction': {'chapter': '4', 'season': '2', 'text': 'Wurde in Kapitel 4, Saison 2 eingeführt.', 'backendValue': 24}, 'images': {'smallIcon': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentxkoi/smallicon.png', 'icon': 'https://fortnite-api.com/images/cosmetics/br/backpack_agentxkoi/icon.png', 'featured': None, 'other': None}, 'variants': None, 'searchTags': None, 'gameplayTags': ['Cosmetics.Source.ItemShop', 'Cosmetics.Filter.Season.24', 'Cosmetics.Set.FishPalace'], 'metaTags': None, 'showcaseVideo': None, 'dynamicPakId': None, 'itemPreviewHeroPath': 'FortniteGame/Content/Athena/Items/Cosmetics/Characters/Character_AgentXKoi', 'displayAssetPath': None, 'definitionPath': None, 'path': 'FortniteGame/Content/Athena/Items/Cosmetics/Backpacks/Backpack_AgentXKoi', 'added': '2023-04-11T10:06:45Z', 'shopHistory': None}
search_tags: None
series: None
series_image: None
set: Koi-Königreich
set_text: Teil des „Koi-Königreich“-Sets.
shop_history: []
showcase_video_url: None
small_icon: https://fortnite-api.com/images/cosmetics/br/backpack_agentxkoi/smallicon.png
type: BrCosmeticType.BACKPACK
unlock_requirements: None
unseen_for: None
variants: None</pre>
				</code>
			</p>
			<br>
			<br>
			<p>
			Commonly <b>cosmetics, banners, stats, shop items</b> returns a very large array of different objects, 
			an this will cost too much time consumption and memory resources, so what is highly recommended is 
			to use methods to search each of them by his name, and this is what our bot commands should be composed.
			<br>
			<br>
			first, after you define <b>iter_obj</b> declare a new variable called <b>languages</b>:
			<code>
				<pre>languages = {'ar': 'ARABIC',
	'en': 'ENGLISH',
	'de': 'GERMAN',
	'es': 'SPANISH',
	'es-419': 'SPANISH_LATIN',
	'fr': 'FRENCH',
	'it': 'ITALIAN',
	'ja': 'JAPANESE',
	'ko': 'KOREAN',
	'pl': 'POLISH',
	'pt-BR': 'PORTUGUESE_BRASIL',
	'ru': 'RUSSIAN',
	'tr': 'TURKISH',
	'zh-CN': 'CHINESE_SIMPLIFIED',
	'zh-Hant': 'CHINESE_TRADITIONAL'
}</pre>
			</code>
			So, getting back to the first defined command:
			<code>
				<pre>@bot.command()
async def cosmetics(ctx, lang: str, *, name: str):
    """Shows info about cosmetics, given his name and search language"""
    try:
        cosmetic = api.cosmetics.search_all(search_language=getattr(GameLanguage, languages[lang]), name=name)
        embeds = []
        for c in cosmetic:
            embed = discord.Embed()
            embed.title = c.name
            embed.description = c.description
            embed.set_image(url=c.icon.url)
            embed.set_footer(text=c.introduction_text, icon_url=c.small_icon.url)
            embeds.append(embed)
        await ctx.send(embeds=embeds)
    except fortnite_api.errors.NotFound as e:
        await ctx.send("Please enter a valid name")
        await ctx.send(e)</pre>
			</code>
			</p>
			<br>
			<br>
			<p>example</p>
			<img src="/assets/img/animated.gif" alt="example animated" style="background-color:#000;"/>
			<br>
			<br>
			<p>
			There are no so much differences between the next methods because i'll have defined
			at least very closed to <b><code>cosmetics</code></b>, the following section to request
			is <b>Battle Royale player stats</b>, by using <code><b>fetch_by_name()</b></code>, to get information
			about player account.
			</p>
			<code>
				<pre>>>> player = api.stats.fetch_by_name('playername')
>>> raise NotFound(data.get('error', 'Error message not provided!'))
>>> fortnite_api.errors.NotFound: the requested account does not exist</pre>
			</code>
			<br>
			<p>
			    if the player name introduced does not exist it will raise an error
			</p>
			<code>
				<pre>>>> player = api.stats.fetch_by_name('Bizzle')  # TOP player in 2018
>>> raise NotFound(data.get('error', 'Error message not provided!'))
>>> fortnite_api.errors.NotFound: the requested account does not exist</pre>
			</code>
			<br>
			<p>
			ok you guys at this point remember to introduce a correct player account because 
			you will have undesired results
			</p>
			<br>
			<br>
			<code>
				<pre> # By the end the function could be something like this
@bot.command()
async def player(ctx, *, name: str):
    """Returns player stats data such as overall, duo, solo, trio, and others..."""
    try:
        player = api.stats.fetch_by_name(name)
        player = player.stats.all
        embeds = {}
        for var in dir(player):
            if not var.startswith('__') and var != 'raw_data':
                embed = discord.Embed()
                s = ""
                nested_obj = getattr(player, var)
                for variable in dir(nested_obj):
                    if not variable.startswith('__'):
                        s += "{}: {}".format(variable, getattr(nested_obj, variable))
                        s += '\n'
                embed.title = var
                embed.description = s
                embed.set_footer(text="Player: %s" % (name))
                embeds[var] = embed
        await ctx.send(embeds=[embeds[key] for key in embeds.keys()])
    except fortnite_api.errors.NotFound as e:
        await ctx.send("Incorrect player name")
        await ctx.send(e)
				</pre>
			</code>
			<p>
			output
			</p>
			<img src="/assets/img/stats.jpeg" alt="top player stats"/>
			<br>
			<br>
			<br>
			<br>
			<h5>Coming soon ;)</h5>
			<ul>
				<li>Shop features</li>
				<li>Banners</li>
				<li>AES Keys</li>
				<li>and more...</li>
			</ul>
			<p> entire code could be found at <a href="https://github.com/dlprisco/discord-bot/tree/main/fortnite">github-repo</a></p>
			<br>
			<br>
			<br>
			<br>
		</details>
	</li>
	<br>
	<br>
	<br>
	
	<li>
		<details>
			<summary>
				<a href="#Currency Data Management"></a><h3 style="display:inline;" name="Currency Data Management">Currency Data Management (Feb 5, 2023)</h3>
			</summary>
			<p>
				Video about displaying currency price data in a discord chat by using <b><code>discord</code></b> and <b><code>coinmarketcap-api</code></b> where i think the main focused content is how the data is
				procesed by using <b><code>request</code></b> to get a <code>json</code> formated string to be displayed on any chat by using a determined bot command, i mean the video could be resume to 
				a couple of code statements like:
			</p>
			<code>
				<pre>from coinmarketcap import CoinMarketCap
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
...</pre>
			</code>
			<p>
				and once we have a well formated string, send as a message
			</p>
			<code>
				<pre>@bot.command(name='bot')
async def _bot(ctx):
    """Is the bot cool?"""
    await ctx.send('Yes, the bot is cool.')
				</pre>
			</code>
			<p>for more information, please check the <a href="https://github.com/dlprisco/discord-bot/blob/main/bot/main.py">repository</a> that i have made some coding bot practices and watch the <a href="https://www.youtube.com/embed/lcVAy7zAubg">video tutorial</a>.</p>
		</details>
	</li>
	<br>
	<br>
	<br>
	
	<li>
		<details>
			<summary>
				<a href="#Client Setup"></a><h3 style="display:inline;" name="Client Setup">Client Setup and Message Handling (Jan 20, 2023)</h3>
			</summary>

			<p>Basic Discord bot</p>
			<code>
				<pre>import discord
				
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
				</pre>
			</code>
			<p>
				<a href="https://www.youtube.com/watch?v=fVP4YHoNp18">video tutorial</a>.
			</p>
		</details>
	</li>
</ul>