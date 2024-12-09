<script setup>
    import {reactive , defineProps, onMounted, computed} from 'vue';
    import OneJobListing from '@/components/OneJobListing.vue'
    import PulseLoader from'vue-spinner/src/PulseLoader.vue';
    import axios from 'axios';

    const state = reactive({
        jobs: [],
        isLoading: true,
        searchQuery: ''
    })

    defineProps({
        limit: Number,
        showButton: {
            type: Boolean,
            default: false,
        },
    });

    const filteredJobs = computed(() => {
        return state.jobs.filter((job) =>
            job.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
            .map((job) => ({
            ...job,
            highlightedTitle: highlightMatch(job.title, state.searchQuery),
            highlightedDescription: highlightMatch(job.description, state.searchQuery),
            }));
});


    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, `<span class="bg-yellow-200 text-black font-semibold">$1</span>`);
    }


    onMounted(async() => {
        try {
            const response = await axios.get('/api/jobs');
            state.jobs = response.data;
        } catch (error) {
            console.log("Error Fetching Jobs", error)
        } finally {
            state.isLoading = false;
        }
    })
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <section v-if="!showButton" class="py-4">
                <div class="container mx-auto px-4">
                <div class="relative">
                    <input
                        v-model="state.searchQuery"
                        type="text"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="Filter jobs..."
                    />
                    </div>
                </div>
            </section>
            <!-- loading spinner -->
             <div v-if="state.isLoading" class="text-center text-gray-500">
                <PulseLoader />
             </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OneJobListing v-for="job in filteredJobs.slice(0,limit || filteredJobs.length)":key="job.id":job="job" />
                <!-- <h3 v-html="job.highlightedTitle" class="font-bold text-lg"></h3> -->
                <!-- <p v-html="job.highlightedDescription" class="text-gray-600"></p> -->
            </div>
        </div>
    </section>
    <section class="m-auto max-w-lg my-10 px-6" v-if="showButton">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</RouterLink
      >
    </section>
</template>