// export const POCKETBASE_URL = 'http://127.0.0.1:8090'
export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL
export const UNPROTECTED_ROUTES = ["/signin", "/signup", "/forgetpassword", "/favicon.svg"]

export const selectOption = [
    {
        value: "0",
        label: "0 - No Experience"
    }, {
        value: "1",
        label: "1 - Entry"
    }, {
        value: "2",
        label: "2 - Foundation"
    }, {
        value: "3",
        label: "3 - Experienced"
    }, {
        value: "4",
        label: "4 - Expert"
    }, {
        value: "5",
        label: "5 - Thought Leader"
    }]