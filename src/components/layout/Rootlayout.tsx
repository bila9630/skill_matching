import { Flex } from "@mantine/core";
import Navbar from "../navbar/navbar";


const Rootlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex
            direction="row"
            justify="flex-start"
            // Prevents children from overflowing Flex container
            style={{ overflow: "hidden" }}
        >
            <Navbar />
            {/* Navbar has position fixed. Without marginLeft, navbar and content will overlap. */}
            <div style={{ flexGrow: 1, margin: "0 1.25rem", marginLeft: "6.25rem" }}>{children}</div>
        </Flex>
    );
};

export default Rootlayout;