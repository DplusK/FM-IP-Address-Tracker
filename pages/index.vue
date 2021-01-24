<template>
  <div class="body">
    <div
      class="bg-hero-pattern md:h-280 h-300 bg-no-repeat w-full bg-cover flex justify-center items-center flex-col"
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
        class="bg-white rounded-2xl mx-auto max-w-6xl transform -translate-y-10 flex justify-between px-10 min-h-160 flex-col md:flex-row md:py-0 py-5"
      >
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-3 md:text-left text-center"
        >
          <p class="text-base uppercase font-semibold text-gray-500">
            ip address
          </p>
          <div class="font-bold text-2xl leading-snug">{{ data.ip }}</div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-3 md:text-left text-center"
        >
          <p class="text-base uppercase font-semibold text-gray-500">
            location
          </p>
          <div class="font-bold text-2xl leading-snug" v-if="data">
            {{ data.location.city }}, {{ data.location.region }}
            {{ data.location.postalCode }}
          </div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-3 md:text-left text-center"
        >
          <p class="text-base uppercase font-semibold text-gray-500">
            timezone
          </p>
          <div class="font-bold text-2xl leading-snug" v-if="data">
            UTC {{ data.location.timezone }}
          </div>
        </div>
        <div class="w-px my-auto py-5 mr-8 md:block hidden bg-gray-700"></div>
        <div
          class="flex flex-col h-full flex-1 md:py-10 py-3 md:text-left text-center"
        >
          <p class="text-base uppercase font-semibold text-gray-500">isp</p>
          <div class="font-bold text-2xl leading-snug" v-if="data">
            {{ data.isp }}
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <l-map :zoom="zoom" :center="center" class="remaining w-full z-0">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="marker" />
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ipAddress: "198.120.56.255",
      mountains: [],
      data: "",
      map: "",
      zoom: 13,

      center: [this.data.lat, this.data.lng],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      marker: [this.data.lat, this.data.lng],
    };
  },
  mounted() {
    this.createMap();
    this.getGeoData();
  },
  methods: {
    createMap() {
      return new Promise((resolve) => {
        this.map = L.map("map", {
          center: [34.68387, -86.64764],
          zoom: 14,
          animation: true,
        });
        if (this.map) resolve();
      });
    },
    setMap() {
      this.map = L.map("map", {
        zoom: 13,
        animation: true,
      });
      this.map.setView([this.data.location.lat, this.data.location.lng]);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
      L.marker([this.data.location.lat, this.data.location.lng]).addTo(
        this.map
      );
    },
    async getGeoData() {
      var api_key = "at_rMaOLTPCG6zAdk075i4C2E3kJrb94";
      var api_url = "https://geo.ipify.org/api/v1?";
      await this.$axios
        .$get(api_url + "apiKey=" + api_key + "&ipAddress=" + this.ipAddress)
        .then((res) => {
          this.data = res;
          this.setMap();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
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
  height: calc(100% - 280px);
}
</style>
