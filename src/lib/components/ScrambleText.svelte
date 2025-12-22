<script lang="ts">
    import { onMount } from "svelte";

    let {
        text = "",
        autostart = true,
        delay = 0,
        duration = 2000,
        scrambleChars = "01$#?%&@_",
        once = true,
        class: className = "",
    } = $props();

    let displayText = $state("");
    let isRevealed = $state(false);
    let timeoutId: any;
    let intervalId: any;

    function scramble() {
        if (isRevealed && once) return;

        clearInterval(intervalId);
        clearTimeout(timeoutId);

        let iteration = 0;
        const totalSteps = text.length;
        // Aiming for ~750ms total regardless of length
        const stepTime = 25;

        intervalId = setInterval(() => {
            displayText = text
                .split("")
                .map((char, index) => {
                    if (index < iteration) return text[index];
                    if (char === " ") return " ";
                    return scrambleChars[
                        Math.floor(Math.random() * scrambleChars.length)
                    ];
                })
                .join("");

            if (iteration >= totalSteps) {
                clearInterval(intervalId);
                isRevealed = true;
            }
            // Increase iteration faster to hit the 0.75s mark
            // For a 15 char string: 15 / (750 / 25) = 15 / 30 = 0.5
            // So +0.5 per tick roughly hits it for average word lengths
            iteration += 0.6;
        }, stepTime);
    }

    onMount(() => {
        if (autostart) {
            timeoutId = setTimeout(scramble, delay);
        }
        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    });
</script>

<span class={className}>
    {displayText || text.replace(/[^\s]/g, scrambleChars[0])}
</span>
