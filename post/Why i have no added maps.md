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
				<br>
				to get cosmetics data we could use <b>
				
				now that you know the name of the variables you could access to it:
				<code><pre>>>> cosmetics[0].name
>>> "Cazadora Wings"</pre>
				</code>
				this is a simple way to get information about the class you want to request,
				but if you have some experience handling object oriented programming you 
				could try to iterate over class attributes by using a loop and methods like <code><b>dir, getattr and callable</b></code><br><br>
				example:
				<code>
				when calling the first object in <b><code>cosmetics</code></b>
				<br>
				<br>
				Example:
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
			So, getting back to the first defined command:
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
			<br>
			<p>
			ok you guys at this point remember to introduce a correct player account because 
			you will have undesired results
			</p>
			<br>
			<br>
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
			<p>
			</p>
		</details>
	</li>
</ul>
