<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
    $: ({ actions } = data)
</script>

<ul class="overflow-y-auto grid gap-5">
    {#each actions as action}
        <li class="m-5 p-5 rounded-xl bg-light-olive">
            {action.tip}
        </li>
    {/each}
</ul>

