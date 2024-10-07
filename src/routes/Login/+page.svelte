<script lang="ts">
	import { goto } from "$app/navigation";
	import LeftMcc from "$lib/icons/left-mcc.svelte";
	import { loginUser } from "../Login/auth";
	

    let email = "";
    let password = "";

    function goHome(){
        goto("/");
    }

    async function handleLogin() {
		// isLoading = true;
		// errorMessage = '';
		await loginUser(email, password);
		setTimeout(() => {
			// isLoading = false;
		}, 3000);
	}

</script>

<svelte:head>
    <title>Sarpsborg Moske | Innlogging</title>
</svelte:head>

<div class="login-container">
	<div class="login-box">
		<div class="header">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="home-btn tooltip" on:click={goHome}>
				<span class="tooltiptext"><p>Tilbake til nettsiden</p></span>
				<LeftMcc controlsWidth="20" />
			</div>
			<h1>Logg inn</h1>
		</div>

		<form on:submit={handleLogin}>
			<input type="email" bind:value={email} placeholder="Epost" required autocomplete="email" />
			<input
				type="password"
				bind:value={password}
				placeholder="Passord"
				required
				autocomplete="current-password"
			/>
			<button type="submit"><p>Logg inn</p></button>
		</form>

	</div>
</div>