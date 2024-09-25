<script>
	import ButtonPrimary from '../ButtonPrimary.svelte';
	import Logo from '../Logo.svelte';
	import MediaQuery from '../MediaQuery.svelte';
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<nav>
			<div class="logo">
				<Logo />
			</div>
			<div class="navbar-menu">
				<ul>
					<li><p><a href="/#Bønnetabell">Bønnetabell</a></p></li>
					<li><p><a href="/#OmMCC">Om MCC</a></p></li>
					<li><p><a href="/#Kontakt">Kontakt</a></p></li>
				</ul>
			</div>
			<div class="navbar-cta">
				<ButtonPrimary text="Støtt MCC" fontSize="1.25em" height="2em" />
			</div>
		</nav>
	{/if}
</MediaQuery>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		max-height: 75px;
		width: 100%;
		padding: 0 10% 0 10%;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
	}

	.logo {
		cursor: pointer;
	}
	.navbar-menu {
		display: flex;
		align-items: center;
		ul {
			display: flex;
			list-style-type: none;
			li {
				margin: 10px;
				cursor: pointer;
				p {
					font-size: 1.25em;
					a {
						text-decoration: none;
						color: var(--black);
					}
					transition: ease-in-out 0.25s;
					&:hover {
						transform: translateY(-1px);
					}
				}
			}
		}
	}
	.navbar-cta {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
