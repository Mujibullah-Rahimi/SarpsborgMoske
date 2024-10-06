<script lang="ts">
	import { fade } from 'svelte/transition';
	import { toastStore } from '../Toast/toastStore';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
	<script src="https://kit.fontawesome.com/4a4b4f7015.js" crossorigin="anonymous"></script>
</svelte:head>

{#if $toastStore.empty != true}
	{#if $toastStore.type === 'success'}
		<body>
			<div class="toast" transition:fade={{ delay: 250, duration: 300 }}>
				<div role="alert" class="notification notification-success">
					<i class="fa-solid fa-circle-check"></i>
					<p>{$toastStore.message}</p>
				</div>
			</div>
		</body>
	{/if}
	{#if $toastStore.type === 'error'}
		<body>
			<div class="toast" transition:fade={{ delay: 250, duration: 300 }}>
				<div role="alert" class="notification notification-error">
					<i class="fa-solid fa-circle-xmark"> </i>
					<p>{$toastStore.message}</p>
				</div>
			</div>
		</body>
	{/if}
{/if}

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-size: 1em;
	}
	body {
		position: relative;
	}
	.notification {
		position: absolute;
		z-index: 9999;
		top: 80vh;
		left: 0;
		right: 0;
		margin: 0 auto;
		padding: 5px;
		width: fit-content;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;

		background-color: #fff;
		color: rgb(46, 47, 48);
		border: none;
		border-radius: 5px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	}
	.notification-success {
		border-left: 5px solid var(--green-primary);
	}
	.notification-success i {
		color: var(--green-primary);
	}
	.notification-error {
		border-left: 5px solid rgb(255, 113, 113);
	}
	.notification-error i {
		color: rgb(255, 113, 113);
	}

</style>
