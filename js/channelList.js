import { getCountriesApi, getChannelsApi, getStreamUrl } from './api.js'

const wantedCountries = ["MA", "FR", "ES", "US", "GB", "DE", "BR", "CN"];
const wantedCategories = ["documentary", "news", "sports", "general", "enfants"];

const countries = await getCountriesApi();
const channels = await getChannelsApi();
const streams = await getStreamUrl();

const streamByChannel = {}
for (const stream of streams) {
    if (!stream.channel) continue
    if (!stream.url.startsWith('https://')) continue
    if (!stream.url.includes('.m3u8')) continue
    if (stream.labels.includes('Geo-blocked')) continue
    if (!streamByChannel[stream.channel]) streamByChannel[stream.channel] = stream.url
}

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
    if (country && catego && alive && streamByChannel[channel.id]) {
        selectedChannels.push(channel);
    }
}

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
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-code]')
        if (!btn) return
        currentCountry = btn.dataset.code
        displaychannels()
    })
}


document.getElementById('channelList').addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if (!btn) return
    const channel = selectedChannels.find(channel => channel.id === btn.dataset.id)
    if (!channel) return

    const countryName = selectedCountries.find(c => c.code === channel.country)?.name ?? channel.country
    const categories = channel.categories
    const streamUrl = streamByChannel[channel.id]
    const list = document.getElementById('main')
    let html = ""
    html += `<div class="flex flex-col gap-6">
                <div class="flex flex-row gap-4 items-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="12" fill="#334155" />
                        <path
                            d="M15.4972 21.093V19.3182H23.8594V21.093H20.7422V29.5H18.6143V21.093H15.4972ZM25.2365 29.5V19.3182H27.3892V27.7251H31.7543V29.5H25.2365Z"
                            fill="#F8FAFC" />
                    </svg>
                    <div class="flex flex-col">
                        <strong class="font-bold font-sans text-md text-white">${channel.name}</strong>
                        <small class="font-sans text-[#94A3B8]">${countryName} · ${categories}</small>
                    </div>
                </div>
                <div id="playerHolder">
                    <video-player>
                        <video-skin
                            style="display: block; width: 100%; aspect-ratio: 16 / 9; --media-controls-before-start: visible;">
                            <hlsjs-video src="${streamUrl}"
                                playsinline></hlsjs-video>
                        </video-skin>
                    </video-player>
                </div>
            </div>
            <div class="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-4">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <span class="text-[#6366F1] font-semibold font-sans ">NOW PLAYING</span>
                        <h2 class="font-bold font-sans text-white text-2xl">Iceland: Land of Fire & Ice</h2>
                        <small class="text-[#94A3B8] font-sans">Documentary</small>
                    </div>
                    <p class="font-sans text-[#94A3B8]">Journey across volcanic peaks, ancient glaciers and wild
                        coastlines to discover the extraordinary
                        forces shaping Iceland’s breathtaking landscape.</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row justify-between items-center">
                            <small class="font-semibold text-white">20:00-21:00</small>
                            <small class="font-sans text-[#94A3B8]">36 min remaining</small>
                        </div>
                        <div class="h-2 w-full rounded-lg bg-[#1E293B]">
                            <div class="h-2 w-[50%] rounded-lg bg-[#6366F1]">
                            </div>
                        </div>
                        <div class="flex flex-row justify-between items-center">
                            <small class="font-semibold text-white">20:24 · Local time</small>
                            <small class="font-sans text-[#94A3B8]">4K UHD · Stereo</small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full rounded-lg h-full bg-[#0F172A] border border-[#1E293B] p-5 gap-4">
                    <div class="flex flex-row justify-between items-center">
                        <strong class="text-white font-sans">Up next on Wild Earth</strong>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.16602 10H15.834M10 15.834L15.834 10L10 4.166" stroke-width="1.75"
                                stroke-linecap="round" stroke="#94A3B8" />
                        </svg>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row justify-between items-center">
                            <small class="font-sans text-[#6366F1]">21:00 – 22:00</small>
                            <small class="font-sans text-[#94A3B8]">60 min</small>
                        </div>
                        <strong class="text-white font-sans">The Secret Life of Forests</strong>
                        <small class="font-sans text-[#94A3B8]">The hidden connections beneath the canopy.</small>
                    </div>
                    <hr class="border-[#1E293B]">
                    <div class="flex flex-row gap-4 items-center">
                        <small class="font-sans text-[#6366F1]">22:00</small>
                        <strong class="text-white font-sans">Ocean After Dark</strong>
                    </div>
                </div>
            </div>`
    list.innerHTML = html
})

let currentCountry = ''
let currentCategory = 'all'
const section = document.getElementById('btnscontainer')

function displaychannels() {
    const text = document.getElementById('input').value.toLowerCase().trim()
    const list = selectedChannels.filter(channel =>
        (!currentCountry || channel.country === currentCountry) &&
        (currentCategory === 'all' || channel.categories.includes(currentCategory)) &&
        channel.name.toLowerCase().includes(text)
    )
    document.getElementById('channelList').innerHTML = list.map(channel => `
        <button class="flex flex-row items-center h-[64px] bg-[#0F172A] p-3 gap-3 border border-[#1E293B] hover:border-[#818CF8] cursor-pointer rounded-lg w-full text-[#F8FAFC]" data-id="${channel.id}">${channel.name}</button>
    `).join('')
}

section.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if (!btn) return
    currentCategory = btn.id.toLowerCase()
    displaychannels()
})

document.getElementById('input').addEventListener('input', () => {
    displaychannels(currentCountry)
})
displayConteries()
displaychannels()