import Provider from "@components/Provider";
import Navbar from "@components/Navbar";
import "@styles/global.css";

export const metadata = {
  title: "Link Lurker",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          src="https://kit.fontawesome.com/429c6af039.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body className="wholeBody">
        <Provider>
          <div>
            <main>
              <Navbar />
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
