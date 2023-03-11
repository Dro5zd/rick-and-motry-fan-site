import React from "react";
import {
    LoaderBody,
    LoaderWrapper,
} from "./Loader.styled";

export const Loader = ({isLoading}) => {
    return (
        <LoaderWrapper isLoading={isLoading}>
            <LoaderBody></LoaderBody>
        </LoaderWrapper>

    );
};
