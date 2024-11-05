<script>
  import { AccordionItem, Accordion } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	$: ({ supabase } = data);
	$: currentPath = $page.url.pathname;

	$: logout = async () => {
		await supabase.auth.signOut();
        goto('/');
	};
  let isOpen = false;
</script>

<div class="p-4 min-h-screen text-light-olive">
	<div class="max-w-s mx-auto p-4">
		<!-- Titel -->
		<h2 class="text-3xl font-bold mb-4">Profile & Settings</h2>

		<!-- recent tracks -->
		<div class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive">
			<span class="p-2 font-bold">recent tracks</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>

		<!-- weekly goal (mit Dropdown-Option) -->
    <Accordion flush  class="max-w-s mx-auto -mt-5 -mb-3">
      <AccordionItem bind:open={isOpen} borderBottomClass="border-none">
        <!-- Header im Accordion so stylen wie das div -->
        <div
          slot="header"
          class="flex w-full justify-between items-center bg-olive p-2 rounded-full cursor-pointer hover:bg-light-olive hover:text-dark-olive">
          <span class="p-2 font-bold">weekly goal</span>
			  {#if isOpen}
          <img src="/options/ChevronDown.svg" alt="Pfeil runter" />
        {:else}
          	<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
      	{/if}
        </div>

        <div slot="arrowup" hidden/>
        <div slot="arrowdown" hidden/>
        
        <!-- Inhalt des AccordionItem -->
        <div class="flex justify-between items-center bg-olive p-2 rounded-lg mb-2 cursor-pointer -mt-5 h-[30vh]">
          <span class="p-2 font-bold">50 points</span>
        </div>

      </AccordionItem>
    </Accordion>
    
    
		<!-- Andere Optionen -->
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">view friends</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">change username</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">change profile picture</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
		<div
			class="flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
		>
			<span class="p-2 font-bold">change password</span>
			<img src="/options/ChevronRight.svg" alt="Pfeil rechts" />
		</div>
    <button
    type="button"
    class="w-full flex justify-between items-center bg-olive p-2 rounded-full mb-2 cursor-pointer hover:bg-light-olive hover:text-dark-olive"
    on:click={logout}
  >
    <span class="p-2 font-bold">logout</span>
  </button>
	</div>
</div>
