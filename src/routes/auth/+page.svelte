<div class="flex justify-between items-center p-4">
    <p>KlimaKonto</p>
    <a href="/">Home</a>
</div>
<form method="POST" action="?/login" class="flex flex-col items-start">
	<label>
		Email
		<input name="email" type="email" class="border-2" />
	</label>
	<label>
		Password
		<input name="password" type="password" class="border-2"/>
	</label>
	<button class="bg-green-500 p-2 rounded m-2">Login</button>
	<button class="bg-green-500 p-2 rounded m-2" formaction="?/signup">Sign up</button>
</form>