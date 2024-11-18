<script lang="ts">
    import type { PageData } from "./$types";
	import {
		AccordionItem,
		Accordion,
		Label,
		Radio,
		NumberInput,
        Input,
        Toast,
	} from "flowbite-svelte";
	import { CheckCircleSolid } from "flowbite-svelte-icons";
	import { goto, invalidate } from "$app/navigation";
    import { onMount } from "svelte";

	export let data: PageData;
	$: ({ supabase, userGoal, user } = data)

	let isOpen = false;
	let isOpenUsername = false;
	let displayName = "";
	let goal = 0;
	let toastStatus = false;
	let counter = 6;

	onMount(() => {
		goal = userGoal;
		displayName = user?.user_metadata.display_name;
	})

	async function update(){
        if (goal <= 0 || displayName == "") return;

        const {error: error } = await supabase.from("profiles").upsert({
            user_id: user?.id,
            display_name: displayName,
        });
		console.log(error);
		
        await supabase.from("user_goals").upsert({ goal: goal, id: user?.id });

		invalidate("supabase:db:user_goals");
		triggerToast();
	}

	function triggerToast() {
		toastStatus = true;
		counter = 6;
		timeoutToast();
	}

  function timeoutToast() {
    if (--counter > 0) return setTimeout(timeoutToast, 1000);
    toastStatus = false;
  }

	$: logout = async () => {
		await supabase.auth.signOut();
		goto("/");
	};
</script>

<div class="p-4 h-full text-light-olive">
	<Toast dismissable={false} bind:toastStatus position="top-left" class="bg-ultra-olive text-white rounded-xl">
		<CheckCircleSolid slot="icon" color="olive" class="w-5 h-5" />
		Saved settings
	</Toast>
	<div class="max-w-s mx-auto p-4">
		<!-- Titel -->
		<h2 class="text-3xl font-bold mb-4">Profile & Settings</h2>

		<!-- Logout -->
		<button
			on:click={logout}
			class="flex w-full justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<p class="p-2 font-bold">Logout</p>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</button>

		<!-- recent tracks -->
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">recent tracks</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>

		<!-- weekly goal (mit Dropdown-Option) -->
		<Accordion flush class="max-w-s mx-auto -mt-5 -mb-3">
			<AccordionItem bind:open={isOpen} borderBottomClass="border-none">
				<!-- Header im Accordion so stylen wie das div -->
				<div
					slot="header"
					class="flex w-full justify-between items-center bg-olive p-2 rounded-full cursor-pointer hover:bg-light-olive hover:text-dark-olive"
				>
					<span class="p-2 font-bold">weekly goal</span>
					{#if isOpen}
						<img
							src="/options/ChevronDown.svg"
							alt="Pfeil runter"
						/>
					{:else}
						<img
							src="/options/ChevronRight.svg"
							alt="Pfeil rechts"
						/>
					{/if}
				</div>

				<div slot="arrowup" hidden />
				<div slot="arrowdown" hidden />

				<!-- Inhalt des AccordionItem -->
				<div
					class="flex flex-col justify-between items-center bg-olive p-2 rounded-lg mb-2 cursor-pointer -mt-5"
				>
					<Label for="goal" class="mb-4 font-semibold"
						>Update your weekly goal</Label
					>
					<ul
						class="rounded-lg border bg-dark-gray border-gray-600 divide-y divide-gray-600"
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
						<li>
							<NumberInput
								max="1000"
								name="goal_number"
								required
								bind:value={goal}
								class="bg-dark-gray"
								pattern="^[1-9][0-9]*$"
							/>
						</li>
						<li class="p-3">
							<button
								class="bg-light-olive text-dark-olive font-bold py-2 px-4 w-full rounded-full hover:bg-dark-olive hover:text-light-olive"
								on:click={() => update()}
							>
								Save
							</button>
						</li>
					</ul>
				</div>
			</AccordionItem>
		</Accordion>

		<!-- Andere Optionen -->
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">friends</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
		<Accordion flush class="max-w-s mx-auto -mt-5 -mb-3">
			<AccordionItem bind:open={isOpenUsername} borderBottomClass="border-none">
				<!-- Header im Accordion so stylen wie das div -->
				<div
					slot="header"
					class="flex w-full justify-between items-center bg-olive p-2 rounded-full cursor-pointer hover:bg-light-olive hover:text-dark-olive"
				>
					<span class="p-2 font-bold">username</span>
					{#if isOpenUsername}
						<img
							src="/options/ChevronDown.svg"
							alt="Pfeil runter"
						/>
					{:else}
						<img
							src="/options/ChevronRight.svg"
							alt="Pfeil rechts"
						/>
					{/if}
				</div>

				<div slot="arrowup" hidden />
				<div slot="arrowdown" hidden />

				<!-- Inhalt des AccordionItem -->
				<div
					class="flex flex-col gap-5 justify-between items-center bg-olive p-2 rounded-lg mb-2 cursor-pointer -mt-5"
				>
					<Label for="goal" class="mb-4 font-semibold"
						>Update your displayed name</Label
					>
					<Input class="bg-dark-gray" maxlength={16} bind:value={displayName}/>
					<button
						class="bg-light-olive text-dark-olive font-bold py-2 px-4 w-full rounded-full hover:bg-dark-olive hover:text-light-olive"
						on:click={() => update()}
					>
						Save
					</button>
				</div>
			</AccordionItem>
		</Accordion>
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">profile picture</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">password</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
	</div>
</div>
