import React from "react";
import { TStadium } from "./home-stadium-form";

export default function useStadiumForm() {
    const [formData, setFormData] = React.useState<
        Omit<TStadium, "ownerId" | "stadiumId">
    >({
        name: "",
        team: "DOOSAN",
    });
    return {
        formData,
        setFormData,
    };
}
