<script lang="ts">
  import { Accordion, AccordionItem, Toast, Radio, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
  import { CheckCircleSolid } from "flowbite-svelte-icons";
  import { goto } from '$app/navigation';
  import type { PageData, ActionData } from './$types';
  import { page } from '$app/stores';
  import { onMount } from "svelte";
  import EnhancedForm from '$lib/components/EnhancedForm.svelte';

	export let data: PageData;
  export let form: ActionData;
	$: ({ supabase, userActions, userGoal, profile } = data);

  let accordionOpen = Array(6)
	let toastStatus = false;
  let tostText = "";
  let goal = 0;

  onMount(() => {
    goal = userGoal
    if (form?.error !== undefined) accordionOpen[form.error.target] = true;

    const params = new URLSearchParams($page.url.search);
    if (params.get('open') === 'first') {
      accordionOpen[0] = true;
    }
	})

	$: logout = async () => {
		await supabase.auth.signOut();
    goto('/');
	};

	function triggerToast(event: CustomEvent<{ message: string, target: number }>) {
    accordionOpen[event.detail.target] = true;
		toastStatus = true;
    tostText = event.detail.message;
		timeoutToast();
	}

  function timeoutToast(counter = 2) {
    if (--counter > 0) return setTimeout(timeoutToast, counter * 1000, counter);
    toastStatus = false;
    tostText = "";
  }

  const AccordionItemAny = AccordionItem as any;
</script>

<main class="p-4 text-light-olive">
  <Toast dismissable={false} bind:toastStatus position="top-right" class="bg-ultra-olive text-white rounded-xl">
		<CheckCircleSolid slot="icon" color="olive" class="w-5 h-5" />
    <span>{tostText}</span>
	</Toast>
	<div class="w-full p-4">
		<!-- Titel -->
		<h2 class="text-3xl font-bold mb-4">Profile & Settings</h2>

		<!-- Akkordion -->
    <Accordion>
      <!-- recent actions  -->
      <AccordionItemAny bind:open={accordionOpen[0]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">recent actions</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <Table hoverable={true}>
          <TableHead class="bg-gray-olive">
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell>Points</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>
              <span class="sr-only">Delete</span>
            </TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each userActions as userAction}
              <TableBodyRow class="bg-ultra-olive">
                <TableBodyCell>{userAction.actions.name}</TableBodyCell>
                <TableBodyCell>{userAction.actions.score}</TableBodyCell>
                <TableBodyCell>{new Date(userAction.created_at).toLocaleDateString("de-DE")}</TableBodyCell>
                <TableBodyCell>
                  <EnhancedForm 
                    action="?/deleteEntry" 
                    error={(form?.error && form.error.target === 0) ? form.error.message : ""} 
                    on:complete={(e) => triggerToast(e)}
                  >
                    <input id="id" name="id" class="hidden" value={userAction.id} required>
                    <button type="submit" class="font-bold text-primary-600 dark:text-primary-500 hover:underline hover:text-olive">Delete</button>
                  </EnhancedForm>
                </TableBodyCell>
              </TableBodyRow>
            {:else}
              <TableBodyRow>
                <TableBodyCell colspan={4} class="text-center">No actions yet...</TableBodyCell>
              </TableBodyRow>
            {/each}

          </TableBody>
        </Table>
      </AccordionItemAny>

      <!-- weekly goal -->
      <AccordionItemAny bind:open={accordionOpen[1]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">weekly goal</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <EnhancedForm 
          action="?/updateGoal" 
          error={(form?.error && form.error.target === 1) ? form.error.message : ""} 
          on:complete={(e) => triggerToast(e)}
        >
          <ul class="rounded-lg border bg-ultra-olive border-gray-600 divide-y divide-gray-600 mb-4">
            <li>
                <Radio name="goal" class="p-3" bind:group={goal} value="75">75 - Expert</Radio>
            </li>
            <li>
                <Radio name="goal" class="p-3" bind:group={goal} value="150">150 - Advanced</Radio>
            </li>
            <li>
                <Radio name="goal" class="p-3" bind:group={goal} value="300">300 - Beginner</Radio>
            </li>
            <input type="number" required min="1" max="1000" name="goal" bind:value={goal} class="bg-ultra-olive w-full font-bold py-2 px-4 rounded-b-lg"/>
          </ul>
          <button type="submit" class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive">
            submit
          </button>
        </EnhancedForm>
      </AccordionItemAny>

      <!-- view friends -->
      <AccordionItemAny bind:open={accordionOpen[2]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">view friends</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <div class="p-4 font-bold">You don't have any friends</div>
      </AccordionItemAny>
      
      <!-- change username -->
      <AccordionItemAny bind:open={accordionOpen[3]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">update display name</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <EnhancedForm 
          class="flex flex-col items-center" 
          action="?/updateDisplayname" 
          error={(form?.error && form.error.target === 3) ? form.error.message : ""} 
          on:complete={(e) => triggerToast(e)}
        >
          <input 
            class="w-full font-bold py-2 px-4 mb-2 rounded bg-light-olive text-black" value={profile.display_name}
            name="display_name" 
            type="text" 
            required 
            maxlength="16" 
          />
          <button type="submit" class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive">
						Save
					</button>
        </EnhancedForm>
      </AccordionItemAny>

      <!-- change profile picture -->
      <AccordionItemAny bind:open={accordionOpen[4]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">change profile picture</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <!-- Inhalt -->
        <div class="p-4 font-bold">Not implemented yet</div>
      </AccordionItemAny>
      
      <!-- change password -->
      <AccordionItemAny bind:open={accordionOpen[5]} class="bg-gray-olive p-6">
        <p slot="header" class="font-bold p-2">change password</p>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />

        <EnhancedForm 
          action="?/changePassword" 
          class="flex flex-col items-center" 
          error={(form?.error && form.error.target === 5) ? form.error.message : ""} 
          on:complete={(e) => triggerToast(e)}
        >
          <input type="password" name="new_password" minlength="8" class="w-full font-bold py-2 px-4 mb-2 rounded bg-light-olive text-black" placeholder="new password" required/>
          <button type="submit" class="hover:bg-light-olive hover:text-dark-olive font-bold mt-2 py-2 px-4 w-full rounded-full bg-olive text-light-olive">submit</button>
        </EnhancedForm>
      </AccordionItemAny>

      <!-- logout -->
      <button 
        class="w-full p-7 font-bold cursor-pointer border border-t-0 bg-gray-olive rounded-b-xl transition hover:bg-light-olive hover:text-dark-olive"
        type="button"
        on:click={logout} 
      >
        logout
      </button>
    </Accordion>
	</div>
</main>
