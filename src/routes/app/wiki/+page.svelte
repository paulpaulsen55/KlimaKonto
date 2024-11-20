<script lang="ts">
    import { Accordion, AccordionItem } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
    $: ({ actions, categories } = data)

    const AccordionItemAny = AccordionItem as any;
</script>

<body class="flex flex-col px-10 md:px-40 text-light-olive font-bold pb-[9.09vh]">
    {#each categories as category}
        <h2 class="py-4">{category}</h2>
        <Accordion>
            {#each actions as action}
                {#if action.category == category}
                    <AccordionItemAny class="bg-gray-olive">
                        <div slot="header" class="flex w-full justify-between items-center">
                            <span class="md:p-2 font-bold">{action.name}</span>
                            <span class="md:p-2 font-bold">{action.score} points</span>
                        </div>
                        <p>{action.wiki}</p>
                        {#if action.tip}
                            <p><span class="text-yellow-300">Tip</span>: {action.tip}</p>
                        {/if}
                        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
                        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />
                    </AccordionItemAny>
                {/if}
            {/each}
        </Accordion>
    {/each}
</body>

