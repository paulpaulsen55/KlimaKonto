<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { Accordion, AccordionItem } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/store';
  import type { PageData } from './$types';


	export let data: PageData;
	$: ({ supabase, userActions, userGoals } = data);

	$: logout = async () => {
		await supabase.auth.signOut();
        goto('/');
	};

  let goal = 0; // Initialisiere `goal`

  async function fetchGoal() {
    const { data, error } = await supabase
      .from('user_goals') // Tabelle `user_goals`
      .select('goal') // Wähle das Feld `goal`
      .eq('id', $user?.id) // Finde den Eintrag für den aktuellen Benutzer
      .single(); // Liefert nur eine Zeile zurück

    if (error) {
      console.error('Fehler beim Abrufen des Ziels:', error.message);
      return;
    }

    goal = data.goal; // Speichere das Ziel in der Variable
    console.log('Geladenes Ziel:', goal);
  }

  fetchGoal();

  async function handleSubmit() {
    await supabase.from('user_goals').upsert({ goal: goal, id: $user?.id });
        
    invalidate('supabase:db:user_goals');
  }

  const AccordionItemAny = AccordionItem as any;
</script>

<div class="p-4 min-h-screen text-light-olive">
	<div class="max-w-s mx-auto p-4">
		<!-- Titel -->
		<h2 class="text-3xl font-bold mb-4">Profile & Settings</h2>

		<!-- Akkordion -->
    <Accordion>
      <!-- recent tracks  -->
      <AccordionItemAny class="bg-gray-olive">
        <div slot="header" class="flex w-full justify-between items-center">
          <span class="p-2 font-bold">recent tracks</span>
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
            {#each userActions.slice(-5) as userAction}
              <li
                class="grid grid-cols-1 gap-y-2 p-2 border-b border-gray-300 md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-x-8 md:p-0 md:border-none"
              >
                <span class="md:hidden font-bold">Aktion:</span>
                <span>{userAction.actions.name}</span>
        
                <span class="md:hidden font-bold">Punkte:</span>
                <span>{userAction.actions.score}</span>
        
                <span class="md:hidden font-bold">Datum:</span>
                <span>{userAction.created_at}</span>

                <form method="POST" action="?/deleteEntry">
                  <input id="id" name="id" class="hidden" value={userAction.id}>
                  <button type="submit" class="font-bold hover:text-olive">
                    Delete
                  </button>
                </form>
              </li>
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
        <div class="flex items-center justify-center p-2">
          <img src="/options/ChevronLeft.svg" alt="Chevron Left" class="mr-2 mb-8 self-center h-10" />
          <div class="flex flex-col items-center">
            <form on:submit|preventDefault={handleSubmit}>
              <input class="font-bold py-10 px-16 bg-gray-olive rounded text-6xl" name="goal" bind:value={goal}>
              <button type="submit"> commit</button>
            </form>
            <span class="text-m mt-2 font-bold">points</span>
          </div>
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
          <span class="p-2 font-bold">change username</span>
        </div>
        <img slot="arrowup" src="/options/ChevronDown.svg" alt="Pfeil runter" />
        <img slot="arrowdown" src="/options/ChevronRight.svg" alt="Pfeil rechts" />
        <!-- Inhalt -->
        <div class="flex justify-between items-center p-2">
          <span class="p-2 font-bold">Not implemented yet</span>
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

        <form method="post" action="?/changePassword">
          <label for="new_password">
             <input type="password" name="new_password" class="w-full font-bold py-2 px-4 rounded mb-2 bg-light-olive text-black" placeholder="new password" required minlength="6" />
          </label>
          <button type="submit" class="flex justify-between items-center bg-gray-olive p-2 rounded-full mt-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive">submit</button>
       </form>
      </AccordionItemAny>

      <!-- logout -->
      <button type="button" on:click={logout} class="w-full flex justify-between items-center p-4 cursor-pointer border border-t-0 bg-gray-olive">
        <span class="p-3 font-bold">logout</span>
      </button>
    </Accordion>
	</div>
</div>
