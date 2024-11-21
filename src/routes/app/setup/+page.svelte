<script lang="ts">
    import type { PageData } from "./$types";
    import {
        StepIndicator,
        Button,
        NumberInput,
        Input,
        Label,
        Radio,
    } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";

    export let data: PageData;
    $: ({ supabase, user } = data);

    let currentStep = 1;
    let steps = ["Introduction", "Set personal goal", "Set display name"];
    let goal = 500;
    let displayName = "";
    let nameError = "";
    let goalError = "";

    async function update() {
        goalError = "";
        nameError = "";
        if (goal <= 0 || goal > 1000) {
            goalError = "Please select a goal between 1 and 1000.";
            currentStep = 2;
            return;
        }
        if (displayName == "") {
            nameError = "Please select a display name.";
            currentStep = 3;
            return;
        }

        await supabase.from("user_goals").upsert({ goal: goal, id: user?.id });
        const {error: sError } = await supabase.from("profiles").upsert({
            user_id: user?.id,
            display_name: displayName,
        });

        if (sError){
            nameError = "Display name is already taken.";
        } else {
            goto("/app/home");
        }
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
        <section in:fly={{ x: 10 }} class="flex flex-col items-center">
            <p>
                CO2ntrol helps you track your daily activities and work towards a climate-neutral lifestyle. 
                The goal is simple: earn as few points as possible to minimize your carbon footprint. 
                Set a weekly target, monitor your progress, and stay motivated as you strive to make sustainable choices. 
                Your personalized dashboard keeps you updated on how many points you have left to "spend" for the week. 
                Ready to take control and make a difference? Let’s start your journey to a greener future!
            </p>
            <img src="/tri_happy.png" alt="happy">
        </section>
    {:else if currentStep == 2}
        <section in:fly={{ x: 10, delay: 1 }}>
            <Label for="goal" class="mb-4 font-semibold">Weekly goal</Label>
            <ul
                class="rounded-lg border bg-ultra-olive border-gray-600 divide-y divide-gray-600 mb-4"
            >
                <li>
                    <Radio class="p-3" bind:group={goal} value="75"
                        >75 - Expert</Radio
                    >
                </li>
                <li>
                    <Radio class="p-3" bind:group={goal} value="150"
                        >150 - Advanced</Radio
                    >
                </li>
                <li>
                    <Radio class="p-3" bind:group={goal} value="300"
                        >300 - Beginner</Radio
                    >
                </li>
                <NumberInput
                    name="goal_number"
                    required
                    bind:value={goal}
                    class="bg-ultra-olive"
                />
            </ul>
            {#if goalError !== ""}	
                <div class="bg-red-500 text-white p-4 rounded mb-4">
                    <p>{goalError}</p>
                </div>
            {/if}
        </section>
    {:else if currentStep == 3}
        <section in:fly={{ x: 10, delay: 1 }}>
            <Label for="display_name" class="mb-4 font-semibold"
                >Display name</Label
            >
            <Input
                type="text"
                name="display_name"
                required
                bind:value={displayName}
                class="bg-dark-gray mb-4"
            />
            {#if nameError !== ""}	
                <div class="bg-red-500 text-white p-4 rounded mb-4">
                    <p>{nameError}</p>
                </div>
            {/if}
        </section>
    {/if}

    <div class="w-full flex justify-between items-start px-4">
        <Button
            class=""
            on:click={() => {
                prevStep();
            }}>Back</Button
        >
        <Button
            on:click={() => {
                nextStep();
            }}
        >
            {#if currentStep == steps.length}
                Save
            {:else}
                Next
            {/if}
        </Button>
    </div>
</div>
