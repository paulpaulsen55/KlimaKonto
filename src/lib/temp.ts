export function enhance(form: HTMLFormElement) {
    () => {
        let loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    }
}