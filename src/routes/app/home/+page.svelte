<script lang="ts">
    import { invalidate } from "$app/navigation";
    import type { PageData } from "./$types";
    import GoalScore from "$lib/components/GoalScore.svelte";

    export let data: PageData;

    $: ({ goal, score } = data);

    $: progress = (score / goal) * 100 > 100 ? 100 : (score / goal) * 100;
</script>

<body>
    <GoalScore {goal} bind:progress />
    <div class="flex flex-col items-center justify-center h-full text-white">
        <h2 class="font-bold text-4xl">SCORE</h2>
        <h1
            style="color: {`hsl(${120 - progress * 1.2}, 60%, 50%)`}"
            class="font-extrabold text-7xl"
        >
            {score}
        </h1>
        <p>6 days ago</p>
    </div>
</body>
