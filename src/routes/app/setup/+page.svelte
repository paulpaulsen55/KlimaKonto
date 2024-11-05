<script lang="ts">
    import {
        StepIndicator,
        Button,
        NumberInput,
        Input,
        Label,
        Radio,
    } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import { user } from "$lib/store";

    export let data;
    $: ({ supabase } = data);

    let currentStep = 1;
    let steps = ["Einführung", "Ziel festlegen", "Nutzername"];
    let goal = 1;
    let displayName = "";

    async function update() {
        if (goal <= 0 || displayName == "") return;

        await supabase.auth.updateUser({
            data: {
                display_name: displayName,
            },
        });
        await supabase.from("user_goals").upsert({ goal: goal, id: $user?.id });
    }

    function nextStep() {
        if (currentStep == steps.length) {
            update();
            return;
        }
        if (currentStep < steps.length) currentStep++;
    }

    function prevStep() {
        if (currentStep > 1) currentStep--;
    }
</script>

<div
    class="overflow-x-hidden bg-dark-olive flex flex-col h-full justify-between p-5 text-white"
>
    <StepIndicator
        {currentStep}
        {steps}
        glow={true}
        size="h-2.5"
        color="primary"
        hideLabel={false}
        completedCustom="✓"
        currentCustom="→"
        class="z-50 fuck-flowbite"
    />
    {#if currentStep == 1}
        <section in:fly={{ x: 10 }} class="">
            <p>Hier wird eine Einführung stehen.</p>
        </section>
    {:else if currentStep == 2}
        <section in:fly={{ x: 10, delay: 1 }}>
            <Label for="goal" class="mb-4 font-semibold">Weekly goal</Label>
            <ul
                class="rounded-lg border bg-dark-gray border-gray-600 divide-y divide-gray-600"
            >
                <li>
                    <Radio class="p-3" bind:group={goal} value="20"
                        >10 - Expert</Radio
                    >
                </li>
                <li>
                    <Radio class="p-3" bind:group={goal} value="100">100</Radio>
                </li>
                <li>
                    <Radio class="p-3" bind:group={goal} value="200">200</Radio>
                </li>
                <NumberInput
                    max="1000"
                    name="goal_number"
                    required
                    bind:value={goal}
                    class="dark:bg-dark-gray"
                    pattern="^[1-9][0-9]*$"
                />
            </ul>
        </section>
    {:else if currentStep == 3}
        <section in:fly={{ x: 10, delay: 1 }}>
            <Label for="display_name" class="mb-4 font-semibold"
                >Display Name</Label
            >
            <Input
                type="text"
                name="display_name"
                required
                bind:value={displayName}
                class="dark:bg-dark-gray"
            />
        </section>
    {/if}

    <div class="w-full flex justify-between items-start px-4">
        <Button
            class=""
            on:click={() => {
                prevStep();
            }}>Zurück</Button
        >
        <Button
            on:click={() => {
                nextStep();
            }}>Weiter</Button
        >
    </div>
</div>
