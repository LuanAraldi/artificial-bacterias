
<template>
    <span>
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" :stroke="stroke" stroke-width="2" :fill="geracao"/>
        </svg>  
    </span>
</template>

<script>
export default {
  props: ['red', 'green', 'blue', 'stroke'],
  data () {
    return {
      geracao: 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')'
    }
  }
}
</script>

<style>
  
</style>
