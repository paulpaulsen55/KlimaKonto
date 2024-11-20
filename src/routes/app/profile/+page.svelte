<script lang="ts">
  import { Accordion, AccordionItem, Input, NumberInput, Toast, Radio, Label } from 'flowbite-svelte';
  import { CheckCircleSolid } from "flowbite-svelte-icons";
  import { goto, invalidate } from '$app/navigation';
  import { user } from '$lib/store';
  import type { PageData, ActionData } from './$types';
  import { page } from '$app/stores';
  import { onMount } from "svelte";

	export let data: PageData;
  export let form: ActionData;
	$: ({ supabase, userActions, userGoal, profile } = data);

  let isFirstOpen = false;
  let displayName = "";
  let nameError = "";
	let toastStatus = false;
  let goal = 0;
	let counter = 6;

  onMount(() => {
		goal = userGoal;
		displayName = profile.display_name;
    const params = new URLSearchParams($page.url.search);
    if (params.get('open') === 'first') {
      isFirstOpen = true;
    }
	})

	$: logout = async () => {
		await supabase.auth.signOut();
    goto('/');
	};
  
	async function updateGoal(){
    if (goal <= 0 || goal > 1000) return;
		
    await supabase.from("user_goals").upsert({ goal: goal, id: $user?.id });

		invalidate("supabase:db:user_goals");
		triggerToast();
	}

	async function updateProfile(){
    if (displayName == "") return;

    const {error: error } = await supabase.from("profiles").upsert({
        user_id: $user?.id,
        display_name: displayName,
    });
		console.log(error);

    if (error) {
      nameError = "Name already taken"; 
      return;
    }
    
		invalidate("supabase:db:profiles");
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


  const AccordionItemAny = AccordionItem as any;
</script>

<body class="p-4 min-h-screen text-light-olive pb-[9.09vh]">
  <Toast dismissable={false} bind:toastStatus position="top-left" class="bg-ultra-olive text-white rounded-xl">
		<CheckCircleSolid slot="icon" color="olive" class="w-5 h-5" />
		Saved settings
	</Toast>
	<div class="max-w-s mx-auto p-4">
		<!-- Titel -->
		<h2 class="text-3xl font-bold mb-4">Profile & Settings</h2>

		<!-- Akkordion -->
    <Accordion>
      <!-- recent actions  -->
      <AccordionItemAny bind:open={isFirstOpen} class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">recent actions</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <div class="flex justify-center items-center p-2 cursor-pointer">
          <ul class="w-full">
            <!-- Header -->
            <li class="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-x-8 font-bold">
              <span>Actions</span>
              <span>Points</span>
              <span>Date</span>
              <span>Delete</span>
            </li>
        
            <!-- User Actions -->
            {#each userActions.slice(-20) as userAction}
              <li
                class="grid grid-cols-1 gap-y-2 p-2 border-b border-gray-300 md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-x-8 md:p-0 md:border-none"
              >
                <span class="md:hidden font-bold">Action:</span>
                <span>{userAction.actions.name}</span>
        
                <span class="md:hidden font-bold">Points:</span>
                <span>{userAction.actions.score}</span>
        
                <span class="md:hidden font-bold">Date:</span>
                <span>{new Date(userAction.created_at).toLocaleDateString("de-DE",)}</span>

                <form method="POST" action="?/deleteEntry">
                  <input id="id" name="id" class="hidden" value={userAction.id}>
                  <button type="submit" class="font-bold hover:text-olive">
                    Delete
                  </button>
                </form>
              </li>
            {:else}
              <p class="text-center">No actions yet...</p>
            {/each}
          </ul>
        </div>
      </AccordionItemAny>

      <!-- weekly goal -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">weekly goal</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <div class="flex flex-row items-center justify-center p-2">
          <img src="/options/ChevronLeft.svg" alt="Chevron Left" class="mr-2 mb-12 self-center md:h-12 h-8" />
          <div class="flex flex-col items-center">
            <input type="number" min=1 max=1000 class="font-bold text-center max-w-40 md:max-w-60 py-10 px-8 bg-gray-olive rounded md:text-6xl text-4xl" name="goal" bind:value={goal}>
            <button class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive" on:click={() => updateGoal()}> commit</button>
            {#if goal <= 0 || goal > 1000}
              <span class="text-red-500">Please enter a valid goal (1-1000)</span>
            {/if}
          </div>
          <span class="text-m ml-4 mb-10 font-bold">points</span>
        </div>
      </AccordionItemAny>

      <!-- view friends -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">view friends</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <div class="flex justify-between items-center p-2">
          <span class="p-2 font-bold">You don't have any friends</span>
        </div>
      </AccordionItemAny>
      
      <!-- change username -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">update display name</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />
        <!-- Inhalt -->
        <div class="flex flex-col justify-between items-center p-2">
          <Input class="bg-light-olive text-black mb-2" maxlength={16} bind:value={displayName}/>
          <button class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive" on:click={() => updateProfile()}>
						Save
					</button>
          {#if nameError !== ""}	
          <div class="bg-red-500 text-white p-4 rounded mt-4">
              <p>{nameError}</p>
          </div>
          {/if}
        </div>
      </AccordionItemAny>

      <!-- change profile picture -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">change profile picture</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <div class="flex justify-between items-center p-2">
          <span class="p-2 font-bold">Not implemented yet</span>
        </div>
      </AccordionItemAny>
      
      <!-- change password -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">change password</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <form method="post" action="?/changePassword" class="flex flex-col items-center">
          <input type="password" name="new_password" minlength="8" class="w-full font-bold py-2 px-4 mb-2 rounded bg-light-olive text-black" placeholder="new password" required/>
          <button type="submit" class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive">submit</button>
          {#if form?.error}	
            <div class="bg-red-500 text-white p-4 rounded mb-4">
              <p>{form.error}</p>
            </div>
          {/if}
       </form>
      </AccordionItemAny>

      <!-- logout -->
      <button type="button" on:click={logout} class="w-full flex justify-between items-center p-4 cursor-pointer border border-t-0 bg-gray-olive">
        <span class="p-3 font-bold">logout</span>
      </button>
    </Accordion>
	</div>
</body>
