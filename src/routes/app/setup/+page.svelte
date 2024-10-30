<script>
    import { StepIndicator, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import SelectGoalPopup from "$lib/components/SelectGoalPopup.svelte";
    import UpdateDisplayName from "$lib/components/UpdateDisplayName.svelte";

    let currentStep = 1;
    let steps = ["Einführung", "Ziel festlegen", "Nutzername"];

    function nextStep() {
        if (currentStep < steps.length)
            currentStep++;
    }

    function prevStep() {
        if (currentStep > 1)
            currentStep--;
    }
</script>

<div class="overflow-x-hidden bg-dark-olive flex flex-col h-full justify-between p-5 text-white">
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
        <section in:fly={{x: 10}} class="">
            <p>
                Hier wird eine Einführung stehen.
            </p>
        </section>
    {:else if currentStep == 2}
        <section in:fly={{x: 10, delay: 1}}>
            <SelectGoalPopup />
        </section>
    {:else if currentStep == 3}
        <section in:fly={{x: 10, delay: 1}}>
            <UpdateDisplayName />
        </section>
    {/if}

    <div class="w-full flex justify-between items-start px-4">
        <Button class="" on:click={() => {prevStep()}}>Zurück</Button>
        <Button on:click={() => {nextStep()}}>Weiter</Button>
    </div>
</div>
