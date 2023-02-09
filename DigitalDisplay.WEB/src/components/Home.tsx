import { Box } from "@mui/material";
import { FC } from "react";

export const Home: FC = () => {
    return (
        <Box
            className="homeStyle" sx={{
                width: 500,
                height: 200,
                marginLeft: 60,
                marginTop: 20
            }}>

            <p style={{ fontSize: 50, textAlign: 'center', paddingTop: 30 }}>Welcome to Digital Display!</p>
        </Box>
    );
};