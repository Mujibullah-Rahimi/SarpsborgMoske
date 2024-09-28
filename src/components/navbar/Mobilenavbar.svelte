<script>
	import { slide } from 'svelte/transition';
	import MediaQuery from '../MediaQuery.svelte';
	import { quintOut } from 'svelte/easing';
	import BarsMcc from '$lib/icons/bars-mcc.svelte';
	import XmarkMcc from '$lib/icons/xmark-mcc.svelte';
	import Logo from '../Logo.svelte';
	import ButtonPrimary from '../ButtonPrimary.svelte';

	let open = false;
	function handleMobileMenuClick() {
		if (open) {
			open = false;
		} else {
			open = true;
		}
	}
	function handleMenuChoice() {
		if (open) {
			open = false;
		}
	}
	function handleOverlayClick() {
		open = false;
	}
</script>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<div class="mobile-nav">
			<div class="mobile-nav-closed">
				<div class="mobile-nav-dropdown">
					<button class="mobile-nav-menu-btn right" on:click={handleMobileMenuClick}>
						{#if !open}
							<BarsMcc width="24" />
						{:else}
							<XmarkMcc width="24" />
						{/if}
					</button>
				</div>
				<div class="mobile-nav-text"><a href="/#"><Logo width="48" /></a></div>
			</div>
		</div>
		{#if open}
			<div
				transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
				class="mobile-nav-opened"
			>
				<div class="mobile-nav-opened-sidebar">
					<div class="mobile-nav-sidebar-content">
						<p><a href="/#top" on:click={handleMenuChoice}>Hjem</a></p>
						<p><a href="/#Bønnetabell" on:click={handleMenuChoice}>Bønnetabell</a></p>
						<p><a href="/#OmMCC" on:click={handleMenuChoice}>Om MCC</a></p>
						<p><a href="/#Innmelding" on:click={handleMenuChoice}>Innmelding</a></p>
						<p><a href="/#Kontakt" on:click={handleMenuChoice}>Kontakt</a></p>
						<p>
							<a href="/#top" class="nav-book-meeting" on:click={handleMenuChoice}
								><ButtonPrimary text="Støtt MCC" fontSize="1.25em" />
							</a>
						</p>
					</div>
				</div>
				<div class="mobile-nav-opened-overlay" on:click={handleOverlayClick}></div>
			</div>
		{/if}
	{/if}
</MediaQuery>

<style lang="scss">
	.mobile-nav {
		z-index: 2;
		width: 100%;
		left: 0;
		top: 0;
		height: 70px;
		position: fixed;
		background-color: var(--white);
		box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.1);
		.mobile-nav-closed {
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.mobile-nav-dropdown {
				margin: 0 0 0 1em;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.mobile-nav-menu-btn {
					display: flex;
					border: none;
					background-color: transparent;
					justify-content: center;
				}
			}
			.mobile-nav-text {
				a {
					height: 100%;
					display: flex;
					align-items: center;
					margin: 0 1em 0 0;
					font-family: 'Poppins';
					color: var(--black);
					text-decoration: none;
				}
			}
		}
	}
	.mobile-nav-opened {
		z-index: 2;
		margin-top: 70px;
		left: 0;
		top: 0;
		position: fixed;
		height: calc(100% - 60px);
		width: 100%;
		display: flex;
		flex-direction: row;
		.mobile-nav-opened-sidebar {
			width: 50%;
			.mobile-nav-sidebar-content {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: start;
				padding-left: 10%;
				background-color: var(--white);
				box-shadow: 5px 15px 12px 0 rgb(0, 0, 0, 0.1);
				p {
					margin: 1em 0 1em 0;
					a {
						text-decoration: none;
						color: var(--black);
						font-size: 1.2em;
					}
				}

				.nav-book-meeting {
				}
			}
		}
		.mobile-nav-opened-overlay {
			width: 50%;
			height: 100%;
			z-index: 2;
		}
	}
</style>
