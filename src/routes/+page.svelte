<script>
	// Library Imports
	import { setScene } from '$lib/ThreeObject.js';
	import { fade } from "svelte/transition";
	import { onMount } from 'svelte';

    // Create a new wavy sphere scene
	let ThreeObject;

	// Repos
	let Repos = [];

	// On Page Mount
    onMount(async () => {
        await setScene(ThreeObject)

        // Get github repo data
        const URLS = [
            "https://api.github.com/users/Simpson-Computer-Technologies-Research/repos",
            "https://api.github.com/users/realTristan/repos"
        ]
        URLS.forEach(async (url, _) =>
            await self.fetch(url)
                .then(response => response.json())
                .then(json => Repos = [...Repos, ...json])
                .catch(error => console.log(error))
        );
    });
</script>

<!-- Header -->
<div class="group">
	<h2 class="text-white text-6xl font-black tracking-widest mt-20 ml-20">Simpson Research</h2>
	<h2 class="text-white text-2xl font-thin tracking-widest mt-6 ml-20">&nbsp;The brink of <mark id="revelation" style="background: none; color: #FF0080;" class="font-black">revelation.</mark></h2>
</div>

<!-- Github Repos -->
<div class="mt-10 ml-24">
	{#each Repos as data, i}
		<div class="group my-20 translate-y-0 hover:-translate-y-8 duration-[400ms] ease-in-out mr-10 w-[20rem] md:w-[40rem] 2xl:w-[50rem]" in:fade={{ delay: 250 * i, duration: 1000 }}>
			<a href={data.html_url} rel="noopener noreferrer" target="_blank" class="mb-48 h-64 px-10 pt-6 rounded-[2.5rem] tracking-widest shadow-[#202020]">
				<h2 class="text-white text-xl font-black">
					<mark style="background: none;" class="text-[#FF0080]">$</mark>&nbsp;{data.name}
				</h2>
				<h2 class="text-gray-200 text-md font-base mt-4">{data.description}</h2>
				<div class="flex mt-6">
					{#each data.topics as topic}
						<div class="">
							<h2 class="text-[0.60rem] text-gray-50 tracking-widest mr-4 uppercase">{topic}</h2>
						</div>
					{/each}
				</div>
			</a>
		</div>
	{/each}
</div>

<!-- The 3D Wave Sphere -->
<canvas bind:this={ThreeObject} style="top: 0px; right: 0px; z-index: -1; position: fixed;"/>

<style>
	#revelation { animation: rainbow 6s infinite; }
	@keyframes rainbow {
		0% 		{color: #FF0080}
		15% 	{color: #FF00AA}
		30% 	{color: #FF00EA}
		45% 	{color: #EA00FF}
		60% 	{color: #FF00C8}
		75% 	{color: #FF009D}
		100% 	{color: #FF008C}
	}
</style>