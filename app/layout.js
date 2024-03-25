import '@styles/global.css';

export const metadata = {
    title: "Promptopia",
    description: "Discover AI Prompt"
}

const RootLayout = () => {
    return (
        <html>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout