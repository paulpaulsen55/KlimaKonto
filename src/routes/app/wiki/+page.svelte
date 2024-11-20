<script lang="ts">
    import { Accordion, AccordionItem } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
    $: ({ actions, categories } = data)

    const AccordionItemAny = AccordionItem as any;
</script>

<body class="flex flex-col px-40 text-light-olive">
    {#each categories as category}
        <h2 class="py-4 font-bold">{category}</h2>
        <Accordion>
            {#each actions as action}
                {#if action.category == category}
                    <AccordionItemAny class="bg-gray-olive">
                        <h3 slot="header">{action.name}</h3>
                        <p>{action.tip}</p>
                    </AccordionItemAny>
                {/if}
            {/each}
        </Accordion>
    {/each}
</body>

