<script lang="ts">
    export let items: string[];
</script>

<section>
    <div class="title">Stream:Topic</div>
    <div class="content">
        <div>1A message<br />some othyer stuff</div>
        <div>2A message<br />some othyer stuff</div>
        <div>3A message<br />some othyer stuff</div>
    </div>
</section>

<style lang="scss">
    .title {
    }

    section {
        background: yellow;
        width: 100%;
        max-width: 45ch;
        padding: 0.5em;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        div {
            width: 20ch;
            background: white;
        }
    }
</style>
