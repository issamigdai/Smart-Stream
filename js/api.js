export async function getCountriesApi() {

    try {
        const res = await fetch("https://iptv-org.github.io/api/countries.json");
        if (!res.ok) {
            throw new Error(`HTTP Error! ${res.status}`)
        }
        const result = await res.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function logoApi() {

    try {
        const res = await fetch("https://iptv-org.github.io/api/logos.json");
        if (!res.ok) {
            throw new Error(`HTTP Error! ${res.status}`)
        }
        const result = await res.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function getChannelsApi() {
    try {
        const channels = await fetch("https://iptv-org.github.io/api/channels.json")
        if (!channels.ok) {
            throw new Error(`HTTP Error! : ${channels.status}`)
        }
        const channel = await channels.json()
        return channel
    } catch (error) {
        console.log(error)
        throw error
    }
}


