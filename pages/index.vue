<template>
  <div class="body">
    <div
      class="bg-hero-pattern md:h-280 h-300 bg-no-repeat w-full bg-cover flex pt-6 md:pt-0 justify-start md:justify-center items-center flex-col"
    >
      <div class="flex text-center w-full mb-5 font-medium justify-center">
        <h1 class="text-2xl text-white">IP Address Tracker</h1>
      </div>
      <div class="flex justify-center w-full mx-auto md:px-2 px-5">
        <div
          class="max-w-3xl rounded-xl w-full h-60 bg-white flex items-center overflow-hidden"
        >
          <input
            type="text"
            v-model="ipAddress"
            class="bg-transparent text-black placeholder-gray-500 pl-5 w-full h-full"
            placeholder="Search for any IP address or domain"
          />
          <button
            @click="getGeoData"
            class="bg-black text-white font-medium w-16 ml-auto h-full fa fa-chevron-right"
          >
            <font-awesome-icon icon="chevron-right" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full absolute z-20 md:px-2 px-5">
      <div
        class="bg-white rounded-2xl mx-auto max-w-6xl transform -translate-y-32 md:-translate-y-10 flex justify-between px-10 min-h-160 flex-col md:flex-row md:py-0 py-2"
      >
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-2 md:text-left text-center"
        >
          <p class="text-sm md:text-base uppercase font-semibold text-gray-500">
            ip address
          </p>
          <div class="font-bold text-xl md:text-2xl leading-snug">
            {{ data.ip }}
          </div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-2 md:text-left text-center"
        >
          <p class="text-sm md:text-base uppercase font-semibold text-gray-500">
            location
          </p>
          <div class="font-bold text-xl md:text-2xl leading-snug" v-if="data">
            {{ data.location.city }}, {{ data.location.region }}
            {{ data.location.postalCode }}
          </div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-2 md:text-left text-center"
        >
          <p class="text-sm md:text-base uppercase font-semibold text-gray-500">
            timezone
          </p>
          <div class="font-bold text-xl md:text-2xl leading-snug" v-if="data">
            UTC {{ data.location.timezone }}
          </div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-2 md:text-left text-center"
        >
          <p class="text-sm md:text-base uppercase font-semibold text-gray-500">
            isp
          </p>
          <div class="font-bold text-xl md:text-2xl leading-snug" v-if="data">
            {{ data.isp }}
          </div>
        </div>
      </div>
    </div>
    <div class="remaining w-full z-0">
      <l-map v-if="data" :zoom="zoom" :center="center" ref="map" class="z-0">
        <l-tile-layer :url="url" />

        <l-marker :lat-lng="marker" icon-url="/images/icon.png" />
      </l-map>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ipAddress: "198.120.56.255",
      data: "",
      zoom: 13,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };
  },
  mounted() {
    this.getGeoData();
  },
  computed: {
    center: {
      set: function () {
        this.center = [34.68387, -86.64764];
      },
      get: function () {
        return [this.data.location.lat, this.data.location.lng];
      },
    },
    marker: {
      set: function () {
        this.marker = [34.68387, -86.64764];
      },
      get: function () {
        return [this.data.location.lat, this.data.location.lng];
      },
    },
  },
  methods: {
    async getGeoData() {
      var api_key = "at_rMaOLTPCG6zAdk075i4C2E3kJrb94";
      var api_url = "https://geo.ipify.org/api/v1?";
      await this.$axios
        .$get(api_url + "apiKey=" + api_key + "&ipAddress=" + this.ipAddress)
        .then((res) => {
          this.data = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
:focus {
  outline: none;
}
.body {
  @apply h-screen w-full bg-gray-700;
}

.remaining {
  height: calc(100% - 300px);
  @media (min-width: 768px) {
    height: calc(100% - 280px);
  }
}
</style>
