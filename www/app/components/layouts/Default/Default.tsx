import React, {FC} from 'react';
import Header from "@element/Header/Header";
import Footer from "@element/Footer/Footer";

const Default: FC = ({ children }) => (
    <div>
        <Header />
        {children}
        <Footer />

    </div>
);

export default Default;

