<script setup>
    import Hero from '@/components/Hero.vue'
    import HomeCards from '@/components/HomeCards.vue'
    import Joblistings from '@/components/Joblistings.vue'
</script>

<template>
      <Hero />   <!-- title="Test Title" subtitle="Test Subtitle" props example -->
    <HomeCards />
    <Joblistings :limit="3" :showButton="true"/>
</template>