<script lang='ts'>
  import { progress } from '$lib/stores/audioStore';
</script>

<div class='w-full h-1 bg-gray-200'>
  <div
    class='h-full bg-red-500 transition-all duration-100'
    style="width: {$progress}%"
  />
</div>
