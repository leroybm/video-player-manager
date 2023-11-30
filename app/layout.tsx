import 'globals.css';

export const metadata = {
    title: 'FP Manager'
}

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}