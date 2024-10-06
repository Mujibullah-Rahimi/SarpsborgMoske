<script lang="ts">
	import XmarkMcc from "$lib/icons/xmark-mcc.svelte";

	export let open = false;
	export let onConfirm: () => void;
	export let onCancel: () => void;

	function handleConfirm() {
		onConfirm();
		open = false;
	}

	function handleCancel() {
		onCancel();
		open = false;
	}
</script>

{#if open}
	<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
	<div class="popup-overlay" on:click={handleCancel}>
		<div class="popup-container" on:click|stopPropagation>
			<div class="popup-header">
				<h2>Er du sikker?</h2>
				<div class="close-btn" on:click={handleCancel}>
                    <XmarkMcc width="20" />
                </div>
			</div>
			<p>Ønsker du å logge ut?</p>
			<div class="popup-actions">
				<button on:click={handleConfirm} class="confirm-btn"><p>Ja</p></button>
				<button on:click={handleCancel} class="cancel-btn"><p>Nei</p></button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.popup-container {
		background-color: #fff;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
		width: 300px;
		position: relative;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.popup-actions {
		display: flex;
		justify-content: space-around;
		margin-top: 1.5rem;
	}

	.confirm-btn {
		background-color: var(--green-primary);
		color: #fff;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.cancel-btn {
		color: var(--black);
        background-color: var(--white);
		padding: 0.5rem 1rem;
		border: 1px solid var(--green-primary);
		border-radius: 5px;
		cursor: pointer;
	}

	.confirm-btn:hover,
	.cancel-btn:hover {
		opacity: 0.8;
	}
</style>
