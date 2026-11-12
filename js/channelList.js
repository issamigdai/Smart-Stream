import { getCountriesApi, getChannelsApi, logoApi } from './api.js'

const wantedCountries = ["MA", "FR", "ES", "US", "GB", "DE"];
const wantedCategories = ["documentary", "news", "sports"];

const countries = await getCountriesApi();
const channels = await getChannelsApi();
const logos = await logoApi();

const selectedCountries = countries.filter(country =>
    wantedCountries.includes(country.code)
);

const selectedChannels = [];

for (const channel of channels) {
    const country = wantedCountries.includes(channel.country);
    let catego = false;
    let alive = false;
    for (const category of channel.categories) {
        if (wantedCategories.includes(category)) {
            catego = true;
        }
    }
    if (!channel.closed) {
        alive = true
    }
    if (country && catego && alive) {
        selectedChannels.push(channel);
    }
}
const ma = []
selectedChannels.forEach(channel => {
    if (channel.country === "MA") {
        ma.push(channel)
    }
})
console.log(ma)
console.log(selectedChannels);

function displayConteries() {
    const container = document.getElementById('contrieHolder')
    let html = ''
    selectedCountries.forEach(countrie => {
        html += `
            <button type="button" data-code="${countrie.code}"
                class="flex h-16 w-full cursor-pointer items-center gap-3 rounded-lg border border-[#1E293B] bg-[#0F172A] p-3 text-left transition-colors hover:border-[#818CF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#818CF8]">
                <img class="h-[20px] shrink-0" src="https://flagsapi.com/${countrie.code.toUpperCase()}/flat/64.png" alt="">
                <strong class="truncate font-sans text-[#F8FAFC]">${countrie.name}</strong>
            </button>`
    });
    container.innerHTML = html
}
function displaychannels() {
    const container = document.getElementById('channelList')
    let html = ''
    selectedChannels.forEach(channel => {
        html += `
                        <strong class="flex flex-row items-center h-[64px] bg-[#0F172A] p-3 gap-3 border border-[#1E293B] hover:border-[#818CF8] cursor-pointer rounded-lg w-full text-[#F8FAFC]">${channel.name}</strong>`
    });
    container.innerHTML = html
}
displayConteries()
displaychannels()
